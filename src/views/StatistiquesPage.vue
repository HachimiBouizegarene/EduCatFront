
<template>
    <NavBar></NavBar>
    <main>
        <div id="StatistiquesPage">

            <div id="Top">
                <div id="playerCard">
                    <img :src="$store.state.user.profile_image_url" alt="Photo de profil">
                    <div>
                        <p>{{ $store.state.user.pseudo }}</p>
                        <p>Level: 0</p>
                    </div>
                </div>
                <h1>VOS STATISTIQUES</h1>
            </div>

            <div id="dixDernieresParties">
                <select v-model="selectedNomJeu" id="nomJeuSelect">
                    <option value="">Tous les jeux</option>
                    <option v-for="jeu in uniqueJeux" :key="jeu">{{ jeu }}</option>
                </select>

                <ul>
                    <li v-for="(partie, index) in filteredParties" :key="index">
                        <img :src="getGameImage(partie.NomJeu)" alt="Image du jeu">
                        <div>
                            <p class="NomJeuDixDernieresParties">{{ partie.NomJeu }}</p>
                            <p class="DatedixDernieresParties">{{ partie.DatePartie }}</p>
                        </div>
                        <p class="ScoredixDernieresParties">Score : {{ partie.ScorePartie }}</p>
                    </li>
                </ul>
            </div>

            <h2 id="gamesListBarTitle">Statistiques de tous les jeux :</h2>
            <div id="statistiques-par-jeux">
                <template v-for="(jeu, key) in jeux" :key="key">
                    <div class="gameButton" @mouseover="hoverCardVisible[key] = true"
                        @mouseleave="hoverCardVisible[key] = false">
                        <img :src="jeu.ImageJeu" :alt="jeu.NomJeu">
                        <h5>{{ jeu.NomJeu }}</h5>
                        <div class="hover-card" :class="{ 'visible': hoverCardVisible[key] }">
                            <h5>Parties jouées : {{ groupedByIdJeu[jeu.NomJeu] || 0 }}</h5>
                            <router-link :to="{ name: jeu.NomJeu }">JOUER</router-link>
                        </div>
                    </div>
                </template>
            </div>

            <div style="position: relative; width:300px; margin:200px;">
                <canvas id="jeuxLesPlusJoueesChart"></canvas>
            </div>


        </div>
    </main>
    <FooterComp></FooterComp>
</template>

<script>
import NavBar from "@/components/all/NavBar.vue"
import Chart from 'chart.js/auto';
import FooterComp from "@/components/all/FooterComp.vue"

export default {
    name: "StatistiquesPage",

    components: {
        NavBar,
        FooterComp,
    },

    async mounted() {

        await this.getPartiesInfos();
        await this.getGamesInfos();

        console.log(this.parties)
        console.log(this.jeux)


        new Chart(document.getElementById("jeuxLesPlusJoueesChart"), {
            type: 'doughnut',
            data: {
                labels: Object.keys(this.groupedByIdJeu),
                datasets: [
                    {
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: Object.values(this.groupedByIdJeu),
                    }
                ]
            },
        });
    },

    data() {
        return {
            parties: [], // Assurez-vous que parties est initialisé comme un tableau vide
            jeux: [],
            hoverCardVisible: {},
            selectedNomJeu: '',
        };
    },


    computed: {
        groupedByIdJeu() {
            return this.parties.reduce((result, partie) => {
                const NomJeu = partie.NomJeu;

                // Vérifiez si NomJeu est défini avant d'accéder à result[NomJeu]
                if (NomJeu !== undefined) {
                    result[NomJeu] = (result[NomJeu] || 0) + 1;
                    this.jeuxJoues = result;
                }

                return result;
            }, {});
        },

        uniqueJeux() {
            // Obtenez la liste unique des noms de jeu
            return [...new Set(this.parties.map(partie => partie.NomJeu))];
        },
        filteredParties() {
            let filtered = this.parties;

            // Filtrez les parties par le nom de jeu sélectionné
            if (this.selectedNomJeu) {
                filtered = filtered.filter(partie => partie.NomJeu === this.selectedNomJeu);
            }

            // Triez les parties filtrées par date de manière décroissante
            const sortedParties = filtered.slice().sort((a, b) => new Date(b.DatePartie) - new Date(a.DatePartie));

            // Sélectionnez les 10 dernières parties
            return sortedParties.slice(0, 10);
        },
    },


    methods: {

        async getPartiesInfos() {
            try {
                await fetch("http://localhost:9090/getPartiesInfos", {
                    method: "POST",
                    body: JSON.stringify({
                        "jws": this.$cookies.get("jws")
                    })
                })
                    .then((res) => res.json())
                    .then((partiesData) => { if (Array.isArray(partiesData)) this.parties = partiesData; });

            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },

        async getGamesInfos() {
            try {
                await fetch("http://localhost:9090/getGamesInfos", { method: "POST" })
                    .then((res) => res.json())
                    .then((jeuxData) => { if (Array.isArray(jeuxData)) this.jeux = jeuxData; });

            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }

            // remplacer l'ancienne valeur de l'image par l'url correcte !
            this.jeux.forEach(jeu => {
                if (Array.isArray(jeu.ImageJeu)) {
                    try {
                        const imageBlob = new Blob([new Uint8Array(jeu.ImageJeu)], { type: "image/webp" });
                        const imageUrl = URL.createObjectURL(imageBlob);
                        jeu.ImageJeu = imageUrl;
                    } catch (error) {
                        console.error("Erreur de convertion de l'image reçue en BD", error);
                    }
                } else {
                    // Image par défaut
                    jeu.ImageJeu = require("@/assets/images/games_menu/no_images.png");
                }
            });
        },

        getGameImage(nomJeu) {
            const jeu = this.jeux.find(j => j.NomJeu === nomJeu);
            return jeu ? jeu.ImageJeu : require("@/assets/images/games_menu/no_images.png");
        },


    }
}
</script>

<style scoped>
main {
    background-image: url('@/assets/images/statistics_page/background.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;

    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#StatistiquesPage {
    width: 70vw;
    margin: 150px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    /* background-color: #fff; */
}

#Top {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 100px;
}

#Top h1 {
    flex: 2;
    color: white;
    text-align: center;
    font-weight: 100;
    font-family: 'pixel';
    font-size: 40px;
}

