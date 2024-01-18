<template>
    <div class="container">
        <p ref="score">SCORE : {{score}}</p>
        <img class="heart" v-for="index in health" :key="index" src="@/assets/images/games/Maze/heart.png">
    </div>
</template>


<script>
    export default{
        name : "InfosComp",
        props : {
            health : Number,
            score : Number
        },

        watch : {
            score : function (){
                this.$refs.score.classList.add("green")
                setTimeout(()=>{
                    this.$refs.score.classList.remove("green")
                }, 300)
            }
        } 
    }

</script>

<style scoped>
    .container{
        z-index: 99;
        position: absolute;
        right: 2vw;
        top: 0.5vw;
        gap: 0.5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:0.3vw 1vw;
        background-color: rgba(54, 54, 54, 0.664);
        box-shadow: -0.2vw 0 0 0 rgb(44, 44, 44), 0.2vw 0 0 0 rgb(44, 44, 44), 0 -0.2vw 0 0 rgb(44, 44, 44), 0 0.2vw 0 0 rgb(44, 44, 44);
    }

    .heart{
        width: 3vw;
        image-rendering: pixelated;
    }

    .container p{
        font-family: 'pixel';
        background-color: rgba(27, 27, 27, 0.295);
        padding: 0.9vw 1vw;
        margin-right: 1vw;
        color: white;
        font-size: 1.5vw;
        transition: 0.2s ease;
        transform: scale(1);
    }

    .container p.green{
        transform: scale(1.05);
        background-color: rgb(102, 255, 0);
    }

    @media screen and (max-width: 1600px) and (min-height: 85vw){
    .heart{
        width: 6.5vw;
    }
    .container{
        position: fixed;
        z-index: 99;
        right: 2vw;
        top: 1.5vw;
        gap: 0.5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(236, 236, 236, 0.664);
        box-shadow: -0.2vw 0 0 0 rgb(44, 44, 44), 0.2vw 0 0 0 rgb(44, 44, 44), 0 -0.2vw 0 0 rgb(44, 44, 44), 0 0.2vw 0 0 rgb(44, 44, 44);
    }


}

@media screen and (min-width: 2120px) {
    .container{
        position: absolute;
        right: 2%;
        top: 1.5%;
        gap: 3%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:0.6%;
        box-shadow: -6px 0 0 0 rgb(44, 44, 44), 6px 0 0 0 rgb(44, 44, 44), 0 -6px 0 0 rgb(44, 44, 44), 0 6px 0 0 rgb(44, 44, 44);
    }

    .heart{
        width: 50px;
        image-rendering: pixelated;
    }

    .container p{
        width: 250px;
        text-align: center;
        padding: 10px 20px;
        margin-right: 2px;
        color: white;
        font-size: 20px;
        transition: 0.2s ease;
        transform: scale(1);
    }
}
</style>