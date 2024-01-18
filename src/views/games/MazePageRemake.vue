<template>
    <MenuComponent ref="menu" @menu-clicked="menuClicked"></MenuComponent>
    <LevelAnnounceComp ref="level_announce"></LevelAnnounceComp>
    <main>
        <PopupCompRemake @reset="reset()"  @correct_answer="destroyObstacle()" @wrong_answer="loseHeath()" ref="popup"></PopupCompRemake>
        <healthComponent :health="health"></healthComponent>
  
        <div class="decor">
            <img id="fracture-1" class="fracture" src="@/assets/images/games/Maze/decor/fracture.png">
            <img id="fracture-2" class="fracture" src="@/assets/images/games/Maze/decor/fracture.png">
            <img id="big-fracture" class="fracture" src="@/assets/images/games/Maze/decor/big_fracture.png">
            <img id="rock" src="@/assets/images/games/Maze/decor/rock.png">
            <img class="runner" id="runner-1" src="@/assets/images/games/Maze/decor/runner.gif">
            <img class="runner" id="runner-2" src="@/assets/images/games/Maze/decor/runner_2.gif">
            <img class="runner" id="runner-3" src="@/assets/images/games/Maze/decor/runner.gif">
            <img id="structure" src="@/assets/images/games/Maze/decor/structure.png">
            <img class="scene" id="scene" src="@/assets/images/games/Maze/decor/scene.gif">

            <img v-for="index in 11" :key="index"
                :style="{ top: this.grass_positions[index].top, left: this.grass_positions[index].left }" class="grass"
                src="@/assets/images/games/Maze/decor/grass.gif">
        </div>

        <div id="title">
            <h1>
                <img src="@/assets/images/games/Maze/title_background.png">
                CONJUGAISON
            </h1>
        </div>

        <div class="maze-container">
            <MazeComponent @win="win"  @obstacle="obstacle" ref="maze"></MazeComponent>
        </div>
        <div id="fight-button" :class="{ unabled: !this.possible_attack }">
            <img @click="attack" v-if="attacking == false" src="@/assets/images/games/Maze/contour_attack.png">
            <img v-if="attacking == true" src="@/assets/images/games/Maze/contour_attack_clicked.png">
        </div>
    </main>
</template>

