<template>
    <div class="directions">
        <span id="top" @click="move('top')"></span>
        <div id="left-right">
            <span id="left" @click="move('left')"></span>
            <span id="right" @click="move('right')"></span>
        </div>
        <span id="bottom" @click="move('bottom')"></span>
    </div>
</template>

<script>
export default {
    name: "ControllerComponenent",
    data() {
        return {
            directions_controller: undefined,
            controller_usable: true
        }
    },
    methods: {
        move(dir) {
            if (this.controller_usable) {
                this.directions_controller.classList.add('unusable')
                this.controller_usable = false
                setTimeout(() => {
                    this.directions_controller.classList.remove('unusable')
                    this.controller_usable = true
                }, 310)
                this.$emit('move', dir)
            }
        }
    }
    ,mounted(){
        this.directions_controller = document.querySelector('.directions')
    }
}
</script>

<style scoped>
.interact-display .directions {
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

.interact-display .directions.unusable {
    background-color: rgb(88, 88, 88);
}

.interact-display .directions.unusable span,
.interact-display .directions.unusable #left-right,
.interact-display .directions.unusable span:hover {
    background-color: rgb(160, 160, 160);
}

.interact-display .directions span,
#left-right {
    display: block;
    width: 33.33%;
    height: 33.33%;
    background-color: rgb(255, 162, 162);
    cursor: pointer;
    transition: 0.2s ease;
}

.interact-display .directions span:hover {
    background-color: rgb(228, 132, 132);
}

#left-right {

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
}

#left-right span {
    transition: 0.2s ease;
    width: 33.33%;
    height: 100%;
}
</style>