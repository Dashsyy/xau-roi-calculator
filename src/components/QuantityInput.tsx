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

  return (
    <div className="w-full border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="mb-6">
        <label className="text-xl font-black uppercase tracking-tight text-black">{title}</label>
      </div>
      
      <div className="space-y-6">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={value}
          onChange={handleValueChange}
          placeholder="0"
          className="w-full border-4 border-black bg-white py-8 px-6 text-center text-6xl font-black tracking-tighter text-black outline-none transition-colors placeholder:text-gray-200 focus:bg-yellow-50"
        />
        
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

export default QuantityInput;
