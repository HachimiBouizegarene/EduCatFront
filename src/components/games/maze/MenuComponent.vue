<template>
    <div :class="{ closed: closed }" class="menu">
        <div class="container">
            <router-link id="home-icon" to="/"><img src="@/assets/images/menu-home.png"></router-link>
            <h3>MENU</h3>
            <h4 class="message">{{ message }}</h4>

            <div class="levels">
                <button v-for="(level, key) in levels" :key="key" @click="level_choosen = key"
                    :class="{ choosen: level_choosen == key }">{{ level }}</button>
            </div>
            <button @click="this.$emit('menu-clicked', message ,levels[level_choosen]); close()" id="launch">{{ button_text }}</button>
        </div>
    </div>
</template>


<script>

export default {
    name: 'menuComponenent',
    props: {
      
    },

    data() {
        return {
            level_choosen: undefined,
            closed: false,
            message: undefined,
            levels: undefined,
            button_text: undefined
        }
    },

    methods: {
        close() {
            this.closed = true
        },
        open(message, levels, button_text) {
            this.message = message
            this.levels = levels
            this.button_text = button_text
            this.closed = false

        }
    },

}
</script>

<style scoped>
.menu {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    background-color: rgba(0, 0, 0, 0.87);
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
    box-sizing: border-box;
    text-transform: uppercase;
    padding: 1VW;
    font-size: 5vw;
    width: 100%;
    font-family: 'pixel';
    text-align: center;
    color: rgb(255, 174, 0);
}

h4 {
    margin-top: 2%;
    text-transform: uppercase;
    color: rgb(255, 255, 255);
    font-size: 4vw;
    font-family: 'pixel';
    text-align: center;
}

.levels {
    flex-wrap: wrap;
    display: flex;
    gap: 2.2vw;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 3vw;
}

.levels button {
    cursor: pointer;
    text-transform: uppercase;
    cursor: pointer;
    width: 15vw;
    border: none;
    font-size: 1.5vw;
    font-family: 'pixel';
    padding: 1vw 2vw;
}

.levels button.choosen {
    background-color: rgb(255, 153, 0);
}

#launch {
    margin-bottom: 4.5%;
    text-transform: uppercase;
    border: none;
    font-size: 2vw;
    padding: 1vw 3vw;
    font-family: 'pixel';
    background-color: rgb(32, 216, 32);
    color: white;
    cursor: pointer;
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
</style>
