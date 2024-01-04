
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

            <div id="gamesListBar">
                <!-- <div class="arrowScrollButton" @click="scrollGamesList('left')">←</div> -->
                <router-link v-for="(jeu, key) in jeux" :key="key" :to="{ name: jeu.NomJeu }">
                    <div class="gameButton">
                        <img :src="jeu.ImageJeu" :alt="jeu.NomJeu">
                        <h5>{{ jeu.NomJeu }}</h5>
                    </div>
                </router-link>
                <!-- <div class="arrowScrollButton" @click="scrollGamesList('right')">→</div> -->
            </div>

            <div id="gamesListBar">
                <!-- <div class="arrowScrollButton" @click="scrollGamesList('left')">←</div> -->
                <router-link v-for="(jeu, key) in jeux" :key="key" :to="{ name: jeu.NomJeu }">
                    <div class="gameButton">
                        <img :src="jeu.ImageJeu" :alt="jeu.NomJeu">
                        <h5>{{ jeu.NomJeu }}</h5>
                    </div>
                </router-link>
                <!-- <div class="arrowScrollButton" @click="scrollGamesList('right')">→</div> -->
            </div>

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

    data() {
        return {
            jeux: [],
            
        };
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
            });

        },

        scrollGamesList(direction) {
            const gamesListContainer = document.getElementById('gamesListBar');
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
#gamesPage {
    height: 100vh;
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
    height: 50px;
    background-color: rgb(155, 155, 155);
}

#gameMenuTopBar h2 {
    font-family: 'pixel', 'Roboto Condensed';
    font-size: 35px;
    text-align: center;
}

/* Game List Bar */

#gamesListBar {
    display: flex;
    overflow-x: auto;
    /* display: grid;
    grid-column-gap: 12px;
    grid-row-gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); */
    width: 100%;
    padding: 12px;
    background-color: #f0f0f0;
    border-radius: 8px;
    margin-bottom: 30px;
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
    height: 182px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: auto;
    border: 2px solid rgba(22, 22, 22, 0);
    border-radius: 8px;
    padding: 3px;
}

.gameButton:hover {
    border: 2px solid rgba(22, 22, 22, 0.40);
}

.gameButton img {
    border-radius: 8px;
    object-fit: contain;
    width: 150px;
}

.gameButton h5 {
    font-size: 16px;
    font-weight: 400;
    line-height: 1em;
    overflow: hidden;
    font-family: 'gamePage', 'Roboto Condensed';
}


/* Search bar */

#searchBar {
    border: none;
    transition: 0.3s ease-out;
    transform: translate(0%, -50%) scale(1);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 25vw;
    max-width: 200px;
    background-color: #c44040;
}

#searchBar input {
    all: unset;
    color: #000000;
    text-align: left;
    font-family: 'gamePage', 'Roboto Condensed';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.48px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    max-width: 180px;
    width: 100%;
}

#searchBar img {
    image-rendering: pixelated;
    position: absolute;
    right: 0;
    z-index: 1;
    transition: 0.2s ease-in;
    width: 100%;
}

/* ------------------- Media Query ---------------------*/

@media only screen and (max-width: 800px) {
    #gameMenuTopBar {
        flex-direction: column;
    }
}

@media only screen and (max-width: 550px) {}

/* Media queries pour les petits écrans (mobiles) */
@media only screen and (max-width: 480px) {}



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
