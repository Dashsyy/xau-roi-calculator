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
    xi: t('common.unit_xi_short'),
    domlang: t('common.unit_domlang_short'),
    ounce: t('common.unit_ounce_short'),
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const handleUnitChange = (nextUnit: GoldUnit) => {
    onUnitChange(nextUnit);
  };

  return (
    <div className="w-full rounded-lg bg-white p-5 ring-1 ring-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{title}</p>
        </div>
        <span className="rounded-md bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600">{t('common.per_unit')}</span>
      </div>
      <div className="space-y-3">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleValueChange}
          placeholder={t('common.amount_placeholder')}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-4 text-3xl font-bold text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-200 bg-white text-gray-800 hover:border-gray-300'
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
