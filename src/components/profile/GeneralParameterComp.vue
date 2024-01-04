<template>
    <div class="parameter-comp container">
        <section class="title">
            <h3>Paramètres généraux</h3>
            <p>Gérez les informations de votre compte.</p>
        </section>

        <form id="form-info">
            <input type="file" id="file-getter" style="display : none">
            <h4>Informations personnelles</h4>
            <div class="line" id="profile-img-line">
                <div id="profile-img-container">
                    <img id="profile-img" src="@/assets/images/test-profile.jpeg">
                    <img class="edit-img"  src="@/assets/images/profile/edit.png">
                </div>
                
                <p>Mazencore<img class="edit-img"  src="@/assets/images/profile/edit_2.png"></p>
            </div>
            
            <div class="line">
                <section>
                    <label for="name">Nom</label>
                    <input  v-model="name" id="name">
                </section>
    
                <section>
                    <label for="forename">Prenom</label>
                    <input v-model="forename" id="forename">
                </section>
            </div>

            <section>
                <label for="name">Classe</label>
                <select v-model="classe" >
                </select>
            </section>

            <button :class="{activated : verifInfos()}" >MODIFIER</button>
        </form>
    </div>

</template>

<script>
export default {
    name : "GeneralParameterComp",

    data(){
        return {
            data_name : "",
            data_forename : "",
            data_classe : "",
            name : "",
            forename : "",
            classe : ""
        }
    },

    methods : {
        verifInfos(){
            let empty = (this.classe==="" &&  this.forename==="" &&  this.name === "")
            empty
            let difference =(this.data_name !== this.name ||
             this.data_forename !== this.forename || this.classe !== this.data_classe)
            return difference && !empty
            
        }
    }

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
    #profile-img-line p{
        font-weight : 700;
        position : absolute;
        left : 6.5vw;
        top : 4vw;
        font-size : 1.5vw;
        color : rgb(54, 54, 54);
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
        height : 5vw;
        border-radius : 100%;
        transition : .3s;

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
        cursor: pointer;
        width: 1.8vw;
        opacity: 0.6;
        padding: 0.5vw;
        border-radius: 100%;
        overflow: visible;
    }

    img.edit-img:hover{
        opacity: 0.7;
    }

    
</style>