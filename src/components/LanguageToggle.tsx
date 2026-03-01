import { useLanguage } from '../i18n/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center border-4 border-black p-1 bg-white">
      <button
        type="button"
        onClick={() => setLanguage('km')}
        className={`px-4 py-2 text-sm font-black uppercase transition-colors
          ${language === 'km' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
        `}
      >
        KM
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 text-sm font-black uppercase transition-colors border-l-2 border-black
          ${language === 'en' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
        `}
      >
        EN
      </button>
      
      <button
        type="button"
        onClick={() => setLanguage('zh')}
        className={`px-4 py-2 text-sm font-black uppercase transition-colors border-l-2 border-black
          ${language === 'zh' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
        `}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageToggle;
