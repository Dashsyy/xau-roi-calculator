import { ChangeEvent, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GoldUnit, formatNumber } from '../utils/goldConversion';

type PriceInputProps = {
  title: string;
  value: string;
  unit: GoldUnit;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: GoldUnit) => void;
};

const units: GoldUnit[] = ['xi', 'domlang', 'ounce'];
const OUNCE_TO_XI = 8.23;
const DOMLANG_TO_XI = 10;

const PriceInput = ({ title, value, unit, onValueChange, onUnitChange }: PriceInputProps) => {
  const { t } = useLanguage();

  const unitLabels: Record<GoldUnit, string> = {
    xi: t('common.unit_xi_short'),
    domlang: t('common.unit_domlang_short'),
    ounce: t('common.unit_ounce_short'),
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const conversionHint = useMemo(() => {
    const numValue = Number.parseFloat(value);
    if (!numValue || numValue <= 0) return null;

    if (unit === 'xi') {
      const ouncePrice = numValue * OUNCE_TO_XI;
      return `${t('common.equivalent_to')} $${formatNumber(ouncePrice)} / ${t('common.unit_ounce_short')}`;
    }
    if (unit === 'ounce') {
      const xiPrice = numValue / OUNCE_TO_XI;
      return `${t('common.equivalent_to')} $${formatNumber(xiPrice)} / ${t('common.unit_xi_short')}`;
    }
    if (unit === 'domlang') {
      const xiPrice = numValue / DOMLANG_TO_XI;
      return `${t('common.equivalent_to')} $${formatNumber(xiPrice)} / ${t('common.unit_xi_short')}`;
    }
    return null;
  }, [value, unit, t]);

  return (
    <div className="w-full border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="mb-6">
        <label className="text-xl font-black uppercase tracking-tight text-black">{title}</label>
        <p className="text-sm font-bold text-gray-400 uppercase mt-1 tracking-widest">{t('common.per_unit')}</p>
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl font-black text-black opacity-30">$</span>
          <input
            type="number"
            inputMode="decimal"
            value={value}
            onChange={handleValueChange}
            placeholder="0.00"
            className="w-full border-4 border-black bg-white py-6 pl-12 pr-6 text-5xl font-black tracking-tighter text-black outline-none transition-colors placeholder:text-gray-200 focus:bg-yellow-50"
          />
          {conversionHint && (
            <div className="mt-4 bg-gray-100 p-3 border-2 border-black font-black text-base text-black">
              {conversionHint}
            </div>
          )}
        </div>

        <div className="flex border-4 border-black">
          {units.map((option, idx) => {
            const isActive = unit === option;
            return (
              <button
                key={option}
                type="button"
                className={`flex-1 py-4 text-sm font-black uppercase transition-colors ${idx !== 0 ? 'border-l-4 border-black' : ''} ${
                  isActive
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                onClick={() => onUnitChange(option)}
              >
                {unitLabels[option]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PriceInput;
