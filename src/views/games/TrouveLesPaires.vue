<script>
import HeaderComponent from "@/components/games/TrouveLesPaires/HeaderComponent.vue";
import GameComponent from "@/components/games/TrouveLesPaires/GameComponent.vue";
import MenuComponent from "@/components/all/MenuComponent.vue";


export default {
  name: "TrouverLesPairesPage",

  components: {
    MenuComponent,
    GameComponent
  },

  data() {
    return {
      difficulties: ["facile", "moyen", "difficile"]
    }
  },

  mounted() {
    this.$refs.menu.open('TROUVE LES PAIRES', this.difficulties, 'LANCER', undefined)
  },

  methods: {
    menuClicked(message, level_choosen_index, difficulty) {
      this.difficulty = level_choosen_index;
      this.score = 0
      if (message == 'TROUVE LES PAIRES' || message == 'BIEN JOUÉ') {
        console.log(difficulty);
        this.$refs.game.playGame(difficulty)
      }
    },

    restart() {
      this.$refs.menu.open('BIEN JOUÉ', this.difficulties, 'REJOUER', undefined)
    }
  },
}

</script>

<template>
  <MenuComponent ref="menu" @menu-clicked="menuClicked"></MenuComponent>
  <main>
    <game-component @finished="restart" ref="game"></game-component>
  </main>
  <footer></footer>
</template>


<style scoped></style>
