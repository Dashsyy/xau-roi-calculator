export enum Step {
  BuyPrice = 'BUY_PRICE',
  CurrentPrice = 'CURRENT_PRICE',
  Quantity = 'QUANTITY',
}

export const getNextStep = (buyPrice: number, currentPrice: number, quantity: number): Step | null => {
  if (!Number.isFinite(buyPrice) || buyPrice <= 0) {
    return Step.BuyPrice;
  }
  if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
    return Step.CurrentPrice;
  }
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return Step.Quantity;
  }
  return null;
};
