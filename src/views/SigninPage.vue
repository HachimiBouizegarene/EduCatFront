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
      <input id="user_name" placeholder="Date de naissance" v-model="user_birthday">
      <input id="user_mail" placeholder="Mail" v-model="user_mail">

      <input id="password" placeholder="Mot de passe" v-model="user_password">
      <input id="password_confirm" placeholder="Confirmer mot de passe" v-model="user_password_confirm">
      <button type="submit">S'inscrire</button>
      <MessageContainer ref="messageContainer"></MessageContainer>
    </form>
    <!-- <FooterComp></FooterComp> -->
  </div>
</template>


<script>
import NavBar from "@/components/all/NavBar.vue"
import LogoDeco from "@/components/log_sign/logoDeco.vue"
import MessageContainer from "@/components/log_sign/messageContainer.vue"
// import FooterComp from "@/components/all/FooterComp.vue"

export default {
  name: "SigninPage",

  data() {
    return {
      user_forename: '',
      user_name: '',
      user_birthday: '',
      user_mail: '',
      user_password: '',
      user_password_confirm: '',
      error: ''
    }
  },

  components: {
    NavBar,
    LogoDeco,
    MessageContainer,
    // FooterComp
  },
  methods: {
    async onSubmit() {
      // verifier que tous les champs sont remplis
      if (this.user_forename == '' || this.user_name == '' || this.user_birthday == '' ||
        this.user_mail == '' || this.user_password == '' || this.user_password_confirm == '') {
        this.$refs.messageContainer.message({ error: "Veuillez entrer les informations demandées" })
        return
      }
      //verifier que le mail est un mail
      if(/^\w+([._-]?\w+)*@\w+([._-]?\w+)*(\.\w{2,3})+$/.test(this.user_mail) == false) {
        this.$refs.messageContainer.message({ error: "Le format du mail est incorrect" })
        return
      }

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
            "user_birthday": this.user_birthday,
            "user_email": this.user_mail,
            "user_password": this.user_password,
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 90%;
  margin: auto;
  height: 700px;
  margin-top: 100px;
  position: absolute;
  left: 0;
  transform: translateX(5%);
  border-radius: 10px;
  overflow: hidden;
}

.container .left-part {
  overflow: hidden;
  width: 50%;
  height: 100%;
  background-color: #d4d4e7;
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
  background-color: rgb(197, 197, 241);
  padding: 20px 5px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.15s ease;
}

.container form button:hover {
  background-color: rgb(165, 165, 240);
}

.container form label {
  padding: 10px 0;
}

#error {
  opacity: 0;
  transition: 0.15s ease;
  color: rgb(85, 84, 84);
  padding: 10px;
  background-color: rgb(255, 75, 75);
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  border-radius: 100px;
}

a {
  color: #4f4e81;
  background: none;
  border: none;
  cursor: pointer;
  font-family: "pixel";
  font-size: 12px;
  padding: 0;
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