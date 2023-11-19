<template>
    <NavBar></NavBar>
    <div class="content">    
        <h1>CONJUGAISON </h1>
        <div class="maze-container">
            <MazeComponent ref="maze"></MazeComponent>
        </div>
        
        <div class="interact-display">
            <ControllerComponent @move="move"></ControllerComponent>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/all/NavBar.vue"
import MazeComponent from "@/components/games/maze/MazeComponent.vue"
import ControllerComponent from "@/components/games/maze/ControllerComponent.vue"

export default {
    name: "LabyrinthPage",
    components: {
        ControllerComponent,
        NavBar,
        MazeComponent
    },

    methods:{
        move(dir){
            this.$refs.maze.movePlayer(dir, 1)
        }
    },

    mounted(){
        this.$refs.maze.generate(20)
        this.directions_controller = document.querySelector('.directions')
        // const dirs = this.$refs.maze.resolveMaze()
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

}


</script>
    

<style scoped>

.content{
    padding-top: 50px;
    align-items: center;
    box-sizing: border-box;
    background-color: rgb(253, 212, 212);
    display: flex;
    height: 100%;
    justify-content: space-between;
    max-height: 1000px;
    overflow: hidden;
    flex-wrap: wrap;
}
.maze-container {
    width: 40%;
    margin: auto;
    box-sizing: border-box;
    height: 90%;
    display: flex;
    align-items: center;
    position: relative;
}
.maze-container::after {
    position: absolute;
    content: "";
    width: 80%;
    height: 20px;
    background-color: rgb(155, 91, 91);
    right: 0px;
    transform: translateX(100%);
}
.maze-container::before {
    position: absolute;
    content: "";
    width: 50px;
    height: 50px;
    background-color: rgb(155, 91, 91);
    right: 1px;
    transform: translateX(100%);
}
.content h1{
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    background-color: rgb(255, 190, 190);
    color: rgb(99, 64, 64);

}
.interact-display{
    width: 50%;
    height: 90%;
    box-sizing: border-box;
    border-left: 10px solid rgb(243, 197, 197);
    display: flex;
    align-items: center;
    justify-content: center;
}



</style>
