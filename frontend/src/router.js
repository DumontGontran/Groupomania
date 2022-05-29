import { createWebHistory, createRouter } from "vue-router"
import { authGuard } from "./helpers/auth-guard"

import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import Feed from "./views/Feed.vue"
import Profil from "./views/Profil.vue"
import Password from "./views/Password.vue"



export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/register",
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/feed",
            name: "feed",
            component: Feed,
            beforeEnter: authGuard
        },
        {
            path: "/profil",
            name: "profil",
            component: Profil,
            beforeEnter: authGuard
        },
        {
            path: "/profil/password",
            name: "password",
            component: Password,
            beforeEnter: authGuard
        }

    ]
})