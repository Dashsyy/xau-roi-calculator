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
  const statusLabel = isGain ? t('common.you_gain') : isLoss ? t('common.you_lose') : t('common.break_even');
  const heroColor = isGain ? 'text-emerald-600' : isLoss ? 'text-red-600' : 'text-gray-900';

  return (
    <section className="space-y-6">
      <div className="text-center">
        <p className={`text-base font-semibold capitalize ${heroColor}`}>{statusLabel}</p>
        <p className={`mt-1 text-5xl font-extrabold tracking-tight ${heroColor}`}>${formatNumber(totalProfit)}</p>
      </div>

      <div className="flex items-stretch justify-center gap-6 text-center text-gray-900">
        <div className="flex flex-1 flex-col items-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{t('common.current_value')}</p>
          <p className="mt-1 text-2xl font-bold">${formatNumber(totalCurrentValue)}</p>
        </div>
        <div className="h-12 w-px self-center bg-gray-200" aria-hidden />
        <div className="flex flex-1 flex-col items-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{t('common.you_paid')}</p>
          <p className="mt-1 text-2xl font-bold">${formatNumber(totalBuyValue)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 whitespace-nowrap rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-gray-200">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-gray-500">{t('common.roi')}</span>
          <span className={isGain ? 'text-emerald-600' : isLoss ? 'text-red-600' : 'text-gray-900'}>
            {isGain ? '+' : ''}
            {formatNumber(roiPercentage)}%
          </span>
        </div>
        <span className="text-gray-300" aria-hidden>•</span>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-gray-500">{t('common.quantity_short')}</span>
          <span className="text-gray-900">{formatNumber(quantityXi)} {t('common.unit_xi_short')}</span>
        </div>
        <span className="text-gray-300" aria-hidden>•</span>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-gray-500">{t('common.price_label')}</span>
          <span className="text-gray-900">${formatNumber(currentXi)} / {t('common.unit_xi_short')}</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
      >
        {t('common.save_result')}
      </button>

      <div className="rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-500 ring-1 ring-gray-200">
        <div className="flex items-center justify-between">
          <span>{t('common.profit_per_xi')}</span>
          <span className="font-semibold text-gray-800">${formatNumber(profitPerXi)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span>{t('common.buy_price_label')}</span>
          <span className="font-semibold text-gray-800">${formatNumber(buyXi)} / {t('common.unit_xi_short')}</span>
        </div>
      </div>
    </section>
  );
};

export default ResultCard;
