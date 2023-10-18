import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue"
import Login from "@/views/LoginPage.vue"
import Membre from "@/views/MembrePage.vue"

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
    },
    {
        path : "/membre",
        name : "MembrePage",
        component : Membre
    }
]


const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;