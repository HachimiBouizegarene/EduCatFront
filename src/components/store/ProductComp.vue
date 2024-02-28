<template>
    <div class="product">
        <img :class="{possessed : possesses }" id="image" :src="data.imageUrl">
        <div  class="infos">
            <h5 class="title">{{data.name}}</h5>
            <h6 class="category-title">{{data.category}}</h6>
            <button @click="BuyProduct(data.id)"
             :class="{unaffordable : $store.state.user.ecats < parseInt(data.price), notpossessed : !possesses }">
                <img v-if="!possesses" src="@/assets/images/store/lock.png">
                <img v-if="possesses" src="@/assets/images/store/possessed.png">
                <span  v-if="!possesses">{{ data.price }} EC</span></button>
        </div>
    </div>
</template>



<script>
export default {
    name : "ProdcutComp",
    props : {
        data : Object,
        possesses : Boolean
    },
    emits : ['wantToBuy'],

    mounted (){
  
    },
    methods : {
        async BuyProduct(id){
            if(!this.$props.possesses ){
                this.$emit("wantToBuy", id)
            }
        }
    }
}
</script>


<style>

.product{
    border: 0.2vw solid rgb(131, 71, 15);
    overflow: hidden;
    background-color: rgb(255, 233, 184);
    width: 20%;
    height: 100%;

    object-fit: cover;
}

.product #image{
    width: 100%;
    padding: 1vw 0;
    border-bottom: 0.2vw solid rgb(131, 71, 15);
    height: 10vw;
    image-rendering : pixelated;
    object-fit: contain;
    background-color: rgb(228, 241, 255);
}

.product #image.possessed{
    background-color: rgb(199, 253, 185);
}
.product .title{
    padding:0 0.5vw ;
    font-size: 1vw;
    color: rgb(131, 71, 15);
}
.product .category-title{
    padding:0 0.5vw ;
    font-size: 0.8vw;
    color: rgba(131, 71, 15, 0.623);
}

.product button{
    justify-content: center;
    display: flex;
    align-items: center;
    background-color: rgb(172, 255, 151);
    width: 60%;
    margin: 0.5vw ;
    border: 0.2vw solid rgb(131, 71, 15);
    margin-left: auto;
    gap: 0.8vw;
    margin-top: 0.5vw;
    transition: 0.3s ease;
    padding: 0.4vw;
    height: 2.5vw;
    position: relative;
    cursor: unset;
}

.product button.notpossessed{
    cursor: pointer;
    background-color: rgb(255, 174, 0);
}

.product button.notpossessed:hover img{
    transform: scale(1.5);
}
.product button.notpossessed:hover{
    background-color: rgba(248, 162, 34, 0.329);
}


.product button.notpossessed.unaffordable:hover img{
   transform: scale(1);
}
.product button.notpossessed.unaffordable::after{
    content: "INSUFISANT";
    font-family: "pixel";
    position: absolute;
    width: 100%;
    height: 100%;
    background: red;
    font-size: 1vw;
    color: white;
    top: 0;
    left:  0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s ease;
    opacity: 0;
}

.product button.unaffordable:hover::after{

    opacity: 1;
}
.product button span{
    font-family : "pixel";
    font-size: 1vw;
    color : rgb(131, 71, 15);
    margin-top: 0.1vw;
}
.product button img{
    transition: 0.3s ease;
    image-rendering : pixelated;
    width: 1vw;
    height: auto;
}
</style>