import { ChangeEvent } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GoldUnit } from '../utils/goldConversion';

type PriceInputProps = {
  title: string;
  value: string;
  unit: GoldUnit;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: GoldUnit) => void;
};

const units: GoldUnit[] = ['xi', 'domlang', 'ounce'];

const PriceInput = ({ title, value, unit, onValueChange, onUnitChange }: PriceInputProps) => {
  const { t } = useLanguage();

  const unitLabels: Record<GoldUnit, string> = {
    xi: t('common.unit_xi'),
    domlang: t('common.unit_domlang'),
    ounce: t('common.unit_ounce'),
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const handleUnitChange = (event: GoldUnit) => {
    onUnitChange(event);
  };

  return (
    <div className="w-full rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-700">USD</p>
      </div>
      <div className="mt-4 space-y-3">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleValueChange}
          placeholder={title}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-3xl font-black text-gray-900 shadow-inner focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
        <div className="flex gap-2 text-sm font-semibold text-gray-800">
          {units.map((option) => {
            const isActive = unit === option;
            return (
              <button
                key={option}
                type="button"
                className={`flex-1 rounded-2xl px-3 py-3 transition ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'border border-gray-200 bg-white text-gray-800 hover:border-amber-200 active:scale-[0.99]'
                }`}
                onClick={() => handleUnitChange(option)}
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
