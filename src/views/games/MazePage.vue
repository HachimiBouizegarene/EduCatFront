<template>
  <div class="game-container">
    <div class="title">
      <img src="@/assets/images/games/Maze/coin.png" />
      <img src="@/assets/images/games/Maze/coin.png" />
      <img src="@/assets/images/games/Maze/coin.png" />
      <img src="@/assets/images/games/Maze/coin.png" />
      <img src="@/assets/images/games/Maze/vice.png" />
      <img src="@/assets/images/games/Maze/vice.png" />
      <h1>CONJUGAISON</h1>
    </div>

    <div class="content">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right">
        <div id="attack">
            <span id="third-bord"></span>
          <img src="@/assets/images/games/Maze/swords.png" />
          <!-- <img src="@/assets/images/games/Maze/attack_surround.png" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MazePage",

  mounted() {
    console.log(document.querySelector("body"));
    document.querySelector("body").style.backgroundColor = "#e24830";
    console.log("red");
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap");

body {
  background-color: red !important;
}
.game-container {
  left: 0;
  transform: translateX(5%);
  width: 90%;
  margin-top: 50px;
  box-sizing: border-box;
  box-shadow: #c63630 15px 15px 2px 0px, #c63630 -15px 15px 2px 0px;
  border-radius: 10px;
  position: absolute;
}

.title {
  width: 100%;
  height: 150px;
  background-color: #fce8b9;
  padding: 20px;
  background-image: url("https://www.transparenttextures.com/patterns/wood-pattern.png");
  box-sizing: border-box;
  border: #181936 5px solid;
  border-bottom: #181936 10px solid;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.title::after {
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  border-bottom: 15px solid #d34943;
  border-right: 15px solid #c3796e;
  border-left: 15px solid #c3796e;
  border-top: 8px solid rgb(238, 238, 238);
  position: absolute;
  bottom: 0;
}
.title img {
  z-index: 1;
  width: 35px;
  position: absolute;
}
.title img:nth-child(1) {
  right: -3px;
  top: -3px;
}
.title img:nth-child(2) {
  left: -2px;
  top: -4px;
  transform: rotate(-90deg);
}

.title img:nth-child(3) {
  right: -1px;
  bottom: -5px;
  transform: rotate(90deg);
}
.title img:nth-child(4) {
  left: -3px;
  bottom: -3px;
  transform: rotate(180deg);
}

.title img:nth-child(5) {
  width: 50px;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
}

.title img:nth-child(6) {
  width: 50px;
  left: 50px;
  top: 50%;
  transform: translateY(-50%) scaleX(-1);
}

.title h1 {
  color: #f05439;
  text-align: center;
  font-family: "Comfortaa", sans-serif;
  font-size: 50px;
}

.content {
  width: 100%;
  background-color: #078eaa;
  height: 650px;
  border: #181936 8px solid;
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: -15px;
  display: flex;
}
.content div {
  height: 100%;
}

.left,
.right {
  width: calc((100% - 700px) / 2);
}



.center {
  width: 700px;
}


.right{
    display: flex;
    align-items: center;
    justify-content: center;
}
#attack {
    cursor: pointer;
  background-color: #fce8b9;
  border: 10px solid #f38060;
  padding: 10px;
  border-radius: 200px;
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

#attack:hover::before, #attack:hover::after{
    border: 20px inset #fc5d31;
    
}

#attack:hover img{
    width: 70%
}

#attack::after {
    transition: 0.3s ease-out;
    content: "";
    position: absolute;
    width: 110%;
    height: 110%;
    border-radius: 200px;
    border: 5px solid #3e2532;
}
#attack::before {
    transition: 0.3s ease-out;
    content: "";
    position: absolute;
    width: 110%;
    height: 110%;
    border-radius: 200px;
    border: 20px inset #f15d36;
}

#attack img{
    transition: 0.1s ease-out;
    width: 60%
}
#attack #third-bord{
    position: absolute;
    width: calc(110% + 35px);
    height: calc(110% + 35px);
    border-radius: 200px;
    border: 8px solid #3e2532;
}

/* #attack img:nth-child(2){
    position: absolute;
    width: 260px;
    top: 0;
    left: 0;
    transform: translateY(-15%) translateX(-15%);
} */
</style>
