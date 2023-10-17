<template>
  <NavBar></NavBar>
  <form @submit.prevent="onSubmit(e)">
      <h1>SE CONNECTER</h1>

      <label for="user_name">Nom d'utilisateur : </label>
      <input id="user_name" v-model="user_name">

      <label for="password">Mot de passe : </label>
      <input id="password" v-model="password">

      <button>Se connecter</button>
  </form>
</template>

<script>
import NavBar from "@/components/all/NavBar.vue"

export default {
    name : "LoginPage",
    components : {
      NavBar,
    },
    data(){
      return{
        user_name : '',
        password : ''
      }
    },

    methods : {
      async onSubmit(){
        const response = await fetch("http://localhost:9090/login", {
          method : "POST",
          headers : {
            "Content-Type": "application/json",
          },
          body :  JSON.stringify({
                      "user_name" : "GoatName",
                      "password" : "GoatGoat"
                  })
        })
        const data = await response.json();
        console.log(data);
      }
    }
}

</script>
<style>
  form {
    color: rgb(233, 233, 233);
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: left;
    margin: auto;
    margin-top: 100px;
    padding: 30px;
    background-color: hsl(0, 0%, 16%);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  }
  input{
    padding: 10px;
    font-size: 20px;
    border: none;
    background-color: hsl(0, 0%, 89%);
    margin-bottom: 30px;
  }

  label{
    padding: 10px 0;
    font-size: 20px;
  }

  form h1{
    padding: 20px 0;
    font-size: 40px;
    text-align: center;

  }
  form button{
    margin-top: 20px;
    padding: 15px;
    background-color: rgb(196, 196, 196);
    border: none;
    color: rgb(63, 63, 63);
    cursor: pointer;
  }
  form button:hover{
    background-color: rgb(255, 255, 255);
  }
</style>