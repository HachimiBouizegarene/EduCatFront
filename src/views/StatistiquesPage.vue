
<template>
    <NavBar></NavBar>

    <div id="StatistiquesPage">
        <div id="StatistiquesMenu">

            <div>
                <canvas id="myChart"></canvas>
            </div>

        </div>
    </div>

    <!-- <FooterComp></FooterComp> -->
</template>

<script>
import NavBar from "@/components/all/NavBar.vue"
import Chart from 'chart.js/auto';
// import FooterComp from "@/components/all/FooterComp.vue"

export default {
    name: "StatistiquesPage",

    components: {
        NavBar,
    },

    mounted() {

        // this.getGamesInfos();
        // Données du graphique (à titre d'exemple)
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
                {
                    label: 'Monthly Sales',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56],
                },
            ],
        };

        // Options du graphique
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        // Obtenez le contexte du canevas HTML
        const ctx = document.getElementById('myChart').getContext('2d');

        // Créez une instance de graphique à barres
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options,
        });

        myChart;

    },

    data() {
        return {
            Parties: undefined,
            myChart: null, // Déclarez myChart en tant que propriété du composant
        };
    },

    computed: {

    },

    methods: {

        async getPartiesInfos() {
            try {
                await fetch("http://localhost:9090/getPartiesInfos", { method: "POST" })
                    .then((res) => res.json())
                    .then((jeuxData) => { if (Array.isArray(jeuxData)) this.jeux = jeuxData; });

            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },
    }
}
</script>

<style scoped>
#header {
    background-color: white;
}

#StatistiquesPage {
    overflow: hidden;
    position: relative;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #fafafa;
}

/* ------------------- Media Query ---------------------*/

@media only screen and (max-width: 800px) {}

@media only screen and (max-width: 550px) {}

/* Media queries pour les petits écrans (mobiles) */
@media only screen and (max-width: 360px) {}



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
</style>
