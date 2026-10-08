/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FarmerProfile {
  name: string;
  state: string;
  district: string;
  crop: string; // e.g. 'wheat' | 'paddy' | 'cotton' | 'maize' | 'sugarcane'
  landSize: number; // in acres
  soilType: string; // e.g. 'alluvial' | 'black' | 'clayey' | 'sandy'
}

export interface MandiPrice {
  id: string;
  cropName: string;
  hindiName: string;
  state: string;
  district: string;
  mandiName: string;
  currentPrice: number; // ₹ per quintal
  mspPrice: number; // ₹ per quintal
  trend: 'up' | 'down' | 'stable';
  date: string;
}

export interface AnalysisResult {
  disease: string;
  scientificName: string;
  confidence: string;
  severity: 'उच्च' | 'मध्यम' | 'कम';
  cropLoss: string;
  recoveryTimeline: string;
  description: string;
  preventionTips: string;
  organicTreatment: string;
  chemicalTreatment: string;
  advice: string;
}

export interface QuestionResult {
  answer: string;
  cropMentioned?: string;
  quickReplies?: string[];
}

export interface PastReport {
  id: string;
  date: string;
  type: 'disease' | 'question';
  title: string;
  subTitle?: string;
  imageUrl: string | null;
  disease?: string;
  scientificName?: string;
  confidence?: string;
  severity?: 'उच्च' | 'मध्यम' | 'कम';
  cropLoss?: string;
  recoveryTimeline?: string;
  description: string;
  preventionTips?: string;
  organicTreatment?: string;
  chemicalTreatment?: string;
  advice: string;
  originalQuery?: string;
}

export interface Scheme {
  id: string;
  name: string;
  authority: string;
  benefits: string;
  eligibility: string;
  howToApply: string[];
  category: 'central' | 'state';
  state?: string;
}

export interface SoilHealthCard {
  nitrogen: number; // N level: ppm or range (e.g. low/med/high)
  phosphorus: number; // P level
  potassium: number; // K level
  pH: number; // soil pH
}
