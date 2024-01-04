<template>
  <input ref="input" type="file" accept="image/png">
  <button @click="clicked"></button>
</template>

<script>
export default {
    name : "ProfilPage"
    ,
    mounted(){
        console.log(this.$refs.input.files);
    },

    methods : {
        clicked(){

        }
    }
}
</script>

<style>

</style>