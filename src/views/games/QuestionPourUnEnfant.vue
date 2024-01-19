<template>
  <MenuComponent ref="menu" @menu-clicked="menuClicked"></MenuComponent>
  <div id="app">
    <h1>Culture Générale</h1>
    <!--
      <div v-if="!gameStarted">
        <div id="choix" class="flex-container" v-if="showDifficultyButtons">
  
          <p1>Choisissez un niveau :</p1>
          <button @click="startGame('facile')" class="btn-niv btn-niv-container">Facile <img src='@/assets/images/games/QuestionPourUnEnfant/fond_bouton.png' id="pixel"></button>
          <button @click="startGame('moyen')" class="btn-niv btn-niv-container">Moyen <img src='@/assets/images/games/QuestionPourUnEnfant/fond_bouton.png' id="pixel"> </button>
          <button @click="startGame('difficile')" class="btn-niv btn-niv-container">Difficile <img src='@/assets/images/games/QuestionPourUnEnfant/fond_bouton.png' id="pixel"> </button>
        </div>
      </div>
    
      <button v-if="gameOver" @click="restartGame">Rejouer</button>
      -->
    <div v-if="gameStarted">
      <div v-if="currentQuestionIndex < questions.length">
        <div class="question">
          <div class="question-content">
            <img v-if="questions[currentQuestionIndex].image" :src="questions[currentQuestionIndex].image"
              alt="Question Image" class="question-image" />
            <p class="question-text">{{ questions[currentQuestionIndex].text }}</p>
          </div>
          <div class="answers">
            <button v-for="(option, index) in questions[currentQuestionIndex].options" class="submit-btn" :key="index"
              @click="handleAnswer(index)">
              <img src='@/assets/images/games/QuestionPourUnEnfant/fond_bouton.png' id="pixel">
              {{ option }}
            </button>
          </div>
        </div>
        <div id="timer">Temps restant: {{ timeLeft }}</div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import MenuComponent from "@/components/all/MenuComponent.vue";

