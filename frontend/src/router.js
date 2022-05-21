import { createWebHistory, createRouter } from "vue-router";
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import Public_Feed from "./views/Public_Feed.vue"
import Profil from "./views/Profil.vue"
export default createRouter ({ 
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
        path: "/public_feed",
        name: "public_feed",
        component: Public_Feed
        },
        {
            path: "/profil/",
            name: "profil",
            component: Profil
            }
    ]
})