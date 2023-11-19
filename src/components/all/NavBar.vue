<template>
    <header>
        <nav>
            <div class="left-part">
                <div id="burger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <router-link id="title"  to="/">EduCat</router-link>
            </div>
            <div class="right-part">
                <router-link  to="/signin">S'inscrire</router-link>
                <router-link  to="/login">Se connecter</router-link>
            </div>
        </nav>
    </header>
</template>

<script>

</script>

<style scoped>



header{
    position: fixed;
    width:100%;
    height: 50px;
    box-shadow: rgba(100, 100, 111, 0.137) 0px 7px 29px 0px;
    background-color: white;
}
header nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}


header nav .left-part{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 30%;
}


#burger-menu{
    cursor: pointer;
    position: relative;
    width: 30px;
    height: 100%;
}

#burger-menu span{
    transform: translateY(-50%);
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: rgb(31, 31, 31);
}

#burger-menu span:nth-child(1){
    top : 35%;
}

#burger-menu span:nth-child(2){
    top : 50%;
}
#burger-menu span:nth-child(3){
    top : 65%;
}

header nav .right-part {
    margin-right: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 25%;
}

a{
    text-decoration: none;
    color : rgb(49, 49, 49);
    border: none;
    background: none;
    border-radius:6px;
    padding: 10px;
}
#title{
    font-size: 25px;
}

header nav .right-part a:nth-child(1){
    background-color: white;
}
</style>

