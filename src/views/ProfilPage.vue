<template>
    <NavBar></NavBar>
     <main>
        <div class="parameters-choice">
            <section @click="selected_parameter = key" :class="{selected : key==selected_parameter}" v-for="(parameter, key) in parameters"  :key="key">
                <h4>{{parameter}}</h4>
            </section>
        </div>
        <div class="parameter-container">
            <GeneralParameterComp @send_user_data="send_user_data" :data="user_data" ref="generalParameter" v-show="selected_parameter == 0"></GeneralParameterComp>
            <SecurityParameterComp @change_user_password="change_user_password"  ref="securityParameter" v-if="selected_parameter == 1"></SecurityParameterComp>
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
        
    },
    async created(){
        document.querySelector("body").style.backgroundColor = "#f8f8f8"
        //faire les verifications et rediriger si jws existe pas
        const jws = this.$cookies.get("jws")
        const data = await fetch("http://localhost:9090/getProfile", {
            method : "POST", 
            body : JSON.stringify({
                jws : jws
            })
        }).then((res)=>{
            return res.json();
        })  
        //image
        let blob = new Blob([new Uint8Array(data.PhotoProfil)], {type : "image/jpg"})
        let url = URL.createObjectURL(blob);
        data.img_url = url
        this.user_data = data;
       this.initGeneralParameter()
    },
    

    beforeUnmount(){
        document.querySelector("body").style.backgroundColor = "";
    },

    data(){
        return {
            parameters : ["Paramètres généraux", "sécurité"],
            selected_parameter : 0,
            user_data : Array
        }
    },
    methods : {
        async change_user_password(data){
            const jws = this.$cookies.get("jws")
            data.jws = jws;
            let body_res = await fetch("http://localhost:9090/updatePassword",{
                method : "POST",
                body : JSON.stringify(data)
            }).then((res)=>{
                return res.json();
            })
            this.$refs.securityParameter.response(body_res)
        },
        initGeneralParameter(){
            this.$refs.generalParameter.init(this.user_data);
        },
        async send_user_data(data){
            const jws = this.$cookies.get("jws")
            data.jws = jws
            let body_res = await fetch("http://localhost:9090/updateProfile", {
                method : "POST", 
                body : JSON.stringify(data)
            }).then((res)=>{
                return res.json();
            })  
            this.$refs.generalParameter.response(body_res)
        }
    }
}
</script>

<style scoped> 

    main{
        user-select: none;
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