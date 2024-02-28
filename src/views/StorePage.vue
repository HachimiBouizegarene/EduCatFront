<template>
    <NavBar></NavBar>
    <PopupComp @no="popupNo" @yes="popupYes" ref="popup"></PopupComp>

    <main>
        <h1>BOUTIQUE</h1>

        <div class="container">

            <div class="left">
                <!-- CATEGORIES -->
                <h4>CATEGORIES</h4>
                <div class="check-element">
                    <input v-model="all" checked type="checkbox">
                    <h6 >TOUT</h6>
                </div>
                
                <div v-for="(category, key) in categories"  :key="key" class="check-element">
                    <input v-model="categories[key]" type="checkbox"/>
                    <h6>{{key}}</h6>
                </div>



                <!-- FILTRES -->
                <h4>FILTRES</h4>
                <div class="check-element">
                    <input  v-model="possessedFilter" type="checkbox" >
                    <h6>POSSEDES</h6>
                </div>

                <div class="check-element">
                    <input v-model="notPossessedFilter" type="checkbox">
                    <h6>NON POSSEDES</h6>
                </div>
            </div>

            <div class="products">
                <template v-for="(product, key) in products" :key="key">
                    <ProductComp @wantToBuy="wantToBuy"  v-if="(all || categories[product.data.category] == true) && filter(product)" :possesses="product.possesses" :data="product.data"></ProductComp>
                </template>
            </div>
        </div>
    </main>

   
</template>

<script>
import NavBar from '@/components/all/NavBar.vue';
import ProductComp from '@/components/store/ProductComp.vue'
import PopupComp from '@/components/all/PopupComp.vue';
export default {
    name : "StorePage",
    components: {
        NavBar,
        ProductComp,
        PopupComp
    },

    data(){
        return {
            categories : {},
            products : [],
            all : true,
            possessedFilter : false,
            notPossessedFilter : true, 
            productWantedId : null
        }
    },

    async mounted() {
        // this.$refs.popup.show("hello", "man")
        // TODO : Gerer les cas d'erreur
        fetch("http://localhost:9090/getProducts", {
            method : "POST", 
            body : JSON.stringify({jws : this.$cookies.get("jws")})
        }).then(response =>{
            response.json().then(json =>{
                json.forEach(element => {
                    //PRODUCT
                    const imageArray = element.data.content
                    const imageBlob = new Blob([new Uint8Array(imageArray)], {type : "image/png"})
                    const imageUrl = URL.createObjectURL(imageBlob)
                    element.data.imageUrl = imageUrl
                    this.products.push(element);

                    //CATEGORY
                    const category = element.data.category
                    this.categories = {}
                    if(!Object.keys(this.categories).includes(category)){
                        this.categories[category] = false
                    } 

                });
            })
        })
    },

    methods : {
        filter(product){
            if(this.possessedFilter && product.possesses == true) return true
            if(this.notPossessedFilter && product.possesses == false) return true
        },
        popupNo(commandId){
            //DO NOTHING FOR NOW
            commandId
        },
        popupYes(commandId){
            if(commandId == 1){
                fetch("http://localhost:9090/buyProduct", {
                method : "POST", 
                body : JSON.stringify({
                    jws : this.$cookies.get("jws"),
                    idProduct : parseInt(this.productWantedId)
                })
                }).then(res=>{
                    res.json().then(json=>{
                        if(json.error == undefined){
                            const productBought = this.products.find(element=> element.data.id == this.productWantedId)
                            setTimeout(()=>{
                                productBought.possesses= true
                            }, 2000)
                            this.$refs.popup.showMessage("FELICITATION !", "Le produit '" + productBought.data.name + "' a été debloqué !")
                            this.$store.dispatch("updateEcats", {jws : this.$cookies.get("jws")})
                        }
                    })
                })
            }
        },
        wantToBuy(id){
            this.productWantedId = id
            const prodcutWanted = this.products.find(element=> element.data.id == this.productWantedId)
            this.$refs.popup.showChoice("CONFIRMATION", "Êtes vous sur de vouloir debloquer le produit '" + prodcutWanted.data.name + 
            "' pour " + prodcutWanted.data.price + " EC ?", 1)
            
        }
    }
}
</script>



<style scoped>
    main {
     
    }
    h1{
        font-family: "pixel";
        padding: 1.5vw 1vw;
        padding-top: 4.5vw;
        border-bottom: 1vw solid rgb(180, 121, 10);
        text-align: center;
        font-size: 2.5vw;
        background: rgb(245, 172, 38);
        color: white;
    }

    .container{
        display: flex;
        width: 100%;
        flex-direction: row;
        background-color: rgba(255, 234, 188, 0.747);
    }

    .left{
        width: 20%;
        height: 100%;
    }

    .left h4{
        border-bottom: 0.2vw solid rgb(211, 161, 69);
        font-size: 1.3vw;
        background-color: rgb(253, 199, 98);
        color: white;
        letter-spacing: 0.05vw;
        font-family: "pixel";
        padding: 1vw;
        box-sizing: border-box;
        text-align: LEFT;
    }

    .check-element{
        display: flex;
        width: 100%;
        padding: 1vw; 
        align-items: center;
        gap: 1vw;
    }

    .check-element h6{
        font-size: 1vw;
        color: rgb(32, 32, 32);
        height: max-content;
        text-transform: uppercase;
        font-family: "pixel";
    }

    .check-element input{
        width: 1.2vw;
        height: 1.2vw;
    }

    .products{
        border-bottom: 0.2vw solid rgb(211, 161, 69);
        width:  80%;
        padding: 3vw;
        display: flex; 
        flex-direction: row;
        gap: 3vw 5% ;
        flex-wrap: wrap;
        background-color: rgb(250, 246, 237);
    }

    





</style>