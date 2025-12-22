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
    <div className="w-full rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-700">{t('common.quantity')}</p>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        </div>
        <p className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-700">{t('common.quantity_hint')}</p>
      </div>
      <div className="mt-4 space-y-3">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={value}
          onChange={handleValueChange}
          placeholder={title}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-3xl font-black text-gray-900 shadow-inner focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
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
                    ? 'bg-amber-600 text-white shadow-sm'
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

export default QuantityInput;
