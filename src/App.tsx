import { useEffect, useMemo, useState } from 'react';
import PriceInput from './components/PriceInput';
import ResultCard from './components/ResultCard';
import { GoldUnit, calculateProfitAndRoi } from './utils/goldConversion';

type CalculationResult = ReturnType<typeof calculateProfitAndRoi>;

const App = () => {
  const [buyPrice, setBuyPrice] = useState('');
  const [buyUnit, setBuyUnit] = useState<GoldUnit>('xi');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentUnit, setCurrentUnit] = useState<GoldUnit>('xi');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const parsedBuyPrice = Number.parseFloat(buyPrice);
  const parsedCurrentPrice = Number.parseFloat(currentPrice);

  const isInputValid = useMemo(() => {
    const hasValidBuy = Number.isFinite(parsedBuyPrice) && parsedBuyPrice > 0;
    const hasValidCurrent = Number.isFinite(parsedCurrentPrice) && parsedCurrentPrice > 0;
    return hasValidBuy && hasValidCurrent;
  }, [parsedBuyPrice, parsedCurrentPrice]);

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

    const calculation = calculateProfitAndRoi(parsedBuyPrice, buyUnit, parsedCurrentPrice, currentUnit);
    setResult(calculation);
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Cambodia</p>
          <h1 className="text-3xl font-bold text-gray-900">Gold ROI Calculator</h1>
          <p className="mt-2 text-base text-gray-600">
            Compare your gold buy price with the current market price across xi, domlang, and ounce units.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          <PriceInput
            title="Buy Price"
            value={buyPrice}
            unit={buyUnit}
            onValueChange={setBuyPrice}
            onUnitChange={setBuyUnit}
          />
          <PriceInput
            title="Current Price"
            value={currentPrice}
            unit={currentUnit}
            onValueChange={setCurrentPrice}
            onUnitChange={setCurrentUnit}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!isInputValid}
            className="w-full rounded-lg bg-amber-600 px-4 py-3 text-base font-semibold text-white shadow transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-300 sm:w-auto"
          >
            Calculate
          </button>
        </div>

        {result ? (
          <ResultCard
            buyXi={result.buyXi}
            currentXi={result.currentXi}
            profitPerXi={result.profitPerXi}
            roiPercentage={result.roiPercentage}
          />
        ) : (
          <div className="w-full rounded-xl border border-dashed border-amber-200 bg-white/60 p-5 text-center text-sm text-gray-600">
            Enter both prices to see your profit and ROI.
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
