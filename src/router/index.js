import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginPage.vue"
import Membre from "@/views/MembrePage.vue"
import Signin from "@/views/SigninPage.vue"
import HomeRemake from '@/views/HomePageRemake.vue'
import StatistiquesPage from "@/views/StatistiquesPage.vue"
import ProfilPage from "@/views/ProfilPage.vue"
import MentionsLegales from "@/views/MentionsLegales.vue"
import PolitiqueConfidentialite from "@/views/PolitiqueConfidentialite.vue"

import MazeComponentRemake from "@/components/games/maze/MazeComponentRemake.vue"
import MazeRemake from "@/views/games/MazePageRemake.vue"
import GeographieMapGamePage from "@/views/games/GeographieMapGamePage.vue"
import QuestionPourUnEnfant from "@/views/games/QuestionPourUnEnfant.vue"
import CalculsMentaux from "@/views/games/CalculsMentaux.vue"
import GamesPage from "@/views/GamesPage.vue"
import RemetEnOrdre from "@/views/games/RemetEnOrdre.vue"
import JeuDuSimon from "@/views/games/JeuDuSimon.vue"
import TrouveLesPaires from "@/views/games/TrouveLesPaires.vue"

const routes = [
    {
        path : "/remake",
        name : "MazeComponentRemake",
        component : MazeComponentRemake
    },
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
        path: "/remet-en-ordre",
        name: "Remet en Ordre !",
        component: RemetEnOrdre
    },
    {
        path: "/jeu-du-simon",
        name: "Jeu du Simon !",
        component: JeuDuSimon
    },
    {
        path: "/calculs-mentaux",
        name: "Calculs Mentaux !",
        component: CalculsMentaux
    },
    {
        path: "/trouve-les-paires",
        name: "Trouve les Paires !",
        component: TrouveLesPaires
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
        path: "/question-pour-un-enfant",
        name: "Question Pour Un Enfant !",
        component: QuestionPourUnEnfant
    },
    {
        path: "/signin",
        name: "SiginPage",
        component: Signin
    },
    {
        path: "/mentions-legales",
        name: "MentionsLegales",
        component: MentionsLegales
    },
    {
        path: "/politique-confidentialite",
        name: "PolitiqueConfidentialite",
        component: PolitiqueConfidentialite
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