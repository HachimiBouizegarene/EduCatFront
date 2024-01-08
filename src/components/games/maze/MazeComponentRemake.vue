<template>
    <div ref="maze" class="maze">
        <div ref="line" class="line" v-for="(line, x) in maze.grid" :key="x">
            <span class="square" v-for="(cell, y) in line" :key="y">
                <img v-if="wall_top(cell, x, y)" src="@/assets/images/games/Maze/grass_top.png" />
                <img v-if="ground_mid(cell, x, y)" src="@/assets/images/games/Maze/grass_mid.png" />
                <img id="door" v-if="x == 0 && y == 1" src="@/assets/images/games/Maze/door.png">
                <img id="player" v-if="x == player_x && y == player_y" src="@/assets/images/games/Maze/hero_maze.gif" />
                <img v-if="cell == this.obstacle" src="@/assets/images/games/Maze/obstacle_1.gif" />
                <img v-if="cell == this.obstacle_cible" src="@/assets/images/games/Maze/obstacle_cible.gif" />
            </span>
        </div>
    </div>
</template>

<script>
import Maze from "./Maze";
export default {
    name: "mazeComp",

    mounted() {
        document.querySelector("body").style.backgroundColor = "#8ea7c5";
        window.addEventListener("resize", this.sizeSquares);

        this.generate(27, 0);

        this.$nextTick(() => {
            this.sizeSquares();
            window.addEventListener("keydown", (e) => {
                if (e.key == "d" || e.key == "D") {
                    this.movePlayer("right");
                }
                if (e.key == "a" || e.key == "A") {
                    this.movePlayer("left");
                }
                if (e.key == "s" || e.key == "S") {
                    this.movePlayer("bottom");
                }
                if (e.key == "w" || e.key == "W") {
                    this.movePlayer("top");
                }
            });
        });
    },

    methods: {
        scroll(dir) {
            const directions = {right : this.square_size, left : -this.square_size}
            const direction = directions[dir]
            if (
                !direction || this.player_x <2 ||  this.scroll_left + direction >
                this.square_size * (this.x_squares - this.y_squares + 1) || this.scroll_left + direction < 0
            ) return
            else{               
                this.scroll_left += direction;
                this.$refs.maze.style.transform =
                    "translateX(-" + this.scroll_left + "px)";
            }
        },
        generate(x, nb_obstacles) {
            this.maze = new Maze(x, this.y_squares);
            this.maze.generateObstacles(nb_obstacles);
            nb_obstacles;
            this.x_squares = x;
            this.verifieOstacle();
            this.moving_player = false;
        },
        sizeSquares() {
            const mazeHeight = this.$refs.maze.offsetHeight;
            const squaredimesion = mazeHeight / this.maze.getYSize();
            this.square_size = squaredimesion;
            const lines = document.querySelectorAll(".square");
            lines.forEach((square) => {
                square.style.width = squaredimesion + "px";
                square.style.height = squaredimesion + "px";
            });
        },

        wall_top(cell, x, y) {
            if (cell !== this.wall) return false;
            if (this.maze.get_node(x, y + 1) != this.wall) return true;
        },
        ground_mid(cell, x, y) {
            if (cell !== this.wall) return false;
            if (this.maze.get_node(x, y + 1) != this.wall) return false;
            return true;
        },
        movePlayer(dir) {
            const player = document.querySelector("#player");
            const directionMap = {
                right: {
                    x: 1,
                    y: 0,
                    transform: " translateY(-50%) translateX(50%)",
                },
                left: {
                    x: -1,
                    y: 0,
                    transform: "  translateY(-50%) translateX(-150%)",
                },
                top: {
                    x: 0,
                    y: -1,
                    transform: "translateY(-150%) translateX(-50%)",
                },
                bottom: {
                    x: 0,
                    y: 1,
                    transform: "translateY(50%) translateX(-50%)",
                },
            };

            const direction = directionMap[dir];
            if (
                !this.moving_player &&
                direction &&
                this.maze.get_node(
                    this.player_x + direction.x,
                    this.player_y + direction.y
                ) !== this.wall &&
                this.maze.get_node(
                    this.player_x + direction.x,
                    this.player_y + direction.y
                ) !== this.obstacle &&
                this.maze.get_node(
                    this.player_x + direction.x,
                    this.player_y + direction.y
                ) !== this.obstacle_cible &&
                this.player_x + direction.x >= 0 &&
                this.player_x + direction.x < this.x_squares
            ) {
                this.scroll(dir)
                this.moving_player = true;
                this.maze.remove_obstacle_cible();

                player.style.setProperty("transform", direction.transform);
                setTimeout(() => {
                    this.player_x += direction.x;
                    this.player_y += direction.y;
                    this.verifieOstacle();
                    if (
                        this.player_x == this.maze.getXSize() - 1 &&
                        this.player_y == this.maze.getYSize() - 2
                    ) {
                        this.$emit("win");
                    }
                    this.moving_player = false;
                }, 300);
            }
        },
        verifieOstacle() {
            const directions = [
                { dx: 1, dy: 0 },
                { dx: -1, dy: 0 },
                { dx: 0, dy: 1 },
                { dx: 0, dy: -1 },
            ];

            for (const dir of directions) {
                const newX = this.player_x + dir.dx;
                const newY = this.player_y + dir.dy;
                if (
                    this.maze.get_node(newX, newY) === this.obstacle ||
                    this.maze.get_node(newX, newY) === this.obstacle_cible
                ) {
                    this.$emit("obstacle", true, newY, newX);
                    this.maze.set_node(newX, newY, this.obstacle_cible);
                    return;
                }
            }
            this.$emit("obstacle", false, undefined, undefined);
        },
    },

    data() {
        return {
            maze: Array,
            obstacle: -2,
            obstacle_cible: -3,
            wall: -1,
            air: 0,
            maze_dimesion: [9, 7],
            square_size: null,
            scroll_left: 0.3,
            y_squares: 7,
            x_squares: 0,
            player_x: 0,
            player_y: 1,
            moving_player: true,
        };
    },
};
</script>

<style>
/* .maze-container {
    height: 20vw;
    width: 20vw;
    margin: 10vw;
    overflow: hidden; 
} */

.maze {
    transition: 0.4s ease;
    height: 100%;
    width: 100%;
    display: flex;
}

.line {
    display: flex;
    flex-direction: column;
}

.square {
    position: relative;
}

.square img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    image-rendering: pixelated;
}

#player {
    z-index: 10;
    position: absolute;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    top: 50%;
    transition: 0.3s ease;
}

#door{
  width: 30%;
  height: 130%;
  bottom: 0;
  left:0 ;
  z-index: 2;
  position: absolute;
}
</style>
