<template>
    <NavBar></NavBar>
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

    <div class="center-2">
        <h1>De nombreux exercices dans différentes matières</h1>
        <p>De nombreux exercices imaginés par des étudiants, pour des étudiants afin de réussir au mieux à comprendre tout en s’amusant !</p>
    </div>

    <div class="levels-container">
        <h1>Les Différents Niveaux</h1>
        <HomeLevel side="left" level_name="CP" level_description="I created this personal project in order to show how to create an interface in Figma using a portfolio as an example." ></HomeLevel>
        <HomeLevel side="right" level_name="CM1" level_description="I created this personal project in order to show how to create an interface in Figma using a portfolio as an example." ></HomeLevel>
        <HomeLevel side="left" level_name="CM2" level_description="I created this personal project in order to show how to create an interface in Figma using a portfolio as an example." ></HomeLevel>
    </div>

    <FooterV></FooterV>
</template>


<script>
import NavBar from "@/components/all/NavBar.vue"
import FooterV from "@/components/all/FooterV.vue"
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
    margin-top: 150px;
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
    background-color: #6dbcdd;
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
}

div.levels-container h1{
    font-family: 'Roboto Condensed', sans-serif;
    padding: 60px;
}
</style>