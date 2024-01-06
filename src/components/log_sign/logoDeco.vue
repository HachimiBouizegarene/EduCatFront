<template>
      <img id="logo_login" :src="require(`@/assets/images/${logo_url}`)">

</template>
  
<script>
  export default {
      name: "LogoDeco",
      props : ['logo_url'],
  }
</script>
  
<style scoped>


  /* .container .left-part #bar2{
    bottom: 0;
    right: 0;
    transform: translateX(-20%) translateY(40%);
    background: linear-gradient(225deg, rgba(244,158,165,1) 30%, rgba(255,255,255,1) 100%);
  } */


    #logo_login{
      image-rendering: pixelated;
    width: 250px;
  }


@media screen and (max-width: 1300px) {
  #logo_login{
    width: 200px;
  }

}

@media screen and (max-width: 800px) {

  #logo_login{
    width: 120px;
  }

  
}
@media screen and (max-width: 500px) {
}
</style>