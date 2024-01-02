export default class Maze {
  constructor(maze_size) {
    this.maze_size = maze_size;
    this.grid = new Array(maze_size)
      .fill(0)
      .map(() => new Array(maze_size).fill(0));
    this.path_list = []
    this.my_interval;
    this.generating = true;
    this.start_pos = [1, 0];
    this.target_pos = [this.maze_size - 2, this.maze_size - 1];
    this.kruskal_algorithm();
    this.solve()
  }

  random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getSize() {
    return this.maze_size;
  }


  remove_wall(x, y) {
    this.grid[x][y] = 0;
  }
  add_wall(x, y) {
    this.grid[x][y] = -1;
  }
  fill_walls() {
    for (let x = 0; x < this.maze_size; x++)
      for (let y = 0; y < this.maze_size; y++)
        if (x % 2 == 0 || y % 2 == 0) this.grid[x][y] = -1;
  }

  kruskal_algorithm() {
    let self = this;
    this.fill_walls();
    let nb_areas = 0;
    let wall_list = [];

    for (let i = 1; i < this.grid.length - 1; i++)
      for (let j = 1; j < this.grid[0].length - 1; j++) {
        if (i % 2 == 1 && j % 2 == 1) {
          nb_areas++;
          this.grid[i][j] = nb_areas;
        }

        if ((i + j) % 2 == 1) wall_list.push([i, j]);
      }
    let bcl = true;
    while (bcl) {
      if (nb_areas == 1) {
        self.generating = false;
        document.dispatchEvent(new Event("generated"));
        self.remove_wall(self.start_pos[0], self.start_pos[1]);
        self.remove_wall(self.target_pos[0], self.target_pos[1]);
        self.clear_grid();
        return;
      }
      let index = self.random_int(0, wall_list.length);
      let wall = wall_list[index];
      wall_list.splice(index, 1);
      let cell_pair;

      if (self.grid[wall[0] - 1][wall[1]] > -1)
        cell_pair = [
          self.grid[wall[0] - 1][wall[1]],
          self.grid[wall[0] + 1][wall[1]],
        ];
      else
        cell_pair = [
          self.grid[wall[0]][wall[1] - 1],
          self.grid[wall[0]][wall[1] + 1],
        ];

      if (cell_pair[0] != cell_pair[1]) {
        for (let i = 1; i < self.grid.length - 1; i += 2)
          for (let j = 1; j < self.grid[0].length - 1; j += 2)
            if (self.grid[i][j] == cell_pair[0]) self.grid[i][j] = cell_pair[1];

        self.remove_wall(wall[0], wall[1]);
        nb_areas--;
      }
    }
  }
  distance(point_1, point_2) {
    return Math.sqrt(
      Math.pow(point_2[0] - point_1[0], 2) +
        Math.pow(point_2[1] - point_1[1], 2)
    );
  }
  get_neighbours(cell, distance) {
    let up = [cell[0], cell[1] - distance];
    let right = [cell[0] + distance, cell[1]];
    let down = [cell[0], cell[1] + distance];
    let left = [cell[0] - distance, cell[1]];
    return [up, right, down, left];
  }
  get_node(x, y) {
    if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length)
      return this.grid[x][y];

    return -2;
  }

  clear_grid() {
    for (let i = 0; i < this.grid.length; i++)
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] > -1) {
          this.remove_wall(i, j);
        } else if (this.grid[i][j] < -1) this.add_wall(i, j);
      }
  }

  solve() {
    let self = this
    let node_list = [];
    // let node_list_index = 0;
    let path_list = [];
    // let path_list_index = 0;
    let found = false;
    // let path = false;
    let frontier = [this.start_pos];
    this.grid[this.start_pos[0]][this.start_pos[1]] = 1;

    do {
      frontier.sort(function(a, b)
      {
        return self.distance(a, self.target_pos) - self.distance(b, self.target_pos);
      });

      let list = this.get_neighbours(frontier[0], 1);

      frontier.splice(0, 1);

      for (let i = 0; i < list.length; i++)
        if (this.get_node(list[i][0], list[i][1]) == 0) {
          frontier.push(list[i]);
          this.grid[list[i][0]][list[i][1]] = i + 1;

          if (
            list[i][0] == this.target_pos[0] &&
            list[i][1] == this.target_pos[1]
          ) {
            found = true;
            break;
          }

          node_list.push(list[i]);
        }
    } while (frontier.length > 0 && !found);

    if (found) {
      let current_node = this.target_pos;

      while (
        current_node[0] != this.start_pos[0] ||
        current_node[1] != this.start_pos[1]
      ) {
        switch (this.grid[current_node[0]][current_node[1]]) {
          case 1:
            current_node = [current_node[0], current_node[1] + 1];
            break;
          case 2:
            current_node = [current_node[0] - 1, current_node[1]];
            break;
          case 3:
            current_node = [current_node[0], current_node[1] - 1];
            break;
          case 4:
            current_node = [current_node[0] + 1, current_node[1]];
            break;
          default:
            break;
        }

        path_list.push(current_node);
      }

      path_list.pop();
      path_list.reverse();
      this.path_list = path_list
    }
   
  }

  remove_obstacle_cible(){
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == -3) {
          this.grid[i][j] = -2
        }
      }
    }
  }

  generateObstacles(nb){
    let path_list_replique = this.path_list
    for(let i = 0 ; i < nb ; i++){
      let random = Math.floor(Math.random() * path_list_replique.length)
      this.grid[path_list_replique[random][0]][path_list_replique[random][1]] = -2
      path_list_replique.splice(random, 1)
    }

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] >= 0) {
          this.grid[i][j] = Math.floor(Math.random() * 11);
        }
      }
    }
  }

}
