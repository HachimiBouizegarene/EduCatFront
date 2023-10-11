<template>
    <div :class="['level', side] ">
        <div class="content">
            <h1>{{level_name}}</h1>
            <p>{{ level_description }}</p>
            <button>Accéder aux exercices</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['level_name', 'level_description', 'side'],
    setup(props){
        props
    }
}
</script>

<style>
div.levels-container .level{
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 20px;
    width: 80%;
    height: 400px;
    overflow: hidden;
    margin-bottom: 40px;
}
div.levels-container .level.right{
    background-color: #b3e0c5;
}

div.levels-container .level.left{
    background-color: #e0b3b3;
}


div.levels-container .level .content{
    box-sizing: border-box;
    padding:40px;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white
}
div.levels-container .level .content h1{
    padding: 30px 0;
}

div.levels-container .level .content p{
    color: rgb(54, 54, 54);
}
div.levels-container .level .content button{
    background: none;
    border: 1px black solid;
    border-radius: 20px;
    margin:30px 0 ;
    width: 70%;
    padding: 10px;
}
div.levels-container .level.right .content{
    margin-left: auto;

}


</style>