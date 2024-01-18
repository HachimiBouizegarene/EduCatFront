<template>
    <navBar></navBar>
    <main>
        <div class="paralaxe">
            <ParalaxComp></ParalaxComp>
        </div>
        <section class="accueil-section">
            <h3>DE NOMBREUX JEUX EDUCATIFS DANS DIFFERENTES MATIERES</h3>
            <p>DE NOMBREUX JEUX IMAGINES PAR DES ETUDIANTS, POUR DES ETUDIANTS AFIN DE REUSSIR AU MIEUX A COMPRENDRE TOUT EN
                S'AMUSANT !</p>
        </section>

        <div id="best-games">
            <h3>NOS DERNIERS JEUX !</h3>
            <div class="game" @click="this.$router.push('/maitre-du-monde')">
                <img class="cadre" src="@/assets/images/home/cadre_best_games.webp">
                <img class="img" :src="url_game_1">
                <h5>{{title_game_1}}</h5>
            </div>
            <div class="game" @click="this.$router.push('/conjugue-pour-fuir')">
                <img class="cadre" src="@/assets/images/home/cadre_best_games.webp">
                <img class="img" :src="url_game_2">
                <h5>{{title_game_2}}</h5>
            </div>
            <router-link to="/jeux">JOUER</router-link>

        </div>
         <!-- <FooterComp></FooterComp> -->
    </main>
    <FooterComp></FooterComp>
</template>

<script>
import navBar from "@/components/all/NavBar.vue"
import ParalaxComp from "@/components/home/ParalaxComp.vue";
import FooterComp from "@/components/all/FooterComp.vue";
// import FooterComp from "@/components/all/FooterComp.vue"

export default {
    name: "HomePageRemake",
    components: {
        navBar,
        ParalaxComp,
        FooterComp
        // FooterComp
    },

    data() {
        return {
            url_game_1: "",
            url_game_2: "",
            title_game_1 : "",
            title_game_2 : ""
        }
    },
    
    unmounted(){
        document.querySelector("#app").style.backgroundColor = ""
    },

    async mounted() {
        document.querySelector("#app").style.backgroundColor = "#9dcdf5"
        let games;
        try {
            games = await fetch("http://localhost:9090/getGamesInfos", { method: "POST" })
                .then((res) => res.json())
                .then((jeuxData) => { if (Array.isArray(jeuxData)) return jeuxData });
        } catch (error) {
            console.error("Erreur d'accès à l'API", error);
        }


        // // remplacer l'ancienne valeur de l'image par l'url correcte !
        games.forEach(jeu => {
            if (Array.isArray(jeu.ImageJeu) && (jeu.IdJeu == 1 || jeu.IdJeu == 2)) {
                try {
                    const imageBlob = new Blob([new Uint8Array(jeu.ImageJeu)], { type: "image/webp" });
                    const imageUrl = URL.createObjectURL(imageBlob);
                    jeu.ImageUrl = imageUrl;
                } catch (error) {
                    console.error("Erreur de convertion de l'image reçue en BD", error);
                    return
                }
            } else {
                jeu.ImageUrl = require("@/assets/images/games_menu/no_images.png");
            }
            if(jeu.IdJeu == 1 ){
                this.title_game_1 = jeu.NomJeu
                this.url_game_1 =  jeu.ImageUrl
            } 
            if(jeu.IdJeu == 2 ){
                this.title_game_2 = jeu.NomJeu
                this.url_game_2 =  jeu.ImageUrl
            } 
        });
    }
}
</script>
<style scoped>
main {
    background: linear-gradient(0deg, rgba(156, 205, 245, 1) 0%, rgba(255, 255, 255, 1) 100%);
}

.paralaxe {
    display: block;
    height: fit-content;
    width: auto;
    overflow: hidden;
    position: relative;
}

.accueil-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3vw;
    background-color: #5cb7fd;
    gap: 2vw;
    box-sizing: border-box;
    margin-top: 3vw;
    margin-bottom: 5vw;
}

.accueil-section p,
.accueil-section h3 {
    font-family: 'pixel';
    text-align: center;
    color: rgb(44, 55, 75);

}

.accueil-section h3 {
    font-size: 2vw;
    color: white;
}

.accueil-section p {
    color: white;
    font-size: 1.2vw;
    box-sizing: border-box;
}

#best-games {
    background-color: #5cb7fd;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 3vw;
    position: relative;
}

#best-games h3 {
    font-family: 'pixel';
    color: white;
    width: 100%;
    text-align: center;
    font-size: 3vw;
    padding: 2vw 0;
    padding-bottom: 3vw;
}

#best-games a{
    height: 23.2vw;
    text-align: center;
    position: absolute;
    right: 5vw;
    top: 60%;
    transform: translateY(-50%);
    font-size: 3.5vw;
    word-wrap: break-word;
    width: 5vw;
    border: 0;
    background-color: orange;
    font-family: 'pixel';
    color: rgb(54, 54, 54);
    cursor: pointer;
    transition: 0.15s ease;
}

#best-games a:hover{
    background-color: rgb(255, 183, 48);
}

.game {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 2vw ;
    box-sizing: border-box;
    background-color: #104268;
    margin-bottom: 3vw;
    cursor: pointer;
    border-radius: 0.3vw;
}

.game .cadre{
    position: absolute;
    width: 24vw;
    height: 27.7vw;
    top: 0;
    left: 0;
    transform: scale(1.1);
    image-rendering: pixelated;
    z-index: 2;
}

.game .img {
    box-sizing: border-box;
    image-rendering: pixelated;
    z-index: 1;
    width: 20vw;
    border-radius: 0.1vw;
    border: 0.2vw solid rgb(255, 208, 0);

}

.game h5 {
    color: rgb(255, 255, 255);
    box-sizing: border-box;
    font-weight: 700;
    width: 20vw;
    font-size: 1.5vw;
    text-align: center;
    border-radius: 0.1vw;
    margin-top: 2vw;
}

@media screen and (min-width: 1920px) {
    .accueil-section h3 {
        font-size: 40px;
    }

    .accueil-section p {
        font-size: 25px
    }

    .accueil-section {
        padding: 50px;
        gap: 25px;
        margin-top: 50px;
        margin-bottom: 100px;
    }

    .game .img {
        width: 300px;
        border-radius: 0.1vw;
        border: 0.2vw solid rgb(255, 208, 0);
    }

    .game .cadre{
        width: 360px;
        height: 445px;
        transform: scale(1.1);
        image-rendering: pixelated;
        z-index: 2;
    }

    .game {
        padding: 30px ;
        margin-bottom: 80px;
    }

    .game h5 {
        width: 300px;
        font-size: 30px;
        height: 52px;
        margin-top: 30px;
    }

    #best-games{
        margin-bottom: 60px;
    }
    
    #best-games h3 {
        font-family: 'pixel';
        color: white;
        width: 100%;
        text-align: center;
        font-size: 70px;
        padding: 30px 0;
        padding-bottom: 50px;
    }

    #best-games a{
        height: 390px;
        right: 150px;
        top: 58%;
        font-size: 60px;
        width: 80px;
    }
}
</style>