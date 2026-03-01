import { GoldUnit } from '../utils/goldConversion';

type GoldPriceResponse = {
  price: number;
  unit: GoldUnit;
  updatedAt: string;
};

const CACHE_KEY = 'gold_price_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const fetchLatestGoldPrice = async (forceRefresh = false): Promise<GoldPriceResponse> => {
  if (!forceRefresh) {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  const response = await fetch('https://api.gold-api.com/price/XAU');
  if (!response.ok) {
    throw new Error('Failed to fetch gold price');
  }
  const data = await response.json();
  
  const result: GoldPriceResponse = {
    price: data.price,
    unit: 'ounce',
    updatedAt: data.updatedAt,
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: result,
    timestamp: Date.now(),
  }));

  return result;
};
