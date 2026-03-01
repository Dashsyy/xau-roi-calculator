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

  const statusColor = isGain
    ? "bg-green-600"
    : isLoss
    ? "bg-red-600"
    : "bg-gray-600";
    
  const textColor = isGain ? "text-green-700" : isLoss ? "text-red-700" : "text-gray-900";

  return (
    <section className="space-y-4">
      {/* Big Status Label */}
      <div className={`border-4 border-black ${statusColor} p-8 text-center text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
        <p className="text-xl font-black tracking-widest uppercase">{statusLabel}</p>
        <p className="mt-4 text-6xl font-black tracking-tighter leading-none">
          ${formatNumber(totalProfit)}
        </p>
      </div>

      {/* Big Grid - Summary */}
      <div className="grid grid-cols-1 gap-4">
        <div className="border-4 border-black bg-white p-6 flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-base font-black uppercase text-gray-400">
            {t("common.current_value")}
          </p>
          <p className="text-3xl font-black text-black">
            ${formatNumber(totalCurrentValue)}
          </p>
        </div>

        <div className="border-4 border-black bg-white p-6 flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-base font-black uppercase text-gray-400">
            {t("common.you_paid")}
          </p>
          <p className="text-3xl font-black text-black">
            ${formatNumber(totalBuyValue)}
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="border-4 border-black bg-white">
        <div className="divide-y-4 divide-black">
          <div className="flex items-center justify-between p-4 bg-gray-50">
            <span className="text-base font-black uppercase text-gray-500">{t("common.roi")}</span>
            <span className={`text-2xl font-black ${textColor}`}>
              {isGain ? "+" : ""}
              {formatNumber(roiPercentage)}%
            </span>
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="text-base font-black uppercase text-gray-500">{t("common.profit_per_xi")}</span>
            <span className="text-2xl font-black text-black">
              ${formatNumber(profitPerXi)}
            </span>
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="text-base font-black uppercase text-gray-500">{t("common.quantity_short")}</span>
            <span className="text-2xl font-black text-black">
              {formatNumber(quantityXi)} {t("common.unit_xi_short")}
            </span>
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="text-base font-black uppercase text-gray-500">{t("common.price_label")}</span>
            <span className="text-2xl font-black text-black">
              ${formatNumber(currentXi)} / {t("common.unit_xi_short")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultCard;
