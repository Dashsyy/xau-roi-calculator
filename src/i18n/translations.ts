export type SupportedLanguage = 'en' | 'km';

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
  | 'common.equivalent_to'
  | 'common.use_market_price'
  | 'common.loading'
  | 'common.welcome_back'
  | 'common.use_latest_market'
  | 'common.next'
  | 'common.back'
  | 'common.finish'
  | 'common.dashboard_title'
  | 'common.refresh_price'
  | 'common.price_updated'
  | 'common.last_updated'
  | 'common.previous_price'
  | 'common.price_trend_up'
  | 'common.price_trend_down'
  | 'common.onboarding_welcome'
  | 'common.market_closed'
  | 'common.market_open'
  | 'common.market_closed_prediction';

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
    'common.dashboard_title': 'Your Dashboard',
    'common.refresh_price': 'Refresh Price',
    'common.price_updated': 'Price updated successfully!',
    'common.last_updated': 'Last updated',
    'common.previous_price': 'Previous',
    'common.price_trend_up': 'Price went up!',
    'common.price_trend_down': 'Price went down',
    'common.onboarding_welcome': 'Let\'s set up your gold holdings',
    'common.market_closed': 'Market Closed (Weekend)',
    'common.market_open': 'Market Open',
    'common.market_closed_prediction': 'The international market is currently closed. For predictions, you can manually adjust the current price below.',
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
    'common.dashboard_title': 'ផ្ទាំងគ្រប់គ្រងរបស់អ្នក',
    'common.refresh_price': 'ធ្វើបច្ចុប្បន្នភាពតម្លៃ',
    'common.price_updated': 'ធ្វើបច្ចុប្បន្នភាពតម្លៃដោយជោគជ័យ!',
    'common.last_updated': 'ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ',
    'common.previous_price': 'តម្លៃមុន',
    'common.price_trend_up': 'តម្លៃឡើង!',
    'common.price_trend_down': 'តម្លៃចុះ',
    'common.onboarding_welcome': 'សូមរៀបចំទិន្នន័យមាសរបស់អ្នក',
    'common.market_closed': 'ទីផ្សារបិទ (ចុងសប្តាហ៍)',
    'common.market_open': 'ទីផ្សារបើក',
    'common.market_closed_prediction': 'ទីផ្សារអន្តរជាតិកំពុងបិទ។ ប្រសិនបើអ្នកចង់សាកល្បងមើលផលចំណេញទុកជាមុន អ្នកអាចកែសម្រួលតម្លៃបច្ចុប្បន្នដោយខ្លួនឯងនៅខាងក្រោម។',
  },
};
