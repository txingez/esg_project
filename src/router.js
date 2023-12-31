import { createRouter, createWebHistory, useRouter } from 'vue-router'
import Default from './layouts/Default.vue'
import { useStepStore } from "./stores/useStepStore.js";
import { useBusinessTypeStore } from "./stores/useBusinessTypeStore.js";
import { useEvaluatedFormStore } from "./stores/useEvaluatedFormStore.js";
import { useEvaluatedResultStore } from "./stores/useEvaluatedResultStore.js";
import { useSearchStore } from "./stores/useSearchStore.js";
import { ModalWarning } from "./components/ModalWarning.js";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Default',
			redirect: '/',
			component: Default,
			children: [
				{
					id: 1,
					path: '/',
					name: 'Home',
					component: () => import('./pages/HomePage.vue')
				},
				{
					id: 2,
					path: '/overview',
					name: 'Overview',
					component: () => import('./pages/OverviewPage.vue')
				},
				{
					id: 3,
					path: '/events',
					name: 'Events',
					component: () => import('./pages/EventPage.vue')
				},
				{
					id: 4,
					path: '/evaluate',
					name: 'Evaluate',
					component: () => import('./pages/EvaluatePage.vue')
				},
				{
					id: 5,
					path: '/evaluate/esg/form',
					name: 'EvaluateESGForm',
					component: () => import('./pages/EvaluateFormESGPage.vue')
				},
				{
					id: 6,
					path: '/library',
					name: 'Library',
					component: () => import('./pages/LibraryPage.vue')
				},
				{
					id: 7,
					path: '/library/detail/:id',
					name: 'LibraryDetail',
					component: () => import('./pages/DetailPage.vue')
				},
				{
					id: 8,
					path: '/evaluate/nec/form',
					name: 'EvaluateNECForm',
					component: () => import('./pages/EvaluateFormNECPage.vue')
				},
				{
					id: 9,
					path: '/register',
					name: 'Register',
					component: () => import('./pages/RegisterPage.vue')
				},
				{
					id: 10,
					path: '/login',
					name: 'Login',
					component: () => import('./pages/LoginPage.vue')
				},
				{
					id: 11,
					path: '/search-result/:searchValue',
					name: 'SearchResult',
					component: () => import('./pages/SearchResultPage.vue')
				},
				{
					id: 12,
					path: '/reset-password',
					name: 'ResetPassword',
					component: () => import('./pages/ResetPasswordPage.vue')
				},
				{
					id: 13,
					path: '/contact',
					name: 'Contact',
					component: () => import('./pages/ContactPage.vue')
				},
				{
					id: 14,
					path: '/user-info',
					name: 'UserInfo',
					component: () => import('./pages/UserInfoPage.vue')
				},
				{
					id: 15,
					path: '/history',
					name: 'HistoryEvaluated',
					component: () => import('./pages/HistoryEvaluatedPage.vue')
				},
				{
					id: 16,
					path: '/result-evaluated/:id',
					name: 'ResultEvaluatedDetail',
					component: () => import('./pages/ResultDetailPage.vue')
				},
				{
					id: 17,
					path: '/esg-vietnam',
					name: 'ESGVietNam',
					component: () => import('./pages/ESGPage.vue')
				},
				{
					id: 18,
					path: '/news/detail/:id',
					name: 'NewsDetail',
					component: () => import('./pages/DetailPage.vue')
				},
			]
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {top: 0}
		}
	}
});

router.beforeEach((to, from) => {
	if (((from.name === 'EvaluateESGForm' || from.name === undefined) && to.name === 'EvaluateESGForm') ||
		((from.name === 'EvaluateNECForm' || from.name === undefined) && to.name === 'EvaluateNECForm') ||
		(to.name === 'UserInfo')) {
		const router = useRouter()
		const token = localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
		const callbackOk = () => {
			localStorage.clear()
			router.push('/login')
		}
		const callbackCancel = () => router.push('/')

		if (token === null || token === undefined) {
			ModalWarning('Bạn chưa đăng nhập', 'Vui lòng đăng nhập để thực hiện đánh giá', 'Đăng nhập', callbackOk, callbackCancel)
			return false
		} else {
			return true
		}
	} else {
		const stepStore = useStepStore()
		stepStore.reset()

		const businessType = useBusinessTypeStore()
		businessType.reset()

		const evaluatedForm = useEvaluatedFormStore()
		evaluatedForm.reset()

		const evaluatedResult = useEvaluatedResultStore()
		evaluatedResult.reset()

		if (to.name !== 'SearchResult') {
			const searchStore = useSearchStore()
			searchStore.reset()
		}
	}
})

export default router;
