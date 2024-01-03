<template>
    <div id="game">
        <!-- <h1 id="leftTitlecenterGamePage">Tu dois trouver la région indiquée avant que le chronomètre ne s’écoule !</h1> -->
        <!-- faire un pop up qui dure 3s qui prévient que la game va commencer -->
        <!-- <button class="randomRegionButtonStopped" id="randomRegionButton">Lancer</button> -->

        <div v-html="mapSVGPixeled"></div>
        <div v-html="mapSVGHidden"></div>

        <img src="@/assets/images/games/GeographieMaps/Abbandon_Button.gif" id="stopButton" @click="stopGame">
        <img class="cloud-cadre" src="@/assets/images/games/GeographieMaps/clouds/cloud_cadre_left.png">
        <img class="cloud-cadre cloud_cadre_right" src="@/assets/images/games/GeographieMaps/clouds/cloud_cadre_right.png">
        <span v-if="gameInProgress == true" id="ProgressBar"></span>

        <!-- <button class="randomRegionButtonStopped bubble" id="randomRegionButton">COMMENCER</button> -->
        <div id="randomRegionButton" class="bubble">
            <img v-if="wrongRegionAndAntiSpam == false" src="@/assets/images/games/GeographieMaps/Region_Button.gif" />
            <img v-if="wrongRegionAndAntiSpam != false"
                src="@/assets/images/games/GeographieMaps/Region_Button-False.gif" />
            <h3 id="randomRegionButtonText">COMMENCER</h3>
        </div>

        <img src="@/assets/images/games/GeographieMaps/clouds/cloud1.png" id="cloud0" class="cloud">
        <img src="@/assets/images/games/GeographieMaps/clouds/cloud2.png" id="cloud1" class="cloud">
        <img src="@/assets/images/games/GeographieMaps/clouds/cloud2.png" id="cloud2" class="cloud">
        <img src="@/assets/images/games/GeographieMaps/clouds/cloud4.png" id="cloud3" class="cloud">

        <p v-if="gameInProgress == true" id="counterLeftQuestion">-/-</p>

        <img v-for="index in 2" :key="index"
            :style="{ top: this.decoration_positions[index].top, left: this.decoration_positions[index].left }"
            class="decoration" :src="require('@/assets/images/games/GeographieMaps/decoration_' + index + '.gif')"
            @click="pop">

        <img id="greenCheck" src="@/assets/images/games/GeographieMaps/green_check.png" class="displayHidden"
            alt="greenCheck" />

        <div class="overlayPopup"></div>
        <div id="EndGame" class="popup">
            <span class="close" @click="fermerPopup('EndGame')">&times;</span>
            <h2>SCORE :</h2>
            <P>Régions trouvées :
            <p id="scoreRegionsFound"></p>
            </P>
        </div>
    </div>
</template>

<style>
/* SVG */

#mapSVGPixeled,
#mapSVGHidden {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    transition: 0.2s ease-in;
}

#mapSVGHidden {
    width: 750px;
    opacity: 0;
}

#mapSVGPixeled {
    pointer-events: none;
}

svg image {
    image-rendering: pixelated;
    transition: 0.4s ease;
}

#mapSVGPixeled .hovered,
#mapSVGHidden .hovered {
    filter: brightness(1.7);
    cursor: pointer;
}

@media only screen and (max-width: 920px) {
    #centerGamePage {
        flex-direction: column;
    }

    #mapSVGPixeled,
    #mapSVGHidden {
        width: 500px;
        top: 45%;
    }
}

@media only screen and (max-width: 480px) {

    #mapSVGPixeled,
    #mapSVGHidden {
        width: 370px;
        top: 45%;
    }
}

@media only screen and (max-width: 390px) {

    #mapSVGPixeled,
    #mapSVGHidden {
        width: 330px;
        top: 45%;
    }
}

/* END SVG */
</style>

<style scoped>
#game {
    height: 100vh;
    max-height: 1080px;
    margin: 0;
    background-image: url('@/assets/images/games/GeographieMaps/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    position: relative;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* RANDOM REGION BUTTON */

#randomRegionButton {
    border: none;
    transition: 0.3s ease-out;
    position: absolute;
    /* overflow: hidden; */
    top: 50%;
    left: 20%;
    transform: translate(0%, -50%) scale(1);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

#randomRegionButton img {
    image-rendering: pixelated;
    width: 300px;
    position: absolute;
    z-index: 1;
    transition: 0.2s ease-in;
}

