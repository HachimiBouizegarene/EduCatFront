<template>
    <h4 ref="title">MANCHE {{nb}}</h4>
</template>

<script>

export default {
    name : "LevelAnnounceComp",
    data(){
       return{
            nb : 0
       }
    },

    mounted(){
        this.manche()

    },

    methods : {
        announce(nb){
            this.nb = nb;
            this.slide()
        },

        manche(){
            this.slide()
            
            setTimeout(() => {
                this.nb += 1;
            }, 2000); 
        },

        slide(){
            this.$refs.title.classList.add("slide")
            setTimeout(() => {
                 this.$refs.title.classList.remove("slide");
            }, 2000); 
        }

    }
}
</script>

<style scoped>
    h4{
        font-family: 'pixel';
        position: fixed;
        top: 50%;
        background-image: linear-gradient(to right, rgb(27, 27, 27), rgb(39, 39, 39));;
        color: white;
        width: 100%;
        z-index: 99;
        text-align: center;
        padding: 4vw;
        box-sizing: border-box;
        font-size: 4vw;
        left: 50%;
        width: 70%;
        transform: translateY(-50%) translateX(100%) skew(-8deg);
        
    }
    h4::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -4vw;
        right: 0;
        width: 100%;
        height: 3vw;
        background-image: linear-gradient(to right, rgb(27, 27, 27), rgb(39, 39, 39));;
    }

    h4.slide{
        animation:  slide 2s linear;
    }


    @keyframes slide{
        from{
            transform: translateY(-50%) translateX(-200%) skew(-8deg);
        }
        7%{
            transform: translateY(-50%) translateX(-55%) skew(-8deg);
        }

        93%{
            transform: translateY(-50%) translateX(-45%) skew(-8deg);
        }

        to{
            transform: translateY(-50%) translateX(100%) skew(-8deg);
        }
    }
</style>