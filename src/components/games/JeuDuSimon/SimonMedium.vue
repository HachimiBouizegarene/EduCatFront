<template>
<link href='https://fonts.googleapis.com/css?family=Pixelify Sans' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=VT323' rel='stylesheet'>
<div class="imagedefond" >
<p>Jeu du Simon</p>
<div class="ff">
  <div class="border" >
    <div class="qwe">
      <div class="upleft block"  v-on:click="leftop"></div><div class="upright block"  v-on:click="rigtop"></div>  
      </div>
          
      <div class="center rectangle"  v-on:click="center"></div>  
     
      <div class="qwe">
        <div class="downleft block"  v-on:click="lefdown"></div><div class="downright block"  v-on:click="rigdown"></div>
      </div>
      
  </div>
  <div class="borderregle">
    Règle du jeu:<br>
    Il faut reproduire la séquence que tu as devant toi, <br>plus tu avanceras dans le jeu plus la séquence sera difficile.
    </div> 
    
    </div> 
    <div class="right">Niveau: {{sequence.length}}</div>
    
    <b-button class="styled" v-on:click="start" >Démarrer</b-button>
     <p class="error" v-if="err">Tu as perdu</p> <br><br>
    
 
</div>
<div id="bottomGamePage"></div>
</template>

<script>
import $ from "jquery";
import { take } from 'rxjs/operators';
import { interval } from 'rxjs';


  export default {
   data: function(){
        return {
            sequence: [], 
            mysequence:[],
            err:false,
            ready:false,
            n:1,
            stop: false,
            a:null,
        }
        
    },
    methods:{
       start: function(){
         this.a? this.a.unsubscribe():null;
         this.sequence=[];
          this.err=false;
          this.ready=true;
          this.n=1;
          this.stop=false
          this.add();    
       },
       compare:function(){
          for (let i = 0; i < this.mysequence.length; i++) {
              if(this.mysequence[i]!=this.sequence[i]){
                this.err=true;
                this.ready=false;
                this.stop=true;
                break;
              }
              
              if(i==this.sequence.length-1){
                
                this.ready=true;
                 interval(500).pipe(take(1)).subscribe((x)=>{ 
                   
                   if(x==0){
                     if(this.stop==false){
                    
                     this.n++;
                     this.ready=true;
                     this.add();
                     //this.clignote()
                     }


                     
                   }
                });
               
              }
          }
       },
       
       add: function(){
         this.ready=false
          let a = Math.floor(Math.random() * (5));
          this.sequence.push(a);
          this.mysequence=[];
             if(this.stop==false){
                
              for (let i = 0; i < this.sequence.length; i++) {
    setTimeout(() => {
      this.clignote(this.sequence[i]);
    }, i * 1000);
             
                 // this.clignote(this.sequence[i])
          }
          }
       },
       

       leftop: function(){
         if(this.ready==true){
             $(".upleft").fadeTo("fast",1,function(){
                 $(".upleft").fadeTo("fast",0.5);
             });
            this.mysequence.push(0);
            this.compare();
            
         }
       },
       rigtop: function(){
         if(this.ready==true){
           $(".upright").fadeTo("fast",1,function(){
                 $(".upright").fadeTo("fast",0.5);
                 
             });

          this.mysequence.push(1);
          this.compare();
         }
       },
       lefdown: function(){
         if(this.ready==true){
           $(".downleft").fadeTo("fast",1,function(){
                 $(".downleft").fadeTo("fast",0.5);
               });
          this.mysequence.push(2);
          this.compare();
         }
       },
       rigdown: function(){
         if(this.ready==true){
            $(".downright").fadeTo("fast",1,function(){
                 $(".downright").fadeTo("fast",0.5);
               });
          this.mysequence.push(3);
          this.compare();
         }
       },
        center: function(){
         if(this.ready==true){
            $(".center").fadeTo("fast",1,function(){
                 $(".center").fadeTo("fast",0.5);
               });
          this.mysequence.push(4);
          this.compare();
         }
       },
        clignote: function(n){
                
                   switch (n) {
                       case 0:

                       
                          $(".upleft").fadeTo("slow",1,function(){
                           $(".upleft").fadeTo("slow",0.5);
                         });
                         
                       break;
                       case 1:
                     
                         
                         $(".upright").fadeTo("slow",1,function(){
                           $(".upright").fadeTo("slow",0.5);
                         });
                         
                       break;
                       case 2:

                         
                           $(".downleft").fadeTo("slow",1,function(){
                             $(".downleft").fadeTo("slow",0.5);
                         });
               
                       break;
                       case 3:

                         
                         $(".downright").fadeTo("slow",1,function(){
                           $(".downright").fadeTo("slow",0.5);
                         });
                         
                       break;
                        case 4:

                         
                         $(".center").fadeTo("slow",1,function(){
                           $(".center").fadeTo("slow",0.5);
                         });
                         
                       break;
 
                     }
              
                this.ready=true;
                this.stop=false;
           
              
        }
        
    },   

  }

