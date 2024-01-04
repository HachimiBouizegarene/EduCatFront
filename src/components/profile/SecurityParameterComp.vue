<template>
    <div class="parameter-comp container">
        <section class="title">
            <h3>Sécurité</h3>
            <p>Gérez les informations sensibles de votre compte.</p>
        </section>

        <form id="password-form">
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
        </form>
    </div>
</template>

<script >
export default {
    name: "SecurityParameterComp",
    methods : {
        verifPassword(){
            return (this.actual_password !== "" && this.new_password !== "" 
            && this.new_password_conf === this.new_password) 
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

</style>