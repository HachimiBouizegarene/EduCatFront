<template>
  <MenuComponent ref="menu" @menu-clicked="menuClicked"></MenuComponent>
  <h1 id="gameTitle">Mathématiques</h1>
  <v-dialog v-model="isRestartModalOpen" max-width="900px" persistent>
    <v-card>
      <v-card-title class="headline">Voulez-vous rejouer?</v-card-title>
      <v-card-subtitle v-if="isGameFinished">Votre score est de {{ score }} sur
        {{ totalQuestionsToAnswer }}</v-card-subtitle>
      <v-card-actions>
        <v-btn @click="restartGame">Oui</v-btn>
        <v-btn @click="isRestartModalOpen = false">Non</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <img id="clock" src="@/assets/images/games/CalculsMentaux/horloge.png" />
  <img id="symbol" src="@/assets/images/games/CalculsMentaux/symbole.png" />
  <div id="math-game">
    <div id="question">
      <p>
        {{ num1 }} {{ operator }} {{ num2 }} = ?
        <img src="@/assets/images/games/CalculsMentaux/tableau.png" />
      </p>
    </div>
  </div>
  <br/>²²
  <div class="answers-container">
    <div id="options">
      <button v-for="option in options" :key="option" @click="checkAnswer(option)" :data-answer="option">
        {{ option }}<img src="@/assets/images/games/CalculsMentaux/ardoise.png" />
      </button>
    </div>
  </div>

  <div :class="{ displayHidden: !isCheckVisible }" id="greenCheck">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Check_green_circle.svg" alt="greenCheck" />
  </div>
  <div :class="{ displayHidden: !isCrossVisible }" id="redCross">
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Cross_red_circle.svg" alt="greenCheck" />
  </div>

  <div id="bottomGamePage">
    <div id="counterLeftQuestion">
      {{ counterText }}<img src="@/assets/images/games/CalculsMentaux/tableau2.png" />
    </div>
  </div>
</template>
  
<script>
import MenuComponent from "@/components/games/maze/MenuComponent.vue";

