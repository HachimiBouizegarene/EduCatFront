<template>
    <header>
        <nav>
            <router-link  :to="{name : 'MazePageRemake'}">S'INSCRIRE</router-link>
            <router-link  to="/login">SE CONNECTER</router-link>
        </nav>
    </header>
</template>

<script>

</script>

<style scoped>

header{
    max-width: 1920px;
    position: fixed;
    z-index: 99;
    width:100%;
    height: 50px;
    background: none ;
}
header nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    box-sizing: border-box;
    padding: 50px;
    gap: 30px;
    padding-right: 1.5%;
}

a{

    font-family: 'pixel';
    text-decoration: none;
    color : rgb(49, 49, 49);
    border: none;
    background: none;
    font-size: 15px;
    transition: 0.15s ease;
    padding: 10px 20px; 
    border: 4px solid rgba(255, 187, 0, 0);
}

a:hover{
   border: 4px solid rgb(255, 187, 0);
   color : rgb(49, 49, 49);
}
#title{
    font-size: 25px;
}

a:nth-child(1){
    background-color: rgb(255, 187, 0);
}
a:nth-child(1):hover{
    background-color: white;
    border: 4px solid rgb(255, 255, 255);
}
@media screen and (max-width : 900px) {
    header nav {
        gap: 15px;
        padding: 15px;
    }
    a{
        font-size: 10px;
        padding: 5px 10px; 
    }
}

@media screen and (max-width : 550px) {
    header nav {
        gap: 10px;
        padding: 10px;
    }
    a{
        font-size: 8px;
        padding: 5px 10px; 
    }
}
</style>