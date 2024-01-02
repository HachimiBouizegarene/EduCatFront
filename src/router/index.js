import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue"
import Login from "@/views/LoginPage.vue"
import Membre from "@/views/MembrePage.vue"
import Signin from "@/views/SigninPage.vue"
import HomeRemake from '@/views/HomePageRemake.vue'
import MazeRemake from "@/views/games/MazePageRemake.vue"
const routes = [
    {
        path : "/mazeRemake",
        name : "MazePageRemake",
        component : MazeRemake
    },
    {
        path : "/home",
        name : "HomePageRemake",
        component : HomeRemake
    },
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
    },
    {
        path : "/signin",
        name : "SiginPage",
        component : Signin
    }
]


const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;