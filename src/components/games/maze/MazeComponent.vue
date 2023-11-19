<template>
    <div class="lab" ref="messageContainer">
        <div class="line" v-for="(row, y) in lab" :key="y">
            <span v-for="(cell, x) in row" :key="x"
                :class="{ 'square': true, 'player': x == player_x && y == player_y, 'wall': cell == wall }">
            </span>
        </div>
    </div>


    <!-- <div v-for="n in maze_dimension" :key="n">
        <h1>hah</h1>
    </div> -->
</template>

<script>
export default {
    name: "MazeComponent",
    // props: ['dimension'],
    // setup(props) {
    //     props
    // },
    data() {
        return {
            wall: -1,
            lab: [],
            maze_dimension: 0,
            player_x: 0,
            player_y: 1,
        }
    },
    methods: {
        generate(dimension) {
            this.maze_dimension = parseInt(dimension)
            this.lab = []
            //maze size max , min and not pair
            if (this.maze_dimension % 2 == 0) this.maze_dimension += 1
            if (this.maze_dimension < 5) this.maze_dimension = 5
            if (this.maze_dimension > 40) this.maze_dimension = 40

            let ensemble = 0
            for (let y = 0; y < this.maze_dimension; y++) {
                const line = []
                for (let x = 0; x < this.maze_dimension; x++) {
                    if (x == 0 || x == this.maze_dimension - 1) line.push(-1)
                    else {
                        if (x % 2 == 0 || y % 2 == 0) line.push(-1)
                        else {
                            ensemble++
                            line.push(ensemble)
                        }
                    }
                }
                this.lab.push(line)
            }
            //entree et sortie 
            this.lab[1][0] = 1
            this.lab[this.maze_dimension - 2][this.maze_dimension - 1] = ensemble

            while (ensemble - 1 > 0) {
                const x_1 = Math.floor(Math.random() * Math.floor(this.maze_dimension / 2)) * 2 + 1
                const y_1 = Math.floor(Math.random() * Math.floor(this.maze_dimension / 2)) * 2 + 1;

                let y_2, x_2;
                let bcl = true;
                let dir = undefined;

                while (bcl) {
                    x_2 = x_1;
                    y_2 = y_1;
                    dir = Math.floor(Math.random() * 4) + 1;
                    switch (dir) {
                        case 1:
                            y_2 = y_1 + 2;
                            break;
                        case 2:
                            x_2 = x_1 + 2;
                            break;
                        case 3:
                            y_2 = y_1 - 2;
                            break;
                        case 4:
                            x_2 = x_1 - 2;
                            break;
                    }
                    if (x_2 >= this.maze_dimension || y_2 >= this.maze_dimension || y_2 < 0 || x_2 < 0) {
                        // Do nothing or handle the out-of-bounds case as needed
                    } else {
                        bcl = false;
                    }
                }

                if (this.lab[y_2][x_2] != this.lab[y_1][x_1]) {
                    this.lab[Math.floor((y_2 + y_1) / 2)][Math.floor((x_1 + x_2) / 2)] = this.lab[y_1][x_1];
                    const cell_to_erase = this.lab[y_2][x_2]
                    for (let y = 0; y < this.maze_dimension; y += 1) {
                        for (let x = 0; x < this.maze_dimension; x += 1) {
                            if (this.lab[y][x] == cell_to_erase) {
                                this.lab[y][x] = this.lab[y_1][x_1]
                            }
                        }
                    }
                    ensemble--
                }

            }
        },
        movePlayer(dir, nb) {
            const player = document.querySelector('.player')
            if (dir == "right" && this.lab[this.player_y][this.player_x + nb] != this.wall && this.player_x + nb < this.maze_dimension) {
                player.style.setProperty('transform', 'translateX(' + (nb * 100) + '%)')
                setTimeout(() => {
                    
                    this.player_x += nb
                    player.style.setProperty('transform', 'translateX(0%)')
                }, 300)
            }
            if (dir == "left" && this.lab[this.player_y][this.player_x - nb] != this.wall && this.player_x - nb >=0 ) {
                player.style.setProperty('transform', 'translateX(-' + (nb * 100) + '%)')
                setTimeout(() => {
                    this.player_x -= nb
                    player.style.setProperty('transform', 'translateX(0%)')
                }, 300)
            }

            if (dir == "top" && this.lab[this.player_y - nb][this.player_x] != this.wall) {
                player.style.setProperty('transform', 'translateY(-' + (nb * 100) + '%)')
                setTimeout(() => {
                    this.player_y -= nb
                    player.style.setProperty('transform', 'translateX(0%)')

                }, 300)
            }
            if (dir == "bottom" && this.lab[this.player_y + nb][this.player_x] != this.wall) {
                player.style.setProperty('transform', 'translateY(' + (nb * 100) + '%)')
                setTimeout(() => {
                    this.player_y += nb
                    player.style.setProperty('transform', 'translateX(0%)')

                }, 300)
            }
        },
        resolveMaze() {
            const maze_resolve = this.lab;
            let maze_dimension_replique = this.maze_dimension
            let best_path = []
            function exploreCell(x_pred, y_pred, x, y, nb, actual_nb) {
                if (x >= maze_dimension_replique || x < 0 || y >= maze_dimension_replique || y < 0) return
                else if (maze_resolve[y][x] == -1) return
                else {
                    if (maze_resolve[y][x] != -1 && !isNaN(nb)) {
                        maze_resolve[y][x] = nb
                        //right left
                        if (x + 1 != x_pred) exploreCell(x, y, x + 1, y, nb + 1)
                        if (x - 1 != x_pred) exploreCell(x, y, x - 1, y, nb + 1)
                        //top bottom
                        if (y - 1 != y_pred) exploreCell(x, y, x, y - 1, nb + 1)
                        if (y + 1 != y_pred) exploreCell(x, y, x, y + 1, nb + 1)
                    }
                    else if (isNaN(nb) && maze_resolve[y][x] < actual_nb) {
                        if (maze_resolve[y][x] < 1) return
                        if (x + 1 != x_pred) exploreCell(x, y, x + 1, y, NaN, actual_nb - 1)
                        else best_path[actual_nb] = "left"
                        if (x - 1 != x_pred) exploreCell(x, y, x - 1, y, NaN, actual_nb - 1)
                        else best_path[actual_nb] = "right"
                        if (y - 1 != y_pred) exploreCell(x, y, x, y - 1, NaN, actual_nb - 1)
                        else best_path[actual_nb] = "bottom"
                        if (y + 1 != y_pred) exploreCell(x, y, x, y + 1, NaN, actual_nb - 1)
                        else best_path[actual_nb] = "top"
                    }
                }
            }
            let y = this.maze_dimension - 2
            let x = this.maze_dimension - 1
            maze_resolve[y][x] = 1
            exploreCell(x, y, x - 1, y, 2)
            x = 0
            y = 1
            let actual_nb = maze_resolve[y][x]
            exploreCell(x, y, x + 1, y, NaN, actual_nb)
            return best_path.reverse()
        }

    },
    mounted() {
        window.addEventListener("resize", () => {
            const mazeWidthHeight = this.$refs.messageContainer.offsetWidth
            const squaredimesion = mazeWidthHeight / this.maze_dimension
            const element = document.querySelectorAll(".square")
            element.forEach((element) => {
                element.style.setProperty('width', squaredimesion + "px")
                element.style.setProperty('height', squaredimesion + "px")
            })
        })
    },
    updated() {
        const mazeWidthHeight = this.$refs.messageContainer.offsetWidth
        const squaredimesion = mazeWidthHeight / this.maze_dimension
        const element = document.querySelectorAll(".square")
        element.forEach((element) => {
            element.style.setProperty('width', squaredimesion + "px")
            element.style.setProperty('height', squaredimesion + "px")
        })
    }

}

</script>

<style>
div.lab {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
}

span.square {
    display: block;
}

span.square.wall {
    background-color: rgb(87 70 70);
}

div.line {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* .move-right{
    animation: player_move_right 1s ease;
} */
/* 
@keyframes player_move_right {
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(100%);
    }
} */
@keyframes player_hold {
    from {
        box-shadow: 0 0 50px 3px #ff2ddc;
        background-color: #ff4cae;
    }

    90% {
        box-shadow: 0 0 50px 3px #ff7be9;
        background-color: #ff8ccb;
    }

    to {
        box-shadow: 0 0 50px 3px #ff2ddc;
        background-color: #ff4cae;
    }
}

.player {
    position: relative;
    background-color: #ffa3d6;
    transition:transform 0.3s;
}

.player::after {
    transform: translateX(50%) translateY(50%);
    content: "";
    height: 50%;
    width: 50%;
    position: absolute;
    border-radius: 2px;
    animation: player_hold ease-in 1s infinite;
}
</style>