export default {
  name: 'QuestionPourUnEnfant',
  components: {
    MenuComponent,
  },
  data() {
    return {
      gameStarted: false,
      gameOver: false,
      showDifficultyButtons: true,
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      timer: null,
      timeLeft: 45,
    };
  },
  mounted() {
    let difficultys = ["FACILE", "MOYEN", "DIFFICILE"];
    this.$refs.menu.open('CHOISISSEZ UNE DIFFICULTÉ', difficultys, 'LANCER');
  },

  unmounted(){
    clearInterval(this.timer);
  },
  methods: {
    menuClicked(rejouer, difficulty_choosen) {
      this.difficulty_choosen = difficulty_choosen;
      this.startGame();
    },
    startGame() {
      this.gameStarted = true;
      this.gameOver = false;
      this.questions = this.getQuestions(this.difficulty_choosen);
      this.displayQuestion();
    },
    displayQuestion() {
      if (this.currentQuestionIndex < this.questions.length) {
        this.timeLeft = 45;
        this.timer = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft === 0) {
            clearInterval(this.timer);
            this.handleAnswer(null);
          }
        }, 1000);
        this.showDifficultyButtons = false;
      } else {
        this.gameStarted = false;
        this.gameOver = true;
        this.showDifficultyButtons = false;
        this.restartGame();
        // Envoi du score à la base de données
        /*    axios.post('url de la base', {
              score: this.score
            })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('Le score ne s'est pas enregistrées );
            });*/
      }
    },
    handleAnswer(selectedOption) {
      clearInterval(this.timer);
      const currentQuestion = this.questions[this.currentQuestionIndex];

      if (selectedOption !== null && selectedOption === currentQuestion.answer) {
        this.score++;
        Swal.fire({
          icon: 'success',
          title: 'Bonne réponse!',
          text: `Votre score est de ${this.score} / ${this.currentQuestionIndex + 1}`,
          customClass: {
            popup: 'custom-swal',
          },
        });
      } else {
        const correctOption = currentQuestion.options[currentQuestion.answer];
        Swal.fire({
          icon: 'error',
          title: 'Mauvaise réponse',
          text: `Votre score est de ${this.score} / ${this.currentQuestionIndex + 1}\nLa bonne réponse était : "${correctOption}"`,
          customClass: {
            popup: 'custom-swal',
          },
        });
      }

      this.currentQuestionIndex++;
      this.displayQuestion();
    },

    restartGame() {
      let difficultys = ["FACILE", "MOYEN", "DIFFICILE"];
      let score = `${this.score} / ${this.currentQuestionIndex}`;
      this.$refs.menu.open('Voulez-vous rejouer ?', difficultys, 'REJOUER', undefined, score);
    },

    getQuestions(difficulty_choosen) {
      let questions;
      if (difficulty_choosen == 0) {
        questions = [
          {
            text: "Quel est cet animal ?",
            image: "https://c.pxhere.com/photos/cc/b0/wolf_predator_hunter_canis_lupus_eyes_view_hundeartig_portrait-907321.jpg!s2",
            options: ["Lion", "Chien", "Loup", "Poule"],
            answer: 2,
          },
          {
            text: "Quelle est cette forme ?",
            image:
              "https://img.freepik.com/photos-gratuite/cadre-dore-fond-marbre_53876-92986.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=sph",
            options: ["Carré", "Cercle", "Rectangle", "Cylindre"],
            answer: 0,
          },
          {
            text: "Quel est le sens responsable de l'audition ?",
            image:
              "https://img.freepik.com/photos-gratuite/femme-caucasienne-desemparee-pull-rose-recherche-expression-confuse-perplexe-froncant-sourcils-tenant-main-derriere-oreille-comme-si-elle-n-entend-pas-qu-on-lui-dit-faire-faisant-semblant-faire_176420-13533.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=ais",
            options: ["Le touché", "Le gout", "L'ouie", "La vue"],
            answer: 2,
          },
          {
            text: "Quelle saison vient après l'été ?",
            image:
              "https://img.freepik.com/vecteurs-libre/collection-saisons-design-plat-dessine-main_52683-74611.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=ais",
            options: ["Automne", "Hiver", "Printemps", "Été"],
            answer: 0,
          },
          {
            text: "À quoi correspond cette ponctuation ?",
            image:
              "https://img.freepik.com/photos-gratuite/marque-exclamative-marque-bandage-fond-blanc_23-2147827586.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=ais",
            options: ["La virgule", "Le point", "Point d'exclamation", "Point de suspension"],
            answer: 2,
          },
          {
            text: "Quelle est la bonne orthographe de ce mot ?",
            image:
              "https://c.pxhere.com/photos/cb/78/tyrannosaurus_dinosaur_prehistory_toy_game_figurine_carnivore-870469.jpg!s2",
            options: ["Dinausaure", "Dinosaure", "Dinausore", "Dinousore"],
            answer: 1,
          },
          {
            text: "Quel accent met-on sur le mot Vipere",
            image:
              "https://www.simplehelp.net/wp-content/uploads/Screen-Shot-2021-04-04-at-12.42.41-AM.png",
            options: ["Accent grave", "Accent circonflexe", "Tréma", "Accent aigu"],
            answer: 0,
          },
          {
            text: "Quel est ce drapeau ?",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/langfr-225px-Flag_of_Portugal.svg.png",
            options: ["Espagne", "Portugal", "France", "Inde"],
            answer: 1,
          },
          {
            text: "Termine la phrase : Le skieur ...",
            image:
              "https://c.pxhere.com/photos/f2/e8/skiing_girl_sun_snow_winter_ski_sport_mountain-453661.jpg!s2",
            options: ["Nage", "Grimpe", "Roule", "Glisse"],
            answer: 3,
          },
          {
            text: "Comment dit-on 2 en Anglais",
            image:
              "https://img.freepik.com/photos-gratuite/bleu-numero-deux_1232-678.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=sph",
            options: ["Deux", "Dos", "Two", "Second"],
            answer: 2,
          }
        ];
      } else if (difficulty_choosen == 1) {
        questions = [
          {
            text: "Comment se nomme le petit de la Vache ?",
            image:
              "https://img.freepik.com/photos-gratuite/belle-vache-herbe-verte-ciel-bleu_268835-3018.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=ais",
            options: ["Le bouc", "Le poulain", "Le taureau", "Le veau"],
            answer: 3,
          },
          {
            text: "A quoi correspond cette période dans l'Histoire ?",
            image:
              "https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/e/8/3/e83ef80c59_104411_fin-moyen-age.jpg",
            options: ["Moyen age", "Temps moderne", "Prehistoire", "Antiquites"],
            answer: 0,
          },
          {
            text: "Dans quelle matière utilise-t-on ces outils ?",
            image:
              "https://www.techni-contact.com/ressources/images/tcarbo/images/42(56).jpg",
            options: ["Français", "Mathématique", "Sport", "Musique"],
            answer: 1,
          },
          {
            text: "Quel est ce drapeau ?",
            image:
              "https://www.publicdomainpictures.net/pictures/340000/nahled/national-flag-of-japan-themes-idea-design-1588673049smT.jpg",
            options: ["Espagne", "France", "Japon", "Inde"],
            answer: 2,
          },
          {
            text: "Quelle heure est-il indiqué sur l'horloge ?",
            image:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTHqHxlvnzFAHZABVPx6Tb5Rl3VIfHDp_tOMSsI4rAik50CGCeH",
            options: ["16h15", "12h45", "14h00", "13h15"],
            answer: 3,
          },
          {
            text: "Comment se forment les nuages ?",
            image:
              "https://c.pxhere.com/photos/6c/e0/blue_clouds_day_fluffy_sky_summer_nature-1248502.jpg!s2",
            options: ["Vapeur d'eau ", "Fumée de la cheminée", "De la Barbapapa", "Baquette Magiques"],
            answer: 0,
          },
          {
            text: "Quelle planète est la troisième du système solaire en partant du soleil ?",
            image:
              "https://img.freepik.com/vecteurs-libre/contexte-du-systeme-solaire_1284-12725.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=ais",
            options: ["Mars", "Jupiter", "Uranus", "Terre"],
            answer: 3,
          },
          {
            text: "Quelle est la capitale de la France  ?",
            image:
              "https://img.freepik.com/vecteurs-libre/illustration-du-drapeau-france_53876-27099.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=ais",
            options: ["Madrid", "Londre", "Paris", "Marseille"],
            answer: 2,
          },
          {
            text: "Combien de côtés à un triangle ?",
            image:
              "https://img.freepik.com/vecteurs-libre/vecteur-forme-geometrique-triangle-jaune_53876-175072.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=sph",
            options: ["3", "2", "5", "4"],
            answer: 0,
          },
          {
            text: "Quelle est cette couleur en Anglais ?",
            image:
              "https://img.freepik.com/photos-gratuite/solide-abstrait-fond-salle-mur-studio-degrade-jaune-brillant_1258-88679.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=sph",
            options: ["Yellow", "Red", "Pink", "Black"],
            answer: 0,
          }
        ];
      } else if (difficulty_choosen == 2) {
        questions = [
          {
            text: "Quelle est la date de la prise de la Bastille ?",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anonymous_-_Prise_de_la_Bastille.jpg/2560px-Anonymous_-_Prise_de_la_Bastille.jpg",
            options: ["11 novembre 1918", "10 décembre 1948", "14 juillet 1789", "12 octobre 1492"],
            answer: 2,
          },
          {
            text: "Comment appelle-t-on le personnage principal d'un livre ?",
            image:
              "https://img.freepik.com/vecteurs-libre/pile-livres-design-plat-dessines-main_23-2149334862.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=sph",
            options: ["Un illustrateur", "Un présentateur", "Un héros", "Un auteur"],
            answer: 2,
          },
          {
            text: "Quelle planète se nomme la planète rouge ?",
            image:
              "https://img.freepik.com/vecteurs-libre/fond-mars_23-2147980445.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=sph",
            options: ["Vénus", "Mercure", "Jupiter", "Mars"],
            answer: 3,
          },
          {
            text: "Quel est le nom du plus grand océan sur Terre ?",
            image:
              "https://media.kartable.fr/uploads/finalImages/final_5e67662e055861.31549375.png",
            options: ["L'océan Atlantique", "L'océan Pacifique", " L'océan Indien", "L'océan Arctique"],
            answer: 1,
          },
          {
            text: "Combien de côtés à un hexagone ?",
            image:
              "https://img.freepik.com/vecteurs-libre/vecteur-forme-geometrique-hexagonale-course_53876-175085.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=sph",
            options: ["6", "5", "7", "4"],
            answer: 0,
          },
          {
            text: "Qui a peint la Joconde ?",
            image: "https://c.pxhere.com/images/c5/55/fb17d5210f01a8b10e8e32ab6e54-1564215.jpg!s2",
            options: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Léonard de Vinci"],
            answer: 3,
          },
          {
            text: "Si un angle mesure 90 degrés, comment est-il appelé ?",
            image: "https://img.freepik.com/vecteurs-premium/angle-90-degres-dessin-ligne-angles_718518-3649.jpg?w=2000",
            options: ["Obtus", "Plat", "Droit", "Aigu"],
            answer: 2,
          },
          {
            text: "Qui était la reine d'Égypte célèbre pour sa liaison avec Jules César ?",
            image: "https://ih1.redbubble.net/image.2307287657.9027/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            options: ["Néfertiti", "Cléopâtre", "Hatshepsout", "Isabelle d'Este"],
            answer: 1,
          },
          {
            text: "Quelle est la capitale du Brésil ?",
            image: "https://img.freepik.com/photos-gratuite/drapeau-du-bresil_1401-76.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=ais",
            options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
            answer: 0,
          },
          {
            text: "Quel explorateur a découvert l'Amérique en 1492 ?",
            image: "https://img.freepik.com/photos-gratuite/personne-tenue-loupe-carte-projection-peruvien-villes_23-2147837178.jpg?size=626&ext=jpg&ga=GA1.1.1204373007.1703767601&semt=ais",
            options: ["Marco Polo", "Vasco de Gama", "Christophe Colomb", "Jules César"],
            answer: 1,
          }
        ];
      }
      return questions;
    },

    async registerPartie() {
      const response = await fetch("http://localhost:9090/insertPartie", {
        method: "POST",
        body: JSON.stringify({
          "ScorePartie": (this.score + "/" + this.currentQuestionIndex).toString(),
          "LibelleDifficultePartie": this.difficulty_label,
          "jws": this.$cookies.get('jws'),
          "NomJeu": this.$route.name,
        })
      })
      response;
    },
  },
};
</script>
  
