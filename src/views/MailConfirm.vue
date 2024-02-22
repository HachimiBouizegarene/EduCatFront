<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="left-part">
      <LogoDeco logo_url="login_page/logo_login.png"></LogoDeco>
      <router-link to="/login">SE CONNECTER</router-link>
    </div>

    <form @submit.prevent="onSubmit(e)">
      <h1 id="login-title">Mot de passe oublié</h1>
      <input id="user_mail" placeholder="Mail" v-model="user_mail" required />
      <button id="btn_confirmer">
        {{ sending ? "Envoi en cours..." : "Envoyer le mail" }}
      </button>
      <div id="message-container">
        <messageContainer ref="messageContainer"></messageContainer>
      </div>
    </form>
  </div>
  <FooterComp></FooterComp>
</template>

<script>
import NavBar from "@/components/all/NavBar.vue";
import LogoDeco from "@/components/log_sign/logoDeco.vue";
import messageContainer from "@/components/log_sign/messageContainer.vue";
import FooterComp from "@/components/all/FooterComp.vue";
export default {
  components: {
    NavBar,
    LogoDeco,
    FooterComp,
    messageContainer,
  },
  data() {
    return {
      user_mail: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await fetch("http://localhost:9090/mail-confirm", {
          method: "POST",
          body: JSON.stringify({
            email: this.user_mail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            this.$refs.messageContainer.message({
              success: data.message,
            });
          } else {
            const text = await response.text();
            this.$refs.messageContainer.message({
              success: text,
            });
          }
        } else {
          const data = await response.json();
          throw new Error(data.error);
        }
      } catch (e) {
        this.$refs.messageContainer.message({
          error: e.message,
        });
      }
    },
  },
};
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
  font-size: 35px;
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
  width: 65%;
  color: rgb(53, 52, 52);
  background-color: #ffd1a5;
  padding: 17px 10px;
  border: none;
  cursor: pointer;
  transition: 0.15s ease;
  margin-top: 5%;
  display: flex;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
}

.container form button:hover {
  background-color: #ffb167;
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
#message-container {
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
}
</style>
