<template>
  <div>
    <MenuComponent ref="menu" @menu-clicked="menuClicked"></MenuComponent>
    <div>
     <SimonEasy v-if="difficulty_choosen == 0 "  />
     <SimonMedium v-if="difficulty_choosen == 1 " />
     <SimonHard v-if="difficulty_choosen == 2 " />
    </div>
  </div>
</template>

<script>
import SimonEasy from '@/components/games/JeuDuSimon/SimonEasy.vue';
import SimonMedium from '@/components/games/JeuDuSimon/SimonMedium.vue';
import SimonHard from '@/components/games/JeuDuSimon/SimonHard.vue';
import MenuComponent from "@/components/all/MenuComponent.vue";

export default {
  name: 'App',
  components: {
    SimonEasy,
    SimonMedium,
    SimonHard,
    MenuComponent,
  },
  data() {
    return {
      difficulty_choosen: "FACILE", // Définissez une valeur par défaut
    };
  },
  mounted() {
    let difficultys = ["FACILE", "MOYEN", "DIFFICILE"];
    this.$refs.menu.open('CHOISISSEZ UNE DIFFICULTÉ', difficultys, 'REJOUER');
  },
  methods: {
    menuClicked(message, difficulty_choosen) {
      this.difficulty_choosen = difficulty_choosen;
 
    },
  },
};
</script>
<style scoped>
/* Styles spécifiques à votre composant App.vue */
#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #333;
 background-color: #3498db;
  padding: 20px;
}

</style>