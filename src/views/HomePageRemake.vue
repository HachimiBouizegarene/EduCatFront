<template>
    <main>
        <navBar></navBar>
        <div class="paralaxe">
            <ParalaxComp></ParalaxComp>
        </div>
        <section class="accueil-section">
            <h3>DE NOMBREUX JEUX EDUCATIFS DANS DIFFERENTES MATIERES</h3>
            <P>DE NOMBREUX JEUX IMAGINES PAR DES ETUDIANTS, POUR DES ETUDIANTS AFIN DE REUSSIR AU MIEUX A COMPRENDRE TOUT EN S'AMUSANT !</P>
        </section>
        <FooterComp></FooterComp>
    </main>
</template>

<script>
import navBar from "@/components/all/NavBar.vue"
import ParalaxComp from "@/components/home/ParalaxComp.vue";
import FooterComp from "@/components/all/FooterComp.vue"

export default {
    name: "HomePageRemake",
    components : {
        navBar,
        ParalaxComp,
        FooterComp
    },

    data(){
        return {
            health : 3,
        }
    }
}
</script>
<style scoped>

main{
    background: linear-gradient(0deg, rgba(156,205,245,1) 0%, rgba(255,255,255,1) 100%);
    min-height: 100vh;
    padding-bottom: 200px;
}
.paralaxe {
    display: block;
    height: 100vh;
    min-height: 900px;
    max-height: 1200px;
    width: auto;
    overflow: hidden;
    position: relative;
}

.accueil-section{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 50px;
    background-color: #5cb7fd;
    gap: 30px;
    box-sizing: border-box;
    margin-top: 50px;
}

.accueil-section p, .accueil-section h3{
    font-family: 'pixel';
    text-align: center;
    color: rgb(44, 55, 75);
  
}

.accueil-section h3{
    font-size: 33PX;
    color: white;
}
.accueil-section p{
     color: white;
    font-size: 19px;
    padding: 0 200px;
    box-sizing: border-box; 
}

@media screen and (max-width: 1400px) {
    .paralaxe {
        max-height: 1000px;
    }

    .accueil-section h3{
        font-size: 21PX;
    }
    .accueil-section p{
        font-size: 13px;
        padding: 0 100px;
    }

    .accueil-section{
        padding: 50px 10px;
        gap: 15px;
        margin-top: 40px;
    }
}

@media screen and (max-width: 900px) {
    .paralaxe {
        max-height: 600px;
    }
    .accueil-section h3{
        font-size: 13PX;

    }
    .accueil-section p{
        font-size: 9px;
        padding: 0 20%;
    }

    .accueil-section{
        margin-top: 30px;
        padding: 30px 10px;
        gap: 9px;
    }
}

@media screen and (max-width: 550px) {
    .paralaxe {
        max-height: 400px;
    }
    .accueil-section h3{
        font-size: 12PX;
    }
    .accueil-section p{
        font-size: 7px;
        padding: 0 5%;
    }

    .accueil-section{
        padding: 20px 5px;
        gap: 9px;
        margin-top: 20px;
    }
}
</style>