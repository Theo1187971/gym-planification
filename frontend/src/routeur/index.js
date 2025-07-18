import {createRouter, createWebHistory} from "vue-router";
import SignUpView from "@/views/SignUpView.vue";
import LoginView from "@/views/LoginView.vue";
import AccountView from "@/views/AccountView.vue";
import MainPage from "@/views/MainPageView.vue";
import SessionCreation from "@/components/SessionCreation.vue";
import AboutUsView from "@/views/AboutUsView.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: MainPage,
        meta: {requiresAuth: true}
    },
    {
        path: '/my-account',
        name: 'My Account',
        component: AccountView,
        meta: {requiresAuth: true}
    },
    {
        path: '/about-us',
        name: 'AboutUs',
        component: AboutUsView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUpView
    },
    {
        path: '/sessionCreation',
        name: 'sessionCreation',
        component: SessionCreation
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = !!localStorage.getItem('session_token');

    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
