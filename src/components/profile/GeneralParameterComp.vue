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

                    <img  id="profile-img" :src="profil_img_url">
                    <img @click="clickFileInput" class="edit-img" src="@/assets/images/profile/edit.png">
                </div>
                <div id="pseudo-container">
                    <input @focusout="inputUnfocus" ref="pseudo_input" v-model="pseudo" disabled>
                    <img @click="editPseudo" class="edit-img" src="@/assets/images/profile/edit_2.png">
                </div>

            </div>

            <div class="line">
                <section>
                    <label for="name">Nom</label>
                    <input @focusout="inputUnfocus" v-model="name" id="name" disabled>
                    <img @click="editTarget" class="edit-img" src="@/assets/images/profile/edit_2.png">
                </section>

                <section>
                    <label for="forename">Prenom</label>
                    <input @focusout="inputUnfocus" v-model="forename" id="forename" disabled>
                    <img @click="editTarget" class="edit-img" src="@/assets/images/profile/edit_2.png">
                </section>
            </div>

            <section>
                <label for="classe">Classe</label>
                <input @focusout="inputUnfocus" v-model="classe" id="classe" disabled>
                <img @click="editTarget" class="edit-img" src="@/assets/images/profile/edit_2.png">
            </section>

            <button :class="{ activated: verifInfos() }">MODIFIER</button>
            <div id="res-container">
                <messageContainer ref="res"></messageContainer>
            </div>
        </form>
    </div>
</template>

<script>
import messageContainer from "@/components/log_sign/messageContainer.vue"

export default {
    name: "GeneralParameterComp",
    components: {
        messageContainer
    },
    async created() {
        await this.$store.dispatch("wait_user_pulled")
        this.init()
    },

    data() {
        return {
            data_name: "",
            data_forename: "",
            data_classe: "",
            data_pseudo: "",
            data_profil_img_url: "",
            name: "",
            forename: "",
            classe: "",
            profil_img_url: null,
            profil_imb_blob: Blob,
            pseudo: "Miaou",
            visble: false
        }
    },

    methods: {
        async response(data) {
            // TODO : Remplacer sans le fetch
            if (data.success !== undefined) {
                await this.$store.dispatch("fetchUser", {jws : this.$cookies.get('jws'), force : true} )
                this.init()
            }
            this.$refs.res.message(data)
        },
        editTarget(e) {
            let input = e.target.parentNode.querySelector("input")
            input.disabled = false
            input.focus()
        },
        inputUnfocus(e) {
            e.target.disabled = true
        },
        editPseudo() {
            if (this.$refs.pseudo_input.value == "Modifier pseudo") this.$refs.pseudo_input.value = ""
            this.$refs.pseudo_input.disabled = false
            this.$refs.pseudo_input.focus()
        },
        async handleFileChange(e) {
            const image = e.target.files[0];
            const blob = new Blob([image], { type: "image/jpeg" });
            let url = URL.createObjectURL(blob)
            this.profil_img_url = url
            this.profil_imb_blob = blob
        },
        clickFileInput() {
            this.$emit("go_customize")
        },
        verifInfos() {
            let empty = (this.classe === "" || this.forename === "" || this.name === "" || this.pseudo === "")
            let difference = (this.name !== this.$store.state.user.name 
            || this.pseudo !== this.$store.state.user.pseudo ||
            this.forename !== this.$store.state.user.forename||
            this.classe !== this.$store.state.user.classe ||
            this.profil_img_url !==  this.$store.state.user.profile_image_url)
            return difference && !empty

        },  async init() {
   
            this.profil_img_url  = this.$store.state.user.profile_image_url
            this.name = this.$store.state.user.name
            this.forename =  this.$store.state.user.forename
            this.classe = this.$store.state.user.classe
            this.pseudo = this.$store.state.user.pseudo == undefined || this.$store.state.user.pseudo == "" ?
             "Modifier pseudo" : this.$store.state.user.pseudo
        },

        async send_user_data() {
            let ret = {};
            const image_updated = this.$store.state.user.profile_image_url !== this.profil_img_url
            if (image_updated) {
                const data = await this.profil_imb_blob.arrayBuffer()
                const arr = new Uint8Array(data);
                const regularArr = Array.from(arr);
                ret.profileImage = regularArr
            }
            ret.name = this.$store.state.user.name !== this.name ? this.name : undefined
            ret.forename = this.$store.state.user.forename !== this.forename ? this.forename : undefined
            ret.classe = this.$store.state.user.classe!== this.classe ? this.classe : undefined
            ret.pseudo = this.$store.state.user.pseudo  !== this.pseudo ? this.pseudo : undefined
            this.$emit("send_user_data", ret, "general parameter")
        }
    },

}
</script>