export default {
  name: "CalculsMentaux",

  components: {
    MenuComponent,
  },
  data() {
    return {
      num1: 0,
      num2: 0,
      operator: "",
      correctAnswer: 0,
      options: [],
      currentQuestionNumber: 0,
      totalQuestions: 5,
      totalQuestionsToAnswer: 5,
      isGameFinished: false,
      isRestartModalOpen: false,
      score: 0,
      isCheckVisible: false,
      isCrossVisible: false,
      counterText: "-/-",
      currentOperation: "",
      difficulty_choosen: 0,
    };
  },
  mounted() {
    let difficultys = [
      "ADDITION",
      "SOUSTRACTION",
      "MULTIPLICATION",
      "DIVISION",
    ];
    this.$refs.menu.open("CHOISISSEZ UNE DIFFICULTÉ", difficultys, "LANCER");
  },
  methods: {
    menuClicked(message, difficulty_choosen, difficulty_label) {
      this.difficulty_choosen = difficulty_choosen;
      this.difficulty_label = difficulty_label;
      this.startGame();
    },

    startGame() {
      const { n1, n2, op, ans } = this.generateQuestion(
        this.difficulty_choosen
      );
      this.num1 = n1;
      this.num2 = n2;
      this.operator = op;
      this.correctAnswer = ans;

      const incorrectAnswers = this.generateIncorrectAnswers(ans, op);
      this.options = this.shuffleArray([ans, ...incorrectAnswers]);

      this.resetGame();

      this.updateCounterText();
    },

    generateQuestion(difficulty) {
      difficulty;
      let num1, num2, operator, ans;

      do {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);

        if (this.difficulty_choosen == 0) {
          operator = "+";
        } else if (this.difficulty_choosen == 1) {
          operator = "-";
        } else if (this.difficulty_choosen == 2) {
          operator = "*";
        } else {
          operator = "/";
        }

        switch (operator) {
          case "+":
            ans = num1 + num2;
            break;
          case "-":
            ans = num1 - num2;
            break;
          case "*":
            ans = num1 * num2;
            break;
          case "/":
            ans = num1 / num2;
            break;
        }
      } while (ans < 0 || ans % 1 !== 0);

      return { n1: num1, n2: num2, op: operator, ans };
    },

    shuffleArray(arr) {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    },
    checkAnswer(selectedAnswer) {
      const correct = selectedAnswer === this.correctAnswer;
      if (correct) {
        this.score++;
        this.isCheckVisible = true;
        this.isCrossVisible = false;
      } else {
        this.isCheckVisible = false;
        this.isCrossVisible = true;

        const correctButton = document.querySelector(
          `button[data-answer="${this.correctAnswer}"]`
        );
        if (correctButton) {
          correctButton.classList.add("correct-answer");
        }
      }

      if (this.currentQuestionNumber >= this.totalQuestionsToAnswer) {
        this.showGameOverPopup();
      }

      document.querySelectorAll("button").forEach((button) => {
        button.disabled = true;
      });

      setTimeout(() => {
        if (!this.isGameFinished) {
          this.generateNewQuestion();

          document.querySelectorAll("button").forEach((button) => {
            button.disabled = false;
            this.isCheckVisible = false;
            this.isCrossVisible = false;
          });
        }
      }, 2000);
    },

    generateNewQuestion() {
      document.querySelectorAll("button").forEach((button) => {
        button.classList.remove("correct-answer");
      });

      if (this.currentQuestionNumber >= this.totalQuestionsToAnswer) {
        // Le jeu est terminé
        alert("Le jeu est terminé! Voulez-vous rejouer?");

        this.resetGame();
        return;
      }

      const { n1, n2, op, ans } = this.generateQuestion(this.$props.difficulty); // Utilisez this.$props.difficulty
      this.num1 = n1;
      this.num2 = n2;
      this.operator = op;
      this.correctAnswer = ans;
      const incorrectAnswers = this.generateIncorrectAnswers(ans, op);
      this.options = this.shuffleArray([ans, ...incorrectAnswers]);
      this.currentQuestionNumber++;
      this.updateCounterText();
    },

    generateIncorrectAnswers(correctAnswer, operator) {
      const incorrectAnswers = [];
      while (incorrectAnswers.length < 3) {
        let randomAnswer;

        switch (operator) {
          case "+":
            if (Math.random() < 0.5) {
              randomAnswer = correctAnswer + Math.floor(Math.random() * 10);
            } else {
              do {
                randomAnswer = correctAnswer - Math.floor(Math.random() * 10);
              } while (randomAnswer < 0);
            }
            break;
          case "-":
            if (Math.random() < 0.5) {
              randomAnswer = correctAnswer + Math.floor(Math.random() * 10);
            } else {
              do {
                randomAnswer = correctAnswer - Math.floor(Math.random() * 10);
              } while (randomAnswer < 0);
            }
            break;
          case "*":
            randomAnswer = correctAnswer + Math.floor(Math.random() * 4);
            break;
          case "/":
            randomAnswer = correctAnswer + Math.floor(Math.random() * 4);
            break;
        }
        if (
          randomAnswer !== correctAnswer &&
          !incorrectAnswers.includes(randomAnswer)
        ) {
          incorrectAnswers.push(randomAnswer);
        }
      }
      return incorrectAnswers;
    },

    updateCounterText() {
      this.counterText = `${this.currentQuestionNumber}/${this.totalQuestions}`;
    },

    showGameOverPopup() {
      this.isGameFinished = true;
      this.isRestartModalOpen = true;
      this.registerPartie();
    },

    closeRestartModal() {
      this.isRestartModalOpen = false;
    },

    restartGame() {
      this.resetGame();
      this.score = 0;
      this.closeRestartModal();
    },
    resetGame() {
      this.currentQuestionNumber = 0;
      this.isGameFinished = false;
      this.updateCounterText();
      this.isCheckVisible = false;
      this.isCrossVisible = false;
      this.generateNewQuestion();
    },

    async registerPartie() {
      const response = await fetch("http://localhost:9090/insertPartie", {
        method: "POST",
        body: JSON.stringify({
          "ScorePartie": (this.score + "/" + this.totalQuestionsToAnswer).toString(),
          "LibelleDifficultePartie": this.difficulty_label,
          "jws": this.$cookies.get('jws'),
          "NomJeu": this.$route.name,
        })
      })
      response;
    },
  },
  created() {
    this.resetGame();
  },

  beforeUnmount() {
    this.unmounted();
  },

  handleClick() {
    // Vérifier si le composant est toujours actif avant d'afficher la popup
    if (this._isDestroyed !== true) {
      // Exemple d'une fonction d'événement
    }
  },

  unmounted() {
    // Supprimer les écouteurs d'événements globaux
    window.removeEventListener("click", this.handleClick);

    // Supprimer les écouteurs d'événements spécifiques du composant
    if (this.$el) {
      this.$el.querySelectorAll("*").forEach((element) => {
        element.removeEventListener("click", this.handleClick);
        // Ajoutez d'autres types d'événements au besoin
      });
    }

    // Annuler toutes les boucles ou timers
    clearInterval(this.timerId);

    // Nettoyer les éléments DOM
    this.$destroy(); // détruire le composant Vue
  },
};
</script>
  
