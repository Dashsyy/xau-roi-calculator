import { describe, it, expect } from 'vitest';
import {
  normalizeToXi,
  normalizeQuantityToXi,
  calculateProfitAndRoi,
} from './goldConversion';

describe('goldConversion', () => {
  describe('normalizeToXi', () => {
    it('should return the same price for xi', () => {
      expect(normalizeToXi(100, 'xi')).toBe(100);
    });

    it('should convert domlang price to xi price (1 Domlang = 10 Xi)', () => {
      // If 1 domlang costs 2000, then 1 xi should cost 200.
      expect(normalizeToXi(2000, 'domlang')).toBe(200);
    });

    it('should convert ounce price to xi price (1 Ounce = 8.23 Xi)', () => {
      // If 1 ounce costs 1646, then 1 xi should cost 200.
      expect(normalizeToXi(1646, 'ounce')).toBeCloseTo(200);
    });
  });

  describe('normalizeQuantityToXi', () => {
    it('should return the same quantity for xi', () => {
      expect(normalizeQuantityToXi(5, 'xi')).toBe(5);
    });

    it('should convert domlang quantity to xi quantity (1 Domlang = 10 Xi)', () => {
      expect(normalizeQuantityToXi(2, 'domlang')).toBe(20);
    });
  });

  describe('calculateProfitAndRoi', () => {
    it('should correctly calculate profit and ROI with same units', () => {
      const result = calculateProfitAndRoi(
        100, 'xi',
        110, 'xi',
        5, 'xi'
      );

      expect(result.buyXi).toBe(100);
      expect(result.currentXi).toBe(110);
      expect(result.quantityXi).toBe(5);
      expect(result.profitPerXi).toBe(10);
      expect(result.roiPercentage).toBe(10); // 10%
      expect(result.totalBuyValue).toBe(500);
      expect(result.totalCurrentValue).toBe(550);
      expect(result.totalProfit).toBe(50);
    });

    it('should correctly calculate profit and ROI across different units', () => {
      // Buy 1 domlang at 2000 (200/xi)
      // Current price is 2200 per domlang (220/xi)
      // Quantity is 2 domlang (20 xi)
      const result = calculateProfitAndRoi(
        2000, 'domlang',
        2200, 'domlang',
        2, 'domlang'
      );

      expect(result.buyXi).toBe(200);
      expect(result.currentXi).toBe(220);
      expect(result.quantityXi).toBe(20);
      expect(result.profitPerXi).toBe(20);
      expect(result.roiPercentage).toBe(10); // 10%
      expect(result.totalBuyValue).toBe(4000); // 200 * 20
      expect(result.totalCurrentValue).toBe(4400); // 220 * 20
      expect(result.totalProfit).toBe(400);
    });

    it('should handle zero buy price gracefully', () => {
      const result = calculateProfitAndRoi(
        0, 'xi',
        100, 'xi',
        5, 'xi'
      );

      expect(result.roiPercentage).toBe(0);
    });
  });
});
