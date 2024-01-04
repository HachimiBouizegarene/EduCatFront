<template>
    <NavBar></NavBar>
     <main>
        <div class="parameters-choice">
            <section @click="selected_parameter = key" :class="{selected : key==selected_parameter}" v-for="(parameter, key) in parameters"  :key="key">
                <h4>{{parameter}}</h4>
            </section>
        </div>
        <div class="parameter-container">
            <GeneralParameterComp v-if="selected_parameter == 0"></GeneralParameterComp>
            <SecurityParameterComp  v-if="selected_parameter == 1"></SecurityParameterComp>
        </div>
     </main>
</template>

<script>
import NavBar from "@/components/all/NavBar.vue"
import GeneralParameterComp from "@/components/profile/GeneralParameterComp.vue"
import SecurityParameterComp from "@/components/profile/SecurityParameterComp.vue"
export default {
    name : "ProfilPage"
    ,
    components : {
        NavBar,GeneralParameterComp,
        SecurityParameterComp
    },
    async mounted(){
        document.querySelector("body").style.backgroundColor = "#f8f8f8"

        const data = await fetch("http://localhost:9090/profile", {
            method : "POST", 
        }).then((res)=>{
            return res.json();
        })
        console.log(data[0].PhotoProfil);
        let blob = new Blob([new Uint8Array(data[0].PhotoProfil)], {type : "image/jpg"})

        console.log (URL.createObjectURL(blob))
    },

    beforeUnmount(){

        document.querySelector("body").style.backgroundColor = "";
    },

    data(){
        return {
            parameters : ["Paramètres généraux", "sécurité"],
            selected_parameter : 0
        }
    },
    methods : {
    }
}
</script>

<style scoped> 

    main{
        padding: 5vw;
        padding-top: calc(100px + 2vw);
        height: 100%;
        margin: auto;
        display: flex;
        flex-direction: row;
        gap: 2vw;;
    }

    .parameters-choice{
        width: 30%;
        height: 500px;
        height: auto;
    }

    .parameters-choice section{
        width: 100%;
        height: 4vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(255, 255, 255);
        cursor: pointer;
        transition: 0.2s ease ;
        border-radius: 2px;
    }
    .parameters-choice section.selected{
        background-color: rgb(228, 226, 226);
    }


    .parameters-choice section:hover{
        background-color: rgb(228, 226, 226);
    }

    .parameters-choice section h4{
        font-size: 1.2vw;
        font-family: 'pixel2';
    }

    .parameter-container{
        position: relative;
        width: 70%;
        background-color: rgb(255, 255, 255);
    }

    
</style>