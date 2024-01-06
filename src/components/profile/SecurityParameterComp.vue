<template>
    <div class="parameter-comp container">
        <section class="title">
            <h3>Sécurité</h3>
            <p>Gérez les informations sensibles de votre compte.</p>
        </section>

        <form  @submit.prevent="change_user_password" id="password-form">
            <h4>Changer votre mot de passe :</h4>
            <section>
                <label>Mot de passe actuel :</label>
                <input v-model="actual_password" type="password">
            </section>
            <section>
                <label>Nouveau mot de passe  :</label>
                <input v-model="new_password" type="password">
            </section>
            <section>
                <label>Confirmer Nouveau mot de passe  :</label>
                <input v-model="new_password_conf"  type="password">
            </section>
            <button :class="{ activated : verifPassword()}" type="submit">ENREGISTRER</button>
            <div id="res-container">
                <messageContainer ref="res"></messageContainer>
            </div>
        </form>
    </div>
</template>

<script >
import messageContainer from "@/components/log_sign/messageContainer.vue"
export default {
    name: "SecurityParameterComp",
    components : {
        messageContainer
    },
    methods : {
        response(data){
            if(data.success !== undefined) {
                this.actual_password = this.new_password_conf = this.new_password = ""
            }
            this.$refs.res.message(data)
        },
        verifPassword(){
            return (this.actual_password !== "" && this.new_password !== "" 
            && this.new_password_conf === this.new_password) 
        },
        change_user_password(){
            this.$emit("change_user_password", {old_password : this.actual_password,
                                             new_password : this.new_password })
        }
    },

    data(){
        return {
            actual_password : "",
            new_password_conf : "",
            new_password : ""
        }
    }
}
</script>

<style scoped>
* {
    font-family: "pixel2";
    box-sizing: border-box;
}


@media screen and (min-width: 1920px) {
    
}

</style>