</script>

<style scoped>
body{
    background: -webkit-linear-gradient(45deg, #ffffff, #ffffff);
    font-family: 'Pixelify Sans';
   }

   div.upleft{
    top:0;
    left:0;
    background-color:rgb(3, 255, 3);
    border-radius:99% 0 0 0;
   }
   div.center{
    top:0;
    left:0;
    background-color:rgb(255, 0, 123);
   }
   div.centerright{
    top:0;
    left:0;
    background-color:rgb(255, 149, 0);
   }
   div.upright{
    top:0;
    right:0;
    background-color:red;
    border-radius:0 100% 0 0 ;
   }
   div.downleft{
    bottom:0;
    left:0;
    background-color:yellow;
    border-radius:0 0 0 100%;
   }
   div.downright{
    bottom:0;
    right:0;
    background-color:blue;
    border-radius:0 0 100% 0 ;
   }
   
   div.block{
     color: white; 
     width: 200px;
     height: 200px;
     vertical-align: top;
     opacity: 0.5;
     
   }
   div.rectangle{

    width: 400px;
    height: 80px;
    vertical-align: top;
    opacity: 0.5;
    cursor: pointer;
  }
  div.mirectangle{

    width: 200px;
    height: 80px;
    vertical-align: top;
    opacity: 0.5;
    cursor: pointer;
  }


   
   div.qwe{
     display: flex;
   }
   
  div.right{
  

    color: rgb(255, 0, 0);
    font-size: 65pt;
    position: relative;
    top: -200px; left: 40%;
    width: 400px;
  }

   .ff{
    
     display: flex;
     flex-wrap: wrap-reverse;
     justify-content: space-around;
     align-items: center;
     margin-top: 20px;
     overflow: hidden;
   }
   .border{
    
    background-color : transparent;
    border-radius:40% 40% 40% 40%;
   }

   .borderregle{
    font-family: 'VT323';
     padding:5px;
    position: relative;
    top: -80px; left: 40px;
    border-style: double;
    border-width: 20px;
    background-color : white;
    font-size: 20pt;
   }
   p{
    color: rgb(255, 0, 0);
     font-size: 65pt;
     text-align: center;
   }
   p.error{
     color: red;
     position: relative;
     top: -370px; left: 15%;
   }
   
   .edd{
     font-family: 'McLaren';
     font-size: 20px;
   }
   .styled {
    position: relative;
    top: -270px; left: 75%;
    border: 0;
    line-height: 2.5;
    padding: 0 20px;
    font-size: 20pt;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    border-radius: 10px;
    background-color: rgba(220, 0, 0, 1);
    background-image: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2) 30%,
      rgba(0, 0, 0, 0)
    );
    box-shadow:
      inset 2px 2px 3px rgba(255, 255, 255, 0.6),
      inset -2px -2px 3px rgba(0, 0, 0, 0.6);
  }
  
  .styled:hover {
    background-color: rgba(255, 0, 0, 1);
  }
  

  #bottomGamePage {
    box-shadow: 0px 7px 18px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #5086ec;
    padding: 10px 40px 10px 40px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  #topGamePage {
    display: flex;
    justify-content: center;
  }
  
  #topGamePageLeft {
    display: flex;
    justify-content: left;
    flex: 1;
  }
  
  #burger-menu {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    /* Pour aligner les éléments verticalement */
    justify-content: space-between;
    height: 27px;
    /* Ajusté pour l'espacement entre les éléments */
    padding-left: 10%;
    margin-top: 15px;
  }
  
  #burger-menu span {
    width: 35px;
    height: 5px;
    background-color: black;
    border-radius: 10px;
    min-width: 20px;
  }
  
  #websiteTitle {
    font-size: 35px;
    font-family: "Comfortaa", "Roboto Condensed";
    padding-left: 5%;
    color: #333333;
  }
  
  #gameTitle {
    font-size: 44px;
    font-family: "SSSBlack", "Roboto Condensed";
    color: #333333;
    font-weight: bold;
  }
  
  #topGamePageRight {
    width: 100px;
    display: flex;
    justify-content: right;
    flex: 1;
  }
  
  #topGamePageRight img {
    width: 50px;
    height: 50px;
    padding: 10%;
  }
  img.pixelated {
    image-rendering: pixelated;
  }
  .imagedefond { 
  
    background-image: url("@/assets/images/games/JeuDuSimon/back.avif");
    background-size: cover;
  }
  
</style>