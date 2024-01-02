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
        top: 1vw;
        gap: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:10px  10px;
        background-color: rgba(236, 236, 236, 0.664);
        box-shadow: -7px 0 0 0 rgb(44, 44, 44), 7px 0 0 0 rgb(44, 44, 44), 0 -7px 0 0 rgb(44, 44, 44), 0 7px 0 0 rgb(44, 44, 44);
    }

    .heart{
        width: 2.5vw;
        image-rendering: pixelated;
    }
</style>