<style scoped>
@font-face {
  font-family: 'Perfect DOS VGA 437 Win';
  src: url('@/assets/fonts/pixel2.ttf') format('truetype');
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Perfect DOS VGA 437 Win', monospace;
}

#app p1 {
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  margin-top: 45%;
}

#app button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  cursor: pointer;
  width: 200px;
  margin-left: 5%;
  font-family: 'Perfect DOS VGA 437 Win', monospace;
  position: relative;
  height: 50px;
  z-index: 2;
}


h1 {
  font-size: 44px;
  font-family: 'Perfect DOS VGA 437 Win', monospace;
  color: #333333;
  font-weight: bold;
  margin-bottom: 20px;
}

/*
  #choix {
    margin-top: 20px;
  }
  
  .btn-niv {
    margin-right: 10px;
    margin-bottom: 10px;
    border: 2px solid black;
    border-radius: 10px;
   padding: 10px 20px;
  }
  
  .btn-niv:hover {
    background-color: black;
  }
  */
button {
  margin-top: 20px;
}


.question {
  background-image: url('@/assets/images/games/QuestionPourUnEnfant/fond.png');
  background-repeat: no-repeat;
  background-size: cover;
  image-rendering: pixelated;
  padding: 1%;
  margin: 20px auto;
  width: 75%;
}

