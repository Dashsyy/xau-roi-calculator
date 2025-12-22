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
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-md items-start justify-center px-4 py-6">
        <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 ring-1 ring-gray-200">
          <header className="flex items-center justify-between">
            <div></div>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase text-gray-500">{t('common.app_label')}</p>
              <h1 className="text-lg font-bold text-gray-900">{t('common.app_title')}</h1>
            </div>
            <div></div>
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

          <main className="flex flex-1 flex-col gap-4 pb-2">
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
              <p className="px-1 text-sm text-gray-500">{t('common.comparison_note')}</p>
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
    </div>
  );
};

export default App;
