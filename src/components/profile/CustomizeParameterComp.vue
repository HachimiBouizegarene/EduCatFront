<template>
    <div class="parameter-comp container">
        <section class="title">
            <h3>Personnaliser son profil</h3>
            <p>Personnalisez votre profil à votre image.</p>
        </section>

        <form @submit.prevent="send_user_customize" id="div-info">
            <h4>Avatars</h4>
            <div id="avatars-container">
                <template v-for="product in products" :key="product">
                    <img @click="selectedAvatar = product.id" :class="{selected : product.id === selectedAvatar}" class="avatar" :src="product.imageUrl" v-if="product.category = 'avatar'">
                </template>
            </div>
            <button :class="{ activated: verifChanges() }" >Modifier</button>
            <div id="res-container">
                <messageContainer ref="res"></messageContainer>
            </div>
        </form>
        
    </div>
</template>


<script>
import messageContainer from "@/components/log_sign/messageContainer.vue"
export default {
    name : "CustomizeParameterComp",
    components : {
        messageContainer
    },

    data(){
        return{
            products : [],
            selectedAvatar : null,
        }
    },
    async mounted(){

        // TODO : Le faire seulement une seule fois pas a chaque mounted !

        fetch("http://localhost:9090/getUnlockedProducts", {
            method : "POST", 
            body : JSON.stringify({
                jws : this.$cookies.get("jws")
            })
        }).then(res=>{
            res.json().then(json=>{
                // TODO : Gerer les cas d'erreur et le montrer a l'utilisateur
                if(json.error === undefined){
                    json.forEach(e=>{
                        if(e.content !== null && e.content !== undefined ){
                            const blob = new Blob([new Uint8Array(e.content)], {type : "image/png"}) 
                            const imageUrl = URL.createObjectURL(blob)
                            e.imageUrl = imageUrl
                        }
                        this.products.push(e)
                    })
                } 
            })
        })

        this.selectedAvatar = this.$store.state.user.avatarId
    },

    methods : {
        verifChanges(){
            return this.selectedAvatar !== this.$store.state.user.avatarId
        },
        send_user_customize(){
            //Avatar
            if(this.selectedAvatar !== this.$store.state.user.avatarId){
                this.$emit("send_user_data", {avatarId :  this.selectedAvatar}, "customize parameter")
            }
        },

        async response(data) {
            // TODO : Remplacer sans le fetch
            if (data.success !== undefined) {
                await this.$store.dispatch("fetchUser", {jws : this.$cookies.get('jws'), force : true} )
            }
            this.$refs.res.message(data)
        },
    }
}
</script>

<style>



#avatars-container{
    margin-bottom: 1vw;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    background-color: rgb(240, 240, 240);
    padding: 1vw;
    gap: 2.5vw;
}
img.avatar{
    width: 4vw;
    border: 0.2vw solid;
    border-radius: 100%;
    transition: 0.2s ease;
  
}
img.avatar:not(.selected){
    cursor: pointer;
}

img.avatar.selected{
    border-color: rgb(20, 131, 206);
    transition: 0.08s;
    border-width: 0.3vw;
}
img.avatar:not(.selected):hover{
    filter: brightness(0.5);

}
</style>