import { createI18n } from "vue-i18n";
import vi from './locales/vi.json'
import en from './locales/en.json'
export default createI18n({
	locale: 'vi',
	fallbackLocale: 'en',
	legacy: false,
	messages: {
		vi,
		en
	},
	globalInjection: true
})
