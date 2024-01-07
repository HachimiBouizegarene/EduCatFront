<template>
    <div class="container">
        <img class="heart" v-for="index in health" :key="index" src="@/assets/images/games/Maze/heart.png">
    </div>
</template>


<script>
    export default{
        name : "healthComp",
        props : {
            health : Number
        }
    }

</script>

<style scoped>
    .container{
        position: absolute;
        right: 2vw;
        top: 1.5vw;
        gap: 0.3vw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:0.6vw 1vw;
        background-color: rgba(54, 54, 54, 0.664);
        box-shadow: -0.2vw 0 0 0 rgb(44, 44, 44), 0.2vw 0 0 0 rgb(44, 44, 44), 0 -0.2vw 0 0 rgb(44, 44, 44), 0 0.2vw 0 0 rgb(44, 44, 44);
    }

    .heart{
        width: 3vw;
        image-rendering: pixelated;
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
        width: 30%;
        image-rendering: pixelated;
    }
}
</style>