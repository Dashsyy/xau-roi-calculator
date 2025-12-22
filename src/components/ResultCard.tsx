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
        <p className={`text-sm font-semibold ${heroColor}`}>{statusLabel}</p>
        <p
          className={`mt-1 text-5xl font-extrabold tracking-tight ${heroColor}`}
        >
          ${formatNumber(totalProfit)}
        </p>
      </div>

      {/* Current vs Paid */}
      <div className="flex items-center justify-center gap-6 text-center">
        <div className="flex flex-1 flex-col items-center">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            {t("common.current_value")}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            ${formatNumber(totalCurrentValue)}
          </p>
        </div>

        <div className="h-10 w-px bg-gray-200" aria-hidden />

        <div className="flex flex-1 flex-col items-center">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            {t("common.you_paid")}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            ${formatNumber(totalBuyValue)}
          </p>
        </div>
      </div>

      {/* Stats section – vertical columns (stacked rows) */}
      <div className="rounded-xl bg-gray-50 px-4 py-3 ring-1 ring-gray-200">
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
      <div className="rounded-xl bg-gray-50 px-4 py-3 text-xs ring-1 ring-gray-200">
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
