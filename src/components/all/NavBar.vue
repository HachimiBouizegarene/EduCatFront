<template>
    <header>
        <nav>
            <router-link id="NavBarLogo" to="/"><img src="@/assets/images/navbar/Educat_Logo.webp" alt="logo Educat"></router-link>
            <div>
                <router-link  to="/signin">S'INSCRIRE</router-link>
                <router-link  to="/login">SE CONNECTER</router-link>
            </div>
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
    justify-content: left;
    box-sizing: border-box;
    padding: 50px;
    gap: 30px;
    padding-right: 1.5%;
}

header nav div{
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

#NavBarLogo {
    all: unset;
    cursor: pointer;
}

#NavBarLogo img { 
    width: 10vw;
    image-rendering: pixelated;
    min-width: 55px;
    max-width: 210px;
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

a:nth-child(2){
    background-color: rgb(255, 187, 0);
}
a:nth-child(2):hover{
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
    header nav div{
        gap: 10px;
        padding: 10px;
    }
    a{
        font-size: 8px;
        padding: 5px 10px; 
    }
}
</style>