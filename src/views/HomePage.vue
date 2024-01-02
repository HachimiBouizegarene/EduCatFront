<template>
    <NavBar></NavBar>

    <div id="flaque">
    <img src=".\images\yellow-bg.png" alt="flaque image">
    </div>
    <div id="MStylo">
        <img src=".\images\puffy-jumping-guy-with-a-pencil.png"/>
    </div>
    <div class="center">
        <h1>Apprends en t'amusant !</h1>
        <p>De nombreux exercices imaginés par des étudiants, pour des étudiants afin de réussir au mieux à comprendre tout en s’amusant !</p>
        <div class="circles-colors">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>

    <div id="DPuzz">
        <img src=".\images\puffy-woman-sitting-and-holding-a-puzzle_1.png">
    </div>
    <div id="Vers">
        <img src=".\images\puffy-red-curl-with-eyes_2.png" alt="Vers image">
    </div>

    <div class="center-2">
        <h1>De nombreux exercices dans différentes matières</h1>
        <p>De nombreux exercices imaginés par des étudiants, pour des étudiants afin de réussir au mieux à comprendre tout en s’amusant !</p>
    </div>

    <div class="levels-container">
        <h1>Les Différents Niveaux</h1>
        <div id="LStylo">
            <img src=".\images\puffy-workaholism-and-working-overtime-1_1.png" alt="LStylo image"> 
        </div>
        <div id="AB">
            <img src=".\images\puffy-lettering-a-plus-b-in-multicolored-style-text_1.png" alt="AB image">
        </div>
        <div id="Chat">
            <img src=".\images\puffy-tiger-jumping-through-a-fire-ring_1.png" alt="Chat image">
        </div>
        <HomeLevel side="left" level_name="CP" level_description="I created this personal project in order to show how to create an interface in Figma using a portfolio as an example." ></HomeLevel>
        <HomeLevel side="right" level_name="CM1" level_description="I created this personal project in order to show how to create an interface in Figma using a portfolio as an example." ></HomeLevel>
        <HomeLevel side="left" level_name="CM2" level_description="I created this personal project in order to show how to create an interface in Figma using a portfolio as an example." ></HomeLevel>
    </div>

    <FooterV></FooterV>
</template>


<script>
import NavBar from "@/components/all/NavBar.vue"
import FooterV from "@/components/all/FooterComp.vue"
import HomeLevel from "@/components/home/HomeLevel.vue"


export default {
    name : "HomePage",
    components : {
        NavBar,
        HomeLevel,
        FooterV
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
div.center{
    width: 100%;
    height: 200px;
    padding-top: 150px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
}

div.center h1{
    color: rgb(34, 34, 34);
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 50px;
}

div.center p{
    color: rgb(34, 34, 34);
    width: 70%;
    text-align: center;
    font-size: 15px;
}

div.center .circles-colors{
    height: 60px;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

div.center .circles-colors span{
    width: 60px;
    height: 60px;
    border-radius: 60px;
}

div.center .circles-colors span:nth-child(1){
    background-color: #ff9e67;
}
div.center .circles-colors span:nth-child(2){
    background-color: #8fff67;
}
div.center .circles-colors span:nth-child(3){
    background-color: #67d1ff;
}
div.center .circles-colors span:nth-child(4){
    background-color: #7c67ff;
}
div.center .circles-colors span:nth-child(5){
    background-color: #ff67de;
}
div.center .circles-colors span:nth-child(6){
    background-color: #ffde67;
}


div.center-2{
    margin-top: 100px;
    height: 400px;
    width: 100%;
    background-image: url("./images/background_bleu_1.png");
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

div.center-2 h1,div.center-2 p{
    width: 60%;
    text-align: center;
    color: white;
    padding-top: 20px;
    box-sizing: border-box;
}
div.center-2 h1{
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 50px;
}
div.levels-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 5%;
}

div.levels-container h1{
    font-family: 'Roboto Condensed', sans-serif;
    padding: 60px;
}


#MStylo {
    position: relative;
    margin-left: -1%;
    padding-top: 8%;
    width: 18vw;  
    height: auto;
}

#MStylo img {
    position: absolute;
    width: 100%;  
    height: auto;
}

#flaque {
  position: absolute;
  margin-left: 65%;
  margin-top: -4%;
  width: 40vw;
  height: auto;
}

#flaque img {
  position: absolute;
  width: 100%;
  height: auto;
}

#DPuzz {
    position: relative;
    margin-left: 80%;
    width: 20vw;  
    height: auto;
    margin-bottom: 15.5%;
}

#DPuzz img {
    position: absolute;
    width: 100%;  
    height: auto;
}

