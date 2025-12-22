type FloatingStepTipProps = {
  message: string | null;
  onPress?: () => void;
};

const FloatingStepTip = ({ message, onPress }: FloatingStepTipProps) => {
  if (!message) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 flex justify-center px-4">
      <button
        type="button"
        onClick={onPress}
        className="pointer-events-auto flex max-w-md items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 ring-1 ring-white/30 transition hover:translate-y-[-1px] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        <span className="flex-1 text-left">{message}</span>
        <span aria-hidden className="text-lg leading-none">↗</span>
      </button>
    </div>
  );
};

export default FloatingStepTip;
