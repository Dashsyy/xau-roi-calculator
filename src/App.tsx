import { useCallback, useEffect, useMemo, useState } from 'react';
import PriceInput from './components/PriceInput';
import QuantityInput from './components/QuantityInput';
import ResultCard from './components/ResultCard';
import { useLanguage } from './i18n/LanguageContext';
import { GoldUnit, QuantityUnit, calculateProfitAndRoi } from './utils/goldConversion';

const App = () => {
  const { t } = useLanguage();
  const [buyPrice, setBuyPrice] = useState('');
  const [buyUnit, setBuyUnit] = useState<GoldUnit>('xi');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentUnit, setCurrentUnit] = useState<GoldUnit>('xi');
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnit>('xi');
  const [result, setResult] = useState<ReturnType<typeof calculateProfitAndRoi> | null>(null);

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
    <div className="min-h-screen bg-[#f0f1f3] text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-6">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">{t('common.currency_converter')}</p>

          <header className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-gray-200">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800"
              aria-label="Back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{t('common.app_label')}</p>
              <h1 className="text-lg font-bold text-gray-900">{t('common.app_title')}</h1>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800"
              aria-label="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <circle cx="12" cy="12" r="3" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009.4 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                />
              </svg>
            </button>
          </header>

          <ResultCard
            buyXi={result?.buyXi ?? 0}
            currentXi={result?.currentXi ?? 0}
            profitPerXi={result?.profitPerXi ?? 0}
            roiPercentage={result?.roiPercentage ?? 0}
            quantityXi={result?.quantityXi ?? 0}
            totalBuyValue={result?.totalBuyValue ?? 0}
            totalCurrentValue={result?.totalCurrentValue ?? 0}
            totalProfit={result?.totalProfit ?? 0}
          />

          <p className="text-sm font-medium text-gray-600">{t('common.short_description')}</p>
        </div>

        <main className="mt-6 flex flex-1 flex-col gap-4 pb-6">
          <PriceInput
            title={t('common.buy_price_label')}
            value={buyPrice}
            unit={buyUnit}
            onValueChange={setBuyPrice}
            onUnitChange={setBuyUnit}
          />
          <div className="space-y-2">
            <PriceInput
              title={t('common.current_price_label')}
              value={currentPrice}
              unit={currentUnit}
              onValueChange={setCurrentPrice}
              onUnitChange={setCurrentUnit}
            />
            <p className="flex items-center gap-2 px-1 text-sm text-gray-500">
              <span className="h-2 w-2 rounded-full bg-gray-400" aria-hidden />
              {t('common.comparison_note')}
            </p>
          </div>
          <QuantityInput
            title={t('common.quantity_label')}
            value={quantity}
            unit={quantityUnit}
            onValueChange={setQuantity}
            onUnitChange={setQuantityUnit}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
