
<script>
export default {
  name: "ChronoComponent",


  data() {
    return {
      interval: undefined,
      timeElapsed: 0,

    }
  },

  methods: {
    start() {
      this.interval = setInterval(() => {
        this.timeElapsed++;
        
      }, 1000);
    },
    pause() {
      clearInterval(this.interval);
      this.interval = undefined;
    },
    formateTime(time) {
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor((time % 3600) / 60);
      const hours = Math.floor(time / 3600);
      return `${this.getDataTime(hours)}:${this.getDataTime(minutes)}:${this.getDataTime(seconds)}`;
    },
    getDataTime(data) {
      return (data < 10) ? '0' + data : data;
    },
    getElapsedTime() {
      return this.timeElapsed;
    },
    reset() {
      this.timeElapsed = 0;
      this.pause();
    },
  }

}
</script>

<template>
  <span>{{ formateTime(timeElapsed) }}</span>
</template>

<style scoped></style>