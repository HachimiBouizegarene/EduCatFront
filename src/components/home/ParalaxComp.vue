<template>
    <div class="container">
        <img id="sun" src="@/assets/images/home/sun.webp">
        <div class="birds">
            <img id="bird_1" class="bird" src="@/assets/images/home/bird.gif">
            <img id="bird_2" class="bird" src="@/assets/images/home/bird.gif">
            <img id="bird_3" class="bird" src="@/assets/images/home/bird.gif">
        </div>
        <div id="mountain-container">
            <h1>EDUCAT</h1>
            <img id="mountain" src="@/assets/images/home/mountain.webp">
            <img class="subject" id="math" src="@/assets/images/home/math.webp" @click="this.$router.push('/jeux')" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Mathématiques">
            <img class="subject" id="french" src="@/assets/images/home/french.webp" @click="this.$router.push('/jeux')" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Français">
            <img class="subject" id="culture" src="@/assets/images/home/culture.webp" @click="this.$router.push('/jeux')" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Culture">
            <img class="subject" id="history" src="@/assets/images/home/history.webp" @click="this.$router.push('/jeux')" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Histoire">
            <img class="subject" id="geo" src="@/assets/images/home/geo.webp" @click="this.$router.push('/jeux')" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Géographie" >
        </div>
        <img class="clouds" id="clouds_1" src="@/assets/images/home/clouds.webp">
        <img class="clouds" id="clouds_2" src="@/assets/images/home/clouds.webp">
        <img id="man" src="@/assets/images/home/man.gif" @click="this.$router.push('/profil')" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Profil">
    </div>

    <div v-if="isHovered" class="hover-text" :style="{ top: mouseY - 85 + 'px', left: mouseX + 5 + 'px' }">
        {{ altText }}
    </div>
    
</template>

<script>
export default {
    name: "ParalaxeComp",

    data() {
        return {
            isHovered: false,
            mouseX: 0,
            mouseY: 0,
            altText: '',
        }
    },

    methods: {
        showAltText(event) {
            this.isHovered = true;
            this.updateMousePosition(event);
            this.altText = event.target.alt || ''; // Récupérer le texte de l'attribut alt
        },
        hideAltText() {
            this.isHovered = false;
        },
        updateMousePosition(event) {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        },
    },
}
</script>

<style scoped>
h1 {
    position: absolute;
    left: 55%;
    transform: translateX(-50%);
    font-family: 'pixel';
    font-size: 17vw;
    color: rgb(44, 55, 75);
    text-align: right;
    top: -10vw;
    z-index: 0;
}

.container {
    overflow: hidden;
    width:100vw;
    max-width: 1920px;
    height: 100vh;
    position: relative;
    min-height: 50vw;
    top: 0;
    max-height: 85vw;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgba(154, 231, 245, 1) 100%, rgba(0, 212, 255, 1) 100%);

}

#background {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -4;
    position: absolute;

}

#mountain-container {
    max-width: 100%;
    position: absolute;
    bottom: -7vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

#mountain {
    width: 100vw;
    z-index: 2;
}


#man:hover {
    transform: translateX(-40%) scale(1.04);
}

#man {
    cursor: pointer;
    position: absolute;
    transform: translateX(-40%);
    left: 36%;
    bottom: 0;
    width:28vw;
    transition: 0.5s ease;
    z-index: 2;
}

.birds {
    width: 100vw;
    height: 100%;
    margin: auto;
    position: relative;
}

.bird {
    filter: blur(1px);
    width: 20px;
    position: absolute;
    animation: bird 120s linear infinite;
}

#bird_1 {
    filter: blur(0px);
    top: 40%;
    animation-duration: 40s;
    animation-delay: -10000ms;
    z-index: 1;
    width: 2%;
}

#bird_2 {
    top: 5%;
}

#bird_3 {
    top: 20%;
    animation-delay: -60000ms;
}

@keyframes bird {
    from {
        right: -50px;
    }

    to {
        right: 105%;
    }
}

:has(#man:hover) #mountain,
:has(#man:hover) .subject {
    filter: blur(3px);
}

:has(.subject:hover) #man {
    filter: blur(3px)
}

.subject {
    filter: blur(0px) brightness(1) drop-shadow(0rem 0rem 1rem rgba(255, 155, 61, 0.747));
    display: block;
    animation: idle 1s ease infinite;
    z-index: 3;
    position: absolute;
    transform: translateX(-50%);
    cursor: pointer;
    box-sizing: border-box;
    border: none;
    width: 7vw;
    padding: 10px;
    transition: 0.5s ease;
}

.subject:hover {
    animation: none;
    padding: 0;
    filter: blur(0px) brightness(1.2);
    transition: 0.5s ease;

}

#math {
    left: 54vw;
    top: -9vw;
    animation-delay: 0.1s;
}

#french {
    left: 27vw;
    bottom: 15vw;
    animation-delay: 0.3s;
}

#culture {
    bottom: 28vw;
    left: 37vw;
}

#history {
    bottom: 15vw;
    right: 13vw;
}

#geo {
    right: 21vw;
    bottom: 28vw;

}

.clouds {
    top: 0;
    position: absolute;
    animation: clouds 120s infinite linear;
    z-index: -2;
    left: 0;
    opacity: 0.7;
}

#clouds_1 {
    left: 199%;
}

#sun {
    z-index: -3;
    position: absolute;
    left: 15vw;
    top: 1vw;
}

.hover-text {
    /* Ajoutez vos styles pour le texte ici */
    all: unset;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/images/home/cadre.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 13vw;
    height: 5vw;
    image-rendering: pixelated;
    text-align: center;
    color: #ffffff;
    font-family: gamesPage;
    font-size: 1.2vw;
    z-index: 5;
}

@keyframes clouds {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
}

@keyframes idle {
    from {
        transform: translateX(-50%) translateY(0%)
    }

    50% {
        transform: translateX(-50%) translateY(-2%)
    }

    to {
        transform: translateX(-50%) translateY(0%)
    }
}

@media screen and (max-width: 1100px ) {

    .subject{
        width: 10vw;
    }
    #mountain{
        margin-top: 20px;
    }
    #mountain-container {
        bottom: 0;
    }

    .container{
        min-height: 67vw;
    }
}

@media screen and (max-width: 600px ) {

    .subject{
        width: 13vw;
    }

    #geo {
        right: 18vw;
    }

    #history {
        bottom: 15vw;
        right: 10vw;
    }
}

@media screen and (min-width: 1930px ) {
    .subject{
        width: 130px;
    }
    .container{
        min-height: unset;
        height: 1300px;
    }

    h1{
        font-size: 220px;
        top: -150px;
    }
    #mountain{
        width: 100%;
    }

    #mountain-container{
        bottom: 0;
    }

    #man{
        width: 600px;
    }

    #math{
        left: 1050px;
        top: -200px;
    }
    #french{
        left: 600px;
        bottom: 350px;
    }

    #history {
        bottom: 350px;
        right: 330px;
    }
    #culture{
        bottom: 600px;
        left: 770px;
    }

    #geo[data-v-d1975d9c] {
        right: 460px;
        bottom: 600px;
    }
}


</style>