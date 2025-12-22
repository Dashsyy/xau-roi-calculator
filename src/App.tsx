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

  const handleLanguageChange = (next: 'en' | 'km' | 'zh') => setLanguage(next);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfbf8] to-[#f6f4ef] text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 pb-28 pt-8">
        <header className="space-y-5 text-center">
          <div className="flex items-center justify-center gap-2 rounded-full bg-white/80 px-2 py-1 shadow-sm ring-1 ring-gray-100">
            {[{ code: 'en' as const, label: 'EN' }, { code: 'km' as const, label: 'KM' }, { code: 'zh' as const, label: '中文' }].map(
              (option) => {
                const isActive = language === option.code;
                return (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => handleLanguageChange(option.code)}
                    className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 active:scale-[0.99]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              },
            )}
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-700">{t('common.app_label')}</p>
            <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl">{t('common.app_title')}</h1>
            <p className="text-base font-medium text-gray-600">{t('common.short_description')}</p>
          </div>
          <p className="text-sm font-semibold text-gray-700">{t('common.input_helper')}</p>
        </header>

        <main className="mt-8 flex flex-1 flex-col gap-4">
          <section className="space-y-3">
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
          </section>

          <section>
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
              <div className="flex w-full flex-col items-center justify-center rounded-3xl border border-white/70 bg-white/90 px-6 py-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-gray-800">{t('common.total_value_title')}</p>
                <p className="mt-3 text-5xl font-black text-gray-500">$0.00</p>
                <p className="mt-2 text-sm text-gray-600">{t('common.empty_state')}</p>
              </div>
            )}
          </section>
        </main>
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-white/60 px-4 pb-6 pt-3 shadow-[0_-10px_30px_-24px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3 rounded-2xl bg-gray-900 px-4 py-3 text-white shadow-lg">
          <div className="space-y-0.5">
            <p className="text-[11px] uppercase tracking-[0.15em] text-amber-200/80">{t('common.calculate')}</p>
            <p className="text-sm font-semibold text-white/85">{isInputValid ? t('common.auto_update') : t('common.fill_all')}</p>
          </div>
          <button
            type="button"
            onClick={runCalculation}
            disabled={!isInputValid}
            className="min-h-[50px] rounded-xl bg-amber-400 px-5 text-base font-bold text-gray-900 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-amber-200"
          >
            {t('common.primary_cta')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
