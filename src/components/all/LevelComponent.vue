<template>
    <div class="level-content">
        <p >{{$store.state.user.level}}</p>
        <span :style="{ '--percentage':  currentPercentage + '%' }" ref="progressBar" id="progress-bar"></span>
    </div>
</template>

<script>

export default {
    name : "LevelComp",


    async mounted(){
        this.$store.dispatch("fetchUser", {jws : this.$cookies.get('jws'), force : false})
        await this.$store.dispatch("wait_user_pulled")
        console.log(this.$store.state.user.percentage);
        this.currentPercentage = this.$store.state.user.percentage

        fetch("http://localhost:9090/updateScore", {
            method : "POST"
        })
    },

    data() {
        return {
            currentPercentage : 0
        }
    },
}

</script>

<style scoped>

    .level-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6%;
        position: relative;
    }

    .level-content p{
        padding: 3%;
        background-color: rgb(3, 175, 69);
        top: -60%;
        color: white;
        font-size: 1.5vw;
    }   

    #progress-bar{
        display: block;
        width: 100%;
        height: 40%;
        background-color: rgb(255, 255, 255);
        position: relative;
        --percentage : 20%;
    }

    #progress-bar::after{
    
        position: absolute;
        content: "";
        top : 0;
        left : 0;
        z-index: 2;
        width: var(--percentage);
        height: 100%;
        background-color: rgb(1, 214, 83);
    }

</style>