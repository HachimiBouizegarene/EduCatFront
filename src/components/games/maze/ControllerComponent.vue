<template>
  <div class="directions">
    <span class="btn" id="top" @click="move('top')">&#8593;</span>
    <div id="line">
      <span class="btn" id="left" @click="move('left')">&#8592;</span>
      <span class="btn" id="bottom" @click="move('bottom')">&#8595;</span>
      <span class="btn" id="right" @click="move('right')">&#8594;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ControllerComponenent",
  data() {
    return {
      directions_controller: undefined,
      controller_usable: true,
    };
  },
  methods: {
    move(dir) {
      if (this.controller_usable) {
        this.directions_controller.classList.add("unusable");
        this.controller_usable = false;
        setTimeout(() => {
          this.directions_controller.classList.remove("unusable");
          this.controller_usable = true;
        }, 310);
        this.$emit("move", dir);
      }
    },
  },
  mounted() {
    this.directions_controller = document.querySelector(".directions");
  },
};
</script>

<style scoped>
.directions {
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: baseline;
  background-color: #a73830;
  padding: 30px;
  transition: 0.2s ease;
  box-sizing: border-box;
  background-image: url(https://www.transparenttextures.com/patterns/concrete-wall.png);
}

.directions.unusable {
  background-color: rgb(88, 88, 88);
}

.directions.unusable span,
.directions.unusable #left-right,
.directions.unusable span:hover {
  background-color: rgb(160, 160, 160);
}

.directions .btn {
  display: flex;
  justify-content: center;
  margin: 3px;
  font-size: 40px;
  width: 65px;
  box-sizing: border-box;
  height: 65px;
  background-color: #f0cfbf;
  border: 7px inset #f3dbcc;
  cursor: pointer;
  transition: 0.2s ease;
  position: relative;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
.directions .btn::after {
  content: " ";
  position: absolute;
  top: -7px;
  left: -7px;
  right: -7px;
  bottom: -7px;
  border: 2px solid #5e2524;
}
.directions .btn:hover {
  background-color: rgb(228, 132, 132);
}

#line {
  display: flex;
}

@media screen and (max-width: 1000px) {
  .directions .btn {
    font-size: 16px;
    width: 35px;
    height: 35px;
  }

  .directions {
    padding: 10px;
  }
}
</style>
