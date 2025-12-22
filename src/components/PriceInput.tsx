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
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-500">USD</p>
      </div>
      <div className="mt-3 space-y-3">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleValueChange}
          placeholder={title}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-2xl font-semibold text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
        <div className="grid grid-cols-3 gap-2 text-sm font-medium text-gray-700">
          {units.map((option) => {
            const isActive = unit === option;
            return (
              <button
                key={option}
                type="button"
                className={`rounded-xl px-3 py-2 ${
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'border border-gray-200 bg-white text-gray-800 hover:border-amber-300'
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
