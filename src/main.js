import { createApp } from 'vue'
import { createStore } from 'vuex'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    components,
    directives,
});

const store = createStore({
    state() {
        return {
            user_pulled  : false, 
            user : {
                profile_image_url : null,
                name : null,
                forename : null,
                email : null,
                classe : null,
                pseudo : null,
                xp  : null,
                eCats : null,
                defis: [],
                avatarId : null
            }            
        }
    },
    getters: {
        user: state => state.user,
    },
    actions: {
        async fetchUser({ commit, state }, body) {
            if (state.user_pulled && !body.force) return
            const data = await fetch("http://localhost:9090/getProfile", {
                method: "POST",
                body: JSON.stringify({
                    jws: body.jws
                })
            }).then((res) => {
                return res.json();
            })
            //image
            if (data.avatar) {
                let blob = new Blob([new Uint8Array(data.avatar)], { type: "image/png" })
                let url = URL.createObjectURL(blob);
                data.img_url = url
            } else {
                data.img_url = require("@/assets/images/profile/empty_profile.png")
            }
            commit('setUser', data)
        },

        async fetchDefis({ commit, state }, body) {
            if (state.user_pulled && !body.force) return
            const data = await fetch("http://localhost:9090/getDefisJoueur", {
                method: "POST",
                body: JSON.stringify({
                    jws: body.jws
                })
            }).then((res) => {
                return res.json();
            })
            commit('setDefis', data)
        },

        async updateEcats({ commit }, body){
            await fetch("http://localhost:9090/getEcats", {
                method: "POST",
                body: JSON.stringify({
                    jws: body.jws
                })
            }).then((res) => {
                res.json().then(json =>{
                    if (json.error == undefined){
                        commit("setEcats", json.ecats)
                    }
                }) 
            })
        },


        async wait_user_pulled({ state }) {
            return new Promise((res) => {
                setInterval(() => {
                    if (state.user_pulled) res()
                }, 100)
            })
        },
    },

    mutations: {
        setUser(state, data) {
            state.user.profile_image_url = data.img_url
            state.user.name = data.name
            state.user.forename = data.forename
            state.user.email = data.email
            state.user.classe = data.classe
            state.user.pseudo = data.pseudo
            state.user.level = data.level
            state.user.percentage = data.percentage
            state.user.ecats = data.ecats
            state.user.avatarId = data.avatarId
            state.user_pulled = true
            
        },
        setDefis(state, data) {
            state.user.defis = data
        },
        setEcats(state, ecats){
            state.user.ecats = ecats
        }
    }
})

const Vue = createApp(App)
Vue.use(router).use(store).use(VueCookies).use(vuetify).mount('#app')
