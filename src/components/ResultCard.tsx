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
  const profitClass = isGain ? 'text-green-600' : isLoss ? 'text-red-600' : 'text-gray-900';
  const statusLabel = isGain ? t('common.you_gain') : isLoss ? t('common.you_lose') : t('common.break_even');

  return (
    <div className="w-full rounded-3xl border border-amber-100 bg-white p-5">
      <div className="space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-gray-600">{statusLabel}</p>
          <p className={`text-6xl font-black tracking-tight ${profitClass}`}>${formatNumber(totalProfit)}</p>
        </div>

        <div className="space-y-2 rounded-2xl bg-gray-50 p-4 text-center text-gray-900">
          <p className="text-lg font-semibold">{t('common.you_paid')}: ${formatNumber(totalBuyValue)}</p>
          <p className="text-lg font-semibold">{t('common.current_value')}: ${formatNumber(totalCurrentValue)}</p>
        </div>

        <div className="space-y-2 rounded-2xl bg-gray-50 p-4 text-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('common.quantity')}</span>
            <span className="font-semibold text-gray-900">{formatNumber(quantityXi)} xi</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('common.roi')}</span>
            <span className="font-semibold text-gray-900">{formatNumber(roiPercentage)}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('common.price_now')}</span>
            <span className="font-semibold text-gray-900">${formatNumber(currentXi)} / xi</span>
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