<style scoped>
@import '@/css/shared_css_parameters_view.css';

* {

    font-family: "pixel2";
    box-sizing: border-box;
}

form .line#profile-img-line {
    background-color: rgba(228, 129, 0, 0.151);
    margin-top: 1.2vw;
    margin-bottom: 0;
    padding: 0.7vw;
    position: relative;
    overflow: hidden;
    border-radius: 3px;
}

#pseudo-container {
    position: absolute;
    left: 9.5vw;
    top: 3.8vw;
    width: auto;
    overflow: visible;
}

#pseudo-container input {
    height: auto;
    font-size: 1.2vw;
    color: rgb(54, 54, 54);
    font-weight: 700;
    background-color: transparent;
    width: auto;
    position: absolute;
}

#pseudo-container img {
    width: 2.5vw;
    position: absolute;
    right: 0;
    top: -0.2vw;
    z-index: 9;
}


form .line#profile-img-line::after {
    content: "";
    background-color: rgba(255, 166, 0, 0.877);
    position: absolute;
    width: 100%;
    height: 50%;
    left: 0;
    top: 0;
    z-index: 1;
}

#profile-img {
    z-index: 2;
    width: 5vw;
    border: 0.3vw solid rgb(255, 255, 255);
    background-color: white;
    height: 5vw;
    border-radius: 100%;
    transition: .3s;
    object-fit: cover;
    display: block;
    box-shadow: 0px 0px 0px 0.15vw #505050;
}

#profile-img-container {
    position: relative;
    z-index: 2;
}

#profile-img-container img.edit-img {
    position: absolute;
    overflow: visible;
    bottom: 0;
    left: 3.5vw;
    filter: invert(1);
    background-color: rgb(255, 255, 255);
    transition: 0.3s ease;
}

#profile-img-line p img.edit-img {
    position: absolute;
    top: 0.5vw;
    transform: translateY(-50%);
    right: -2.5vw;
    width: 2.8vw;
}

img.edit-img {
    position: absolute;
    cursor: pointer;
    width: 1.8vw;
    opacity: 0.7;
    padding: 0.5vw;
    border-radius: 100%;
}

section img.edit-img {
    right: 0;
    top: 0;
    width: 3.5vw;
    padding: 0.9vw;
    height: 100%;
    object-fit: cover;
    background-color: rgb(255, 239, 216);
    border-radius: 0.1px;
    border-left: 1px solid;
}

img.edit-img:hover {
    opacity: 0.7;
}


@media screen and (max-width: 1200px) {
    form .line#profile-img-line {
        padding: 1vw;
        margin-bottom: 2.5vw;
    }

    #pseudo-container {
        left: 19.5vw;
        top: 8.9vw;
    }

    #pseudo-container input {
        font-size: 2.9vw;
    }

    #pseudo-container img {
        width:5.2vw;
        position: absolute;
        right: 0;
        top: -1vw;
    }

    #profile-img-container{
        margin-right: auto;
    }
    #profile-img{
        width : 12vw;
        height : 12vw;
    }
    #profile-img-container img.edit-img{
        width: 3.5vw;
        padding: 0.9vw;
        left: 8vw;
    }

    section img.edit-img{
        width: 10vw;
        padding: 3vw;
    }

}

@media screen and (min-width: 1920px) {
    #profile-img {
        z-index: 2;
        width: 80px;
        box-shadow: 0px 0px 0px 3px #505050;
        background-color: white;
        height: 80px;
        border: 3px solid rgb(255, 255, 255);
    }

    #profile-img-container img.edit-img{

        left: 55px;
    }

    img.edit-img{
        width: 30px;
        padding: 7px;
    }

    form .line#profile-img-line{
        padding: 15px;
        margin-top: 20px
    }

    #pseudo-container input{
        font-size: 25px;
    }
    #pseudo-container{
        top: 70px;
        left: 150px;
    }

    #pseudo-container img{
        width: 40px;
        top: -4px;
    }

    section img.edit-img{
        width: 60px;
        padding: 12px;
    }
}
</style>