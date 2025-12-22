import { GoldUnit } from '../utils/goldConversion';

type GoldPriceResponse = {
  price: number;
  unit: GoldUnit;
  updatedAt: string;
};

export const fetchLatestGoldPrice = async (): Promise<GoldPriceResponse> => {
  // TODO: Replace mock with real GET /api/gold/price request when backend is ready.
  // Future improvement: add hourly polling with an interval-based caller that reuses this function.
  return Promise.resolve({
    price: 4400,
    unit: 'ounce',
    updatedAt: '2025-01-01T10:00:00Z',
  });
};
