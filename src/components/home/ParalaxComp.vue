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
            <img class="subject" id="math" src="@/assets/images/home/math.webp" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Mathématiques">
            <img class="subject" id="french" src="@/assets/images/home/french.webp" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Français">
            <img class="subject" id="culture" src="@/assets/images/home/culture.webp" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Culture">
            <img class="subject" id="history" src="@/assets/images/home/history.webp" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Histoire">
            <img class="subject" id="geo" src="@/assets/images/home/geo.webp" @mouseover="showAltText" @mouseleave="hideAltText" @mousemove="updateMousePosition" alt="Géographie" >
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
            console.log('test');
            this.isHovered = true;
            this.updateMousePosition(event);
            this.altText = event.target.alt || ''; // Récupérer le texte de l'attribut alt
        },
        hideAltText() {
            console.log('test');
            this.isHovered = false;
        },
        updateMousePosition(event) {
            console.log('test');
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
    font-size: 260px;
    color: rgb(44, 55, 75);
    text-align: right;
    top: -20%;
    z-index: -1;
}

.container {
    overflow: hidden;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 1920px;
    height: 101%;
    top: 0;
    position: absolute;
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
    position: absolute;
    bottom: -100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#mountain {
    transition: 0.5s ease;
    width: 1920px;
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
    width: 450px;
    transition: 0.5s ease;
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
    z-index: 1;
    position: absolute;
    transform: translateX(-50%);
    cursor: pointer;
    box-sizing: border-box;
    border: none;
    width: 8%;
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
    left: 54.2%;
    top: -160px;
    animation-delay: 0.1s;
}

#french {
    left: 28%;
    bottom: 35%;
    animation-delay: 0.3s;
}

#culture {
    bottom: 65%;
    left: 38%;
}

#history {
    bottom: 35%;
    right: 13%
}

#geo {
    right: 23%;
    bottom: 65%;

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
    left: 100px;
    top: 120px;
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
    width: 198px;
    height: 78px;
    image-rendering: pixelated;
    text-align: center;
    color: #ffffff;
    font-family: gamesPage;
    font-size: 20px;
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

@media screen and (max-width: 1400px) {

    h1 {
        left: 53.5%;
        font-size: 150px;
    }

    #mountain-container {
        bottom: 0px;
    }


    .container {
        max-height: 1400px;
    }

    #mountain {
        width: 73%;
    }

    .subject {
        width: 110px
    }

    #math {
        left: 53.2%;
        top: -120px;
    }

    #french {
        left: 34%;
    }

    #culture {
        left: 42.3%
    }

    #history {
        right: 24.5%
    }

    #geo {
        right: 31%;
    }

    #man {
        left: 37%;
        width: 350px;
    }



    @media screen and (max-width: 900px) {
        .bird {
            width: 10px;
        }

        #bird_1 {
            top: 50%;
            width: 22px;
            animation-duration: 30s;
        }

        h1 {
            left: 52.3%;
            font-size: 100px;
        }

        #mountain {
            width: 47%;
        }

        #man {
            width: 200px;
            left: 42%;
        }

        .subject {
            width: 80px
        }

        #math {
            left: 52%;
            top: -90px;
        }

        #french {
            left: 40%;
        }

        #culture {
            left: 44.5%
        }

        #history {
            right: 33%
        }

        #geo {
            right: 37.2%;
        }

    }


    @media screen and (max-width: 550px) {

        h1 {
            left: 51.3%;
            font-size: 60px;
        }

        #mountain {
            width: 29%;
        }

        #man {
            width: 150px;
            left: 45%;
        }

        .subject {
            width: 60px
        }

        #math {
            left: 51.3%;
            top: -65px;
        }

        #french {
            left: 43.5%;
        }

        #culture {
            left: 46.5%
        }

        #history {
            right: 39%
        }

        #geo {
            right: 41.5%;
        }
    }
}
</style>