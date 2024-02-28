<template>
    <NavBar></NavBar>
     <main>
        <div class="parameters-choice">
            <img @click="showParameters = !showParameters" id="parameter-icon" src="@/assets/images/profile/arrow.png" >
            <template   v-for="(parameter, key) in parameters"  :key="key">
                <section :class="{selected : key ==selected_parameter}" @click="selected_parameter = key ; showParameters = false" v-if="key ==selected_parameter || showAllParameter" >
                    <h4>{{parameter}}</h4>
                </section>
            </template>
            <template   v-for="(parameter, key) in parameters"  :key="key">
                <section @click="selected_parameter = key; showParameters = false" v-if="key !==selected_parameter && showParameters && !showAllParameter" >
                    <h4>{{parameter}}</h4>
                </section>
            </template>
        </div>
        <div class="parameter-container">
            
            <GeneralParameterComp @send_user_data="send_user_data"  ref="generalParameter" v-if="selected_parameter == 0"></GeneralParameterComp>
            <CustomizeParameterComp @send_user_data="send_user_data" ref="customizePrameter"  v-if="selected_parameter == 1"></CustomizeParameterComp>
            <SecurityParameterComp @change_user_password="change_user_password"  ref="securityParameter" v-if="selected_parameter == 2"></SecurityParameterComp>
        </div>
     </main>
     <FooterComp></FooterComp>
</template>

<script>

import NavBar from "@/components/all/NavBar.vue"
import GeneralParameterComp from "@/components/profile/GeneralParameterComp.vue"
import SecurityParameterComp from "@/components/profile/SecurityParameterComp.vue"
import FooterComp from "@/components/all/FooterComp.vue";
import CustomizeParameterComp from "@/components/profile/CustomizeParameterComp.vue";
export default {
    name : "ProfilPage"
    ,
    components : {
    NavBar, GeneralParameterComp,
    SecurityParameterComp,
    FooterComp,
    CustomizeParameterComp
},
    async mounted(){
        this.verifyWidth()
        window.addEventListener('resize', this.verifyWidth);
        this.$refs.generalParameter.init();
    },

    async created(){
        //faire les verifications et rediriger si jws existe pas
        if (!this.$cookies.get("jws")){
            this.$router.push("/login")
            return
        }  
       const jws = this.$cookies.get("jws")
       if(!jws) {
            this.$router.push("/login")
            return
        }
       document.querySelector("body").style.backgroundColor = "#f8f8f8"
    },
    

    beforeUnmount(){
        document.querySelector("body").style.backgroundColor = "";
        window.removeEventListener('resize', this.verifyWidth);
    },

    data(){
        return {
            parameters : ["Paramètres généraux","Personnalisation", "sécurité"],
            selected_parameter : 0,
            showParameters : false,
            showAllParameter : true
        }
    },
    methods : {
        verifyWidth(){
            this.showAllParameter = window.innerWidth >= 1200
        },
        async change_user_password(oldPassword, newPassword){
            // PEUT etre combinee par send_user_data

            const data = {newPassword : newPassword, 
            oldPassword : oldPassword,
            jws : this.$cookies.get("jws")}

            let body_res = await fetch("http://localhost:9090/updatePassword",{
                method : "POST",
                body : JSON.stringify(data)
            }).then((res)=>{
                return res.json();
            })
            this.$refs.securityParameter.response(body_res)
        },

        async send_user_data(data, sender){
            const jws = this.$cookies.get("jws")
            data.jws = jws
            let body_res = await fetch("http://localhost:9090/updateProfile", {
                method : "POST", 
                body : JSON.stringify(data)
            }).then((res)=>{
                return res.json();
            })  

            if(sender == "general parameter") this.$refs.generalParameter.response(body_res)
            if(sender == "customize parameter") this.$refs.customizePrameter.response(body_res)
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
        display: flex;
        flex-direction: row;
        gap: 2vw;
        position: relative;;
    }

    .parameters-choice{
        width: 30%;
        height: auto;
    }

    .parameters-choice section{
        width: 100%;
        height: 4vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(241, 241, 241);
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

    #parameter-icon{
        display: none;
        cursor: pointer;
        width: 3vw;
        position: absolute;  
        z-index: 99;
        right: 3vw;
        top: 7vw;
    }

    @media screen and (max-width: 1200px)  {
        
        main{
            padding-left: 0;
            padding-right: 0;
            padding-top: 37vw;
        }
        #parameter-icon{
            display: block;
        }
        .parameter-container{
            width: 100%;
        }
        .parameters-choice section{
            height: 17vw;
        }
        .parameters-choice section h4{
            font-size: 5.3vw;
        }
        .parameters-choice{
            position: absolute;
            top: 20.2vw;
            right: 0vw;
            z-index: 99;
            width: 100%;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .parameters-choice section{
            border-radius: 0;
        }
    }

    @media screen and (min-width: 1920px) {
        main{
            padding: 7%;
        }
        .parameters-choice section{
            width: 100%;
            height: 80px;
        }

        .parameters-choice section h4{
            font-size: 20px;
        }
    }
    
</style>