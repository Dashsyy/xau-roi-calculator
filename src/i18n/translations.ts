export type SupportedLanguage = 'en' | 'km' | 'zh';

export type TranslationKey =
  | 'common.app_title'
  | 'common.app_label'
  | 'common.short_description'
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
  | 'common.price_now'
  | 'common.ready_hint'
  | 'common.input_helper'
  | 'common.primary_cta'
  | 'common.new_calculation'
  | 'common.total_value_title'
  | 'common.currency_converter'
  | 'common.buy_price_label'
  | 'common.current_price_label'
  | 'common.quantity_label'
  | 'common.comparison_note'
  | 'common.quantity_placeholder'
  | 'common.amount_placeholder'
  | 'common.per_unit'
  | 'common.unit_xi_short'
  | 'common.unit_domlang_short'
  | 'common.unit_ounce_short'
  | 'common.price_label'
  | 'common.quantity_short'
  | 'common.save_result'
  | 'common.tip_buy_price'
  | 'common.tip_current_price'
  | 'common.tip_quantity'
  | 'common.tip_prices'
  | 'common.equivalent_to'
  | 'common.use_market_price'
  | 'common.loading'
  | 'common.welcome_back'
  | 'common.use_latest_market'
  | 'common.next'
  | 'common.back'
  | 'common.finish';

