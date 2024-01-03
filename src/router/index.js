import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginPage.vue"
import Membre from "@/views/MembrePage.vue"
import Signin from "@/views/SigninPage.vue"
import HomeRemake from '@/views/HomePageRemake.vue'
import MazeRemake from "@/views/games/MazePageRemake.vue"
import GeographieMapGamePage from "@/views/games/GeographieMapGamePage.vue"
import GamePage from "@/views/GamePage.vue"

const routes = [
    {
        path: "/mazeRemake",
        name: "MazePageRemake",
        component: MazeRemake
    },
    {
        path: "/GamePage",
        name: "GamePage",
        component: GamePage
    },
    {
        path: "/GeographieMapGamePage",
        name: "GeographieMapGamePage",
        component: GeographieMapGamePage
    },
    {
        path: "/",
        name: "HomePageRemake",
        component: HomeRemake
    },
    {
        path: "/login",
        name: "LoginPage",
        component: Login
    },
    {
        path: "/membre",
        name: "MembrePage",
        component: Membre
    },
    {
        path: "/signin",
        name: "SiginPage",
        component: Signin
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;