<script>
import MenuComponent from "@/components/games/maze/MenuComponent.vue";
import MazeComponent from "@/components/games/maze/MazeComponentRemake.vue";
import PopupCompRemake from "@/components/games/maze/PopupCompRemake.vue";
import healthComponent from "@/components/games/maze/healthComponent.vue";
import LevelAnnounceComp from "@/components/games/maze/LevelAnnounceComp.vue";
export default {
    name: "MazePageRemake",
    components: {
        MazeComponent,
        PopupCompRemake,
        healthComponent,
        MenuComponent,
        LevelAnnounceComp
    },
    data() {
        return {
            attacking: false,
            possible_attack: false,
            grass_positions: [
                {},
                { top: '12vw', left: '76%' },
                { top: '13vw', left: '89%' },
                { top: '29vw', left: '20%' },
                { top: '29.5vw', left: '10%' },
                { top: '50vw', left: '70%' },
                { top: '44.5vw', left: '10%' },
                { top: '12vw', left: '24%' },
                { top: '35vw', left: '91%' },
                { top: '6vw', left: '50%' },
                { top: '15vw', left: '10%' },
                { top: '25vw', left: '90%' },
            ],
            health : 3,
            x_attacking_ostacle : undefined,
            y_attacking_ostacle: undefined,
            difficulty : undefined,
            difficultys : ["FACILE", "MOYEN", "DIFFICILE"],
            manche : 0 ,
            manches : [{length : 7, obstacles : 3}, {length : 11, obstacles : 5}, {length : 13, obstacles : 7},
             {length : 15, obstacles : 8}, { length : 19, obstacles : 9}]
        }
    },
    methods: {
        win(){
            console.log("won");
            if(this.manche >= this.manches.length -1) this.$refs.menu.open('VICTOIRE',  this.difficultys, 'REJOUER')
            else this.nextManche()
        },
        menuClicked(message, level_choosen_index){
            this.difficulty = level_choosen_index;
            if(message== 'CONJUGAISON' || message == "GAME OVER" || message == "VICTOIRE"){
                this.manche = 0;
                this.$refs.maze.generate(this.manches[0].length, this.manches[0].obstacles);
                this.$refs.level_announce.announce(1)
                this.reset()
                this.health = 3
            }
        },

        nextManche(){
            this.manche ++
            this.$refs.level_announce.announce(this.manche + 1)
            console.log( this.manches[this.manche].obstacles);
            this.$refs.maze.generate(this.manches[this.manche].length, this.manches[this.manche].obstacles);
            this.$refs.maze.reset()
            this.reset()
        },

        reset(){
            this.attacking = false
            this.$refs.maze.reset()
            this.$refs.maze.verifieOstacle()
        },
        async attack() {
            if (this.possible_attack) {
                this.attacking = true
                const body = JSON.stringify({
                        'difficulty' : this.difficulty
                    });
                let data =  await fetch("http://localhost:9090/conjugation", {
                    method : 'POST',
                    body : body
                }).then((res)=>{
                    return res.json()
                })
                this.$refs.popup.appear(data)
            }

        },
        loseHeath(){
            this.health--
            if(this.health <= 0) this.$refs.menu.open('GAME OVER',  undefined, 'REJOUER')

        },
        obstacle(bool, y, x) {
            y, x;
            this.possible_attack = bool;
            this.x_attacking_ostacle = x
            this.y_attacking_ostacle = y
        },
        destroyObstacle(){
            this.$refs.maze.destroyObstacle(this. x_attacking_ostacle,  this.y_attacking_ostacle)
        },
        handleResizeMaze(){
        const mazeContainer = document.querySelector('.maze-container')
        mazeContainer.style.height = mazeContainer.offsetWidth + "px";
    }
    },    
    mounted() {
        const mazeContainer = document.querySelector('.maze-container')
        mazeContainer.style.height = mazeContainer.offsetWidth + "px";
        window.addEventListener('resize', this.handleResizeMaze)
        document.querySelector("body").style.backgroundColor= "#8ea7c5"
        document.querySelector("body").style.minHeight= "350px"
        document.querySelector("body").style.height= "100vh"
        this.$refs.menu.open('CONJUGAISON',  this.difficultys, 'LANCER', undefined, 20)
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResizeMaze);
        document.querySelector("body").style.backgroundColor = "";
        document.querySelector("body").style.minHeight = "";
        document.querySelector("body").style.height = "";
  }
}
</script>

<style scoped>


main {
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #8ea7c5;
    width: 100%;
    max-width: 1920px;
    min-height: 47.5vw;
    height: 100vh;
    max-height: 1200px !important;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    height: fit-content;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}


h1 {
    position: absolute;
    font-size: 2.5vw;
    top: 2%;
    left: 1%;
    color: white;
    font-family: 'pixel';
    z-index: 1;
    padding: 4%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
}

h1 img {
    width: 100%;
    object-fit: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: -1;
    image-rendering: pixelated;
}


.maze-container {
    border: 0.5dvw solid rgba(0, 0, 0, 0.466);
    overflow: hidden;
    width: 35%;
    height: 100px;
    position: absolute;
    left: 53%;
    transform: translateX(-50%) translateY(-50%);
    top: 26vw;
}

#fight-button {
    position: absolute;
    top: 30vw;
    right: 10%;
    width: 10%;
    border-radius: 100px;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;
}

#fight-button:hover {
    filter: brightness(1.3);
}

#fight-button.unabled {
    filter: grayscale(1);
    cursor: default;
}

#fight-button img {
    width: 100%;
    image-rendering: pixelated;
}

