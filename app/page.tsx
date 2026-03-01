'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PriceInput from '@/components/PriceInput';
import QuantityInput from '@/components/QuantityInput';
import ResultCard from '@/components/ResultCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { GoldUnit, QuantityUnit, calculateProfitAndRoi } from '@/utils/goldConversion';
import LanguageToggle from '@/components/LanguageToggle';
import { fetchLatestGoldPrice, isMarketOpen } from '@/services/goldPriceService';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Step } from '@/types/steps';

const CalculatorApp = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  const [buyPrice, setBuyPrice] = useState('');
  const [buyUnit, setBuyUnit] = useState<GoldUnit>('xi');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentUnit, setCurrentUnit] = useState<GoldUnit>('xi');
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnit>('xi');
  const [lastUpdated, setLastUpdated] = useState('');
  const [previousPrice, setPreviousPrice] = useState('');
  
  const [result, setResult] = useState<ReturnType<typeof calculateProfitAndRoi> | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [activeStep, setActiveStep] = useState<Step>(Step.BuyPrice);

  // Initialize from localStorage after mount
  useEffect(() => {
    setBuyPrice(localStorage.getItem('gold_buyPrice') || '');
    setBuyUnit((localStorage.getItem('gold_buyUnit') as GoldUnit) || 'xi');
    setCurrentPrice(localStorage.getItem('gold_currentPrice') || '');
    setCurrentUnit((localStorage.getItem('gold_currentUnit') as GoldUnit) || 'xi');
    setQuantity(localStorage.getItem('gold_quantity') || '');
    setQuantityUnit((localStorage.getItem('gold_quantityUnit') as QuantityUnit) || 'xi');
    setLastUpdated(localStorage.getItem('gold_lastUpdated') || '');
    setPreviousPrice(localStorage.getItem('gold_previousPrice') || '');
    
    const savedBuyPrice = localStorage.getItem('gold_buyPrice');
    const savedQuantity = localStorage.getItem('gold_quantity');
    setIsOnboarding(!savedBuyPrice || !savedQuantity);
    
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('gold_buyPrice', buyPrice);
    localStorage.setItem('gold_buyUnit', buyUnit);
    localStorage.setItem('gold_currentPrice', currentPrice);
    localStorage.setItem('gold_currentUnit', currentUnit);
    localStorage.setItem('gold_quantity', quantity);
    localStorage.setItem('gold_quantityUnit', quantityUnit);
    localStorage.setItem('gold_lastUpdated', lastUpdated);
    localStorage.setItem('gold_previousPrice', previousPrice);
  }, [buyPrice, buyUnit, currentPrice, currentUnit, quantity, quantityUnit, lastUpdated, previousPrice, mounted]);

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

  const handleRefreshPrice = async () => {
    if (!isMarketOpen()) return;
    setIsPriceLoading(true);
    try {
      const data = await fetchLatestGoldPrice(true);
      if (currentPrice && currentPrice !== data.price.toString()) {
        setPreviousPrice(currentPrice);
      }
      setCurrentPrice(data.price.toString());
      setCurrentUnit(data.unit);
      setLastUpdated(new Date().toISOString());
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Failed to fetch price:', error);
    } finally {
      setIsPriceLoading(false);
    }
  };

  const handleUseMarketPrice = async () => {
    if (!isMarketOpen()) return;
    setIsPriceLoading(true);
    try {
      const data = await fetchLatestGoldPrice();
      setCurrentPrice(data.price.toString());
      setCurrentUnit(data.unit);
      setLastUpdated(new Date().toISOString());
      
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

  type PnlState = 'gain' | 'loss' | 'neutral';

  const pnlState = useMemo<PnlState>(() => {
    if (!result) return 'neutral';
    if (result.totalProfit > 0) return 'gain';
    if (result.totalProfit < 0) return 'loss';
    return 'neutral';
  }, [result]);

  const trend = useMemo(() => {
    if (!previousPrice || !currentPrice) return null;
    const prev = Number.parseFloat(previousPrice);
    const curr = Number.parseFloat(currentPrice);
    if (curr > prev) return 'up';
    if (curr < prev) return 'down';
    return null;
  }, [previousPrice, currentPrice]);

  const marketOpen = useMemo(() => isMarketOpen(), [lastUpdated, isPriceLoading]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!isOnboarding) {
    return (
      <div className="min-h-screen bg-white text-black font-sans selection:bg-yellow-300">
        <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col pt-safe">
          {/* Notification Toast */}
          {showNotification && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 font-bold rounded-none border-4 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {t('common.price_updated')}
            </div>
          )}

          <header className="p-4 border-b-4 border-black bg-white sticky top-0 z-40">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-black uppercase tracking-tighter">{t('common.dashboard_title')}</h1>
              <LanguageToggle />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-gray-500 uppercase">
                {t('common.last_updated')}: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '---'}
              </p>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${marketOpen ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-[10px] font-black uppercase text-gray-400">
                  {marketOpen ? t('common.market_open') : t('common.market_closed')}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 space-y-6">
            {/* Price Status Card */}
            <div className="border-4 border-black p-6 bg-yellow-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-black uppercase text-gray-500 mb-1">{t('common.current_price')}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">${Number(currentPrice).toLocaleString()}</span>
                    <span className="text-sm font-bold uppercase text-gray-500">{currentUnit}</span>
                  </div>
                </div>
                                <button
                                  onClick={handleRefreshPrice}
                                  disabled={isPriceLoading || !marketOpen}
                                  className="bg-black text-white p-3 border-2 border-black active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  {isPriceLoading ? '...' : '↺'}
                                </button>
                              </div>
                              
                              {previousPrice && (                <div className="flex items-center gap-3 pt-4 border-t-2 border-black/10">
                  <span className="text-xs font-bold uppercase text-gray-400">{t('common.previous_price')}: ${Number(previousPrice).toLocaleString()}</span>
                  {trend === 'up' && <span className="text-xs font-black text-green-600 uppercase">↑ {t('common.price_trend_up')}</span>}
                  {trend === 'down' && <span className="text-xs font-black text-red-600 uppercase">↓ {t('common.price_trend_down')}</span>}
                </div>
              )}
            </div>

            {!marketOpen && (
              <div className="border-4 border-dashed border-gray-300 p-4 bg-gray-50">
                <p className="text-xs font-bold text-gray-500 leading-relaxed italic">
                  ℹ️ {t('common.market_closed_prediction')}
                </p>
              </div>
            )}

            {/* Price Editor on Dashboard */}
            <div className="border-4 border-black p-4 bg-white">
              <PriceInput
                title={t('common.current_price_label')}
                value={currentPrice}
                unit={currentUnit}
                onValueChange={setCurrentPrice}
                onUnitChange={setCurrentUnit}
              />
            </div>
            {/* Editable Holdings on Dashboard */}
            <div className="grid grid-cols-1 gap-6">
              <div className="border-4 border-black p-4 bg-white">
                <PriceInput
                  title={t('common.buy_price_label')}
                  value={buyPrice}
                  unit={buyUnit}
                  onValueChange={setBuyPrice}
                  onUnitChange={setBuyUnit}
                />
              </div>
              <div className="border-4 border-black p-4 bg-white">
                <QuantityInput
                  title={t('common.quantity_label')}
                  value={quantity}
                  unit={quantityUnit}
                  onValueChange={setQuantity}
                  onUnitChange={setQuantityUnit}
                />
              </div>
            </div>

            {/* Result View */}
            <div className="pt-2">
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
          </main>

          <footer className="p-4 border-t-4 border-black bg-white">
            <button
              onClick={() => {
                setBuyPrice('');
                setQuantity('');
                setActiveStep(Step.BuyPrice);
                setIsOnboarding(true);
              }}
              className="w-full bg-white border-4 border-black px-4 py-4 text-lg font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              {t('common.new_calculation')}
            </button>
          </footer>
        </div>
      </div>
    );
  }

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
          
          <div className="mb-6">
            <h2 className="text-3xl font-black uppercase leading-none mb-2">{t('common.onboarding_welcome')}</h2>
            <div className="h-2 w-20 bg-yellow-400"></div>
          </div>

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
                  disabled={isPriceLoading || !marketOpen}
                  className="w-full flex items-center justify-center gap-3 bg-white border-4 border-black px-5 py-4 text-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-30 disabled:cursor-not-allowed"
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
                setIsOnboarding(false);
              }}
              className="flex-[2] bg-yellow-400 border-4 border-black px-4 py-5 text-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              {t('common.finish')}
            </button>
          )}
        </footer>

        <div className="pb-8 pt-4 flex justify-center">
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <LanguageProvider>
      <CalculatorApp />
    </LanguageProvider>
  );
}
