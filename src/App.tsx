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
import { fetchLatestGoldPrice } from './services/goldPriceService';

const App = () => {
  const { t } = useLanguage();
  
  const [buyPrice, setBuyPrice] = useState(() => localStorage.getItem('gold_buyPrice') || '');
  const [buyUnit, setBuyUnit] = useState<GoldUnit>(() => (localStorage.getItem('gold_buyUnit') as GoldUnit) || 'xi');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentUnit, setCurrentUnit] = useState<GoldUnit>('xi');
  const [quantity, setQuantity] = useState(() => localStorage.getItem('gold_quantity') || '');
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnit>(() => (localStorage.getItem('gold_quantityUnit') as QuantityUnit) || 'xi');
  const [result, setResult] = useState<ReturnType<typeof calculateProfitAndRoi> | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<Step>(Step.BuyPrice);

  useEffect(() => {
    localStorage.setItem('gold_buyPrice', buyPrice);
    localStorage.setItem('gold_buyUnit', buyUnit);
    localStorage.setItem('gold_quantity', quantity);
    localStorage.setItem('gold_quantityUnit', quantityUnit);
  }, [buyPrice, buyUnit, quantity, quantityUnit]);

  const resultRef = useRef<HTMLDivElement | null>(null);
  const buyPriceRef = useRef<HTMLDivElement | null>(null);
  const currentPriceRef = useRef<HTMLDivElement | null>(null);
  const quantityRef = useRef<HTMLDivElement | null>(null);

  const parsedBuyPrice = Number.parseFloat(buyPrice);
  const parsedCurrentPrice = Number.parseFloat(currentPrice);
  const parsedQuantity = Number.parseFloat(quantity);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStep]);

  const handleUseMarketPrice = async () => {
    setIsPriceLoading(true);
    try {
      const data = await fetchLatestGoldPrice();
      setCurrentPrice(data.price.toString());
      setCurrentUnit(data.unit);
      
      if (parsedBuyPrice > 0 && parsedQuantity > 0) {
        setActiveStep(Step.Result);
      }
    } catch (error) {
      console.error('Failed to fetch price:', error);
      alert('Failed to get market price. Please try again.');
    } finally {
      setIsPriceLoading(false);
    }
  };

  const isInputValid = useMemo(() => {
    const hasValidBuy = Number.isFinite(parsedBuyPrice) && parsedBuyPrice > 0;
    const hasValidCurrent = Number.isFinite(parsedCurrentPrice) && parsedCurrentPrice > 0;
    const hasValidQuantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0;
    return hasValidBuy && hasValidCurrent && hasValidQuantity;
  }, [parsedBuyPrice, parsedCurrentPrice, parsedQuantity]);

  const steps = [Step.BuyPrice, Step.Quantity, Step.CurrentPrice, Step.Result];

  const handleStepClick = (step: Step) => {
    // Only allow clicking steps if current data is valid or moving backwards
    const targetIdx = steps.indexOf(step);
    const currentIdx = steps.indexOf(activeStep);
    
    if (targetIdx < currentIdx) {
      setActiveStep(step);
    } else {
      if (activeStep === Step.BuyPrice && parsedBuyPrice > 0) setActiveStep(Step.Quantity);
      else if (activeStep === Step.Quantity && parsedQuantity > 0) setActiveStep(Step.CurrentPrice);
      else if (activeStep === Step.CurrentPrice && parsedCurrentPrice > 0) setActiveStep(Step.Result);
    }
  };

  const handleNext = () => {
    if (activeStep === Step.BuyPrice && parsedBuyPrice > 0) setActiveStep(Step.Quantity);
    else if (activeStep === Step.Quantity && parsedQuantity > 0) setActiveStep(Step.CurrentPrice);
    else if (activeStep === Step.CurrentPrice && parsedCurrentPrice > 0) setActiveStep(Step.Result);
  };

  const handleBack = () => {
    if (activeStep === Step.Quantity) setActiveStep(Step.BuyPrice);
    else if (activeStep === Step.CurrentPrice) setActiveStep(Step.Quantity);
    else if (activeStep === Step.Result) setActiveStep(Step.CurrentPrice);
  };

  const isNextDisabled = useMemo(() => {
    if (activeStep === Step.BuyPrice) return !parsedBuyPrice || parsedBuyPrice <= 0;
    if (activeStep === Step.Quantity) return !parsedQuantity || parsedQuantity <= 0;
    if (activeStep === Step.CurrentPrice) return !parsedCurrentPrice || parsedCurrentPrice <= 0;
    return false;
  }, [activeStep, parsedBuyPrice, parsedCurrentPrice, parsedQuantity]);

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

      const stepMap: Record<Step, { key: TranslationKey; ref: RefObject<HTMLDivElement> } | null> = {
        [Step.BuyPrice]: { key: 'common.tip_buy_price', ref: buyPriceRef },
        [Step.Quantity]: { key: 'common.tip_quantity', ref: quantityRef },
        [Step.CurrentPrice]: { key: 'common.tip_current_price', ref: currentPriceRef },
        [Step.Result]: null,
      };

      const config = stepMap[step];
      if (!config) return null;
      return { message: t(config.key), targetRef: config.ref };
    },
    [t],
  );

  const nextStepHelper = useMemo(
    () => getNextStep(parsedBuyPrice, parsedCurrentPrice, parsedQuantity),
    [parsedBuyPrice, parsedCurrentPrice, parsedQuantity],
  );

  const stepConfig = useMemo(() => resolveStep(nextStepHelper), [nextStepHelper, resolveStep]);

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

  const pnlBgClass = useMemo(() => {
    const map: Record<PnlState, string> = {
      gain: 'bg-green-600',
      loss: 'bg-red-600',
      neutral: 'bg-gray-100',
    };
    return map[pnlState];
  }, [pnlState]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-yellow-300">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col pt-safe">
        
        {/* Simple Tabs Navigation */}
        <nav className="flex border-b-4 border-black bg-white sticky top-0 z-40">
          {steps.map((step, i) => {
            const isActive = activeStep === step;
            const labels: Record<Step, string> = {
              [Step.BuyPrice]: t('common.buy_price_label'),
              [Step.Quantity]: t('common.quantity_label'),
              [Step.CurrentPrice]: t('common.price_label'),
              [Step.Result]: t('common.result'),
            };
            return (
              <button
                key={step}
                onClick={() => handleStepClick(step)}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-tighter border-r-2 border-black last:border-r-0 transition-colors
                  ${isActive ? 'bg-yellow-400 text-black' : 'bg-white text-gray-400'}
                `}
              >
                <span className="block text-[10px] mb-0.5 opacity-60">0{i+1}</span>
                {labels[step]}
              </button>
            );
          })}
        </nav>

        <main className="flex-1 flex flex-col px-4 py-8">
          
          {/* Welcome Back Notification */}
          {activeStep === Step.BuyPrice && buyPrice && quantity && !currentPrice && (
            <div className="mb-8 border-4 border-black bg-yellow-50 p-6">
              <p className="text-lg font-bold text-black mb-4 leading-tight">{t('common.welcome_back')}</p>
              <button
                onClick={handleUseMarketPrice}
                disabled={isPriceLoading}
                className="w-full bg-black text-white px-4 py-5 text-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:bg-gray-400"
              >
                {isPriceLoading ? t('common.loading') : t('common.use_latest_market')}
              </button>
            </div>
          )}

          <div className="w-full">
            {activeStep === Step.BuyPrice && (
              <div ref={buyPriceRef}>
                <PriceInput
                  title={t('common.buy_price_label')}
                  value={buyPrice}
                  unit={buyUnit}
                  onValueChange={setBuyPrice}
                  onUnitChange={setBuyUnit}
                />
              </div>
            )}
            
            {activeStep === Step.Quantity && (
              <div ref={quantityRef}>
                <QuantityInput
                  title={t('common.quantity_label')}
                  value={quantity}
                  unit={quantityUnit}
                  onValueChange={setQuantity}
                  onUnitChange={setQuantityUnit}
                />
              </div>
            )}

            {activeStep === Step.CurrentPrice && (
              <div ref={currentPriceRef} className="space-y-6">
                <button
                  onClick={handleUseMarketPrice}
                  disabled={isPriceLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border-4 border-black px-5 py-4 text-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
                >
                  <span className="text-2xl">⚡</span>
                  {isPriceLoading ? t('common.loading') : t('common.use_market_price')}
                </button>
                <PriceInput
                  title={t('common.current_price_label')}
                  value={currentPrice}
                  unit={currentUnit}
                  onValueChange={setCurrentPrice}
                  onUnitChange={setCurrentUnit}
                />
                <p className="px-2 text-sm font-bold uppercase text-gray-500 text-center leading-tight">{t('common.comparison_note')}</p>
              </div>
            )}

            {activeStep === Step.Result && (
              <div ref={resultRef}>
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
              </div>
            )}
          </div>
        </main>

        {/* Big Navigation Bottom */}
        <footer className="sticky bottom-0 bg-white border-t-4 border-black p-4 flex gap-3">
          {activeStep !== Step.BuyPrice && (
            <button
              onClick={handleBack}
              className="flex-1 bg-white border-4 border-black px-4 py-5 text-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              {t('common.back')}
            </button>
          )}
          
          {activeStep !== Step.Result ? (
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="flex-[2] bg-black text-white px-4 py-5 text-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
            >
              {activeStep === Step.CurrentPrice ? t('common.finish') : t('common.next')}
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentPrice('');
                setActiveStep(Step.CurrentPrice);
              }}
              className="flex-[2] bg-yellow-400 border-4 border-black px-4 py-5 text-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              ↺ {t('common.new_calculation')}
            </button>
          )}
        </footer>

        <div className="pb-8 pt-4 flex justify-center">
          <LanguageToggle />
        </div>

        <FloatingStepTip message={stepConfig?.message ?? null} onPress={handleTipPress} />
      </div>
    </div>
  );
};

export default App;
