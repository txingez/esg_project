import {createRouter, createWebHistory} from 'vue-router'
import Default from './layouts/Default.vue'
import {useStepStore} from "./stores/useStepStore.js";
import {useBusinessTypeStore} from "./stores/useBusinessTypeStore.js";
import {useEvaluatedFormStore} from "./stores/useEvaluatedFormStore.js";
import {useEvaluatedResultStore} from "./stores/useEvaluatedResultStore.js";
import {validateToken} from "./services/authentication.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Default',
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
                    name: 'Detail',
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
                }
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
        ((from.name === 'EvaluateNECForm' || from.name === undefined) && to.name === 'EvaluateNECForm')) {
        return true
    } else {
        const stepStore = useStepStore()
        stepStore.reset()

        const businessType = useBusinessTypeStore()
        businessType.reset()

        const evaluatedForm = useEvaluatedFormStore()
        evaluatedForm.reset()

        const evaluatedResult = useEvaluatedResultStore()
        evaluatedResult.reset()
    }

    if (['EvaluateESGForm', 'EvaluateNECForm'].includes(to.name)) {
        const token = sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
        if (token === null || token === undefined) {
            return {name: 'Home'}
        } else {
            validateToken(token).then((response) => {
                console.log(response)
                return true
            }).catch((err) => {
                console.log(err)
                return {name: 'Home'}
            })
        }
    }
})

export default router;
