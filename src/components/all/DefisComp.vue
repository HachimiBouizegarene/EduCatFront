<template>
    <div id="backdrop" @click.self="closeDefis">
        <div id="container">
            <h1>Vos Defis !</h1>
            <div class="defis-box">
                <div v-for="defi in defis" :key="defi.id" class="defi-container" :class="{ 'defi-completed': defi.defiData.statut === 1 }">
                    <h3 class="defiTitle">{{ defi.DescriptionDefi }}</h3>
                    <div class="bottom">
                        <div class="recompenses">
                            <p>{{ defi.defiData.recompenseXP }} XP <img src="@/assets/images/all/xp-orb.png"></p>
                            <p>{{ defi.defiData.recompenseECats }} ECAT <img src="@/assets/images/all/ecat-coin.png"></p>
                        </div>
                        <router-link :class="{ 'completed': defi.defiData.statut === 1 }" class="play-button"
                            :to="{ name: defi.NomJeu ? defi.NomJeu : 'GamesPage' }">JOUER</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        defis() {
            return this.$store.state.user.defis || [];
        },
    },

    mounted() {
        this.fetchAndProcessDefis();
    },

    methods: {
        closeDefis() {
            this.$emit('close');
        },

        async fetchAndProcessDefis() {
            await this.$store.dispatch("fetchDefis", { jws: this.$cookies.get('jws'), force: true });
        },
    },
}
</script>

<style scoped>
#container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: auto;
    /* Ajusté pour s'adapter au contenu */
    background-color: #202735;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    padding-bottom: 40px;
    box-sizing: border-box;
    overflow-y: auto;
    /* Pour la scrollbar si nécessaire */
}

#container h1:first-child {
    color: white;
    font-size: clamp(16px, 10vw, 74px);
    line-height: normal;
    margin-bottom: 30px;
}

.defis-box {
    height: 70vh;
    width: 80%;
}

.defi-container {
    display: flex;
    flex-direction: column;
    border: 2px solid rgb(15, 143, 194);
    background-color: rgb(0, 187, 255);
    box-sizing: content-box;
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
}

.defiTitle {
    font-size: clamp(16px, 2vw, 24px);
    color: white;
    margin-bottom: 10px;
}

.play-button {
    font-family: 'pixel';
    text-decoration: none;
    border: none;
    background: none;
    font-size: clamp(16px, 1.1vw, 24px);
    transition: 0.2s ease;
    padding: 0.4vw 1.5vw;
    border: 0.2vw solid rgba(255, 187, 0, 0);
    width: fit-content;
    height: fit-content;
    background-color: rgba(8, 241, 36, 0.761);
    color: white;
}

.recompenses {
    background-color: #0d445a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0px 20px;
    padding-top: 10px;
    padding-bottom: 3px;
    width: clamp(15px, 15vw, 190px);
    box-sizing: content-box;
}

.recompenses p {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    font-size: clamp(11px, 1.5vw, 24px);
    text-align: center;
    color: white;
}

.recompenses p img {
    width: clamp(1px, 4vw, 40px);
    image-rendering: pixelated;
}

.bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
}

h1,
h2,
h3,
h4,
h5,
p,
a {
    font-weight: 100;
    font-family: 'gamesPage', 'Roboto Condensed';
}

.completed {
    background-color: rgba(8, 8, 8, 0.336);
}

.defi-completed {
    background-color: rgba(7, 178, 240, 0.616);
}

#backdrop {
    background-color: rgba(8, 8, 8, 0.336);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
</style>