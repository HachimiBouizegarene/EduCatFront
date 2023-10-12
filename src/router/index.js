import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"

const routes = [
    {
        path : "/", 
        name : "HomePage",
        component : Home
    }, 
    {
        path : "/login",
        name : "LoginPage",
        component : Login
    }
]


const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;