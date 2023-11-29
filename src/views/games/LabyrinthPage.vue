<template>
  <NavBar></NavBar>
  <!-- <PopUpComponent ref="popup" sentence = "Bonjour je ... un stupido" :choices="['je', 'suis']" answer="je"></PopUpComponent> -->
  <div class="content">
    <h1 id="game-title">CONJUGAISON</h1>
    <div class="mid-content">
      <div class="maze-container">
        <MazeComponent @obstacle="obstacle" ref="maze"></MazeComponent>
      </div>

      <div class="right-content">
        <div class="infos">
          <div class="left-part">
            <h2>Informations</h2>
          </div>
          <div class="right-part">
            <h2>Notice de jeu</h2>
            <p>
              Ton objectif est de rejoindre le point de sortie<br /><br />
              Des obstacles se dresseront sur ton chemin. Utilisez ce que tu as
              appris en cours pour les detruire<br /><br />
              La conjugaison sera la clee de ta reussite !<br /><br />
              Utilise la manette ou bien les fleches de ton clavier pour te
              deplacer.<br /><br />
              Surtout amuse toi !
            </p>
          </div>
        </div>
        <div class="controller">
          <ControllerComponent @move="move"></ControllerComponent>
        </div>
      </div>
    </div>

    <img
      @click="toggleNotebook"
      id="notebook-icon"
      src="@/assets/images/games/Maze/old-paper.png"
    />
  </div>
</template>

<script>
import NavBar from "@/components/all/NavBar.vue";
import MazeComponent from "@/components/games/maze/MazeComponent.vue";
import ControllerComponent from "@/components/games/maze/ControllerComponent.vue";

export default {
  name: "LabyrinthPage",
  components: {
    ControllerComponent,
    NavBar,
    MazeComponent,
  },

  methods: {
    move(dir) {
      this.$refs.maze.movePlayer(dir);
    },
    obstacle(x, y) {
      console.log(x, y);
      this.$refs.maze.destroyObstacle(x, y);
    },
    toggleNotebook() {
      document.querySelector(".infos").classList.toggle("show");
    },
  },

  mounted() {
    this.$refs.maze.generate(7, 3);
    // console.log(dirs);
    // console.log(dirs_pos);
    // dirs
    // let i = 0
    // setInterval(()=>{
    //     let dir = dirs[i]
    //     let forward_count = 0
    //     while(dir == dirs[i + forward_count]){
    //         forward_count++
    //     }
    //     this.$refs.maze.movePlayer(dirs[i], forward_count)
    //     i+= forward_count
    // }, 1100)
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playpen+Sans&display=swap");
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
.content {
  padding-top: 50px;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  max-height: 1000px;
  overflow: auto;
  overflow-x: hidden;
  flex-wrap: wrap;
  background-color: #f3dac9;
  position: relative;
  background-image: url("https://www.transparenttextures.com/patterns/always-grey.png");
  align-content: flex-start;
}
.mid-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
}

.mid-content .right-content {
  position: static;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px 20px;
  padding-right: 50px;
  gap: 50px;
  box-sizing: border-box;
}

.maze-container {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 3px, rgba(0, 0, 0, 0.23) 0px 10px 6px;
  background-color: #dfbba3;
  width: 600px;
  box-sizing: border-box;
  padding: 20px;
  margin: 30px auto;
  margin-top: 100px;
  background-image: url("https://www.transparenttextures.com/patterns/az-subtle.png");
  border: 3px solid rgb(90, 90, 90);
}

#game-title {
  background-image: url(https://www.transparenttextures.com/patterns/concrete-wall.png);
  font-family: "Playpen Sans";
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 50%;
  margin: 0 25%;
  margin-top: 1%;
  border-radius: 200px;
  background-color: #fbefe3;
  color: rgb(48, 48, 48);
  position: relative;
}

#game-title::after,
#game-title::before {
  pointer-events: none;
  border-radius: 200px;
  content: " ";
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border: 3px solid #00000077;
  filter: blur(3px);
}

#game-title::before {
  pointer-events: none;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  filter: none;
  border: 1px solid #5f5f5f77;
}

