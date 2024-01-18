

<script>

import csv from "@/assets/images/games/TrouveLesPaires/dico.csv";
import ChronoComponent from "@/components/games/TrouveLesPaires/ChronoComponent.vue";
import CardsComponent from "@/components/games/TrouveLesPaires/CardsComponent.vue";


export default {
  name: "GameComponent",

  components : {
    CardsComponent,
    ChronoComponent
  },

  mounted() {
    this.refCounter = this.$refs.refCounter
    for (const val in csv) {
      this.map.set(Number(val), csv[val]?.head);
    }
    this.deck = this.generateCards();
  },

  data() {
    return {
      MARK: 20,
      refCounter: undefined,
      error: 0,
      hit: 0,
      difficulty: undefined,
      grid: 16,
      map: new Map(),
      deck: [],
      stackFlip: [],
      isFliping: false,
      startGame: false,
      buttonPlay: "Jouer",
      reloadGame: false,
      selectState: false,
      timeMax: 0,
      score: 0,
    }
  },


  methods: {
    nbCase() {
      switch (this.difficulty) {
        case "facile":
        this.grid  = 16;
          this.timeMax = 300; // 5 minutes
          break;
        case "moyen":
        this.grid  = 20;
        this.timeMax = 600; // 10 minutes
          break;
        case "difficile":
        this.grid  = 24;
        this.timeMax = 900; // 15 minutes
          break
        default:
        this.grid  = 20;
        this.timeMax = 300;
      }
    },
    resetGame(difficulty) {
      difficulty;
      this.startGame = false;
      this.reloadGame = false;
      this.selectState = false;
      // this.score = 0;
    },
    playGame(difficulty) {
      this.difficulty = difficulty
      this.refCounter.reset();
      if (!this.startGame) {
        this.startGame = true;
        this.refCounter.start();
        this.selectState = true;
      }
      if (!this.reloadGame) {
        this.nbCase();
        this.deck= this.generateCards();
        this.score = 0;
      }
    },

    computeScore() {
      const time = this.refCounter.getElapsedTime();
      const paires = (this.grid / 2);
      this.score = this.MARK * (this.hit / paires) * 0.7 + (paires / this.error) * 0.2 + (time / this.timeMax) * 0.3;
      this.score = Math.floor(this.score);
      console.log("Compute score : ", this.score);
      console.log("Chrono : ", time);
    },

    selection(event) {
      this.reloadGame= true;
      this.difficulty = event.target.value;
      if (!this.startGame) {
        this.nbCase();
        this.deck = this.generateCards();
      }
    },

    
    generateCards() {
      let cards = [];
      for (const value of this.generateDeck(this.grid)) {
        cards.push({ value, isFlipped: false, isMatched: false });
        cards.push({ value, isFlipped: false, isMatched: false });
      }
      cards = this.shuffle(cards);
      return cards;
    },

    matchCards() {
      const cart1 = this.deck[this.stackFlip[0]];
      const cart2 = this.deck[this.stackFlip[1]];

      if (cart1?.value === cart2?.value) {
        cart1.isMatched = true
        cart2.isMatched = true;
        cart1.isFlipped = true;
        cart2.isFlipped = true;
        this.hit++;
      } else {
        cart1.isMatched = false;
        cart2.isMatched = false;
        cart1.isFlipped = false;
        cart2.isFlipped = false;
        this.error++;
      }
      this.stackFlip.splice(0, this.stackFlip.length);
      this.isFliping = false;
    },

    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    flipCard(index) {
      if (this.startGame) {
        if (this.isFliping) return;
        if (this.deck[index].isFlipped === false && this.stackFlip.length < 2) {
          this.deck[index].isFlipped = true;
          this.stackFlip.push(index);
        }
        if (this.stackFlip.length === 2) {
          this.isFliping = true;
          setTimeout(() => {
            this.matchCards();
          }, 2000);
        }
        if (this.endGame()) {
          this.$emit("finished");
          this.refCounter.pause();
          this.computeScore();
          this.resetGame();

          // TODO animation ending game
        }
      }

    },

    endGame() {
      const nbFlipped = this.deck.filter(f => f.isFlipped);
      return nbFlipped.length === this.deck.length;
    },

    generateDeck(difficultyLevel) {
      const tab = [];
      while (tab.length < (difficultyLevel / 2)) {
        const idx = Math.floor(Math.random() * this.map.size);
        const mot = this.map.get(idx);
        if (!tab.includes(mot)) {
          tab.push(mot);
        }
      }
      return tab;
    },
  }

}
</script>

