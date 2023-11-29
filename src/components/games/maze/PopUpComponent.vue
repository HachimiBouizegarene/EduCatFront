<template>
  <div id="popup">
    <img id="sword1" src="@/assets/images/games/Maze/Sword.svg" />
    <img id="sword2" src="@/assets/images/games/Maze/Sword.svg" />
    <h1 id="popup-title" class="title bordered">VOUS RENCONTREZ UN OBSTACLE</h1>

    <div class="infos">
      <div class="container bordered">
        <h2>Verbe</h2>
        <p>{{ data['verb'] }}</p>
      </div>
      <h2 id="instruction" class="title bordered">
        Conjuguez pour le detruire
      </h2>
      <div class="container bordered">
        <h2>Temps</h2>
        <p>{{ data['time'] }}</p>
      </div>
    </div>

    <div id="sentence">
      <p id="first-part"></p>
      <p id="response">------</p>
      <p id="second-part"></p>
    </div>

    <div id="choices">
      <div class="choice bordered">
        <img src="@/assets/images/games/Maze/Cat-question.svg" />
        <h3>A</h3>
        <p v-if="data['choices'] !== undefined">{{ data['choices'][0] }}</p>
      </div>
      <div class="choice bordered">
        <h3>B</h3>
        <p v-if="data['choices']  !== undefined">{{ data['choices'][1] }}</p>
      </div>
      <div class="choice bordered">
        <h3>C</h3>
        <p v-if="data['choices']!== undefined">{{ data['choices'][2] }}</p>
      </div>
      <div class="choice bordered">
        <h3>D</h3>
        <p v-if="data['choices'] !== undefined">{{ data['choices'][3] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUpComponent",
  props: {
    data: Array,
  },

  methods: {
    ShowSentence() {
      if(this.data['sentence'] !== undefined){
        let parties = this.data['sentence'].split("##");
        document.querySelector("#sentence #first-part").innerHTML = parties[0];
        document.querySelector("#sentence #second-part").innerHTML = parties[1];
      }
      
    },
    open() {
      console.log(this.data);
      document.querySelector("#popup").classList.add("opened");
    },
  },
  data() {
    return {};
  },

  mounted() {
    this.ShowSentence();
  },

  updated(){
    this.open()
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playpen+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap");

#popup {
  pointer-events: none;
  scale: 1.2;
  opacity: 0;
  width: 70%;
  gap: 100px;
  overflow: auto;
  max-height: 90vh;
  position: absolute;
  background-color: #af382d;
  left: 15%;
  top: 5%;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen-2.png");
  /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
  border-radius: 10px;
  border: 5px solid rgb(192, 11, 11);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.3s ease;
}

#popup.opened {
  pointer-events: all;
  scale: 1;
  opacity: 1;
}

#sword1,
#sword2 {
  position: absolute;
  width: 40px;
  top: 10px;
}

#sword2 {
  right: 10px;
}

#sword1 {
  left: 10px;
}

.cls-1 {
  fill: rgb(161, 48, 48);
}

#popup .bordered {
  background-image: url("https://www.transparenttextures.com/patterns/concrete-wall.png");
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 3px, rgba(0, 0, 0, 0.23) 0px 10px 6px;
  font-size: 15px;
}

#popup .title {
  font-family: "Playpen Sans", cursive;
  padding: 20px 0;

  border-radius: 100px;

  position: relative;
  margin: 0 auto;
  text-align: center;
}

#popup .bordered::after,
#popup .bordered::before {
  border-radius: 30px;
  content: " ";
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border: 3px solid #20202077;
  filter: blur(2px);
}

#popup .bordered::after {
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  border: 2px solid rgba(0, 0, 0, 0.411);
  filter: none;
}

#popup #popup-title {
  color: #3a3a3a;
  width: 60%;
  background-color: #ffe8d7;
  margin-top: 20px;
}

#popup #popup-title::after {
  border-color: #6b1d1d44;
}