.question-image {
  max-width: 50%;
  height: auto;
  margin-bottom: 10px;
  display: block;
  margin-left: 27%;
  margin-right: 22%;
}

.question-text {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding-top: 2%;
  font-family: 'Perfect DOS VGA 437 Win', monospace;
  color: white;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  padding: 10px 20px;
  margin-left: 5%;
}

.submit-btn:hover {
  background-color: black;
}

.answers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
}

#timer {
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

#rejouer {
  display: none;
}

#rejouer button {
  border-radius: 10px;
  padding: 15px 30px;
  font-size: 25px;
  cursor: pointer;
  margin-top: 20px;
  border: 2px solid black;
}

#rejouer button:hover {
  background-color: white;
}

#pixel {
  z-index: -1;
  top: 0%;
  left: 0;
  position: absolute;
  width: 100%;
  image-rendering: pixelated;
  height: 100%;
  object-fit: cover;
  object-position: top left;
}

/*
  .custom-swal{
    background-image: url('@/assets/images/games/QuestionPourUnEnfant/fond.png');
    background-repeat: no-repeat;
    background-size: cover;
    image-rendering : pixelated;
    color: white;
  }
  */
@media screen and (max-width: 600px) {

  /*
      .flex-container {
        flex-direction: column;
        align-items: center;
      }
      */
  h1 {
    text-align: center;
  }

  .btn-niv {
    margin-bottom: 10px;
  }

  .question {
    width: 90%;
  }

  .question-content {
    text-align: center;
  }

  .question-image {
    max-width: 80%;
    height: auto;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  .answers {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .submit-btn {
    width: 45%;
    margin-bottom: 10px;
  }

  .custom-swal {
    width: 80%;
  }
}
</style>