#Vers {
  position: absolute;
  margin-top: -3%;
  margin-left: 6%;
  width: 5vw;
  height: auto;
}

#Vers img {
  position: absolute;
  width: 100%;
  height: auto;
}

#LStylo {
  position: absolute;
  margin-right: 87%;
  margin-bottom: 98%;
  width: 13vw;
  height: auto;
}

#LStylo img {
  position: absolute;
  width: 100%;
  height: auto;
}

#AB {
  position: absolute;
  margin-left: 85%;
  margin-bottom: 28%;
  padding-top: 5%;
  width: 10vw;
  height: auto;
}

#AB img {
  position: absolute;
  width: 100%;
  height: auto;
}

#Chat {
  position: absolute;
  margin-right: 89%;
  margin-top: 35%;
  width: 12vw;
  height: auto;
}

#Chat img {
  position: absolute;
  width: 100%;
  height: auto;
}


/*Pour les tablettes*/
@media screen and (max-width: 768px) {
    div.center {
        height: auto;
        padding-top: 50px;
    }

    div.center h1 {
        font-size: 28px;
    }

    div.center p {
        width: 88%;
        font-size: 18px;
    }

    div.center .circles-colors {
      padding-top: 4%;
        height: 30px;
        width: 60%;
    }

    div.center .circles-colors span {
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }

    div.center-2 {
        height: auto;
    }

    div.center-2 h1,
    div.center-2 p {
        width: 75%;
        font-size: 22px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    div.levels-container h1 {
        padding: 30px;
    }

    div.levels-container p{
    font-size: 18px;
  }

  #MStylo{
    margin-left: -4%;
  }
  #flaque {
    margin-left: 60%;
    margin-top: -7%;
  }

  #Vers {
    margin-left: 12%;
    margin-top: -3%;
  }

  #LStylo {
    margin-right: 86%;
    margin-top:-75%;
  }

  #AB {
    margin-left: 85%;
    margin-bottom: 55%;
    width: 13vw;
  }

  #Chat {
    margin-right: 90%;
    margin-top: 70%;
    width: 13vw;
  }
}

/*Pour iPad*/
@media screen and (max-width: 815px) {
    div.center {
        height: auto;
        padding-top: 50px;
    }

    div.center h1 {
        font-size: 24px;
    }

    div.center p {
        width: 65%;
        font-size: 16px;
        padding-top: 2%;
    }

    div.center .circles-colors {
      padding-top: 2%;
        height: 40px;
        width: 55%;
    }

    div.center .circles-colors span {
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }

    div.center-2 {
        height: auto;
    }

    div.center-2 h1,
    div.center-2 p {
        width: 75%;
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    div.levels-container h1 {
      font-size: 24px;
      padding-top: 10px;
      padding-bottom: 30px;

    }

    div.levels-container p{
    font-size: 18px;
  }

  #MStylo{
    margin-left: -1%;
  }
  #flaque {
    margin-left: 60%;
    margin-top: -7%;
  }

  #Vers {
    margin-left: 12%;
    margin-top: -3%;
  }

  #LStylo {
    margin-right: 86%;
    margin-top:-65%;
  }

  #AB {
    margin-left: 87%;
    margin-bottom: 53%;
    width: 13vw;
  }

  #Chat {
    margin-right: 90%;
    margin-top: 66%;
    width: 13vw;
  }
}



  /* Pour les téléphones */
  @media screen and (max-width: 480px) {
    div.center {
    padding-top: 50px;
    height: auto;
  }

  div.center h1 {
    font-size: 21px;
  }

  div.center p {
    width: 85%;
    font-size: 16px;
    padding-top: 4%;
  }

  div.center .circles-colors {
    height: 30px;
    width: 70%;
  }

  div.center .circles-colors span {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }

  div.center-2 {
    height: auto;
  }

  div.center-2 h1,
  div.center-2 p {
    width: 90%;
    font-size: 16px;
    padding-top: 10px;
  }

  div.levels-container h1 {
    padding: 30px;
    font-size: 21px;
  }

  div.levels-container p{
    font-size: 12px;
  }


  #flaque {
    margin-left: 60%;
    width: 70vw;
  }
  #DPuzz{
    margin-top: 6.5%;
  }

  #Vers {
    margin-left: 1%;
    margin-top: 4%;
  }

  #LStylo {
    margin-right: 84%;
    margin-bottom: 205%;
    width: 18vw;
  }

  #AB {
    margin-left: 80%;
    margin-bottom: 84%;
    width: 15vw;
  }

  #Chat {
    margin-right: 90%;
    margin-top: 110%;
    width: 18vw;
  }

}

@media screen and (max-width: 200px) {
  body{
    background-color: red;
  }
}
</style>