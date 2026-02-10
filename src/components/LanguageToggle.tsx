// LanguageToggle.tsx
import { useLanguage } from '../i18n/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLanguage('km')}
        className={`font-display rounded-none px-3 py-1.5 text-xs font-semibold ring-1 transition
          ${language === 'km'
            ? 'bg-gray-900 text-white ring-gray-900'
            : 'bg-white text-gray-700 ring-gray-200 hover:bg-gray-50'}
        `}
      >
        KM
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`font-display rounded-none px-3 py-1.5 text-xs font-semibold ring-1 transition
          ${language === 'en'
            ? 'bg-gray-900 text-white ring-gray-900'
            : 'bg-white text-gray-700 ring-gray-200 hover:bg-gray-50'}
        `}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
