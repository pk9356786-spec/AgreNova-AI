/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FarmerProfile } from '../types';
import { indianStates, cropOptions, soilTypeOptions } from '../data';
import { getTranslation } from '../translations';
import { MapPin, Sparkles, Loader2, CheckCircle2, Navigation, Search, X, ChevronDown, Check, AlertCircle } from 'lucide-react';

interface FarmerProfileFormProps {
  initialProfile: FarmerProfile;
  selectedLang: string;
  onSave: (updated: FarmerProfile) => void;
  submitLabel?: string;
  onCancel?: () => void;
}

export const FarmerProfileForm: React.FC<FarmerProfileFormProps> = React.memo(({
  initialProfile,
  selectedLang,
  onSave,
  submitLabel,
  onCancel
}) => {
  const [name, setName] = useState(initialProfile.name || '');
  const [selectedState, setSelectedState] = useState(initialProfile.state || 'UP');
  const [district, setDistrict] = useState(initialProfile.district || 'कन्नौज');

  // Crop searchable & custom input state
  const matchedInitialCrop = cropOptions.find(c => c.id === initialProfile.crop || c.nameHi === initialProfile.crop || c.nameEn === initialProfile.crop);
  const initialCropLabel = matchedInitialCrop 
    ? (selectedLang === 'en' ? matchedInitialCrop.nameEn : matchedInitialCrop.nameHi)
    : (initialProfile.crop || 'wheat');
  const initialCropSearchText = matchedInitialCrop && matchedInitialCrop.icon
    ? `${matchedInitialCrop.icon} ${initialCropLabel}`
    : initialCropLabel;

  const [crop, setCrop] = useState(initialProfile.crop || 'wheat');
  const [cropSearch, setCropSearch] = useState(initialCropSearchText);
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);

  const [landSize, setLandSize] = useState<string | number>(initialProfile.landSize ?? 2);

  // Soil type & custom input state
  const isStandardSoil = soilTypeOptions.some(s => s.id === initialProfile.soilType && s.id !== 'other');
  const [selectedSoilCategory, setSelectedSoilCategory] = useState(
    isStandardSoil ? initialProfile.soilType : (initialProfile.soilType ? 'other' : 'alluvial')
  );
  const [customSoilInput, setCustomSoilInput] = useState(
    isStandardSoil ? '' : (initialProfile.soilType || '')
  );

  const [isDetecting, setIsDetecting] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [locationStatusType, setLocationStatusType] = useState<'success' | 'error' | 'info'>('info');

  // Find districts for the currently selected state
  const currentStateObj = indianStates.find(s => s.id === selectedState) || indianStates[0];
  const currentDistricts = currentStateObj ? currentStateObj.districts : [];

  // Filter crops for search dropdown
  const filteredCrops = cropOptions.filter(c => {
    const searchLower = cropSearch.toLowerCase().replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
    if (!searchLower) return true;
    return (
      c.nameHi.toLowerCase().includes(searchLower) ||
      c.nameEn.toLowerCase().includes(searchLower) ||
      c.id.toLowerCase().includes(searchLower) ||
      (c.category && c.category.toLowerCase().includes(searchLower))
    );
  });

  // When state changes manually, update district if current district is empty
  const handleStateChange = (newStateId: string) => {
    setSelectedState(newStateId);
    const matchedState = indianStates.find(s => s.id === newStateId);
    if (matchedState && matchedState.districts.length > 0) {
      if (!matchedState.districts.includes(district)) {
        setDistrict(matchedState.districts[0]);
      }
    }
  };

  // Location Auto-Detect Handler
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus(getTranslation(selectedLang, 'gps_not_supported'));
      setLocationStatusType('error');
      return;
    }

    setIsDetecting(true);
    setLocationStatus(getTranslation(selectedLang, 'detecting_location'));
    setLocationStatusType('info');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
            { headers: { 'Accept': 'application/json' } }
          );
          if (response && response.ok) {
            const text = await response.text();
            if (text && !text.trim().startsWith('<')) {
              try {
                const data = JSON.parse(text);
                const addr = data.address || {};
                const stateName = addr.state || addr.region || '';
                const districtName = addr.state_district || addr.county || addr.city || addr.town || addr.district || '';

                let matchedState = indianStates.find(s => 
                  stateName.toLowerCase().includes(s.id.toLowerCase()) || 
                  s.name.toLowerCase().includes(stateName.toLowerCase())
                );

                if (matchedState) {
                  setSelectedState(matchedState.id);
                }

                if (districtName) {
                  const cleanDistrict = districtName.replace(/\s*district\s*/i, '').trim();
                  setDistrict(cleanDistrict);
                }

                setLocationStatus(`${getTranslation(selectedLang, 'location_detected_success')} ${districtName || ''} ${stateName ? `, ${stateName}` : ''}`);
                setLocationStatusType('success');
              } catch {
                setLocationStatus(getTranslation(selectedLang, 'location_coords_fetched'));
                setLocationStatusType('info');
              }
            } else {
              setLocationStatus(getTranslation(selectedLang, 'location_coords_fetched'));
              setLocationStatusType('info');
            }
          } else {
            setLocationStatus(getTranslation(selectedLang, 'location_coords_fetched'));
            setLocationStatusType('info');
          }
        } catch (err) {
          console.warn('Reverse geocoding error:', err);
          setLocationStatus(getTranslation(selectedLang, 'location_coords_fetched'));
          setLocationStatusType('info');
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.warn('Geolocation permission error:', error);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus(getTranslation(selectedLang, 'location_perm_denied'));
        } else {
          setLocationStatus(getTranslation(selectedLang, 'gps_unable_reach'));
        }
        setLocationStatusType('error');
        setIsDetecting(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedLand = parseFloat(String(landSize));
    const validLand = !isNaN(parsedLand) && parsedLand > 0 ? parsedLand : 1;

    const finalCrop = crop.trim() || cropSearch.trim() || 'wheat';
    const finalSoil = selectedSoilCategory === 'other'
      ? (customSoilInput.trim() || 'अन्य मिट्टी')
      : selectedSoilCategory;

    onSave({
      name: name.trim() || 'अनाम किसान',
      state: selectedState,
      district: district.trim() || 'कन्नौज',
      crop: finalCrop,
      landSize: validLand,
      soilType: finalSoil
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
      
      {/* Location Auto-Detect Button */}
      <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-slate-200 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#065F46] shrink-0" />
            <span className="font-extrabold text-[#0F172A] text-xs">ऑटो स्थान खोज (GPS Auto-Location)</span>
          </div>
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="inline-flex items-center justify-center gap-1.5 bg-[#065F46] hover:bg-[#044e3a] active:bg-[#033b2c] text-white px-3 py-2 sm:py-1.5 rounded-xl font-bold transition-all cursor-pointer shadow-xs disabled:opacity-60 text-xs min-h-[38px] sm:min-h-0"
          >
            {isDetecting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{getTranslation(selectedLang, 'detecting_location')}</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5" />
                <span>{getTranslation(selectedLang, 'auto_detect_location')}</span>
              </>
            )}
          </button>
        </div>

        {locationStatus && (
          <div className={`p-2 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 mt-0.5 border ${
            locationStatusType === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-[#065F46]'
              : locationStatusType === 'error'
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            {locationStatusType === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#065F46] shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            )}
            <span className="leading-snug break-words flex-1">{locationStatus}</span>
          </div>
        )}
      </div>

      {/* Name Input */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
          {getTranslation(selectedLang, 'farmer_full_name')}
        </label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="जैसे: रमेश यादव / Ramesh Kumar"
          className="w-full bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 focus:border-[#065F46] text-[#0F172A] font-medium min-h-[44px]"
        />
      </div>

      {/* State & District Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
            {getTranslation(selectedLang, 'state_label')}
          </label>
          <select 
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 focus:border-[#065F46] text-[#0F172A] font-medium cursor-pointer min-h-[44px]"
          >
            {indianStates.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
            {getTranslation(selectedLang, 'district_label')}
          </label>
          <div className="relative">
            <input 
              type="text" 
              list="profile-district-options"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="जिला दर्ज करें या सूची से चुनें"
              className="w-full bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 focus:border-[#065F46] text-[#0F172A] font-medium min-h-[44px]"
            />
            <datalist id="profile-district-options">
              {currentDistricts.map(dist => (
                <option key={dist} value={dist} />
              ))}
            </datalist>
          </div>
        </div>
      </div>

      {/* Primary Crop (Searchable Dropdown + Custom Crop) & Land Size Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1 flex items-center justify-between">
            <span>{getTranslation(selectedLang, 'primary_crop')}</span>
            <span className="text-[9px] text-[#065F46] font-bold lowercase">खोजें या टाइप करें</span>
          </label>
          
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input 
                type="text" 
                value={cropSearch}
                onFocus={() => setIsCropDropdownOpen(true)}
                onChange={(e) => {
                  setCropSearch(e.target.value);
                  setCrop(e.target.value);
                  setIsCropDropdownOpen(true);
                }}
                placeholder="फसल खोजें या नई दर्ज करें (उदा: गेहूं, ड्रैगन फ्रूट)"
                className="w-full bg-[#F8FAFC] pl-8 pr-8 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 focus:border-[#065F46] text-[#0F172A] font-medium min-h-[44px]"
              />
              {cropSearch ? (
                <button 
                  type="button" 
                  onClick={() => { setCropSearch(''); setCrop(''); setIsCropDropdownOpen(true); }}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-2 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
              )}
            </div>

            {/* Dropdown Floating List */}
            {isCropDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsCropDropdownOpen(false)} 
                />
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-20 max-h-56 overflow-y-auto divide-y divide-slate-100">
                  {cropSearch.trim() && !filteredCrops.some(c => c.nameHi.toLowerCase() === cropSearch.toLowerCase() || c.nameEn.toLowerCase() === cropSearch.toLowerCase() || c.id.toLowerCase() === cropSearch.toLowerCase()) && (
                    <button
                      type="button"
                      onClick={() => {
                        setCrop(cropSearch.trim());
                        setIsCropDropdownOpen(false);
                      }}
                      className="w-full text-left p-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#065F46] font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors min-h-[44px]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#065F46] shrink-0" />
                      <span className="break-words">"+ '{cropSearch}' (कस्टम फसल दर्ज करें)"</span>
                    </button>
                  )}

                  {filteredCrops.length > 0 ? (
                    filteredCrops.map(c => {
                      const label = selectedLang === 'en' ? c.nameEn : c.nameHi;
                      const isSelected = crop === c.id || crop === label || cropSearch.includes(label);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setCrop(c.id);
                            setCropSearch(c.icon ? `${c.icon} ${label}` : label);
                            setIsCropDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors min-h-[44px] ${isSelected ? 'bg-emerald-50 text-[#065F46] font-bold' : 'text-[#0F172A]'}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className="text-base leading-none shrink-0 w-5 text-center">{c.icon || '🌱'}</span>
                            <span className="truncate font-medium">{label}</span>
                            {c.category && (
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold shrink-0">
                                {c.category}
                              </span>
                            )}
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#065F46] shrink-0 ml-2" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-3 text-center text-slate-400 text-xs">
                      कोई फसल नहीं मिली। ऊपर दर्ज नाम ही सहेजा जाएगा।
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
            {getTranslation(selectedLang, 'land_size_label')}
          </label>
          <input 
            type="number" 
            step="0.01"
            min="0.01"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
            placeholder="उदा: 0.5, 1.5, 2.25"
            className="w-full bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 focus:border-[#065F46] text-[#0F172A] font-medium min-h-[44px]"
          />
          <span className="text-[9px] text-slate-400 block mt-0.5 font-normal">
            {getTranslation(selectedLang, 'land_size_hint')}
          </span>
        </div>
      </div>

      {/* Soil Type Dropdown & Custom Option */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
          {getTranslation(selectedLang, 'soil_type_label')}
        </label>
        <select 
            value={selectedSoilCategory}
            onChange={(e) => setSelectedSoilCategory(e.target.value)}
            className="w-full bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 focus:border-[#065F46] text-[#0F172A] font-medium cursor-pointer mb-1.5 min-h-[44px]"
        >
          {soilTypeOptions.map(soil => (
            <option key={soil.id} value={soil.id}>
              {selectedLang === 'en' ? soil.nameEn : soil.nameHi}
            </option>
          ))}
        </select>

        {selectedSoilCategory === 'other' && (
          <input 
            type="text" 
            value={customSoilInput}
            onChange={(e) => setCustomSoilInput(e.target.value)}
            placeholder="अपनी मिट्टी का नाम लिखें (उदा: कंकरीली रेतीली / Rocky Sandy)"
            className="w-full bg-emerald-50/30 p-3 rounded-xl border border-emerald-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 focus:border-[#065F46] text-[#0F172A] font-medium mt-1 min-h-[44px]"
          />
        )}
      </div>

      {/* Submit / Action Buttons */}
      <div className="flex gap-2.5 mt-2">
        {onCancel && (
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer text-center min-h-[44px]"
          >
            {getTranslation(selectedLang, 'cancel')}
          </button>
        )}
        <button 
          type="submit"
          id="btn-save-launch-app"
          className="flex-1 bg-[#065F46] hover:bg-[#044e3a] active:bg-[#033b2c] text-white py-3.5 px-6 rounded-xl font-black text-sm tracking-wide transition-all cursor-pointer shadow-sm text-center min-h-[44px]"
        >
          {submitLabel || getTranslation(selectedLang, 'save_profile_apply')}
        </button>
      </div>

    </form>
  );
});

