<template>
  <div class="lab" ref="messageContainer">
    <div class="line" v-for="(row, y) in lab.grid" :key="y">
      <span v-for="(cell, x) in row" :key="x" :class="{
        square: true,
        player: x == player_x && y == player_y,
        wall: cell == wall,
        obstacle: cell == obstacle || cell == obstacle_cible ,
      }">
        <img id="door" v-if="x == 0 && y == 1" src="@/assets/images/games/Maze/door.png">
        
        <img v-if="cell == wall && ((y == lab.grid.length - 1) || (lab.grid[y + 1][x] !== wall)) && !(x=== 0 && y === 0) 
        && !top_left_wall(cell, y, x) && !top_right_wall(cell, y,x) && !top_right_ground(cell, y, x) && !top_mid_ground(cell, y, x) && !top_left_ground(cell, y, x) "
        class="grass-top" src="@/assets/images/games/Maze/grass_top.png">
        
        <img v-if="top_left_wall(cell, y, x)"
        class="grass-top" src="@/assets/images/games/Maze/maze/top_left_wall.png">

        <img v-if="top_right_wall(cell, y, x)"
        class="grass-top" src="@/assets/images/games/Maze/maze/top_right_wall.png">

        <img v-if="top_right_ground(cell, y, x)"
        class="grass-top" src="@/assets/images/games/Maze/maze/top_right_ground.png">

        <img v-if="top_mid_ground(cell, y, x)"
        class="grass-top" src="@/assets/images/games/Maze/maze/top_mid_ground.png">
        
        <img v-if="top_left_ground(cell, y, x)"
        class="grass-top" src="@/assets/images/games/Maze/maze/top_left_ground.png">

