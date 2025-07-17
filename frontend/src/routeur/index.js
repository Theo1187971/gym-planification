import {createRouter, createWebHistory} from "vue-router";
import SignUpView from "@/views/SignUpView.vue";
import LoginView from "@/views/LoginView.vue";
import TheWelcome from "@/components/TheWelcome.vue";


const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: TheWelcome
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