.decor {
    position: absolute;
    width: 100%;
    height: 100%;
}

.decor img {
    width: 100px;
    image-rendering: pixelated;
    position: absolute;
}

.decor img:nth-child(1) {
    top: 50%;
    left: 5%;
}

img.grass {
    width: 1.5%;
    z-index: 2;
}

img.fracture {
    width: 3%;
}

#fracture-1 {
    top: 34vw;
    left: 80%;
}

#fracture-2 {
    z-index: 22;
    top: 46vw;
    left: 25%;
    z-index: 22;
}

#big-fracture {
    width: 9%;
    top: 5vw;
    left: 73%;
}

#rock {
    top: 5vw;
    left: 42%;
    width: 2%;
}

#runner-1 {
    top: 10vw;
    z-index: 11;
    left: 2%;
}

#runner-2 {
    top: 35vw;
    left: 70%;
    animation-delay: -3s;
}

#runner-3 {
    z-index: 1;
    top: 5vw;
    left: 84%;
    animation: little_patrol 7s linear infinite;
}

img.runner {
    width: 5%;
    animation: patrol 25s linear infinite;
}

#structure {
    width: 30%;
    image-rendering: pixelated;
    top: -2vw;
    left: 80%;
}

#scene {
    width: 40%;
    top: 12.4vw;
    left: -4%;
}

@keyframes little_patrol {
    from {
        transform: translateX(0) scaleX(1);
    }

    49% {
        transform: translateX(150%) scaleX(1);
    }

    50% {
        transform: translateX(150%) scaleX(-1);

    }

    99%{
        transform: translateX(0%) scaleX(-1);
    }
    to {
        transform: translateX(0) scaleX(1);
    }
}

@keyframes patrol {
    from {
        transform: translateX(0) scaleX(1);
    }

    49% {
        transform: translateX(300%) scaleX(1);
    }

    50% {
        transform: translateX(300%) scaleX(-1);

    }
    99%{
        transform: translateX(0%) scaleX(-1);
    }
    to {
        transform: translateX(0%) scaleX(1);
    }
}


@media screen and (min-width: 2120px) {

    main {
        min-height: 1000px;
    }

    .grass {
        display: none;
    }

    h1 {
        position: absolute;
        font-size: 50px
    }

    #runner-3 {
        top: 8%;
    }

    #structure {
        top: -3%;
    }

    #scene {
        top: 27%;
    }

    #runner-1 {
        top: 16%;
    }

    .maze-container {
        top: 50%;
    }

    #fight-button {
        top: 50%;
    }

    #fracture-1 {
        top: 57%;
    }

    #fracture-2 {
        top: 93%;
    }

    #big-fracture {
        top: 8%;
    }
}

@media screen and (max-width: 1600px) and (min-height: 85vw) {

    main {
        min-height: 160vw;
        top: 0;
        transform: none;
        height: 100vh;
    }

    h1 {
        width: 45%;
        top: 23vw;
        font-size: 4.5vw;
        left: 32%;
        transform: translateX(-50%);
    }

    .maze-container {
        top: 96vw;
        width: 80%;
        left: 50%;
    }

    #fight-button {
        width: 20%;
        top: 150vw;
        left: 40%;
    }

    img.runner {
        width: 10%;
    }

    img.grass {
        width: 4%;
    }

    #structure {
        width: 75%;
        left: 54%;
        top: -3vw;
    }

    #scene {
        top: 130vw;
        width: 80%;
        left: 30%;
    }

    #runner-1 {
        top: 35vw;
        left: 10%;
    }

    #runner-3 {
        top:17vw;
        left: 70%;
    }

    img.fracture {
        width: 8%;
    }

    #fracture-1 {
        top: 140vw;
        z-index: 111;
        left: 74%;
    }

    #fracture-2 {
        top: 40vw;
        z-index: 10;
    }

    #big-fracture {
        width: 20%;
        top: 150vw;
        z-index: 111;
        left: 13%;
    }
}

</style>