<!--         
        <img v-if="cell == wall && x > 0  && y > 0 && x < lab.grid.length-1  && y < lab.grid.length-1
        && lab.grid[y - 1][x] != wall"
        class="grass-top" src="@/assets/images/games/Maze/maze/top_left.png"> -->

        <img v-if="x== lab.grid.length -1 && y == 0"
        class="grass-top" src="@/assets/images/games/Maze/maze/top_right.png">
       
        <img v-if="cell == wall && !((y == lab.grid.length - 1) || (lab.grid[y + 1][x] !== wall)) "
        class="grass-mid" src="@/assets/images/games/Maze/grass_mid.png">
        <img id="player" v-if="x == player_x && y == player_y" src="@/assets/images/games/Maze/hero_maze.gif">
        <img v-if="cell == this.obstacle " src="@/assets/images/games/Maze/obstacle_1.gif">
        <img v-if=" cell == this.obstacle_cible" src="@/assets/images/games/Maze/obstacle_cible.gif">
        <img v-if="cell == 1" src="@/assets/images/games/Maze/ground.png">
        <img v-if="cell == 2" src="@/assets/images/games/Maze/ground_1.png">
        <img v-if="cell == 3" src="@/assets/images/games/Maze/ground_2.png">
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
      obstacle_cible : -3, 
      wall: -1,
      air: 0,
      lab: Maze,
      maze_dimension: 0,
      player_x: 0,
      player_y: 1,
      random_ground: 0,
      moving_player: true

    };
  },
  methods: {
    reset(){
      this.player_x = 0
      this.player_y = 1
    },  

    top_left_wall(cell,y, x){
      if(x== 0 && y == 0) return true
      if(cell === this.wall && x > 0  && y > 0 && x <this.lab.grid.length-1  && y < this.lab.grid.length-1){
        if(this.lab.grid[y - 1][x] !== this.wall && this.lab.grid[y][x-1] !== this.wall && this.lab.grid[y+1][x] !== this.wall && this.lab.grid[y][x+1] === this.wall){
   
          return true
        } 
      } 
      return false;
    },
    top_right_wall(cell,y, x){
      if(x== this.lab.grid.length-1 && y == this.lab.grid.length-1) return true
      if(cell === this.wall && x > 0  && y > 0 && x <this.lab.grid.length-1  && y < this.lab.grid.length-1){
        if(this.lab.grid[y - 1][x] !== this.wall && this.lab.grid[y][x+1] !== this.wall && this.lab.grid[y][x-1] === this.wall && this.lab.grid[y+1][x] !== this.wall){
          return true
        } 
      } 
      return false;
    },
    top_right_ground(cell,y, x){
      if(x== 0 && y == 2 && this.lab.grid[2][1] !== this.wall) return true
      if(cell === this.wall && x > 0  && y > 0 && x <this.lab.grid.length-1  && y < this.lab.grid.length-1){
        if(this.lab.grid[y - 1][x] !== this.wall && this.lab.grid[y + 1][x] === this.wall && this.lab.grid[y][x +1] !== this.wall && this.lab.grid[y][x -1] === this.wall){
          return true
        } 
      } 
      return false;
    },

    top_mid_ground(cell,y, x){
      if(cell === this.wall && x > 0  && y > 0 && x <this.lab.grid.length-1  && y < this.lab.grid.length-1){
        if(this.lab.grid[y - 1][x] !== this.wall && this.lab.grid[y + 1][x] === this.wall && this.lab.grid[y][x +1] !== this.wall && this.lab.grid[y][x -1 ] !== this.wall){

          return true
        } 
      } 
      return false;
    },
    top_left_ground(cell, y , x){
      if(x== 0 && y == 2 && this.lab.grid[2][1] !== this.wall) return true
      if(cell === this.wall && x > 0  && y > 0 && x <this.lab.grid.length-1  && y < this.lab.grid.length-1){
        if(this.lab.grid[y - 1][x] !== this.wall && this.lab.grid[y + 1][x] === this.wall && this.lab.grid[y][x +1] === this.wall && this.lab.grid[y][x -1] !== this.wall){
          return true
        } 
      } 
      return false;
    },

    generate_random_ground() {
      this.random_ground = Math.floor(Math.random() * 8)
      return this.random_ground
    },
    generate(dimension, nb_obstacles) {
      this.moving_player= true
      this.reset();
      this.maze_dimension = parseInt(dimension);
      this.lab = new Maze(dimension)
      this.lab.generateObstacles(nb_obstacles);
      this.verifieOstacle();
      this.moving_player= false
    },
    verifieOstacle() {
      const directions = [
        { dx: 1, dy: 0 }, 
        { dx: -1, dy: 0 }, 
        { dx: 0, dy: 1 }, 
        { dx: 0, dy: -1 } 
      ];

      for (const dir of directions) {
        const newX = this.player_x + dir.dx;
        const newY = this.player_y + dir.dy;
        if (
          this.lab.grid[newY] &&

          (this.lab.grid[newY][newX] === this.obstacle || this.lab.grid[newY][newX] === this.obstacle_cible)
        ) {
          this.$emit('obstacle', true ,newY, newX);
          this.lab.grid[newY][newX] = this.obstacle_cible
          return;
        }
      }
      this.$emit('obstacle', false ,undefined, undefined);
    },


    movePlayer(dir) {
      const player = document.querySelector("#player");
      const directionMap = {
        right: { x: 1, y: 0, transform: " translateY(-50%) translateX(50%)" },
        left: { x: -1, y: 0, transform: "  translateY(-50%) translateX(-150%)" },
        top: { x: 0, y: -1, transform: "translateY(-150%) translateX(-50%)" },
        bottom: { x: 0, y: 1, transform: "translateY(50%) translateX(-50%)" },
      };

      const direction = directionMap[dir];
      if (
        !this.moving_player &&
        direction &&
        this.lab.grid[this.player_y + direction.y][this.player_x + direction.x] !==
        this.wall &&
        this.lab.grid[this.player_y + direction.y][this.player_x + direction.x] !== this.obstacle &&
        this.lab.grid[this.player_y + direction.y][this.player_x + direction.x] !== this.obstacle_cible &&
        this.player_x + direction.x >= 0 &&
        this.player_x + direction.x < this.maze_dimension
      ) {
        this.moving_player = true;
        this.lab.remove_obstacle_cible()

        player.style.setProperty(
          "transform",
          direction.transform
        );
        setTimeout(() => {
          this.player_x += direction.x;
          this.player_y += direction.y;
          this.verifieOstacle();
          if(this.player_x == this.lab.getSize()-1 &&  this.player_y == this.lab.getSize()-2){
            this.$emit("win");
          }
          this.moving_player = false
        }, 300);
      }
    },
    destroyObstacle(x, y) {
      this.lab.grid[y][x] = this.air;
    },
    handleResize(){
      const mazeWidthHeight = this.$refs.messageContainer.offsetWidth;
      const squaredimesion = mazeWidthHeight / this.maze_dimension;
      const element = document.querySelectorAll(".square");
      element.forEach((element) => {
        element.style.setProperty("width", squaredimesion + "px");
        element.style.setProperty("height", squaredimesion + "px");
      });
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'd' || e.key == 'D') {
        this.movePlayer("right")
      }
      if (e.key == 'a' || e.key == 'A') {
        this.movePlayer("left")
      }
      if (e.key == 's' || e.key == 'S') {
        this.movePlayer("bottom")
      }
      if (e.key == 'w' || e.key == 'W') {
        this.movePlayer("top")
      }
    })

    document.addEventListener('generated', () => {
      this.$forceUpdate()
    })
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
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

<style scoped>
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
  position: relative;
}

span.square img {
  z-index: -1;
  width: 101.5%;
  image-rendering: pixelated;
}

span.square.wall {
  position: relative;
  image-rendering: pixelated;
}


div.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.player {
  position: relative;
  transition: transform 0.3s;
  display: flex !important;
  align-items: center;
  justify-content: center;
  align-content: center;

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

.grass-top{
  z-index: 3;
}
.obstacle {}
</style>
