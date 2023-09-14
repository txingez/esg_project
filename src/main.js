import {createApp} from 'vue'
import './styles/main.scss'
import App from './App.vue'
import router from './router.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
    faChevronLeft,
    faChevronRight,
    faCopyright,
    faEnvelope,
    faLocationDot,
    faPhone,
    faShieldDog,
    faTree,
    faWater,
    faRightFromBracket,
    faArrowUp,
    faMountainSun
} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faXTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faBuilding} from "@fortawesome/free-regular-svg-icons";
import {createPinia} from 'pinia'

const pinia = createPinia()
library.add(faLocationDot,
    faPhone,
    faEnvelope,
    faFacebookSquare,
    faXTwitter,
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
    faMountainSun)

createApp(App)
    .use(pinia)
    .use(router)
    .use(Antd)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
