<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="left-part">
      <span></span>
      <LogoDeco logo_url="login_page/logo_signin.png"></LogoDeco>
      <router-link to="/login">SE CONNECTER</router-link>
    </div>

    <form @submit.prevent="onSubmit(e)">
      <h1 id="login-title">INSCRIPTION</h1>

      <div>
        <input id="user_name" placeholder="Nom" v-model="user_name">
        <input id="user_name" placeholder="Prenom" v-model="user_forename">
      </div>
      <input id="user_name" placeholder="Classe" v-model="user_classe">
      <input id="user_pseudo" placeholder="Pseudonyme unique" v-model="user_pseudo">
      <input id="user_mail" placeholder="Mail" v-model="user_mail">
      <input id="password" placeholder="Mot de passe" v-model="user_password">
      <input id="password_confirm" placeholder="Confirmer mot de passe" v-model="user_password_confirm">
      <button :class="{activated : verifyInputs()}" type="submit">S'inscrire</button>
      <div id="message-container">
        <MessageContainer ref="messageContainer"></MessageContainer>
      </div>
    
    </form>
    <!-- <FooterComp></FooterComp> -->
  </div>
  <FooterComp></FooterComp>
</template>


<script>
import NavBar from "@/components/all/NavBar.vue"
import LogoDeco from "@/components/log_sign/logoDeco.vue"
import MessageContainer from "@/components/log_sign/messageContainer.vue"
import FooterComp from "@/components/all/FooterComp.vue";
// import FooterComp from "@/components/all/FooterComp.vue"

export default {
  name: "SigninPage",

  data() {
    return {
      user_forename: '',
      user_name: '',
      user_classe: '',
      user_mail: '',
      user_password: '',
      user_password_confirm: '',
      error: '',
      user_pseudo : '',
    }
  },

  created(){
    if (this.$cookies.get("jws")) this.$router.push("/Profil")
  },

  components: {
    NavBar,
    LogoDeco,
    MessageContainer,
    FooterComp
    // FooterComp
  },
  methods: {
    verifyInputs(){
      if (this.user_forename == '' || this.user_name == '' || this.user_birthday == '' ||
        this.user_mail == '' || this.user_password == '' || this.user_password_confirm == '')  return false
        if(/^\w+([._-]?\w+)*@\w+([._-]?\w+)*(\.\w{2,3})+$/.test(this.user_mail) == false)  return false
        if(this.user_password != this.user_password_confirm) return false
        return true
    },

    async onSubmit() {
      // verifier que les mots de passe correspondent
      if(this.user_password != this.user_password_confirm) {
        this.$refs.messageContainer.message({ error: "Les mot de passe ne correspondent pas" })
        return
      }

      try {
        const response = await fetch("http://localhost:9090/signin", {
          method: "POST",
          body: JSON.stringify({
            "user_name": this.user_name,
            "user_forename": this.user_forename,
            "user_classe": this.user_classe,
            "user_email": this.user_mail,
            "user_password": this.user_password,
            "user_pseudo" : this.user_pseudo,
          })
        })
        const data = await response.json();
        if (Object.keys(data).includes('error')) {
          this.$refs.messageContainer.message({ error: data['error'] })
        } else {
          this.$router.push({
            path: "/login",
            query: {
              subscribe: true
            }
          })
        }
      } catch (e) {
        this.$refs.messageContainer.message({ error: "Erreur lors de la connexion au serveur" })
      }
    }
  }
}
</script>

<style scoped>
body {
  overflow: auto;
}

.container {
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: auto;
  width: 96%;
  margin-bottom: 3vw;
  height: 700px;
  margin-top: 130px;
  overflow: hidden;
}

.container .left-part {
  overflow: hidden;
  width: 50%;
  height: 100%;
  background-color: #ffd1a5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
}



.container form {

  box-sizing: border-box;
  width: 30%;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
}

.container form div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.container form div input {
  width: 45%;
}

.container form h1 {
  font-family: "pixel";
  padding: 30px 0;
  color: rgb(53, 52, 52);
}

.container form input {
  padding: 10px 0;
  margin-bottom: 30px;
  border: none;
  border-bottom: 2px rgb(90, 89, 89) solid;
  background: none;
  outline: none;
}

.container form input:focus,
.container form input:hover {
  border-color: black;
}

.container form button {
  width: 40%;
  color: rgb(53, 52, 52);
  background-color: #ffd1a5;
  padding: 20px 5px;
  border: none;
  cursor: pointer;
  transition: 0.15s ease;
  pointer-events: none;
}

.container form button.activated{
  background-color: #ffa450;
  pointer-events: all;
}
.container form button.activated:hover {
  background-color: #ffb167;
}

.container form label {
  padding: 10px 0;
}


a {
  color: #b68252;
  background: none;
  border: none;
  cursor: pointer;
  font-family: "pixel";
  font-size: 12px;
  padding: 0;
}


#message-container{
  margin-top: 20px;
  width: 100%;
  position: relative;
}

@media screen and (max-width: 1300px) {


  .container form {
    width: 40%;
  }


}

@media screen and (max-width: 800px) {
  .container {
    height: 600px;
  }

  .container form button {
    width: 100%;
    padding: 7px 0;
  }

  .container form h1 {
    font-size: 20px;
  }

  .container form input {
    font-size: 10px;
    border-bottom-width: 2px;
  }
}

@media screen and (max-width: 500px) {
  .container {
    flex-direction: column;
    height: 700px;
    margin-top: 90px;
  }

  .container .left-part {
    width: 100%;
    height: 22%;
  }

  .container .left-part .circle {
    width: 50px;
    height: 50px;
  }

  .container .left-part .bar {
    position: absolute;
    width: 20px;
    height: 60px;
  }

  .container form {
    height: 60%;
    width: 70%;
  }

}
</style>