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
    <div className="w-full rounded-2xl bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-gray-600">{statusLabel}</p>
          <p className={`text-5xl font-bold ${profitClass}`}>${formatNumber(totalProfit)}</p>
        </div>

        <div className="space-y-1 rounded-xl bg-gray-50 p-4 text-center text-gray-800">
          <p className="text-base font-semibold">
            {t('common.you_paid')}: ${formatNumber(totalBuyValue)}
          </p>
          <p className="text-base font-semibold">
            {t('common.current_value')}: ${formatNumber(totalCurrentValue)}
          </p>
        </div>

        <div className="space-y-2 rounded-xl bg-gray-50 p-4 text-gray-700">
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
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{t('common.profit_per_xi')}</span>
            <span className="font-semibold text-gray-900">${formatNumber(profitPerXi)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
