export type GoldUnit = 'xi' | 'domlang' | 'ounce';

const OUNCE_TO_XI = 8.23;
const DOMLANG_TO_XI = 4;

export const normalizeToXi = (price: number, unit: GoldUnit): number => {
  if (unit === 'xi') return price;
  if (unit === 'domlang') return price / DOMLANG_TO_XI;
  return price / OUNCE_TO_XI;
};

export const formatNumber = (value: number): string => value.toFixed(2);

export const calculateProfitAndRoi = (
  buyPrice: number,
  buyUnit: GoldUnit,
  currentPrice: number,
  currentUnit: GoldUnit,
): {
  buyXi: number;
  currentXi: number;
  profitPerXi: number;
  roiPercentage: number;
} => {
  const buyXi = normalizeToXi(buyPrice, buyUnit);
  const currentXi = normalizeToXi(currentPrice, currentUnit);
  const profitPerXi = currentXi - buyXi;
  const roiPercentage = buyXi === 0 ? 0 : (profitPerXi / buyXi) * 100;

  return {
    buyXi,
    currentXi,
    profitPerXi,
    roiPercentage,
  };
};
