import {createRouter, createWebHistory} from "vue-router";
import SignUpView from "@/views/SignUpView.vue";
import LoginView from "@/views/LoginView.vue";
import MainPage from "@/views/MainPage.vue";
import SessionCreation from "@/components/SessionCreation.vue";


const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: MainPage
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

export default router;
