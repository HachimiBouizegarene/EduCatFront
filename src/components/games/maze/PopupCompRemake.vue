<template>
    <div class="popup"  :class="{hidden : hidden}">
        <div class="container">
            <img id="contour-popup" src="@/assets/images/games/Maze/contour_popup.png">
            <h3>
                <img src="@/assets/images/games/Maze/title_popup_background.png" />
                VOUS RENCONTREZ UN OBSTACLE
            </h3>
            <section class="infos-container">
                <div class="info">
                    <img src="@/assets/images/games/Maze/info_background.png" />
                    <h5>VERBE</h5>
                    <p >{{verbe}}</p>
                </div>
                <h4>
                    <img src="@/assets/images/games/Maze/title_popup_background.png" />
                    <img id="ennemi-1" src="@/assets/images/games/Maze/ennemi.gif" />
                    <img id="ennemi-2" src="@/assets/images/games/Maze/ennemi.gif" />
                    CONJUGUEZ POUR PASSER !
                </h4>
                <div class="info">
                    <img src="@/assets/images/games/Maze/info_background.png" />
                    <h5>TEMPS</h5>
                    <p >{{temps}}</p>
                </div>
            </section>
            <p id="sentence">{{pronom}} ______</p>
            <div id="choices">
                <span :class="{correct :response == 0 && correct, incorrect :  response == 0 && !correct , unabled : response!== 0 && response !== undefined }"  @click="respond(0)" class="choice" ref="choice_1">
                    <img src="@/assets/images/games/Maze/choice_background.png" />{{responses[0]}}</span>
                <span :class="{correct :response == 1 && correct, incorrect :  response == 1 && !correct, unabled : response!== 1 && response !== undefined }" @click="respond(1)"  class="choice"><img src="@/assets/images/games/Maze/choice_background.png" />{{responses[1]}}</span>
                <span :class="{correct :response == 2 && correct, incorrect :  response == 2 && !correct , unabled : response!== 2 && response !== undefined }" @click="respond(2)"  class="choice"><img src="@/assets/images/games/Maze/choice_background.png" />{{responses[2]}}</span>
                <span :class="{correct :response == 3 && correct, incorrect :  response == 3 && !correct , unabled : response!== 3 && response !== undefined }"  @click="respond(3)" class="choice"><img src="@/assets/images/games/Maze/choice_background.png" />{{responses[3]}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopupComp",  
    data(){
        return{
            verbe : '',
            pronom : '',
            temps : '',
            reponse_index : 0,
            responses : [],
            hidden : true,
            correct : undefined,
            response : undefined
        }
    },

    methods: {
        appear(data){
            this.temps = (data.time)
            this.verbe = data.verb.toUpperCase()
            this.pronom = data.pronom
            this.responses = data.responses
            this.reponse_index = data.response_index
            // this.choix_possibles = choix_possibles
            // this.reponse_index = reponse_index
            this.hidden = false
        },

        respond(res){
            this.response = res
            this.correct = res == this.reponse_index;

            if(res !== this.reponse_index){
                this.$emit("wrong_answer")
            }
            setTimeout(()=>{
                this.hidden = true;
                if(res === this.reponse_index){
                    this.$emit("correct_answer")
                }
                this.$emit("reset")
                this.reset()
            }, 2000)
        },
        reset(){
            this.verbe = '',
            this.phrase = '',
            this.temps = '',
            this.reponse_index = 0,
            this.choix_possibles = [],
            this.hidden = true,
            this.correct = undefined,
            this.response = undefined
        }
    },

    mounted(){
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');

* {
    font-family: 'pixel2';
    color: rgb(182, 182, 182);

}

.popup {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) scale(1) ;
    width: 100%;
    max-width: 1920px;
    height: 107%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.15s ease;
}

.popup.hidden{
    transform: translateY(-50%) scale(0);
    pointer-events: none;
}

.container {
    min-height: 80%;
    width: 70%;
    height: 80%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

img#contour-popup {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    object-fit: fill;
}

.container H3 {
    font-size: 2vw;
    text-align: center;
    padding: 3vw;
    position: relative;
    width: fit-content;
    margin: 0 auto;
}

.container h3 img,
h4 img,
.choice img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    object-fit: contain;
    image-rendering: pixelated;
}

