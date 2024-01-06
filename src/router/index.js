import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginPage.vue"
import Membre from "@/views/MembrePage.vue"
import Signin from "@/views/SigninPage.vue"
import HomeRemake from '@/views/HomePageRemake.vue'
import MazeRemake from "@/views/games/MazePageRemake.vue"
import GeographieMapGamePage from "@/views/games/GeographieMapGamePage.vue"
import JeuTest from "@/views/games/JeuTest.vue"
import GamesPage from "@/views/GamesPage.vue"
import ProfilPage from "@/views/ProfilPage.vue"
import StatistiquesPage from "@/views/StatistiquesPage.vue"

const routes = [
    {
        path: "/conjugue-pour-fuir",
        name: "Conjugue pour Fuir !",
        component: MazeRemake
    },
    {
        path: "/profil",
        name: "ProfilPage",
        component: ProfilPage
    },
    {
        path: "/jeux",
        name: "GamesPage",
        component: GamesPage
    },
    {
        path: "/maitre-du-monde",
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
    },
    {
        path: "/statistiques",
        name: "StatistiquesPage",
        component: StatistiquesPage
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;