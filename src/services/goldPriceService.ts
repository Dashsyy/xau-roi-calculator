import { GoldUnit } from '../utils/goldConversion';

type GoldPriceResponse = {
  price: number;
  unit: GoldUnit;
  updatedAt: string;
};

const CACHE_KEY = 'gold_price_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const WEEKEND_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const isMarketOpen = (): boolean => {
  const now = new Date();
  const day = now.getUTCDay();
  const hour = now.getUTCHours();

  // Gold market typically closes Friday 21:00 UTC and opens Sunday 22:00 UTC
  if (day === 6) return false; // Saturday
  if (day === 5 && hour >= 21) return false; // Friday late
  if (day === 0 && hour < 22) return false; // Sunday early
  
  return true;
};

export const fetchLatestGoldPrice = async (forceRefresh = false): Promise<GoldPriceResponse> => {
  const marketOpen = isMarketOpen();
  const effectiveCacheDuration = marketOpen ? CACHE_DURATION : WEEKEND_CACHE_DURATION;

  // If market is closed, always try to use cache first even if forceRefresh is true,
  // to prevent unnecessary API calls that return the same value.
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (!marketOpen || (!forceRefresh && Date.now() - timestamp < effectiveCacheDuration)) {
      return data;
    }
  }

  // If market is closed and no cache exists, we still have to fetch once
  // or if market is open and cache is expired/forceRefreshed.
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
