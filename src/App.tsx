import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PriceInput from './components/PriceInput';
import QuantityInput from './components/QuantityInput';
import ResultCard from './components/ResultCard';
import { useLanguage } from './i18n/LanguageContext';
import { GoldUnit, QuantityUnit, calculateProfitAndRoi } from './utils/goldConversion';
import LanguageToggle from './components/LanguageToggle';
import FloatingStepTip from './components/FloatingStepTip';
import { Step, getNextStep } from './utils/steps';
import { TranslationKey } from './i18n/translations';

const App = () => {
  const { t } = useLanguage();
  const [buyPrice, setBuyPrice] = useState('');
  const [buyUnit, setBuyUnit] = useState<GoldUnit>('xi');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentUnit, setCurrentUnit] = useState<GoldUnit>('xi');
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnit>('xi');
  const [result, setResult] = useState<ReturnType<typeof calculateProfitAndRoi> | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);
  const buyPriceRef = useRef<HTMLDivElement | null>(null);
  const currentPriceRef = useRef<HTMLDivElement | null>(null);
  const quantityRef = useRef<HTMLDivElement | null>(null);

  const parsedBuyPrice = Number.parseFloat(buyPrice);
  const parsedCurrentPrice = Number.parseFloat(currentPrice);
  const parsedQuantity = Number.parseFloat(quantity);

  const nextStep = useMemo(
    () => getNextStep(parsedBuyPrice, parsedCurrentPrice, parsedQuantity),
    [parsedBuyPrice, parsedCurrentPrice, parsedQuantity],
  );

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

  type StepResolution = {
    message: string;
    targetRef: RefObject<HTMLDivElement>;
  };

  const resolveStep = useCallback(
    (step: Step | null): StepResolution | null => {
      if (!step) return null;

      const stepMap: Record<Step, { key: TranslationKey; ref: RefObject<HTMLDivElement> }> = {
        [Step.BuyPrice]: { key: 'common.tip_buy_price', ref: buyPriceRef },
        [Step.CurrentPrice]: { key: 'common.tip_current_price', ref: currentPriceRef },
        [Step.Quantity]: { key: 'common.tip_quantity', ref: quantityRef },
        [Step.Result]: { key: 'common.tip_result', ref: resultRef },
      };

      const config = stepMap[step];
      return { message: t(config.key), targetRef: config.ref };
    },
    [t],
  );

  const stepConfig = useMemo(() => resolveStep(nextStep), [nextStep, resolveStep]);

  const handleTipPress = useCallback(() => {
    if (!stepConfig) return;
    stepConfig.targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [stepConfig]);

  type PnlState = 'gain' | 'loss' | 'neutral';

  const pnlState = useMemo<PnlState>(() => {
    if (!result) return 'neutral';
    if (result.totalProfit > 0) return 'gain';
    if (result.totalProfit < 0) return 'loss';
    return 'neutral';
  }, [result]);

  const pnlTintClass = useMemo(() => {
    const map: Record<PnlState, string> = {
      gain: 'bg-emerald-50',
      loss: 'bg-red-50',
      neutral: 'bg-gray-50',
    };
    return map[pnlState];
  }, [pnlState]);

  useEffect(() => {
    const colorMap: Record<PnlState, string> = {
      gain: '#ecfdf3',
      loss: '#fef2f2',
      neutral: '#f9fafb',
    };
    const color = colorMap[pnlState];
    const existingMeta = document.querySelector("meta[name='theme-color']");

    if (existingMeta) {
      existingMeta.setAttribute('content', color);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  }, [pnlState]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f4ef] via-[#f2f1ec] to-[#ecebe6] text-gray-900">
      <div className={`safe-area-tint ${pnlTintClass}`} aria-hidden />
      <div className="mx-auto flex min-h-screen w-full max-w-lg items-start justify-center px-3 py-5 pt-safe sm:px-6 sm:py-8">
        <div className="flex w-full flex-col gap-6 border border-gray-200 bg-white p-5 sm:p-7">
          <header className="flex items-center justify-between" ref={resultRef}>
            <div></div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">{t('common.app_label')}</p>
              <h1 className="font-display text-xl font-semibold tracking-[-0.01em] text-gray-900 sm:text-2xl">
                {t('common.app_title')}
              </h1>
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
            <div ref={buyPriceRef}>
              <PriceInput
                title={t('common.buy_price_label')}
                value={buyPrice}
                unit={buyUnit}
                onValueChange={setBuyPrice}
                onUnitChange={setBuyUnit}
              />
            </div>
            <div className="space-y-2" ref={currentPriceRef}>
              <PriceInput
                title={t('common.current_price_label')}
                value={currentPrice}
                unit={currentUnit}
                onValueChange={setCurrentPrice}
                onUnitChange={setCurrentUnit}
              />
              <p className="px-1 text-sm text-gray-500">{t('common.comparison_note')}</p>
            </div>
            <div ref={quantityRef}>
              <QuantityInput
                title={t('common.quantity_label')}
                value={quantity}
                unit={quantityUnit}
                onValueChange={setQuantity}
                onUnitChange={setQuantityUnit}
              />
            </div>
          </main>
          <div className="flex justify-center">
            <LanguageToggle />
          </div>
        </div>
        <FloatingStepTip message={stepConfig?.message ?? null} onPress={handleTipPress} />
      </div>
    </div>
  );
};

export default App;
