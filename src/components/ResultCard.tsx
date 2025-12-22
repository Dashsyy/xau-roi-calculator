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
  const profitClass = totalProfit > 0 ? 'text-green-600' : totalProfit < 0 ? 'text-red-600' : 'text-gray-900';

  return (
    <div className="w-full rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">{t('common.result')}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">{t('common.quantity')}</p>
          <p className="text-xl font-semibold text-gray-900">{formatNumber(quantityXi)} xi</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">{t('common.buy_price')} (USD/xi)</p>
          <p className="text-xl font-semibold text-gray-900">${formatNumber(buyXi)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">{t('common.current_price')} (USD/xi)</p>
          <p className="text-xl font-semibold text-gray-900">${formatNumber(currentXi)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">{t('common.profit_per_xi')} (USD)</p>
          <p className="text-xl font-semibold text-gray-900">${formatNumber(profitPerXi)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">{t('common.roi')} (%)</p>
          <p className="text-xl font-semibold text-gray-900">{formatNumber(roiPercentage)}%</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">{t('common.total_buy_value')} (USD)</p>
          <p className="text-xl font-semibold text-gray-900">${formatNumber(totalBuyValue)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">{t('common.total_current_value')} (USD)</p>
          <p className="text-xl font-semibold text-gray-900">${formatNumber(totalCurrentValue)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">{t('common.total_profit')} (USD)</p>
          <p className={`text-xl font-semibold ${profitClass}`}>${formatNumber(totalProfit)}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
