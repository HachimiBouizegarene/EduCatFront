<template>
    <div class="parameter-comp container">
        <section class="title">
            <h3>Paramètres généraux</h3>
            <p>Gérez les informations de votre compte.</p>
        </section>

        <form @submit.prevent="send_user_data" id="form-info">
            <input @change="handleFileChange" ref="file_getter" type="file" style="display : none">
            <h4>Informations personnelles</h4>
            <div class="line" id="profile-img-line">
                <div id="profile-img-container">
                    <img ref="profil_img" id="profile-img" :src="profil_img_url">
                    <img  @click="clickFileInput" class="edit-img"  src="@/assets/images/profile/edit.png">
                </div>
                <div id="pseudo-container">
                    <input @focusout="inputUnfocus" ref="pseudo_input" v-model="pseudo" disabled>
                    <img @click="editPseudo"  class="edit-img"  src="@/assets/images/profile/edit_2.png">
                </div>
                
            </div>
            
            <div class="line">
                <section>
                    <label for="name">Nom</label>
                    <input @focusout="inputUnfocus" v-model="name" id="name" disabled>
                    <img   @click="editTarget" class="edit-img"  src="@/assets/images/profile/edit_2.png">
                </section>
    
                <section>
                    <label for="forename">Prenom</label>
                    <input @focusout="inputUnfocus" v-model="forename" id="forename" disabled>
                    <img  @click="editTarget" class="edit-img"  src="@/assets/images/profile/edit_2.png">
                </section>
            </div>

            <section>
                <label for="classe">Classe</label>
                <input @focusout="inputUnfocus" v-model="classe" id="classe" disabled>
                <img  @click="editTarget" class="edit-img"  src="@/assets/images/profile/edit_2.png">
            </section>

            <button :class="{activated : verifInfos()}" >MODIFIER</button>
            <div id="res-container">
                <messageContainer ref="res"></messageContainer>
            </div>
        </form>
    </div>

</template>

<script>
import messageContainer from "@/components/log_sign/messageContainer.vue"

export default {
    name : "GeneralParameterComp",
    components : {
        messageContainer
    },
    mounted(){
    },

    data(){
        return {
            data_name : "",
            data_forename : "",
            data_classe : "",
            data_pseudo : "",
            data_profil_img_url : "",
            name : "",
            forename : "",
            classe : "",
            profil_img_url : "",
            profil_imb_blob : Blob,
            pseudo : "",
            visble : false
        }
    },

    methods : {
        response(data){
            if(data.success !== undefined) {
                this.data_name = this.name
                this.data_forename = this.forename
                this.data_pseudo = this.pseudo
                this.data_classe= this.classe
                this.data_profil_img_url = this.profil_img_url
            }
            this.$refs.res.message(data)
        },
        editTarget(e){
            let input = e.target.parentNode.querySelector("input")
            input.disabled = false
            input.focus()
        },
        inputUnfocus(e){
            e.target.disabled = true
        },
        editPseudo(){
            if( this.$refs.pseudo_input.value == "Modifier pseudo")  this.$refs.pseudo_input.value = ""
            this.$refs.pseudo_input.disabled = false
            this.$refs.pseudo_input.focus()
        },
        async handleFileChange(e){
            const image = e.target.files[0];
            const blob = new Blob([image], {type : "image/jpeg"});
            let url = URL.createObjectURL(blob)
            this.profil_img_url = url
            this.profil_imb_blob = blob
            
        },
        clickFileInput(){
            this.$refs.file_getter.click()
        },
        verifInfos(){
            let empty = (this.classe==="" ||  this.forename==="" ||  this.name === "" || this.pseudo=== "") 

            let difference =(this.data_name !== this.name || this.pseudo !== this.data_pseudo ||
             this.data_forename !== this.forename || this.classe !== this.data_classe ||this.profil_img_url !== this.data_profil_img_url)
            return difference && !empty
            
        },init(data){
            this.profil_img_url = this.data_profil_img_url = data.img_url
            this.data_name = this.name = data.Nom
            this.data_forename = this.forename = data.Prenom
            this.data_classe = this.classe = data.Classe
            this.data_pseudo = this.pseudo = data.Pseudonyme == undefined || data.Pseudonyme == "" ? "Modifier pseudo" : data.Pseudonyme
        },

        async send_user_data (){
            let ret = {};
            const image_updated = this.data_profil_img_url !== this.profil_img_url
            if(image_updated){
                const data =  await this.profil_imb_blob.arrayBuffer()
                const arr = new Uint8Array(data);
                const regularArr = Array.from(arr);
                ret.PhotoProfil = regularArr
            }
            
            ret.Nom = this.data_name !== this.name  ? this.name : undefined
            ret.Prenom = this.data_forename !== this.forename ? this.forename : undefined
            ret.Classe = this.data_classe !== this.classe ? this.classe : undefined
            ret.Pseudonyme = this.data_pseudo !== this.pseudo ? this.pseudo : undefined
            this.$emit("send_user_data", ret)
    
        }
    },

}
</script>


<style scoped>
@import  '@/css/shared_css_parameters_view.css';

    *{
   
        font-family : "pixel2";
        box-sizing : border-box;
    }

    form .line#profile-img-line{
        background-color : rgba(228, 129, 0, 0.151);
        margin-top : 1.2vw; 
        margin-bottom : 0;
        padding : 0.7vw;
        position : relative;
        overflow : hidden;
        border-radius : 3px;
    }
    #pseudo-container{
        position : absolute;
        left : 9.5vw;
        top : 3.8vw;        
        width: auto;
        overflow: visible;
    }
    #pseudo-container input{
        height: auto;
        font-size : 1.2vw;
        color : rgb(54, 54, 54);
        font-weight : 700;
        background-color: transparent;
        width: auto;
        position: absolute;
    }

    #pseudo-container img{
        width: 2.5vw;
        position: absolute;
        right: 0;
        top: -0.6vw;
    }


    form .line#profile-img-line::after{
        content : "";
        background-color : rgba(255, 166, 0, 0.877);
        position : absolute;
        width : 100%;
        height : 50%;
        left : 0;
        top : 0;
        z-index :1;
    }
    #profile-img{
        z-index : 2;
        width : 5vw;
        border : 5px solid rgb(255, 255, 255);
        background-color: white;
        height : 5vw;
        border-radius : 100%;
        transition : .3s;
        object-fit: cover;
        display : block;
        box-shadow: 0px 0px 0px 0.15vw #505050;
    }

    #profile-img-container{
        position : relative;
        z-index:  2;
    }
    
    #profile-img-container img.edit-img{
        position: absolute;
        bottom: 0;
        right : 0;
        filter: invert(1);
        background-color: rgb(255, 255, 255);
        transition: 0.3s ease;
    }

    #profile-img-line p img.edit-img{
        position: absolute;
        top: 0.5vw;
        transform: translateY(-50%);
        right: -2.5vw;
        width: 2.8vw;
    }

    img.edit-img{
        position: absolute;
        cursor: pointer;
        width: 1.8vw;
        opacity: 0.6;
        padding: 0.5vw;
        border-radius: 100%;
        overflow: visible;
    }

    section img.edit-img{
        right: 0;
        top: 0;
        width: 3.5vw;
        padding: 0.9vw;
        height: 100%;
        object-fit: cover;
        background-color: rgb(255, 239, 216);
        border-radius: 0.1px;
    }

    img.edit-img:hover{
        opacity: 0.7;
    }

    
</style>