#randomRegionButton h3 {
    color: #FFF;
    text-align: center;
    font-family: 'VT323', 'Roboto Condensed';
    font-size: 45px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.48px;
    position: absolute;
    z-index: 2;
    margin-bottom: 22px;
    white-space: nowrap;
    /* Empêche le texte de revenir à la ligne */
    overflow: hidden;
    /* Cache le texte qui dépasse la largeur du conteneur */
    text-overflow: ellipsis;
}

/* PROGRESS BAR */

#ProgressBar {
    width: 100%;
    height: 25px;
    display: block;
    background-color: #43dd2f;
    position: relative;
}

#ProgressBar::after {
    transition: 0.3s linear;
    content: "";
    position: absolute;
    width: var(--nouvelle-largeur);
    height: 100%;
    top: 0;
    left: 0;
    background-color: #059b05;
}

/* END PROGRESS BAR */

#leftTitlecenterGamePage {
    font-family: 'VT323', 'Roboto Condensed';
    color: #000;
    text-align: center;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 30.2px;
}

/* DECORATIONS */

.cloud-cadre {
    width: auto;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s ease-in;
}

.cloud_cadre_right {
    left: auto;
    right: 0;
}

.decoration {
    position: absolute;
    top: 30%;
    right: 10%;
    cursor: pointer;
    image-rendering: pixelated;
    width: 80px;
    transition: 0.2s ease-in;
}

.decoration:hover {
    filter: brightness(1.1);
}

/* END DECORATIONS */

#greenCheck {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.4);
    width: 500px;
    /* filter: drop-shadow(0 0 8.75rem rgba(255, 255, 255, 1)); */
    z-index: 10;
    transition: 0.2s ease-in;
}

#greenCheck.displayHidden {
    transform: translate(-50%, -50%) scale(0);
    transition: 0.2s ease-in;
}

.noirEtBlancFilter {
    filter: grayscale(100%);
}

#counterLeftQuestion {
    color: rgba(255, 255, 255);
    text-align: center;
    font-family: PIXEL;
    font-size: 50px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.95px;
    position: absolute;
    top: 62%;
    left: 20%;
    transform: translate(-50%, -50%);
    transition: 0.3s ease-out;
}

#stopButton {
    width: 300px;
    height: fit-content;
    image-rendering: pixelated;
    position: absolute;
    bottom: 3%;
    right: 1%;
    filter: brightness(0.75);
    transition: 0.15s ease-in;
}

#stopButton:hover {
    cursor: pointer;
    filter: brightness(1.1);
    bottom: 8%;
    right: 5%;
}

.popup {
    display: none;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-height: 60%;
}

.overlayPopup {
    display: none;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.popDecoration {
    transform: scale(1.1);
    image-rendering: pixelated;
    transition: 0.1s ease-in-out;
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


@keyframes cloud {
    0% {
        margin-left: -100%;
    }

    100% {
        margin-left: 100%;
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

.cloud {
    width: 250px;
    position: absolute;
    animation: cloud 85s linear infinite;
    animation-delay: -25000ms;
    z-index: 100;
    pointer-events: none;
    transition: 0.3s ease-in;
}

#cloud0 {
    top: 5%;
    animation-delay: -30000ms;
    animation-duration: 95s;
}

#cloud1 {
    top: 25%;
    animation-delay: -60000ms;
    animation-duration: 60s;
}

#cloud2 {
    top: 10%;
    animation-delay: -65000ms;
    animation-duration: 90s;
}

#cloud3 {
    top: 45%;
    animation-delay: -50000ms;
    animation-duration: 120s;
}

/* ------------------- Media Query ---------------------*/

@media only screen and (max-width: 920px) {
    #randomRegionButton {
        top: 80%;
        left: 50%;
    }

    #counterLeftQuestion {
        top: 89%;
        left: 50%;
    }

    #stopButton {
        width: 300px;
        bottom: 80%;
        right: 0%;
        filter: brightness(1);
    }

    #stopButton:hover {
        bottom: 80%;
        right: 2%;
    }

    .decoration {
        width: 60px;
    }
}

@media only screen and (max-width: 768px) {
    .cloud-cadre {
        opacity: 0.6;
    }

    .cloud {
        opacity: 0.7;
    }

    #stopButton {
        width: 250px;
    }

    .decoration {
        width: 40px;
    }
}

/* Media queries pour les petits écrans (mobiles) */
@media only screen and (max-width: 480px) {

    .cloud-cadre {
        opacity: 0.2;
    }

    #counterLeftQuestion {
        top: 85%;
    }

    #randomRegionButton {
        top: 75%;
        left: 50%;
    }

    #randomRegionButton img {
        width: 290px;
    }

    .decoration {
        width: 30px;
    }
}

