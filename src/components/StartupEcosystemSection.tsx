import React from 'react';
import { FileCheck } from 'lucide-react';
import { getCortevaEcosystemStrings } from '../corteva_translations';

export const StartupEcosystemSection: React.FC<{ selectedLang?: string }> = React.memo(({ selectedLang = 'hi' }) => {
  const eco = getCortevaEcosystemStrings(selectedLang);

  return (
    <div id="founder-ecosystem-subsection" className="pt-6 border-t border-emerald-800/60">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
        <div>
          <h4 className="text-sm font-bold tracking-wider text-white uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {eco.title}
          </h4>
          <p className="text-xs text-emerald-200/80 mt-0.5">
            {eco.subtitle}
          </p>
        </div>
        <span className="text-[11px] text-emerald-300/70 font-medium self-start sm:self-auto">
          {eco.disclosureTag}
        </span>
      </div>

      {/* Understated 3-column presentation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {eco.items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-emerald-950/60 p-4 border border-emerald-800/60 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-[10px] text-emerald-300/80 mb-1.5">
                <span className="font-semibold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/60">
                  {item.type}
                </span>
                <span className="font-mono text-emerald-400/80">{item.date}</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                {item.title}
              </h5>
              <p className="text-[11px] text-emerald-300 font-medium mt-1">
                <span className="font-semibold">{eco.statusLabel}</span> {item.status}
              </p>
              <p className="text-[11px] text-emerald-100/80 mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[10px] text-emerald-300/70">
              <span>{eco.footerRef}</span>
              <FileCheck className="w-3 h-3 text-emerald-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

StartupEcosystemSection.displayName = 'StartupEcosystemSection';