<template>
  <div class="container">
    <div class="control">
      <!-- difficulty -->
      <div>
        <p>{{difficulty}}</p>
      </div>
      <!-- Chronometer -->
      <chrono-component ref="refCounter" ></chrono-component>
      <!-- errors -->
      <span>Erreur : {{ error }}</span>
      <!-- hits -->
      <span>Coups : {{ hit }}</span>
    </div>

    <div v-bind:id="difficulty" class="grid">
      <!-- Generer la grille -->
      <CardsComponent v-for="(card, index) in deck" :key="index" v-model:value="card.value"
        v-model:isFlipped="card.isFlipped" v-model:isMatched="card.isMatched" @flip="flipCard(index)" />
    </div>
    <p>Score : {{ score }}/20</p>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Perfect DOS VGA 437";
  src: url("@/assets/fonts/pixel-ii.ttf") format("truetype");
}

.container {
  max-width: 1190px;
  margin: 0 auto;
  font-family: 'Perfect DOS VGA 437', serif;
  font-weight: bold;
}

.control {
  display: flex;
  height: 60px;
  background-color: lightblue;
  align-items: center;
  padding: 0 12px;
  justify-content: space-between;
  border-radius: 12px;
}

.control>div:first-child {
  padding: 0;
}

.control>*,
p {
  padding: 10px;
  background-color: #e8e2e2;
}

p {
  font-family: "Perfect DOS VGA 437", serif;
  font-weight: bold;
}

button {
  font-family: "Perfect DOS VGA 437", serif;
  font-weight: bold;
}

span {
  background-color: #e8e2e2;
}

.grid {
  display: grid;
  justify-content: center;
  gap: 6px;
}

#difficile.grid {
  grid-template-columns: repeat(4, 220px);
  grid-template-rows: repeat(6, 80px);
}

#moyen.grid {
  grid-template-columns: repeat(4, 220px);
  grid-template-rows: repeat(5, 80px);
}

#facile.grid {
  grid-template-columns: repeat(4, 220px);
  grid-template-rows: repeat(4, 80px);
}

.card {
  background-color: lightblue;
  border: 1px solid black;
  cursor: pointer;
}


.grid>.card {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: bold;
  font-size: 20px;
}

.control+.grid {
  margin: 1em 0;
}

/*media query*/
@media screen and (max-width: 905px) {

  #difficile.grid,
  #moyen.grid,
  #facile.grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: none;
    grid-auto-rows: 50px;
  }

  #difficile.grid,
  #moyen.grid,
  #facile.grid>.card {
    font-size: 16px;
  }
}

@media screen and (max-width: 810px) {

  #moyen.grid,
  #facile.grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-template-rows: none;
    grid-auto-rows: 50px;
  }
}

@media screen and (max-width: 768px) {

  #difficile.grid,
  #moyen.grid,
  #facile.grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-template-rows: none;
    grid-auto-rows: 40px;
  }

  #moyen.grid {
    grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
  }

  #facile.grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  #difficile.grid>.card,
  #moyen.grid>.card,
  #facile.grid>.card {
    font-size: 14px;
  }
}

@media screen and (max-width: 576px) {

  .control>*,
  select {
    padding: 5px;
  }

  #moyen.grid {
    grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
  }

  #facile.grid {
    grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
  }

  #difficile.grid>.card,
  #moyen.grid>.card,
  #facile.grid>.card {
    font-size: 14px;
  }
}

@media screen and (max-width: 450px) {

  .control>*,
  select {
    padding: 5px;
  }

  #moyen.grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  #facile.grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  #moyen.grid>.card,
  #facile.grid>.card {
    font-size: 12px;
  }
}
</style>