<template>
    <NavBar></NavBar>
    <div class="content">    
        <h1>CONJUGAISON </h1>
        <div class="maze-container">
    
            <MazeComponent ref="maze"></MazeComponent>
        </div>
        <div class="interact-display">
            <div class="directions">
                <span id="top" @click="move('top')"></span>
                <div id="left-right">
                    <span id="left" @click="move('left')"></span>
                    <span id="right" @click="move('right')"></span>
                </div>
                
                <span id="bottom" @click="move('bottom')"></span>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/all/NavBar.vue"
import MazeComponent from "@/components/games/maze/MazeComponent.vue"



export default {
    name: "LabyrinthPage",
    components: {
        NavBar,
        MazeComponent
    },
    data(){
        return {
            directions_controller : undefined,
            controller_usable : true
        }
    },

    methods:{
        toggleControllerUsability(){
            this.directions_controller.classList.add('unusable')
            this.controller_usable = false
            setTimeout(()=>{
                this.directions_controller.classList.remove('unusable')
                this.controller_usable = true
            }, 310)
        },
        move(dir){
            if(this.controller_usable){
                this.$refs.maze.movePlayer(dir, 1)
                this.toggleControllerUsability()
            }
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

.interact-display .directions{
    z-index: 100;
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    background-color: rgb(201, 91, 91);
    padding: 40px;
    border-radius: 100%;
    transition: 0.2s ease;
}

.interact-display .directions.unusable{
    background-color: rgb(88, 88, 88);
}

.interact-display .directions.unusable span,
 .interact-display .directions.unusable #left-right,
 .interact-display .directions.unusable span:hover {
    background-color: rgb(160, 160, 160);
}
.interact-display .directions span, #left-right {
    display: block;
    width: 33.33%;
    height: 33.33%;
    background-color: rgb(255, 162, 162);
    cursor: pointer;
    transition: 0.2s ease;
}
.interact-display .directions span:hover{
    background-color: rgb(228, 132, 132);
}
#left-right{
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
}
#left-right span{
    transition: 0.2s ease;
    width: 33.33%;
    height: 100%;
}




</style>
