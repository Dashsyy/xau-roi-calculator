import { useEffect, useMemo, useState } from 'react';
import PriceInput from './components/PriceInput';
import QuantityInput from './components/QuantityInput';
import ResultCard from './components/ResultCard';
import { useLanguage } from './i18n/LanguageContext';
import { GoldUnit, QuantityUnit, calculateProfitAndRoi } from './utils/goldConversion';

type CalculationResult = ReturnType<typeof calculateProfitAndRoi>;

const App = () => {
  const { t, language, setLanguage } = useLanguage();
  const [buyPrice, setBuyPrice] = useState('');
  const [buyUnit, setBuyUnit] = useState<GoldUnit>('xi');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentUnit, setCurrentUnit] = useState<GoldUnit>('xi');
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnit>('xi');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const parsedBuyPrice = Number.parseFloat(buyPrice);
  const parsedCurrentPrice = Number.parseFloat(currentPrice);
  const parsedQuantity = Number.parseFloat(quantity);

  const isInputValid = useMemo(() => {
    const hasValidBuy = Number.isFinite(parsedBuyPrice) && parsedBuyPrice > 0;
    const hasValidCurrent = Number.isFinite(parsedCurrentPrice) && parsedCurrentPrice > 0;
    const hasValidQuantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0;
    return hasValidBuy && hasValidCurrent && hasValidQuantity;
  }, [parsedBuyPrice, parsedCurrentPrice, parsedQuantity]);

  useEffect(() => {
    if (!isInputValid) {
      setResult(null);
    }
  }, [isInputValid]);

  const handleCalculate = () => {
    if (!isInputValid) {
      setResult(null);
      return;
    }

    const calculation = calculateProfitAndRoi(
      parsedBuyPrice,
      buyUnit,
      parsedCurrentPrice,
      currentUnit,
      parsedQuantity,
      quantityUnit,
    );
    setResult(calculation);
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Cambodia</p>
            <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-sm">
              <span className="text-amber-700">{t('common.language')}:</span>
              <div className="flex gap-1">
                {(
                  [
                    { code: 'en' as const, label: 'EN' },
                    { code: 'km' as const, label: 'KM' },
                    { code: 'zh' as const, label: '中文' },
                  ]
                ).map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setLanguage(option.code)}
                    className={`rounded px-2 py-1 transition ${
                      language === option.code ? 'bg-amber-600 text-white' : 'text-gray-700 hover:bg-amber-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('common.app_title')}</h1>
          <p className="text-base text-gray-600">
            {t('common.buy_price')} / {t('common.current_price')} ({t('common.unit_xi')}, {t('common.unit_domlang')}, {t('common.unit_ounce')})
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          <PriceInput
            title={t('common.buy_price')}
            value={buyPrice}
            unit={buyUnit}
            onValueChange={setBuyPrice}
            onUnitChange={setBuyUnit}
          />
          <PriceInput
            title={t('common.current_price')}
            value={currentPrice}
            unit={currentUnit}
            onValueChange={setCurrentPrice}
            onUnitChange={setCurrentUnit}
          />
          <QuantityInput
            title={t('common.quantity')}
            value={quantity}
            unit={quantityUnit}
            onValueChange={setQuantity}
            onUnitChange={setQuantityUnit}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!isInputValid}
            className="w-full rounded-lg bg-amber-600 px-4 py-3 text-base font-semibold text-white shadow transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-300 sm:w-auto"
          >
            {t('common.calculate')}
          </button>
        </div>

        {result ? (
          <ResultCard
            buyXi={result.buyXi}
            currentXi={result.currentXi}
            profitPerXi={result.profitPerXi}
            roiPercentage={result.roiPercentage}
            quantityXi={result.quantityXi}
            totalBuyValue={result.totalBuyValue}
            totalCurrentValue={result.totalCurrentValue}
            totalProfit={result.totalProfit}
          />
        ) : (
          <div className="w-full rounded-xl border border-dashed border-amber-200 bg-white/60 p-5 text-center text-sm text-gray-600">
            {t('common.empty_state')}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
