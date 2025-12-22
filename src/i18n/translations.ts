export type SupportedLanguage = 'en' | 'km' | 'zh';

export type TranslationKey =
  | 'common.app_title'
  | 'common.buy_price'
  | 'common.current_price'
  | 'common.calculate'
  | 'common.result'
  | 'common.unit_xi'
  | 'common.unit_domlang'
  | 'common.unit_ounce'
  | 'common.profit_per_xi'
  | 'common.roi'
  | 'common.language'
  | 'common.quantity'
  | 'common.total_buy_value'
  | 'common.total_current_value'
  | 'common.total_profit'
  | 'common.empty_state';

export const translations: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en: {
    'common.app_title': 'Gold ROI Calculator',
    'common.buy_price': 'Buy Price',
    'common.current_price': 'Current Price',
    'common.calculate': 'Calculate',
    'common.result': 'Result',
    'common.unit_xi': 'Per Xi',
    'common.unit_domlang': 'Per Domlang',
    'common.unit_ounce': 'Per Ounce',
    'common.profit_per_xi': 'Profit per Xi',
    'common.roi': 'ROI',
    'common.language': 'Language',
    'common.quantity': 'Quantity',
    'common.total_buy_value': 'Total Buy Value',
    'common.total_current_value': 'Total Current Value',
    'common.total_profit': 'Total Profit / Loss',
    'common.empty_state': 'Enter values to see your profit and ROI.',
  },
  km: {
    'common.app_title': 'គណនាផលចំណេញមាស',
    'common.buy_price': 'តម្លៃទិញ',
    'common.current_price': 'តម្លៃបច្ចុប្បន្ន',
    'common.calculate': 'គណនា',
    'common.result': 'លទ្ធផល',
    'common.unit_xi': 'ក្នុងមួយ ជី',
    'common.unit_domlang': 'ក្នុងមួយ ដំឡឹង',
    'common.unit_ounce': 'ក្នុងមួយ អោន',
    'common.profit_per_xi': 'ចំណេញក្នុងមួយ ជី',
    'common.roi': 'អត្រាចំណេញ',
    'common.language': 'ភាសា',
    'common.quantity': 'បរិមាណ',
    'common.total_buy_value': 'តម្លៃទិញសរុប',
    'common.total_current_value': 'តម្លៃបច្ចុប្បន្នសរុប',
    'common.total_profit': 'ចំណេញ / ខាតសរុប',
    'common.empty_state': 'បញ្ចូលតម្លៃដើម្បីមើលចំណេញ និង ROI របស់អ្នក។',
  },
  zh: {
    'common.app_title': '黄金投资回报计算器',
    'common.buy_price': '买入价格',
    'common.current_price': '当前价格',
    'common.calculate': '计算',
    'common.result': '结果',
    'common.unit_xi': '每希',
    'common.unit_domlang': '每东朗',
    'common.unit_ounce': '每盎司',
    'common.profit_per_xi': '每希利润',
    'common.roi': '投资回报率',
    'common.language': '语言',
    'common.quantity': '数量',
    'common.total_buy_value': '买入总额',
    'common.total_current_value': '当前总额',
    'common.total_profit': '总利润 / 亏损',
    'common.empty_state': '请输入数值以查看利润和回报率。',
  },
};
