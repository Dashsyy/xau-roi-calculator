export type GoldUnit = 'xi' | 'domlang' | 'ounce';
export type QuantityUnit = 'xi' | 'domlang';

const OUNCE_TO_XI = 8.23;
const DOMLANG_TO_XI = 4;

export const normalizeToXi = (price: number, unit: GoldUnit): number => {
  if (unit === 'xi') return price;
  if (unit === 'domlang') return price / DOMLANG_TO_XI;
  return price / OUNCE_TO_XI;
};

export const normalizeQuantityToXi = (quantity: number, unit: QuantityUnit): number => {
  if (unit === 'xi') return quantity;
  return quantity * DOMLANG_TO_XI;
};

export const formatNumber = (value: number): string => value.toFixed(2);

export const calculateProfitAndRoi = (
  buyPrice: number,
  buyUnit: GoldUnit,
  currentPrice: number,
  currentUnit: GoldUnit,
  quantity: number,
  quantityUnit: QuantityUnit,
): {
  buyXi: number;
  currentXi: number;
  profitPerXi: number;
  roiPercentage: number;
  quantityXi: number;
  totalBuyValue: number;
  totalCurrentValue: number;
  totalProfit: number;
} => {
  const buyXi = normalizeToXi(buyPrice, buyUnit);
  const currentXi = normalizeToXi(currentPrice, currentUnit);
  const quantityXi = normalizeQuantityToXi(quantity, quantityUnit);
  const profitPerXi = currentXi - buyXi;
  const roiPercentage = buyXi === 0 ? 0 : (profitPerXi / buyXi) * 100;
  const totalBuyValue = buyXi * quantityXi;
  const totalCurrentValue = currentXi * quantityXi;
  const totalProfit = totalCurrentValue - totalBuyValue;

  return {
    buyXi,
    currentXi,
    profitPerXi,
    roiPercentage,
    quantityXi,
    totalBuyValue,
    totalCurrentValue,
    totalProfit,
  };
};
