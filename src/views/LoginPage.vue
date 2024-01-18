<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="left-part">
      <span></span>
      <LogoDeco logo_url="login_page/logo_login.png"></LogoDeco>
      <router-link to="/signin">S'INSCRIRE</router-link>
    </div>

    <form @submit.prevent="onSubmit(e)">
      <h1 id="login-title">Connexion</h1>
      <input id="user_mail" placeholder="Mail" v-model="user_mail">

      <input id="user_password" placeholder="Mot de passe" v-model="user_password">
      <button :class="{activated : verifyInputs()}" type="submit">Se connecter</button>
      <!-- <span id="message" ref="message">{{ message }}</span> -->
      <div id="message-container">
        <messageContainer ref="messageContainer"></MessageContainer>
      </div>
    
    </form>
    <!-- <FooterComp></FooterComp> -->
  </div>
  <FooterComp></FooterComp>
</template>

<script>
import NavBar from "@/components/all/NavBar.vue"
import LogoDeco from "@/components/log_sign/logoDeco.vue"
import messageContainer from "@/components/log_sign/messageContainer.vue"
import FooterComp from "@/components/all/FooterComp.vue";
// import FooterComp from "@/components/all/FooterComp.vue"

export default {
  name: "LoginPage",
  components: {
    NavBar,
    LogoDeco,
    messageContainer,
    FooterComp
    // FooterComp
  },
  data() {
    return {
      user_mail: '',
      user_password: '',
    }
  },
  created() {
    if (this.$cookies.get("jws")) this.$router.push("/Profil")
  },
  mounted() {
    if (this.$route.query.subscribe != undefined) {
      this.$refs.messageContainer.message({ success: "Inscription reussie" })
    }
  },

  methods: {
    verifyInputs(){
      
      if (this.user_mail == '' || this.user_password == "") return false
      if(/^\w+([._-]?\w+)*@\w+([._-]?\w+)*(\.\w{2,3})+$/.test(this.user_mail) == false) return false;
      return true
    },
    async onSubmit() {
      try {
        const response = await fetch("http://localhost:9090/login", {
          method: "POST",
          body: JSON.stringify({
            "user_email": this.user_mail,
            "user_password": this.user_password
          })
        })
        const data = await response.json();
        if (Object.keys(data).includes('error')) {
          this.error = true
          this.$refs.messageContainer.message({ error: data['error'] })
        } else {
          this.$cookies.set('jws', data['jws'])
          this.$router.push("/jeux")
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
  width: 96%;
  margin: auto;
  height: 700px;
  margin-top: 130px;
  margin-bottom: 70px;
  left: 0;
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
  width: 20%;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
}

.container form h1 {
  padding: 30px 0;
  color: rgb(53, 52, 52);
}

.container form input {
  padding: 10px 0;
  margin-bottom: 30px;
  border: none;
  border-bottom: 3px rgb(90, 89, 89) solid;
  background: none;
  outline: none;
}

.container form input:focus,
.container form input:hover {
  border-color: black;
}

.container form button {
  width: 46%;
  color: rgb(53, 52, 52);
  background-color: #ffd1a5;
  padding: 17px 10px;
  border: none;
  pointer-events: none;
  cursor: pointer;
  transition: 0.15s ease;
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

  .container {
    height: 600px;
  }

  .container form {
    width: 30%;
  }

}

@media screen and (max-width: 800px) {
  .container {
    height: 400px;
  }

  .container form {
    width: 40%;
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
    height: 600px;
    margin-top: 90px;
  }

  .container .left-part {
    width: 100%;
    height: 40%;
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

}</style>


<style>


</style>