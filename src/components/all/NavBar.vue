<template>
    <header>
        <nav ref="nav" :class="{scrolled : scrolled}">
            <router-link id="NavBarLogo" to="/"><img src="@/assets/images/all/Educat_Logo.webp"
                    alt="logo Educat"></router-link>
            <div v-if="!user_connected">
                <router-link class="btn" id="sign-btn" to="/signin">S'INSCRIRE</router-link>
                <router-link class="btn" id="log-btn" to="/login">SE CONNECTER</router-link>
            </div>
            <div v-if="user_connected">
                <router-link class="btn" id="game-btn" to="/jeux">JEUX</router-link>
                <router-link id="a-profile-img" to="/profil">
                    <img id="profile-img" :src="image_url" alt="">
                </router-link>
            </div>

        </nav>

    </header>
</template>

<script>
export default {
    name: "NavBar",
    async created() {
        if (this.user_connected && !this.$store.state.user.user_pulled) {
            await this.$store.dispatch("fetchUser", { jws: this.$cookies.get('jws') })
        }
    },
    data(){
        return {
            scrolled : false
        }
    },
    computed: {
        image_url() {
            return this.$store.state.user.profile_image_url
        },
        user_connected() {
            return this.$cookies.get('jws')
        }
    },

    mounted() {
        window.addEventListener('scroll', this.handleBackground);
        this.scrolled = window.scrollY > 10 ;  
    },

    methods : {
        handleBackground(){
            this.scrolled = window.scrollY > 10 ;  
        }
    }
}
</script>

<style scoped>
header {
    max-width: 1920px;
    position: fixed;
    z-index: 99;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
}

header nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
    box-sizing: border-box;
    padding: 1.3vw;
    transition: 0.3s ease;
}
header nav.scrolled{
    background-color: rgba(255, 255, 255, 0.911);
}
header nav div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    box-sizing: border-box;
    gap: 2.4vw;
}

#NavBarLogo {
    all: unset;
    cursor: pointer;
}

#NavBarLogo img {
    width: 10vw;
    object-fit: cover;
    image-rendering: pixelated;
}

#profile-img {
    width: 3vw;
    height: 3vw;
    object-fit: cover;
    border-radius: 100%;
    transition: 0.3s ease;
    border: 0.14vw solid white;
    box-shadow: 0px 0px 0px 0.14vw #292929;
}

#a-profile-img{
    display: flex;
}

#profile-img:hover {
    filter: brightness(0.8);
}


a.btn {
    font-family: 'pixel';
    text-decoration: none;
    color: rgb(49, 49, 49);
    border: none;
    background: none;
    font-size: 1.1vw;
    transition: 0.2s ease;
    padding: 0.4vw 1.5vw;
    border: 0.2vw solid rgba(255, 187, 0, 0);
}

a.btn:hover {
    border-color: rgb(255, 187, 0);
    color: rgb(49, 49, 49);
}

a#log-btn,
a#game-btn {
    background-color: rgb(255, 187, 0);
}

a#log-btn:hover,
a#game-btn:hover {
    background-color: white;
    border-color: rgb(255, 255, 255);
}

@media screen and (min-width: 1920px ) {

    header nav {
        padding: 20px 60px;
    }
    header nav div {
        gap: 60px;
    }

    #NavBarLogo img {
        width: 170px;
        

    }

    #profile-img {
        background-color: rgb(255, 255, 255);
        width: 50px;
        height: 50px;
        border-radius: 100%;
        transition: 0.3s ease;
        border: 2px solid white;
        box-shadow: 0px 0px 0px 2px #292929;
    }

    a.btn {
        font-size: 20px;
        padding: 5px 30px;

    
    }
 
}

@media screen and (max-width: 1100px ) {
    #NavBarLogo img {
        width: 17vw;
    }
    
    #profile-img {
        width: 6vw;
        height: 6vw;
    }

    a.btn {
        font-size: 2vw;
        padding: 1.3vw 1.7vw;
    }

    header nav[data-v-f0e7e164] {
        padding: 3vw;

    }

    header nav div{
        gap: 3vw;
    }
}
</style>