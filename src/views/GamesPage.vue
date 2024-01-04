
<template>
    <NavBar></NavBar>

    <MazeComponent />
    <div id="gamesPage">
        <div id="gameMenu">

            <div id="gameMenuTopBar">
                <h2>TOUS LES JEUX</h2>
                <div id="searchBar"><input type="text" name="searchBar">
                    <img src="@/assets/images/games_menu/searchBar.png">
                </div>
            </div>

            <div id="gamesList">
                <router-link v-for="(jeu, key) in jeux" :key="key" :to="{ name: jeu.NomJeu }">
                    <div class="gameButton">
                    <img :src="jeu.imageUrl" :alt="jeu.NomJeu">
                    <h5>{{ jeu.NomJeu }}</h5>
                </div>
                </router-link>
            </div>

        </div>
    </div>

    <FooterV></FooterV>
</template>


<script>
import NavBar from "@/components/all/NavBar.vue"
import FooterV from "@/components/all/FooterComp.vue"

export default {
    name: "GamesPage",

    components: {
        NavBar,
        FooterV
    },

    mounted() {
        this.genererBoutonsJeux();
    },

    data() {
        return {
            jeux: [],
        };
    },

    methods: {

        async genererBoutonsJeux() {
            try {
                const response = await fetch("http://localhost:9090/getGamesInfos", { method: "POST" });
                const jeuxData = await response.json();

                if (Array.isArray(jeuxData)) {
                    this.jeux = jeuxData;
                }



                // Attendre que toutes les images soient récupérées avant de créer les boutons
                await Promise.all(this.jeux.map(async (jeu) => {
                    jeu.imageUrl = await this.getImageJeuURL(jeu.IdJeu);
                }));
                
                console.log(this.jeux);
            } catch (e) {
                console.error(e);
            }
        },

        async getImageJeuURL(id) {
            const response = await fetch("http://localhost:9090/getGamesImages", {
                method: "POST",
                body: JSON.stringify({
                    "IdJeu": id.toString(),
                })
            });

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);

            console.log(imageUrl);

            return imageUrl;
        },
    }
}
</script>

<style>
/* Game Button */

.gameButton {
    width: 150px;
    height: 182px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: auto;
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
</style>

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
    flex-direction: column;
    margin: auto;
    width: 90%;
    max-width: 800px;
    margin-top: 10%;
}

/* Game MenuTopBar */

#gameMenuTopBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px;
}

#gameMenuTopBar h2 {
    font-family: 'pixel', 'Roboto Condensed';
    font-size: 35px;
    text-align: center;
}

/* Game List */

#gamesList {
    column-gap: 12px;
    display: grid;
    grid-column-gap: 12px;
    grid-row-gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    width: 100%;
    padding: 12px;
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

@media only screen and (max-width: 920px) {}

@media only screen and (max-width: 550px) {
    #gameMenuTopBar h2 {
        font-size: 30px;
    }

}

/* Media queries pour les petits écrans (mobiles) */
@media only screen and (max-width: 480px) {
    #gameMenuTopBar h2 {
        font-size: 25px;
    }

    #searchBar {
        width: 176px;
    }

    #searchBar input {
        font-size: 12px;
    }

    #gameMenuTopBar {
        flex-direction: column;
        width: auto;
        height: 100px;
        justify-content: space-around;
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

/* ------------------- FONTS FACES ---------------------*/

@font-face {
    font-family: 'pixel';
    /* Nom de la police */
    src: url('@/assets/fonts/pixel.ttf') format('truetype');
    /* Chemin vers le fichier WOFF */
    /* Ajoute d'autres formats de fichiers de police si nécessaire */
}

@font-face {
    font-family: 'gamePage';
    /* Nom de la police */
    src: url('@/assets/fonts/gamePage.ttf') format('truetype');
    /* Chemin vers le fichier WOFF */
    /* Ajoute d'autres formats de fichiers de police si nécessaire */
}

@font-face {
    font-family: 'VT323';
    /* Nom de la police */
    src: url('@/assets/fonts/VT323-Regular.ttf') format('truetype');
    /* Chemin vers le fichier WOFF */
    /* Ajoute d'autres formats de fichiers de police si nécessaire */
}
</style>
