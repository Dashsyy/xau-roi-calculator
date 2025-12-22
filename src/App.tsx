import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const runCalculation = useCallback(() => {
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
  }, [
    buyUnit,
    currentUnit,
    isInputValid,
    parsedBuyPrice,
    parsedCurrentPrice,
    parsedQuantity,
    quantityUnit,
  ]);

  useEffect(() => {
    runCalculation();
  }, [runCalculation]);

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-6">
      <div className="mx-auto flex max-w-md flex-col space-y-5">
        <header className="space-y-3 text-center">
          <h1 className="text-3xl font-black text-gray-900">{t('common.app_title')}</h1>
          <p className="text-sm text-gray-700">{t('common.tagline')}</p>
          <div className="flex justify-center gap-2 text-sm font-semibold text-gray-800">
            {[
              { code: 'en' as const, label: 'EN' },
              { code: 'km' as const, label: 'KM' },
              { code: 'zh' as const, label: '中文' },
            ].map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => setLanguage(option.code)}
                className={`min-h-[44px] rounded-full px-4 py-2 transition ${
                  language === option.code
                    ? 'bg-amber-600 text-white'
                    : 'border border-amber-200 bg-white text-gray-800 hover:border-amber-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-3">
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

        <div className="rounded-2xl border border-amber-100 bg-white p-4 text-sm text-gray-700">
          <div className="flex items-center justify-between font-semibold">
            <span>{t('common.calculate')}</span>
            <span className={isInputValid ? 'text-green-700' : 'text-gray-400'}>
              {isInputValid ? t('common.auto_update') : t('common.fill_all')}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-600">{t('common.ready_hint')}</p>
          <button
            type="button"
            disabled={!isInputValid}
            className="mt-3 w-full rounded-xl bg-amber-700 px-4 py-3 text-base font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-amber-300"
            onClick={runCalculation}
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
          <div className="w-full rounded-2xl border border-dashed border-amber-200 bg-white p-5 text-center text-sm text-gray-700">
            {t('common.empty_state')}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
