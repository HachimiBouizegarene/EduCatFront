import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginPage.vue"
import Membre from "@/views/MembrePage.vue"
import Signin from "@/views/SigninPage.vue"
import HomeRemake from '@/views/HomePageRemake.vue'
import MazeRemake from "@/views/games/MazePageRemake.vue"
import GeographieMapGamePage from "@/views/games/GeographieMapGamePage.vue"
import JeuTest from "@/views/games/JeuTest.vue"
import GamesPage from "@/views/GamesPage.vue"

const routes = [
    {
        path: "/mazeRemake",
        name: "Conjugue pour Fuir !",
        component: MazeRemake
    },
    {
        path: "/GamesPage",
        name: "GamesPage",
        component: GamesPage
    },
    {
        path: "/GeographieMapGamePage",
        name: "Maître du Monde !",
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
        path: "/JeuTest",
        name: "JeuTest",
        component: JeuTest
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