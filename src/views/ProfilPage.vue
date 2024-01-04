<template>
  <input ref="input" type="file" accept="image/png">
  <button @click="clicked">Cliquer</button>

  <img :src="src" >
</template>

<script>
export default {
    name : "ProfilPage"
    ,
    async mounted(){
        let body =await fetch("http://localhost:9090/profile", {
            method : "POST"
        }).then((res)=>{
            return  res.text();
        })

        let bytes = atob(body) 

        const bytesNumbers= new ArrayBuffer(bytes.length )
        const view = new DataView(bytesNumbers)
        for(let i= 0 ; i < bytes.length ; i++){
            view.setInt8(i, bytes.charCodeAt(i)) 
        }

     



        // const byteArray = new Uint8Array(bytesNumbers);
        // console.log(byteArray);
        let blob = new Blob([bytesNumbers], {type: "image/jpeg"});

        let url = URL.createObjectURL(blob);
        console.log(url);
 

 
        // // var img = new Image();
        // this.src = "data:image/jpeg;base64," + body;
        // // document.getElementById("container").appendChild(img)

        // console.log(body);
    },

    data(){
        return {
            src : undefined
        }

    },

    methods : {
        clicked(){

            console.log(this.$refs.input.files);

            const url = URL.createObjectURL(this.$refs.input.files[0])
            this.src = url;
            console.log(url);
        }
    }
}
</script>

<style>

</style>