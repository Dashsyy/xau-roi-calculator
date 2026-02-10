import { formatNumber } from "../utils/goldConversion";
import { useLanguage } from "../i18n/LanguageContext";

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

  const statusLabel = isGain
    ? t("common.you_gain")
    : isLoss
    ? t("common.you_lose")
    : t("common.break_even");

  const heroColor = isGain
    ? "text-emerald-600"
    : isLoss
    ? "text-red-600"
    : "text-gray-900";

  return (
    <section className="space-y-6">
      {/* Hero */}
      <div className="text-center">
        <p className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${heroColor}`}>{statusLabel}</p>
        <p
          className={`font-display mt-1 text-4xl font-semibold leading-none tracking-[-0.02em] ${heroColor} sm:text-5xl`}
        >
          ${formatNumber(totalProfit)}
        </p>
      </div>

      {/* Current vs Paid */}
      <div className="flex items-center justify-center gap-6 text-center">
        <div className="flex flex-1 flex-col items-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {t("common.current_value")}
          </p>
          <p className="font-display mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
            ${formatNumber(totalCurrentValue)}
          </p>
        </div>

        <div className="h-10 w-px bg-gray-200" aria-hidden />

        <div className="flex flex-1 flex-col items-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {t("common.you_paid")}
          </p>
          <p className="font-display mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
            ${formatNumber(totalBuyValue)}
          </p>
        </div>
      </div>

      {/* Stats section – vertical columns (stacked rows) */}
      <div className="border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="space-y-2 text-sm font-semibold text-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{t("common.roi")}</span>
            <span
              className={
                isGain
                  ? "text-emerald-600"
                  : isLoss
                  ? "text-red-600"
                  : "text-gray-900"
              }
            >
              {isGain ? "+" : ""}
              {formatNumber(roiPercentage)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">{t("common.quantity_short")}</span>
            <span className="text-gray-900">
              {formatNumber(quantityXi)} {t("common.unit_xi_short")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">{t("common.price_label")}</span>
            <span className="text-gray-900">
              ${formatNumber(currentXi)} / {t("common.unit_xi_short")}
            </span>
          </div>
        </div>
      </div>

      {/* Footer details */}
      <div className="border border-gray-200 bg-gray-50 px-4 py-3 text-xs">
        <div className="flex items-center justify-between text-gray-600">
          <span>{t("common.profit_per_xi")}</span>
          <span className="font-semibold text-gray-900">
            ${formatNumber(profitPerXi)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-gray-600">
          <span>{t("common.buy_price_label")}</span>
          <span className="font-semibold text-gray-900">
            ${formatNumber(buyXi)} / {t("common.unit_xi_short")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ResultCard;