#statistiques-par-jeux {
    display: flex;
    width: 100%;
    height: 200px;
    padding: 12px;
    background-color: #101823;
    /* border-radius: 8px; */
    margin-bottom: 150px;
    position: relative;
    /* background: linear-gradient(90deg, rgb(197 148 0) 0%, rgb(255 208 80) 13%, rgb(255 217 113 / 63%) 100%); */
    border-left: 4px solid rgb(255 255 255);
    box-sizing: border-box;
}

#playerCard {
    width: 285px;
    height: 100px;
    /* border-radius: 5px; */
    background-color: #101823;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    overflow: hidden;
}

#playerCard img {
    height: 70%;
    object-fit: contain;
    border-radius: 120px;
    margin-left: 15px;
}

#playerCard div {
    margin-left: 30px;
    font-size: 18px;
}

/* Game Button */
.gameButton {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
    margin: auto;
    border: 2px solid rgba(22, 22, 22, 0);
    border-radius: 8px;
    padding: 0px 3px;
    width: 150px;
    height: 180px;
}

.gameButton:hover img {
    filter: brightness(0.9);
}

.gameButton img {
    border-radius: 8px;
    object-fit: contain;
    transition: 0.2s;
    width: 150px;
    height: 150px;
    image-rendering: pixelated;
}

.gameButton h5 {
    font-size: 16px;
    font-weight: 100;
    line-height: 1em;
    font-family: 'gamesPage', 'Roboto Condensed';
    color: #ffffff;
    margin-bottom: 10px;
}

.hover-card {
    display: none;
    /* display: flex; */
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 14px 20px 14px;
    position: absolute;
    bottom: -123px;
    font-weight: 100;
    color: white;
    background-image: url("@/assets/images/statistics_page/stat_bubble.png");
    background-size: contain;
    background-position: bottom;
    background-repeat: no-repeat;
    width: 200px;
    height: 150px;
}

.hover-card.visible {
    display: flex;
}

.hover-card h4 {
    color: #2c374b;
}

.hover-card h5 {
    color: #2c374b;
}

.hover-card a {
    background-color: rgb(255, 187, 0);
    font-family: 'pixel';
    text-decoration: none;
    text-align: center;
    color: rgb(49, 49, 49);
    font-size: 12px;
    transition: 0.2s ease;
    padding: 5px 15px;
    width: fit-content;
}

.hover-card a :hover {
    filter: brightness(1.4);
}

#nomJeuSelect {
    border: none;
    width: 211px;
    font-size: 18px;
    padding: 8px;
    background-color: #ffffff30;
    color: #ffffff;
    margin-bottom: 10px;
}

#nomJeuSelect option {
    background-color: rgba(34, 34, 34, 1);
    border: none;
}

#gamesListBarTitle {
    font-family: 'gamesPage';
    font-size: 29px;
    width: 100%;
    padding: 4px 0px;
    color: #ffffff;
    font-weight: 100;
    text-align: center;
    margin-bottom: 10px;
}

#jeuxLesPlusJoueesChart {
    width: 200px;
    height: 200px;
}

#dixDernieresParties {
    width: 100%;
    color: white;
    margin-bottom: 80px;
}

#dixDernieresParties li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(36, 27, 0);
    background: linear-gradient(90deg, rgba(143, 107, 0, 0.1) 0%, rgba(98, 185, 166, 0.8) 13%, rgba(98, 185, 166, 0.7) 100%);
    padding: 12px;
    border-left: 4px solid rgba(25, 214, 0, 0.479);
    margin: 2px 0px;
}

#dixDernieresParties li div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 12px;
    padding-left: 3vw;
    flex: 2;
}

#dixDernieresParties li img {
    width: 60px;
    object-fit: contain;
    border-radius: 9px;
}

#dixDernieresParties p {
    flex: 2;
    text-align: center;
}

.NomJeuDixDernieresParties {
    font-size: 22px;
}

.DatedixDernieresParties {
    font-size: 12px;
    color: #ffffffb2;
}

.ScoredixDernieresParties {
    font-size: 22px;
}


/* ------------------- Media Query ---------------------*/

@media only screen and (max-width: 800px) {}

@media only screen and (max-width: 550px) {}

/* Media queries pour les petits écrans (mobiles) */
@media only screen and (max-width: 360px) {}



/* ------------------- KeyFrame ---------------------*/

@keyframes shake {

    10%,
    90% {
        transform: translate(0%, -50%) scale(1) translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate(0%, -50%) scale(1) translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate(0%, -50%) scale(1) translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate(0%, -50%) scale(1) translate3d(4px, 0, 0);
    }
}

@keyframes bubble {
    0% {
        transform: translate(0%, -50%) scale(1);
    }

    50% {
        transform: translate(0%, -50%) scale(1.1);
    }

    100% {
        transform: translate(0%, -50%) scale(1);
    }
}


/* Appliquer l'animation à un élément */
.bubble {
    animation: bubble 4s infinite ease-in-out;
}

.shake {
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
}
</style>
