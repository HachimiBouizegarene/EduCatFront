<template>
    <div id="backdrop" @click.self="closeDefis">
        <div id="container">
            <h1>Defis du Jour !</h1>
            <div v-for="defi in defis" :key="defi.id" class="defi-container">
                <h3>{{ defi.description }}</h3>
                <p>Recompense XP: {{ defi.recompenseXP }}</p>
                <p>Recompense Ecat: {{ defi.recompenseEcat }}</p>
                <div v-if="defi.infosJeuAssocie">
                    <h4>Jeu associé: {{ defi.infosJeuAssocie.name }}</h4>
                    <!-- Vous pouvez afficher l'image ici si nécessaire -->
                </div>
                <button :class="{ 'active': defi.statut === 0 }" @click="participerAuDefi(defi.id)">Participer</button>
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

        participerAuDefi(defiId) {
            // Implémentez la logique pour permettre à l'utilisateur de participer au défi
            console.log('Participation au défi avec l\'id:', defiId);
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
    width: 500px;
    height: auto; /* Ajusté pour s'adapter au contenu */
    background-color: rgb(146, 146, 146);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto; /* Pour la scrollbar si nécessaire */
}

.defi-container {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
}

.active {
    background-color: green;
    color: white;
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