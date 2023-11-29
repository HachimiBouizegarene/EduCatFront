<template>
    <button @click="openPopUp">Launch</button>
    <h3>{{ text }}</h3>
    <!-- <PopUpComponent ref="popup" sentence = "Bonjour je ... un stupido" :choices="['je', 'suis']" answer="je"></PopUpComponent> -->
    <PopUpComponent_2 ref="popup" :data="data" ></PopUpComponent_2>
<!-- 
    :choices="['Reponse A','Reponse B', 'Reponse C', 'Reponse D']"
     verb="Jouer" time="Present" sentence="Salut je suis ## un connard" -->
</template>

<script>
// import PopUpComponent from '@/components/games/PopUpComponent.vue';
import PopUpComponent_2 from '@/components/games/maze/PopUpComponent.vue';

export default {
    name: "TestPage",
    components : {
        PopUpComponent_2
        // PopUpComponent,
    },
    data(){
        return {
            data :{'verb' : 'jouer', 'choices' : ['jouait', 'jouons', 'jouames', 'jouillons'],
        'sentence' : 'je ## avec les copaings', 'time' : 'present'}
        }
    },
    methods : {
        openPopUp(){
            this.$refs.popup.open();
        }
    }

}

</script>

<style>

</style>