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

  const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onUnitChange(event.target.value as GoldUnit);
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-800">{title}</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleValueChange}
          placeholder={title}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-base text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
        <select
          value={unit}
          onChange={handleUnitChange}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-base text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 sm:w-40"
        >
          {units.map((option) => (
            <option key={option} value={option}>
              {unitLabels[option]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PriceInput;
