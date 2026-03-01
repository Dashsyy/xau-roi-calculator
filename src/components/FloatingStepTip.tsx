type FloatingStepTipProps = {
  message: string | null;
  onPress?: () => void;
};

const FloatingStepTip = ({ message, onPress }: FloatingStepTipProps) => {
  if (!message) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-32 flex justify-center px-4 z-50">
      <button
        type="button"
        onClick={onPress}
        className="pointer-events-auto flex items-center gap-3 border-4 border-black bg-yellow-400 px-6 py-4 text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95"
      >
        <span>{message}</span>
        <span className="text-2xl leading-none">↗</span>
      </button>
    </div>
  );
};

export default FloatingStepTip;
