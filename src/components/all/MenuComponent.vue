<template>
    <div :class="{ closed: closed }" class="menu">
        <div class="container">
            <router-link id="home-icon" to="/"><img src="@/assets/images/menu-home.png"></router-link>
            <router-link id="home-icon" to="/"><img src="@/assets/images/menu-home.png"></router-link>
            <h3>MENU</h3>

            <div id="level-container">
                <LevelComponent ref="levelComp"></LevelComponent>
            </div>
            
            <h4 class="message">{{ message }}</h4>

            <h5 v-if="score" class="score">score : {{ score }}</h5>

            <div class="levels">
                <button v-for="(level, key) in levels" :key="key" @click="level_choosen = key"
                    :class="{ choosen: level_choosen == key }">{{ level }}</button>
            </div>

            <div class="difficulties">
                <button v-for="(difficulty, key) in difficulties" :key="key" @click="difficulty_choosen = key"
                    :class="{ choosen: difficulty_choosen == key }">{{ difficulty }}</button>
            </div>

            <button :class="{ unabled: (difficulties !== undefined && difficulty_choosen === undefined) || (levels !== undefined && level_choosen === undefined) }" @click="emitClicked"
                id="launch">{{ button_text }}</button>
        </div>
    </div>
</template>


<script>

import LevelComponent from '@/components/all/LevelComponent.vue'
export default {
    name: 'menuComponenent',
    props: {

    },
    components : {
        LevelComponent
    },

    data() {
        return {
            difficulty_choosen: undefined,
            difficulties: undefined,
            level_choosen: undefined,
            levels: undefined,
            message: undefined,
            score: undefined,
            button_text: undefined,
            closed: true,
        }
    },

    created(){
        if (!this.$cookies.get("jws")){
            this.$router.push("/login")
            return
        }  
    },

    

    methods: {
        close() {
            this.closed = true
        },
        open(message, difficulties, button_text, levels, score) {
            this.message = message
            this.difficulties = difficulties
            this.button_text = button_text
            this.score = score
            this.closed = false
            this.levels = levels
        },

        xp(xp){
          this.$refs.levelComp.xp(xp)
        },
        emitClicked() {
            if (!(this.difficulties !== undefined && this.difficulty_choosen === undefined)) {
                if (!(this.levels !== undefined && this.level_choosen === undefined)) {
                    this.$emit('menu-clicked', 
                    this.message, 
                    this.difficulty_choosen,
                    this.difficulties === undefined ? undefined : this.difficulties[this.difficulty_choosen], 
                    this.level_choosen === undefined ? undefined : this.levels[this.level_choosen], 
                    this.score);
                    
                    this.close()
                }
            }
        }
    },

}
</script>

<style scoped>
.menu {
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    background-color: rgba(39, 39, 39, 0.87);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.menu.closed {
    display: none;
}

.container {
    top: 50%;
    max-height: 90vh;
    transform: translateY(-50%);
    position: absolute;
    width: 70%;
    height: 45vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #252525;
}

h3 {
    background-color: rgb(19, 19, 19);
    box-sizing: border-box;
    text-transform: uppercase;
    padding: 1VW 3vw; 
    font-size: 4vw;
    margin-bottom: 1vw;
    width: 100%;
    font-family: 'pixel';
    text-align: left;
    color: rgb(255, 174, 0);
}

h4 {
    margin-top: 0%;
    text-transform: uppercase;
    color: rgb(255, 255, 255);
    font-size: 3vw;
    font-family: 'pixel';
    text-align: center;
}

h5 {
    text-transform: uppercase;
    color: rgb(255, 174, 0);
    font-size: 3vw;
    font-family: 'pixel';
    text-align: center;
}

.difficulties, .levels {
    flex-wrap: wrap;
    display: flex;
    gap: 2.2vw;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 3vw;
}

.difficulties button, .levels button {
    cursor: pointer;
    text-transform: uppercase;
    cursor: pointer;
    width: 15vw;
    border: none;
    font-size: 1.5vw;
    font-family: 'pixel';
    padding: 0.5vw 1.5vw;
    background-color: rgb(236, 236, 236);
}

.difficulties button.choosen, .levels button.choosen {
    background-color: rgb(255, 153, 0);
}

#launch {
    margin-bottom: 4.5%;
    text-transform: uppercase;
    border: none;
    font-size: 2vw;
    padding: 0.5vw 2vw;
    font-family: 'pixel';
    background-color: rgb(32, 216, 32);
    color: white;
    cursor: pointer;
}

#launch.unabled {
    background-color: grey;
    pointer-events: none;
}

#home-icon img {
    width: 100%;
}

#home-icon {
    image-rendering: pixelated;
    position: absolute;
    right: 2vw;
    top: 2.9vw;
    width: 3vw;
    cursor: pointer;
}


#level-container{
    width: 20vw;
    height: 2vw;
    position: absolute;
    right: 10vw;
    top: 3.5vw;
}
</style>
