<template>
    <main>
        <navBar></navBar>
        <div class="paralaxe">
            <ParalaxComp></ParalaxComp>
        </div>
        <section class="accueil-section">
            <h3>DE NOMBREUX JEUX EDUCATIFS DANS DIFFERENTES MATIERES</h3>
            <p>DE NOMBREUX JEUX IMAGINES PAR DES ETUDIANTS, POUR DES ETUDIANTS AFIN DE REUSSIR AU MIEUX A COMPRENDRE TOUT EN
                S'AMUSANT !</p>
        </section>
        <FooterComp></FooterComp>
        <!-- <FooterComp></FooterComp> -->
    </main>
</template>

<script>
import navBar from "@/components/all/NavBar.vue"
import ParalaxComp from "@/components/home/ParalaxComp.vue";
import FooterComp from "@/components/all/FooterCompRemake.vue";
// import FooterComp from "@/components/all/FooterComp.vue"

export default {
    name: "HomePageRemake",
    components: {
        navBar,
        ParalaxComp,
        FooterComp
        // FooterComp
    },
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


@media screen and (min-width: 1920px) {
    
.accueil-section h3 {
    font-size: 40px;
}

.accueil-section p {
    color: white;
    font-size: 25px
    }

    .accueil-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding:50px;
        background-color: #5cb7fd;
        gap: 25px;
        box-sizing: border-box;
        margin-top: 50px;
        }
}
</style>