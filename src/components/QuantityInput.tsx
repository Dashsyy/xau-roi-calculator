import { ChangeEvent } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { QuantityUnit } from '../utils/goldConversion';

type QuantityInputProps = {
  title: string;
  value: string;
  unit: QuantityUnit;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: QuantityUnit) => void;
};

const units: QuantityUnit[] = ['xi', 'domlang'];

const QuantityInput = ({ title, value, unit, onValueChange, onUnitChange }: QuantityInputProps) => {
  const { t } = useLanguage();

  const unitLabels: Record<QuantityUnit, string> = {
    xi: t('common.unit_xi_short'),
    domlang: t('common.unit_domlang_short'),
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const handleUnitChange = (nextUnit: QuantityUnit) => {
    onUnitChange(nextUnit);
  };

  return (
    <div className="w-full rounded-xl bg-gray-50 px-4 py-4 ring-1 ring-gray-200">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{title}</p>
      </div>
      <div className="space-y-3">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={value}
          onChange={handleValueChange}
          placeholder={t('common.quantity_placeholder')}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-4 text-3xl font-semibold text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        <div className="flex gap-2 text-sm font-semibold text-gray-800">
          {units.map((option) => {
            const isActive = unit === option;
            return (
              <button
                key={option}
                type="button"
                className={`flex-1 rounded-md px-3 py-3 transition ${
                  isActive
                    ? 'border border-gray-900 bg-gray-900 text-white'
                    : 'border border-gray-300 bg-white text-gray-800 hover:border-gray-400'
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

export default QuantityInput;
