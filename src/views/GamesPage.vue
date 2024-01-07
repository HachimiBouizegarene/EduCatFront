
<template>
    <NavBar></NavBar>

    <div id="gamesPage">
        <div id="gameMenu">

            <div id="gameMenuTopBar">
                <h2>TOUS LES JEUX</h2>
                <div id="searchBar"><input type="text" name="searchBar">
                    <img src="@/assets/images/games_menu/searchBar.png">
                </div>
            </div>

            <div class="gamesListBar">
                <!-- <div class="arrowScrollButton" @click="scrollGamesList('left')">←</div> -->
                <router-link v-for="(jeu, key) in jeux" :key="key" :to="{ name: jeu.NomJeu }">
                    <div class="gameButton">
                        <img :src="jeu.ImageJeu" :alt="jeu.NomJeu">
                        <h5>{{ jeu.NomJeu }}</h5>
                    </div>
                </router-link>
                <!-- <div class="arrowScrollButton" @click="scrollGamesList('right')">→</div> -->
            </div>


            <template v-for="(matiere, matiereIndex) in matieres" :key="matiereIndex">
                <h3 class="gamesListBarTitle">{{ matiere }}</h3>

                <!-- <div class="arrowScrollButton" @click="scrollGamesList('left')">←</div> -->
                <div class="gamesListBar">
                    <router-link v-for="(jeu, jeuIndex) in filteredJeux(matiere)" :key="jeuIndex"
                        :to="{ name: jeu.NomJeu }">
                        <div class="gameButton">
                            <img :src="jeu.ImageJeu" :alt="jeu.NomJeu">
                            <h5>{{ jeu.NomJeu }}</h5>
                        </div>
                    </router-link>
                </div>
                <!-- <div class="arrowScrollButton" @click="scrollGamesList('right')">→</div> -->
            </template>

        </div>
    </div>

    <!-- <FooterComp></FooterComp> -->
</template>


<script>
import NavBar from "@/components/all/NavBar.vue"
// import FooterComp from "@/components/all/FooterComp.vue"

export default {
    name: "GamesPage",

    components: {
        NavBar,
        // FooterComp   
    },

    mounted() {
        this.getGamesInfos();
    },
    created(){
        if(!this.$cookies.get('jws')) this.$router.push("/login")
    },

    data() {
        return {
            jeux: [],
            matieres: [],
            matiere: undefined,
        };
    },

    computed: {
        filteredJeux() {
            return (matiere) => {
                if (matiere === undefined) {
                    return this.jeux;
                } else {
                    console.log(matiere);
                    console.log(this.jeux.filter(jeu => jeu.matiere === matiere));
                    return this.jeux.filter(jeu => jeu.NomMatiere === matiere);
                }
            };
        }
    },

    methods: {

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

                let matiere = jeu['NomMatiere'];
                if (!this.matieres.includes(matiere))
                    this.matieres.push(matiere);
            });
        },

        scrollGamesList(direction) {
            const gamesListContainer = document.querySelector('gamesListBar');
            const scrollAmount = 200; // Ajustez la quantité de défilement selon vos préférences
            const currentScrollLeft = gamesListContainer.scrollLeft;

            if (direction === 'left') {
                gamesListContainer.scrollLeft = currentScrollLeft - scrollAmount;
            } else if (direction === 'right') {
                gamesListContainer.scrollLeft = currentScrollLeft + scrollAmount;
            }
        },
    }
}
</script>

<style scoped>
#header {
    background-color: white;
}

#gamesPage {
    overflow: hidden;
    position: relative;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #fafafa;
}

#gameMenu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin: auto;
    width: 80vw;
    position: relative;
    margin-top: 120px;

}

/* Game MenuTopBar */

#gameMenuTopBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px;
    height: 35px;
    background-color: rgb(255, 187, 0);
}

#gameMenuTopBar h2 {
    font-family: 'gamesPage', 'Roboto Condensed';
    font-size: 45px;
    text-align: center;
    color: #313131;
    font-weight: 100;
}

/* Game List Bar */

.gamesListBar {
    display: flex;
    overflow-x: auto;
    /* display: grid;
    grid-column-gap: 12px;
    grid-row-gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); */
    width: 100%;
    padding: 12px;
    background-color: white;
    border-radius: 8px;
    margin-bottom: 30px;
    position: relative;
}

.gamesListBarTitle {
    font-family: 'gamesPage';
    font-size: 29px;
    width: 100%;
    padding: 4px 0px;
    color: #313131;
    font-weight: 100;
}

.arrowScrollButton {

    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background-color: red;
    color: #ffffff;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.arrowScrollButton:nth-child(2) {}

/* Game Button */

.gameButton {
    width: 150px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: auto;
    border: 2px solid rgba(22, 22, 22, 0);
    border-radius: 8px;
    padding: 0px 3px;
}

.gameButton:hover img{
    filter: brightness(0.9);
}

.gameButton img {
    border-radius: 8px;
    object-fit: contain;
    transition: 0.2s;
}

.gameButton h5 {
    font-size: 16px;
    font-weight: 100;
    line-height: 1em;
    overflow: hidden;
    font-family: 'gamesPage', 'Roboto Condensed';
}

/* Search bar */

#searchBar {
    border: none;
    transition: 0.3s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: text;
    width: 25vw;
    max-width: 200px;
    min-width: 100px;
    position: relative;
}

#searchBar input {
    all: unset;
    color: #000000;
    text-align: left;
    font-family: 'gamesPage', 'Roboto Condensed';
    font-size: 2.5vw;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.48px;
    z-index: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    max-width: 180px;
    width: 100%;
    position: absolute;
    padding: 0px 10px;
    box-sizing: border-box;
}

#searchBar img {
    image-rendering: pixelated;
    z-index: 1;
    transition: 0.2s ease-in;
    width: 100%;
    object-fit: contain;
}

/* ------------------- Media Query ---------------------*/

@media only screen and (max-width: 800px) {
    #gameMenuTopBar h2 {
        font-size: 5vw;
    }

    .gameButton {
        width: 118px;
    }

    .gameButton h5 {
        font-size: 15px;
    }
}

@media only screen and (max-width: 550px) {}

/* Media queries pour les petits écrans (mobiles) */
@media only screen and (max-width: 360px) {
    #gameMenuTopBar {
        flex-direction: column;
    }

    #gameMenuTopBar h2 {
        font-size: 25px
    }

    #searchBar input {
        font-size: 12px;
    }

}



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


@media only screen and (max-width: 390px) {}
</style>
