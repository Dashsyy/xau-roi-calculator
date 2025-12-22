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
  | 'common.empty_state'
  | 'common.tagline'
  | 'common.auto_update'
  | 'common.fill_all'
  | 'common.quantity_hint'
  | 'common.you_gain'
  | 'common.you_lose'
  | 'common.break_even'
  | 'common.you_paid'
  | 'common.current_value'
  | 'common.price_now';

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
    'common.tagline': 'Simple gold shop calculator for Cambodia',
    'common.auto_update': 'Auto-updates',
    'common.fill_all': 'Enter all fields',
    'common.quantity_hint': 'xi or domlang',
    'common.you_gain': 'You gain',
    'common.you_lose': 'You lose',
    'common.break_even': 'No gain or loss',
    'common.you_paid': 'You paid',
    'common.current_value': 'Current value',
    'common.price_now': 'Price now',
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
    'common.tagline': 'គណនាផលចំណេញសាមញ្ញសម្រាប់ហាងមាស',
    'common.auto_update': 'គណនាស្វ័យប្រវត្តិ',
    'common.fill_all': 'បំពេញទាំងអស់',
    'common.quantity_hint': 'ជី ឬ ដំឡឹង',
    'common.you_gain': 'អ្នកទទួលបាន',
    'common.you_lose': 'អ្នកខាត',
    'common.break_even': 'គ្មានចំណេញ ឬ ខាត',
    'common.you_paid': 'តម្លៃបានបង់',
    'common.current_value': 'តម្លៃបច្ចុប្បន្ន',
    'common.price_now': 'តម្លៃឥឡូវ',
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
    'common.tagline': '柬埔寨金店简单计算器',
    'common.auto_update': '自动更新',
    'common.fill_all': '请填写完整',
    'common.quantity_hint': '希或东朗',
    'common.you_gain': '盈利',
    'common.you_lose': '亏损',
    'common.break_even': '不赚不赔',
    'common.you_paid': '已支付',
    'common.current_value': '当前价值',
    'common.price_now': '现价',
  },
};
