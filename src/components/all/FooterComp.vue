<template>
    <footer>
        <img id="logo" src="@/assets/images/all/Educat_Logo_footer.webp">
        <section>
            <h3>NAVIGATION</h3>
            <router-link to="/">Acceuil</router-link>
            <router-link to="/jeux">Jeux</router-link>
            <router-link to="/profil">Profil</router-link>
            <router-link to="/signin">Inscription</router-link>
        </section>

        <section>
            <h3>L'ENTREPRISE</h3>
            <router-link to="/jeux">Qui sommes nous ?</router-link>
            <router-link to="/jeux">Nous contacter</router-link>
        </section>

        <section>
            <router-link to="/jeux">Mentions legales</router-link>
        </section>
    </footer>
</template>

<script>
export default {
    name : "FooterComp"
}
</script>


<style scoped>
footer{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 17vw;
    background-color: rgb(32, 32, 32);
    color: white;
    padding:  1.7vw;
    position: relative;
}


#logo{
    width: 10vw;
}


section {
    display: flex;
    flex-direction: column;
}
h3{
    font-size: 1.1vw;
    margin-bottom: 0.5vw;
}
a{
    font-size: 0.8vw;
    color: rgb(214, 214, 214);
}


@media screen and (min-width: 1920px ) {
    footer{
        padding: 30px;
        gap: 320px;
    }

    h3{
        font-size: 25px;
        margin-bottom:10px;
    }
    a{
        font-size: 15px;
        color: rgb(214, 214, 214);
    }

    
#logo{
    width: 200px;
}
    
}
</style>