<style scoped>
#gameTitle {
  font-size: 44px;
  font-family: "Perfect DOS VGA 437 Win", monospace;
  color: #333333;
  font-weight: bold;
  text-align: center;
  margin-top: 1%;
}

#clock {
  width: 10%;
  height: 10%;
  padding-top: 2%;
  margin-left: 7%;
}

#symbol {
  width: 10%;
  height: 10%;
  margin-left: 65%;
}

p {
  font-weight: bold;
  font-family: "VT323";
  position: relative;
}

p img {
  z-index: -1;
  position: absolute;
  image-rendering: pixelated;
  height: 250%;
  width: 250%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#question {
  font-size: 70px;
  color: #dfd7cc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: -5%;
}

.answers-container {
  margin: 7% 30%;
}

#options {
  display: flex;
  font-family: "VT323";
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  grid-gap: 40px;
  margin-top: 20%;
}

button {
  position: relative;
  font-size: 16px;
  padding: 25px;
  cursor: pointer;
  color: #dfd7cc;
  width: 40%;
  text-align: center;
}

button img {
  z-index: -1;
  top: 0%;
  left: 0%;
  position: absolute;
  width: 100%;
  image-rendering: pixelated;
  height: 100%;
}

#bottomGamePage {
  display: block;
  text-align: center;
}

#bottomGamePage img {
  left: 50%;
  top: 94%;
  position: absolute;
  width: 10%;
  image-rendering: pixelated;
  height: 10%;
  transform: translate(-50%, -50%);
}

#counterLeftQuestion {
  font-family: "VT323";
  font-size: 45px;
  position: relative;
  color: #dfd7cc;
}

#counterLeftQuestion img {
  z-index: -1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 11%;
  image-rendering: pixelated;
  height: 100%;
}

.v-card-title {
  font-size: 20px;
  color: #333333;
  font-weight: bold;
}

.v-card-actions {
  justify-content: center;
}

.v-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fde145;
  color: #904019;
  cursor: pointer;
  width: 50%;
}

.v-btn:hover {
  background-color: white;
}

.v-card-subtitle {
  font-size: 16px;
  color: #555555;
}

#greenCheck {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
  filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.411));
  z-index: 10;
  scale: 100%;
  transition: 0.3s ease-in;
}

#greenCheck.displayHidden {
  scale: 0%;
  transition: 0.2s ease-in;
}

#redCross {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
  filter: drop-shadow(0 0 0.75rem rgba(255, 0, 0, 0.411));
  z-index: 10;
  scale: 100%;
  transition: 0.3s ease-in;
}

#redCross.displayHidden {
  scale: 0%;
  transition: 0.2s ease-in;
}

@media screen and (max-width: 1100px) {
  #gameTitle {
    margin-top: 5%;
  }

  #question {
    font-size: 50px;
    margin-top: 15%;
  }

  #counterLeftQuestion {
    font-size: 40px;
  }

  #counterLeftQuestion img {
    width: 17%;
  }

  .answers-container {
    margin: 7% 25%;
  }

  #options {
    margin-top: 35%;
  }

  #clock {
    display: none;
  }

  #symbol {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  #gameTitle {
    font-size: 35px;
    margin-top: 5%;
  }

  #question {
    font-size: 40px;
    margin-top: 15%;
  }

  #counterLeftQuestion {
    font-size: 30px;
  }

  #counterLeftQuestion img {
    width: 20%;
  }

  .answers-container {
    margin: 7% 30%;
  }

  #clock {
    display: none;
  }

  #symbol {
    display: none;
  }
}
</style>
  