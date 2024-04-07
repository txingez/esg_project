import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'
import router from './router.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faArrowUp,
	faChartSimple,
	faChevronLeft,
	faChevronRight,
	faCopyright,
	faGlobe,
	faLocationDot,
	faMountainSun,
	faPhone,
	faRightFromBracket,
	faShieldDog,
	faTree,
	faWater,
	faXmark
} from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faBuilding, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { createPinia } from 'pinia'
import 'aos/dist/aos.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-dark-blue/theme.css'
import vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';
import i18n from './i18n'

window.Buffer;

const pinia = createPinia()
library.add(faLocationDot,
	faPhone,
	faGlobe,
	faFacebookSquare,
	faYoutube,
	faCopyright,
	faChevronRight,
	faChevronLeft,
	faBuilding,
	faShieldDog,
	faWater,
	faTree,
	faRightFromBracket,
	faArrowUp,
	faMountainSun,
	faChartSimple,
	faPaperPlane,
	faXmark)

createApp(App)
	.use(pinia)
	.use(router)
	.use(Antd)
	.use(vue3PhotoPreview)
	.use(PrimeVue)
	.use(i18n)
	.component('font-awesome-icon', FontAwesomeIcon)
	.mount('#app');