.controller {
  height: 30%;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 3px, rgba(0, 0, 0, 0.23) 0px 10px 6px;
  border: 4px solid rgb(99, 0, 0);
}

.infos {
  border-left: 10px solid rgba(49, 49, 49, 0.596);
  border-right: 10px solid rgba(49, 49, 49, 0.596);
  width: 100%;
  height: 70%;
  display: flex;
  overflow: hidden;
  border-radius: 50px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 3px, rgba(0, 0, 0, 0.23) 0px 10px 6px;
  background-color: #d8c39a;
  background-image: url("https://www.transparenttextures.com/patterns/notebook.png");
  position: relative;
}

.infos::after {
  pointer-events: none;
  border-radius: 50px;
  content: " ";
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  border: 1px solid #00000077;
  filter: blur(1px);
}

.infos::before {
  pointer-events: none;
  content: " ";
  position: absolute;
  width: 15px;
  top: 4px;
  left: calc(50% - 20px);
  bottom: 4px;
  border: 1px solid #00000077;
  border-top: none;
  border-bottom: none;
  filter: blur(1px);
}

.infos .left-part {
  width: 50%;
  height: 100%;
}

.right-part,
.left-part {
  padding: 10px;
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  overflow: auto;
}

.right-part p,
.left-part p {
  font-family: "Playpen Sans";
  font-size: 14px;
}

.right-part h2,
.left-part h2 {
  font-family: "Playpen Sans";
  text-align: center;
  padding-bottom: 20px;
  font-weight: 1;
}

#notebook-icon {
  display: none;
  position: absolute;
  width: 60px;
  right: 0;
  top: 200px;
  cursor: pointer;
  overflow: hidden;
  border: 4px solid rgb(73, 51, 18);
  border-right: none;
  border-radius: 4px;
  transition: 0.2s;
}
#notebook-icon:hover {
  border: 4px solid rgb(160, 101, 12);
  border-right: none;
}

@media screen and (max-width: 1300px) {
  #notebook-icon {
    display: block;
    z-index: 999;
  }
  .right-part p,
  .left-part p {
    font-size: 11px;
  }

  .right-part h2,
  .left-part h2 {
    font-size: 20px;
  }
  .infos {
    z-index: 99;
    position: absolute;
    width: 560px;
    height: 300px;
    transition: 0.5s;
    right: 0;
    transform: translateX(100%);
  }
  .infos.show {
    transform: translateX(0);
  }

  .maze-container {
    margin-left: 100px;
  }
  .right-content {
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 1000px) {
  .right-part p,
  .left-part p {
    font-size: 8px;
  }
  #game-title {
    font-size: 14px;
  }
  .maze-container {
    margin-left: 60px;
  }
  .controller {
    height: auto;
  }
  .maze-container {
    width: 350px;
    padding: 20px;
    margin: 30px auto;
    margin-top: 100px;
  }
}

@media screen and (max-width: 600px) {

  #game-title {
  background-image: url(https://www.transparenttextures.com/patterns/concrete-wall.png);
  font-family: "Playpen Sans";
  height: 30px;
  font-size: 1px;
}
  .maze-container {
    width: 280px;
  }
  .right-part h2,
  .left-part h2 {
    font-size: 10px;
    padding-bottom: 5px;
  }
  .infos {
    z-index: 99;
    position: absolute;
    width: 300px;
    height: 200px;
    transition: 0.5s;
    right: 0;
    transform: translateX(700px);
    top: 200px;
  }
  .infos::before {
    border-left: none;
  }
  #notebook-icon {
    width: 35px;
    border: 2px solid rgb(73, 51, 18);
    border-right: none;
  }
  .mid-content {
    flex-direction: column;
  }
  .maze-container {
    margin-top: 20px;
    margin-bottom: 0;
  }
}

@media screen and (max-width: 300px) {
  .maze-container {
    width: 200px;
  }

  .infos {
    z-index: 99;
    position: absolute;
    width: 200px;
    height: 180px;
    padding: 5px;
  }
}
</style>
