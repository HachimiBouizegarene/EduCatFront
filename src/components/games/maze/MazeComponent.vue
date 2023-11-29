<template>
  <div class="lab" ref="messageContainer">
    <div class="line" v-for="(row, y) in lab.grid" :key="y">
      <span
        v-for="(cell, x) in row"
        :key="x"
        :class="{
          square: true,
          player: x == player_x && y == player_y,
          wall: cell == wall,
          obstacle: cell == obstacle,
        }"
      >
      </span>
    </div>
  </div>

</template>

<script>
import Maze from './Maze';
export default {
  name: "MazeComponent",
  data() {
    return {
      obstacle: -2,
      wall: -1,
      air: 0,
      lab: Maze,
      maze_dimension: 0,
      player_x: 0,
      player_y: 1,
    };
  },
  methods: {
    generate(dimension, nb_obstacles) {
      this.maze_dimension = parseInt(dimension);
      this.lab = new Maze(dimension)  
      this.lab.generateObstacles(nb_obstacles)

    },
    movePlayer(dir) {
      const player = document.querySelector(".player");
      const directionMap = {
        right: { x: 1, y: 0, transform: "translateX(+" },
        left: { x: -1, y: 0, transform: "translateX(-" },
        top: { x: 0, y: -1, transform: "translateY(-" },
        bottom: { x: 0, y: 1, transform: "translateY(+" },
      };

      const direction = directionMap[dir];

      if (
        direction &&
        this.lab.grid[this.player_y + direction.y][this.player_x + direction.x] !==
          this.wall &&
        this.player_x + direction.x >= 0 &&
        this.player_x + direction.x < this.maze_dimension
      ) {
        if (
          this.lab.grid[this.player_y + direction.y][this.player_x + direction.x] ===
          this.obstacle
        ) {
          this.$emit(
            "obstacle",
            this.player_x + direction.x,
            this.player_y + direction.y
            
          );
          return;
        }
        player.style.setProperty(
          "transform",
          `${direction.transform}${1 * 100}%)`
        );
        setTimeout(() => {
          this.player_x += direction.x;
          this.player_y += direction.y;
          player.style.setProperty("transform", "translate(0%)");
        }, 300);
      }
    },
    destroyObstacle(x, y) {
      this.lab.grid[y][x] = this.air;
    },
  },
  mounted() {
    document.addEventListener('generated', ()=>{
      this.$forceUpdate()
    })
    window.addEventListener("resize", () => {
      const mazeWidthHeight = this.$refs.messageContainer.offsetWidth;
      const squaredimesion = mazeWidthHeight / this.maze_dimension;
      const element = document.querySelectorAll(".square");
      element.forEach((element) => {
        element.style.setProperty("width", squaredimesion + "px");
        element.style.setProperty("height", squaredimesion + "px");
      });
    });
  
  },
  updated() {
    const mazeWidthHeight = this.$refs.messageContainer.offsetWidth;
    const squaredimesion = mazeWidthHeight / this.maze_dimension;
    const element = document.querySelectorAll(".square");
    element.forEach((element) => {
      element.style.setProperty("width", squaredimesion + "px");
      element.style.setProperty("height", squaredimesion + "px");
    });
  },
};
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
  background-color: rgb(41, 41, 41);
  background-image: url("https://www.transparenttextures.com/patterns/outlets.png");
}

div.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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
  transition: transform 0.3s;
}

.obstacle {
  background-color: #ff0000;
  box-shadow: 0 0 40px 3px #ff0000;
  background-image: url("https://www.transparenttextures.com/patterns/old-wall.png");
  z-index: 10;
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