@media only screen and (max-width: 390px) {

    #counterLeftQuestion {
        top: 85%;
    }

    #randomRegionButton {
        top: 75%;
        left: 50%;
    }

    #randomRegionButton img {
        width: 240px;
    }

    .decoration {
        width: 20px;
    }
}


/* ------------------- FONTS FACES ---------------------*/

@font-face {
    font-family: 'pixel';
    /* Nom de la police */
    src: url('@/assets/fonts/pixel.ttf') format('truetype');
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

<script>
import MapsSvgJson from '@/assets/images/games/GeographieMaps/geographie_svg_map.json';

export default {
    name: "GeographieMapGamePage",

    mounted() {
        this.$nextTick(() => {
            document.getElementById('randomRegionButton').addEventListener('click', this.startGame);
        });
    },

    data() {
        return {
            rotation: 0,
            timer: null,
            gameInProgress: false,
            score: 0,
            totalRotations: 5, // Nombre total de toursTimer avant la fin du jeu
            RegionsCliquables: [],
            toursTimer: 0,
            wrongRegionAndAntiSpam: false,
            mapSVGPixeled: MapsSvgJson.svgMapFranceRegionsPixeled,
            mapSVGHidden: MapsSvgJson.svgMapFranceRegionsHidden,
            decoration_positions: [
                {},
                { top: '60%', left: '8%' },
                { top: '20%', left: '9%' },
                { top: '80%', left: '90%' },  // Ajusté à '90%'
                { top: '29%', left: '10%' },  // Ajusté à '10%'
                { top: '35%', left: '4%' }, // Ajusté à '5%'
                { top: '50%', left: '95%' },  // Ajusté à '90%'
                { top: '44.5%', left: '5%' }, // Ajusté à '5%'
                { top: '12%', left: '97%' },  // Ajusté à '90%'
            ],

        };
    },

    methods: {
        setRandomRegion() {
            const randomIndex = Math.floor(Math.random() * this.RegionsCliquables.length);
            const randomRegion = this.RegionsCliquables[randomIndex];

            const buttonTextElement = document.getElementById('randomRegionButtonText');
            buttonTextElement.textContent = randomRegion;

            // Ajuster la taille de police en fonction de la longueur du texte
            const textLength = randomRegion.length;
            const maxSize = 45; // Taille de police maximale
            const minSize = 20; // Taille de police minimale

            let fontSize = maxSize - textLength; // Ajustez cela selon vos besoins

            // Limiter la taille de police minimale
            fontSize = Math.max(fontSize, minSize);

            buttonTextElement.style.fontSize = fontSize + 'px';
        },

        startGame() {
            if (this.gameInProgress) {
                return; // Empêche de démarrer un nouveau jeu pendant que le jeu est en cours
            }

            this.gameInProgress = true;
            this.score = 0;
            this.toursTimer = 0;

            document.getElementById('randomRegionButton').classList.remove("bubble");
            // document.getElementById('counterLeftQuestion').textContent = this.toursTimer + "/" + this.totalRotations;

            this.loadClickablePath();
            this.setRandomRegion();

            this.timer = setInterval(() => {
                this.rotation += 36;

                // Mise à jour de la classe CSS pour l'angle de rotation
                const percentage = (this.rotation % 360) / 360 * 100;
                if (document.getElementById('randomRegionButton').style.background != "red")
                    document.getElementById("ProgressBar").style.setProperty('--nouvelle-largeur', percentage + '%');
                // Exécutez le code que vous souhaitez ici après chaque rotation complète
                if (percentage === 0) {
                    document.getElementById('randomRegionButton').classList.add("shake");
                    this.nextTourTimer();
                }
            }, 1000);
        },

        afficherPopup(id) {
            document.getElementById("overlayPopup").style.display = "block";
            var popup = document.getElementById(id);
            popup.style.display = 'block';
        },

        fermerPopup(id) {
            document.getElementById("overlayPopup").style.display = "none";
            var popup = document.getElementById(id);
            popup.style.display = 'none';
        },

        nextTourTimer() {
            this.toursTimer++;
            console.log(this.toursTimer);
            this.setRandomRegion();
            document.getElementById('counterLeftQuestion').textContent = this.toursTimer + "/" + this.totalRotations;
            if (this.toursTimer >= this.totalRotations) {
                this.stopGame();
            }
        },

        loadClickablePath() {
            // Sélectionnez la div contenant l'élément SVG
            var pathElements = document.getElementById("mapSVGHidden").getElementsByTagName("path");

            for (var i = 0; i < pathElements.length; i++) {
                var idValue = pathElements[i].getAttribute("id");
                if (idValue) {
                    if (/^[A-ZÀ-ÖØ-Ý]$/.test(idValue[0])) {
                        pathElements[i].classList.add("hovered");

                        // Uniquement visuel pour pouvoir hover la map pixelisée
                        pathElements[i].addEventListener('mouseenter', (e) => {
                            document.querySelector('g#' + e.target.getAttribute("id")).firstElementChild.classList.add("hovered");
                        });
                        pathElements[i].addEventListener('mouseout', (e) => {
                            document.querySelector('g#' + e.target.getAttribute("id")).firstElementChild.classList.remove("hovered");
                        });

                        // la region va dans le tableau des regions
                        this.RegionsCliquables.push(idValue);

                        // Ajoutez un event listener à chaque région
                        pathElements[i].addEventListener("click", this.clicSurUneRegion);
                    }
                }
            }
        },

        clicSurUneRegion(event) {
            if (!this.gameInProgress || this.wrongRegionAndAntiSpam) {
                return; // Ignorer les clics si le jeu n'est pas en cours ou si le joueur a déjà cliquer très récemment
            }

            var clickedRegion = event.target.getAttribute("id");
            console.log("Région cliquée :", clickedRegion);
            // vérifier si la région cliquée est correcte
            if (clickedRegion == document.getElementById('randomRegionButton').textContent) {
                this.score++;
                console.log("Score :", this.score);
                this.nextTourTimer();
                this.rotation = 0;
                setTimeout(() => {
                    document.getElementById('greenCheck').classList.remove("displayHidden");
                    document.getElementById('mapSVGPixeled').classList.add("noirEtBlancFilter");

                    // délai de 1000 millisecondes (1 seconde)
                    setTimeout(() => {
                        document.getElementById('greenCheck').classList.add("displayHidden");
                        document.getElementById('mapSVGPixeled').classList.remove("noirEtBlancFilter");
                    }, 800);
                }, 0);
            } else {
                setTimeout(() => {
                    document.getElementById('randomRegionButton').classList.add("shake");
                    this.wrongRegionAndAntiSpam = true;
                    // délai de 1000 millisecondes (1 seconde)
                    setTimeout(() => {
                        document.getElementById('randomRegionButton').classList.remove("shake");
                        this.wrongRegionAndAntiSpam = false;
                    }, 1000);
                }, 0);

            }
        },

        stopGame() {
            if (this.gameInProgress == false) {
                return;
            }

            // document.getElementById('scoreRegionsFound').textContent = "test";
            // this.afficherPopup("EndGame");
            this.toursTimer = 0; // Réinitialise le compteur de toursTimer après avoir trouvé la bonne région
            this.gameInProgress = false;
            clearInterval(this.timer);
            this.rotation = 0;
            document.getElementById('randomRegionButton').classList.add("bubble");
            document.getElementById("ProgressBar").style.setProperty('--nouvelle-largeur', 0 + '%');
            document.getElementById('randomRegionButtonText').textContent = "COMMENCER";
            document.getElementById('randomRegionButtonText').style.fontSize = '45px';

            document.getElementById('counterLeftQuestion').textContent = 0 + "/" + this.totalRotations;
            // logique pour la fin du jeu

            // Sélectionnez la div contenant l'élément SVG
            var pathElements = document.getElementById("mapSVGHidden").getElementsByTagName("path");
            for (var i = 0; i < pathElements.length; i++) {
                pathElements[i].classList.add("hovered");

                // Uniquement visuel pour pouvoir hover la map pixelisée
                pathElements[i].addEventListener('mouseenter', (e) => {
                    document.querySelector('g#' + e.target.getAttribute("id")).firstElementChild.classList.add("hovered");
                });
                pathElements[i].addEventListener('mouseout', (e) => {
                    document.querySelector('g#' + e.target.getAttribute("id")).firstElementChild.classList.remove("hovered");
                });
            }
        },

        pop(e) {
            console.log(e.target);
            if (!e.target.classList.contains("popDecoration")) {
                setTimeout(() => {
                    e.target.classList.add("popDecoration");
                    setTimeout(() => {
                        e.target.classList.remove("popDecoration");
                    }, 400);
                }, 0);
            }
        },
    }
}
</script>
