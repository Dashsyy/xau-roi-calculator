import { formatNumber } from '../utils/goldConversion';
import { useLanguage } from '../i18n/LanguageContext';

type ResultCardProps = {
  buyXi: number;
  currentXi: number;
  profitPerXi: number;
  roiPercentage: number;
  quantityXi: number;
  totalBuyValue: number;
  totalCurrentValue: number;
  totalProfit: number;
};

const ResultCard = ({
  buyXi,
  currentXi,
  profitPerXi,
  roiPercentage,
  quantityXi,
  totalBuyValue,
  totalCurrentValue,
  totalProfit,
}: ResultCardProps) => {
  const { t } = useLanguage();
  const isGain = totalProfit > 0;
  const isLoss = totalProfit < 0;
  const profitClass = isGain ? 'text-emerald-600' : isLoss ? 'text-red-600' : 'text-gray-900';
  const statusLabel = isGain ? t('common.you_gain') : isLoss ? t('common.you_lose') : t('common.break_even');

  return (
    <div className="w-full rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="space-y-5">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600">{statusLabel}</p>
          <p className={`mt-1 text-6xl font-black tracking-tight ${profitClass}`}>${formatNumber(totalProfit)}</p>
        </div>

        <div className="space-y-2 rounded-2xl bg-gray-50 p-4 text-gray-900 shadow-inner">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">{t('common.total_value_title')}</p>
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>{t('common.you_paid')}</span>
            <span>${formatNumber(totalBuyValue)}</span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>{t('common.current_value')}</span>
            <span>${formatNumber(totalCurrentValue)}</span>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl bg-white p-4 shadow-inner ring-1 ring-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-semibold text-gray-700">{t('common.roi')}</span>
            <span className="text-base font-bold text-gray-900">{formatNumber(roiPercentage)}%</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-semibold text-gray-700">{t('common.price_now')}</span>
            <span className="text-base font-bold text-gray-900">${formatNumber(currentXi)} / xi</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-semibold text-gray-700">{t('common.quantity')}</span>
            <span className="text-base font-bold text-gray-900">{formatNumber(quantityXi)} xi</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{t('common.profit_per_xi')}</span>
            <span className="font-semibold text-gray-800">${formatNumber(profitPerXi)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
