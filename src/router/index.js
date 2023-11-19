import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue"
import Login from "@/views/LoginPage.vue"
import Membre from "@/views/MembrePage.vue"
import Signin from "@/views/SigninPage.vue"
import Labyrinth from "@/views/games/LabyrinthPage.vue"
import Test from "@/views/TestPage.vue"

const routes = [
    {
        path: "/Lab",
        name : "LabPage",
        component : Labyrinth
    }
    ,
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
    ,{
        path: "/test",
        name : "TestPage",
        component : Test
    }
]


const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;