#popup #instruction {
  width: 50%;
  color: rgb(255, 228, 228);
  background-color: #c73534;
}

#popup #instruction::after {
  border: 2px solid #2020203b;
}

#popup #instruction::before {
  border: 3px solid #ffe3d0;

  filter: blur(1px);
}

#popup #sentence {
  border-top: dashed 2px #d1b8a8;
  padding: 20px 0px;
  flex-wrap: wrap;
  border-bottom: dashed 2px #d1b8a8;
  width: auto;
  max-width: 80%;
  text-align: center;
}

#sentence p {
  font-size: 20px;
  color: #ffe3d0;
  font-family: "Libre Baskerville", serif;
  display: inline;
  text-align: center;
  line-height: 40px;
}

#popup #sentence #response {
  display: inline-block;
  margin: 0 8px;
  padding: 0 10px;
  position: relative;
  border: 3px #ffe3d0 solid;
  width: fit-content;
  border-radius: 10px;
}

.infos {
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: space-around;
}

.infos .container {
  position: relative;
  color: white;
  background-color: #cb3733;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.infos .container p,
.infos .container h2 {
  font-family: "Playpen Sans", cursive;
}

.infos .container h2 {
  padding: 10px;
  border-bottom: 2px #ffe3d0 dashed;
}

.infos .container p {
  padding: 10px;
}

#popup .infos .container::after {
  border: 2px solid #2020203b;
}

#popup .infos .container::before {
  border: 3px solid #ffe3d0;
  filter: blur(1px);
}

#popup #choices {
  display: flex;
  width: 50%;
  flex-wrap: wrap;
}

#popup #choices .choice {
  padding: 20px 0;
  margin: 2%;
  background-color: #ffe3d0;
  position: relative;
  border-radius: 50px;
  width: 46%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: 0.3s ease;
  cursor: pointer;
}

#popup #choices .choice:hover {
  box-shadow: none;
}

#popup #choices .choice p {
  font-family: "Libre Baskerville", serif;
  padding: 0 10px;
  border-right: 1px;
  color: #3a3a3a;
}

#popup #choices .choice h3 {
  color: #3a3a3a;
  padding: 0 10px;
  border-right: 2px solid rgb(100, 100, 100);
}

#popup #choices .choice img {
  position: absolute;
  width: 60px;
  top: 4px;
  transform: translateY(-100%);
  right: 20px;
}

@media screen and (max-width: 1300px) {
  #popup .bordered {
    font-size: 11px;
  }

  #popup #sentence {
    border-top: dashed 2px #d1b8a8;
    border-bottom: dashed 2px #d1b8a8;
  }

  #sentence p {
    font-size: 18px;
  }

  #popup #choices .choice img {
    width: 40px;
  }

  #popup #choices {
    width: 60%;
  }

  #popup #choices .choice {
    padding: 15px 0;
  }

  .infos .container {
    padding: 20px;
  }
}

@media screen and (max-width: 800px) {
  #popup {
    width: 90%;
    left: 5%;
  }

  #popup #choices {
    width: 80%;
  }

  #popup .title {
    padding: 10px 0;
  }

  .infos .container {
    padding: 10px;
  }

  #popup .bordered {
    font-size: 10px;
  }

  #sword1,
  #sword2 {
    width: 20px;
  }
}

@media screen and (max-width: 500px) {
  #popup {
    gap: 70px;
  }
  #popup .bordered {
    font-size: 7px;
  }

  #popup #sentence {
    width: 80%;
  }
  #popup #sentence p {
    font-size: 10px;
    line-height: 20px;
  }

  #popup #sentence #response {
    margin: 0 2px;
    padding: 0 2px;
  }

  .bordered::after {
    border: none !important;
  }
  .bordered::before {
    border: none !important;
  }

  .infos .container p,
  .infos .container h2 {
    padding: 5px;
  }
  .infos {
    width: 95%;
  }
  #popup #choices .choice {
    padding: 10px 0;
  }
}
</style>
