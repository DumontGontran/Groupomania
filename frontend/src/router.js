import { createWebHistory, createRouter } from "vue-router";
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
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
        path: "/api/user/register",
        name: "registerUser",
        component: Register
        }
    ]
})