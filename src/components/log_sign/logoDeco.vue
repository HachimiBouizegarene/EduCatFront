<template>
      <span class="circle" id="circle1"></span>
      <span class="circle" id="circle2"></span>
      <span class="circle" id="circle3"></span>
      <span class="bar" id="bar1"></span>
      <!-- <span class="bar" id="bar2"></span> -->
      <span class="bar" id="bar3"></span>
      <img id="logo_login" :src="require(`@/assets/images/${logo_url}`)">

</template>
  
<script>
  export default {
      name: "LogoDeco",
      props : ['logo_url'],
  }
</script>
  
<style>
  .circle{
    width: 250px;
    height: 250px;
    border-radius: 300px;
    position: absolute;
  }
  .bar{
    position: absolute;
    width: 60px;
    height:300px;
    border-radius: 100px;
  }

   #bar1{
    top: 0;
    left: 0;
    transform: translateX(20%) translateY(-30%);
    background: linear-gradient(45deg, rgb(133, 226, 195) 50%, rgba(255,255,255,1) 100%);
  }
  #bar3{
    top: 0;
    left: 0;
    transform: translateX(150%) translateY(-70%);
    background: linear-gradient(45deg, rgb(129, 231, 235) 10%, rgba(255,255,255,1) 100%);
  }

  /* .container .left-part #bar2{
    bottom: 0;
    right: 0;
    transform: translateX(-20%) translateY(40%);
    background: linear-gradient(225deg, rgba(244,158,165,1) 30%, rgba(255,255,255,1) 100%);
  } */

  #circle1{
    background: linear-gradient(45deg, rgba(244,158,165,1) 60%, rgba(255,255,255,1) 100%);
    top: 0;
    right: 0;
    transform: translateY(-20%) translateX(20%);
  }

  #circle2{
    background: linear-gradient(45deg, rgb(158, 164, 244) 60%, rgba(255,255,255,1) 100%);
    top: 0;
    right: 0;
    transform: translateX(-50%) translateY(-50%);
  }

  #circle3{
    background: linear-gradient(200deg, rgb(229, 133, 248) 60%, rgba(255,255,255,1) 100%);
    bottom: 0;
    left: 0;
    transform: translateX(-30%) translateY(15%);
  }

  
  #logo_login{
    width: 250px;
  }


@media screen and (max-width: 1300px) {
  #logo_login{
    width: 200px;
  }
 .circle{
  width: 130px;
  height: 130px;
 }
 .bar{
  position: absolute;
  width: 50px;
  height:200px;
}
}

@media screen and (max-width: 800px) {
  .circle{
    width: 70px;
    height: 70px;
  }
  .bar{
    position: absolute;
    width: 30px;
    height:100px;
  }
  #logo_login{
    width: 120px;
  }

  
}
@media screen and (max-width: 500px) {
  .circle{
    width: 60px;
    height: 60px;
   }
   .bar{
    position: absolute;
    width: 20px;
    height:60px;
  }
}
</style>