export const translations: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en: {
    'common.app_title': 'Gold ROI Calculator',
    'common.app_label': 'Calculator',
    'common.short_description': 'Quick snapshot of how your gold is doing today.',
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
    'common.ready_hint': 'Updates as you type. Tap calculate if needed.',
    'common.input_helper': 'Enter your gold values below',
    'common.primary_cta': 'Calculate now',
    'common.new_calculation': 'New calculation',
    'common.next': 'Next',
    'common.back': 'Back',
    'common.finish': 'See Result',
    'common.welcome_back': 'Welcome back! Want to check your profit now?',
    'common.use_latest_market': 'Get Latest Price',
    'common.use_market_price': 'Use Market Price',
    'common.loading': 'Loading...',
    'common.total_value_title': 'Total value',
    'common.currency_converter': 'Currency Converter',
    'common.buy_price_label': 'Buy Price',
    'common.current_price_label': 'Current Price',
    'common.quantity_label': 'Quantity',
    'common.comparison_note': 'Prices are compared using the same gold unit',
    'common.quantity_placeholder': 'Enter quantity',
    'common.amount_placeholder': 'Enter amount',
    'common.per_unit': 'per unit',
    'common.unit_xi_short': 'Xi',
    'common.unit_domlang_short': 'Domlang',
    'common.unit_ounce_short': 'Ounce',
    'common.price_label': 'Price',
    'common.quantity_short': 'Qty',
    'common.save_result': 'Save Result',
    'common.equivalent_to': 'Equivalent to',
    'common.tip_prices': 'Enter your buy and current prices',
    'common.tip_buy_price': 'Enter your buy price',
    'common.tip_current_price': 'Enter the current price',
    'common.tip_quantity': 'Add your quantity',
  },
  km: {
    'common.app_title': 'គណនាផលចំណេញមាស',
    'common.app_label': 'កម្មវិធីគណនា',
    'common.short_description': 'មើលតម្លៃមាសរបស់អ្នកយ៉ាងឆាប់រហ័សតាមតម្លៃថ្ងៃនេះ។',
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
    'common.you_gain': 'អ្នកចំណេញ',
    'common.you_lose': 'អ្នកខាត',
    'common.break_even': 'គ្មានចំណេញ ឬ ខាត',
    'common.you_paid': 'តម្លៃកាលទិញសរុប',
    'common.current_value': 'តម្លៃបច្ចុប្បន្ន',
    'common.price_now': 'តម្លៃឥឡូវ',
    'common.ready_hint': 'គណនាដោយស្វ័យប្រវត្តិ ពេលបញ្ចូល',
    'common.input_helper': 'បញ្ចូលតម្លៃមាសរបស់អ្នក',
    'common.primary_cta': 'គណនាឥឡូវ',
    'common.new_calculation': 'គណនាថ្មី',
    'common.next': 'បន្ទាប់',
    'common.back': 'ថយក្រោយ',
    'common.finish': 'មើលលទ្ធផល',
    'common.welcome_back': 'រីករាយដែលបានជួបគ្នាវិញ! តើអ្នកចង់ដឹងពីចំណេញឥឡូវទេ?',
    'common.use_latest_market': 'ទាញយកតម្លៃឥឡូវ',
    'common.use_market_price': 'ប្រើតម្លៃទីផ្សារឥឡូវ',
    'common.loading': 'កំពុងទាញយក...',
    'common.total_value_title': 'តម្លៃសរុប',
    'common.currency_converter': 'កម្មវិធីបម្លែងរូបិយប័ណ្ណ',
    'common.buy_price_label': 'តម្លៃទិញ',
    'common.current_price_label': 'តម្លៃបច្ចុប្បន្ន',
    'common.quantity_label': 'បរិមាណ',
    'common.comparison_note': 'តម្លៃទាំងអស់ត្រូវបានប្រៀបធៀបទៅកាន់ឯកតាមាសដូចគ្នា',
    'common.quantity_placeholder': 'បញ្ចូលបរិមាណ',
    'common.amount_placeholder': 'បញ្ចូលចំនួន',
    'common.per_unit': 'ក្នុងមួយឯកតា',
    'common.unit_xi_short': 'ជី',
    'common.unit_domlang_short': 'ដំឡឹង',
    'common.unit_ounce_short': 'អោន',
    'common.price_label': 'តម្លៃ',
    'common.quantity_short': 'បរិ.',
    'common.save_result': 'រក្សាទុកលទ្ធផល',
    'common.equivalent_to': 'ស្មើនឹងប្រហែល',
    'common.tip_prices': 'សូមបញ្ចូលតម្លៃទិញ និងតម្លៃបច្ចុប្បន្ន',
    'common.tip_buy_price': 'សូមបញ្ចូលតម្លៃដែលអ្នកទិញ',
    'common.tip_current_price': 'សូមបញ្ចូលតម្លៃបច្ចុប្បន្ន',
    'common.tip_quantity': 'សូមបញ្ចូលបរិមាណ',
  },
  zh: {
    'common.app_title': '黄金投资回报计算器',
    'common.app_label': '计算器',
    'common.short_description': '按今日金价快速查看你的收益。',
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
    'common.ready_hint': '输入即计算，如需可再点计算',
    'common.input_helper': '输入你的黄金数值',
    'common.primary_cta': '立即计算',
    'common.new_calculation': '重新计算',
    'common.next': '下一步',
    'common.back': '返回',
    'common.finish': '查看结果',
    'common.welcome_back': '欢迎回来！想现在查看你的收益吗？',
    'common.use_latest_market': '获取最新金价',
    'common.use_market_price': '使用市场现价',
    'common.loading': '正在加载...',
    'common.total_value_title': '总价值',
    'common.currency_converter': '货币换算器',
    'common.buy_price_label': '买入价格',
    'common.current_price_label': '当前价格',
    'common.quantity_label': '数量',
    'common.comparison_note': '价格将以同一黄金单位比较',
    'common.quantity_placeholder': '输入数量',
    'common.amount_placeholder': '输入金额',
    'common.per_unit': '每单位',
    'common.unit_xi_short': '希',
    'common.unit_domlang_short': '东朗',
    'common.unit_ounce_short': '盎司',
    'common.price_label': '价格',
    'common.quantity_short': '数量',
    'common.save_result': '保存结果',
    'common.equivalent_to': '相当于',
    'common.tip_prices': '请输入买入和当前价格',
    'common.tip_buy_price': '请输入买入价格',
    'common.tip_current_price': '请输入当前价格',
    'common.tip_quantity': '请输入数量',
  },
};
