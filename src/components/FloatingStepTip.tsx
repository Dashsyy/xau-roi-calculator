import { Step } from '../utils/steps';
import { useLanguage } from '../i18n/LanguageContext';
import { TranslationKey } from '../i18n/translations';

type FloatingStepTipProps = {
  step: Step | null;
  onPress?: () => void;
};

const stepLabels: Record<Step, TranslationKey> = {
  [Step.BuyPrice]: 'common.tip_buy_price',
  [Step.CurrentPrice]: 'common.tip_current_price',
  [Step.Quantity]: 'common.tip_quantity',
};

const FloatingStepTip = ({ step, onPress }: FloatingStepTipProps) => {
  const { t } = useLanguage();

  if (!step) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 flex justify-center px-4">
      <button
        type="button"
        onClick={onPress}
        className="pointer-events-auto flex max-w-md items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 ring-1 ring-white/30 transition hover:translate-y-[-1px] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        <span className="flex-1 text-left">{t(stepLabels[step])}</span>
        <span aria-hidden className="text-lg leading-none">↗</span>
      </button>
    </div>
  );
};

export default FloatingStepTip;
