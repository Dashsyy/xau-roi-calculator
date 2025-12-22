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
    xi: t('common.unit_xi'),
    domlang: t('common.unit_domlang'),
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const handleUnitChange = (event: QuantityUnit) => {
    onUnitChange(event);
  };

  return (
    <div className="w-full rounded-2xl border border-amber-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-xs font-medium text-amber-700">{t('common.quantity_hint')}</p>
      </div>
      <div className="mt-3 space-y-3">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={value}
          onChange={handleValueChange}
          placeholder={title}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-3xl font-bold text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
        <div className="flex gap-2 text-base font-semibold text-gray-800">
          {units.map((option) => {
            const isActive = unit === option;
            return (
              <button
                key={option}
                type="button"
                className={`flex-1 rounded-xl px-3 py-3 transition ${
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'border border-gray-200 bg-white text-gray-800 hover:border-amber-200'
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