.infos-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 6vw;
    height:  6vw;
    position: relative;
    transition: 0.3s ease;
    cursor: pointer;
    font-family: 'pixel2';
}

.info:hover {
    transform: scale(1.1);
}

.info p {
    word-wrap: break-word;
    max-width: 100%;
    text-align: center;
    text-align: center;
    font-size: 1vw;
    color: rgb(255, 196, 0);
}

.info h5 {
    word-wrap: break-word;
    font-size: 1.1vw;
    color: white;
}

.info img {
    position: absolute;
    width: 140%;
    top: 55%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    image-rendering: pixelated;
    z-index: -1;
}

#ennemi-2 {
    left: -2vw;
    width: 4vw;
}

#ennemi-1 {
    left: unset;
    right: -6.2vw;
    width: 4vw;
}


#choices {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    gap: 1vw 3vw;
}

.choice {
    font-family: "pixel2";
    text-align: center;
    width: 13vw;
    font-weight: 700;
    font-size: 1.2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
    padding: 1.4vw;
    transition: 0.2s ease;
    cursor: pointer;
}
.choice.correct{
    filter: hue-rotate(75deg) !important;
    pointer-events: none;
}

.choice.unabled{
    filter: grayscale(1);
    pointer-events: none;
}

.choice.incorrect{
    filter: hue-rotate(317deg) !important;
    pointer-events: none;
}



.choice img {
    top: 60%;
}


h4 {
    position: relative;
    padding: 2vw;
    font-size: 1.6vw;
}

#sentence {
    word-wrap: break-word;
    max-width: 80%;
    color: rgb(255, 255, 255);
    font-size: 1.5vw;
    background-color: #00000071;
    width: fit-content;
    margin: 0 auto;
    padding: 0.6vw 2vw;
    font-family: 'pixel2';
    box-shadow: -.4vw 0 0 0 rgb(15, 15, 15),
    .4vw  0 0 0 rgb(15, 15, 15),
        0 -.4vw  0 0 rgb(15, 15, 15),
        0 .4vw  0 0 rgb(15, 15, 15);
}




@media screen and (min-width: 2120px) {
    .container H3 {
        font-size: 230%;
        padding: 6%;
    }

    h4 {
        font-size: 180%;
    }

    #ennemi-1, #ennemi-2{
        width: 12%;
    }

    #ennemi-1{
        right: -17%;
    }

    #ennemi-2{
        left: -5%;
    }
    .info{
        width: 10%;
        height: 60%;
    }

    .info h5{
        font-size: 150%;
    }
    .info p{
        font-size: 140%;
    }

    #sentence{
        font-size: 170%;
        padding: 1% 4%;
        box-shadow: -7px 0 0 0 rgb(15, 15, 15), 7px 0 0 0 rgb(15, 15, 15), 0 -7px 0 0 rgb(15, 15, 15), 0 7px 0 0 rgb(15, 15, 15);
    }

    .choice{
        box-sizing: border-box;
        width: 100%;
        margin: auto;
        font-size: 150%;
        padding: 5%;;
    }

    #choices{
        width: 50%;
        gap: 5% 0;
        box-sizing: border-box;
    }
}


@media screen and (max-width: 1600px) {


    .popup{
        max-height:80vw;
    }
    .container{
        width: 80%;
    }

    .container H3 {
        font-size: 2.3vw;
        text-align: center;
        padding: 3.8vw;
    }

    h4{
        font-size: 2.1vw;
        padding: 3.3vw;
    }

    .info{
        width: 8vw;
        height: 8vw;
    }
    .info h5{
        font-size: 1.4vw;
    }
    .info p{
        font-size: 1.3vw;
    }

    #sentence{
        font-size: 2.2vw;
        padding: 0.6vw 1.6vw
    }

    .choice{
        font-size: 1.6vw;
        width: 11vw;
        padding: 0.8vw;
    }
}


</style>