<template>
    <span :class="{hidden : hidden}" id="background-popup"></span>
    <div :class="{hidden : hidden}" id="popup">
        <h5>{{title}}</h5>
        <p>{{description}}</p>
        <button :class="{undisplayed : type !== 'message'}" id="close" @click="hidden = true">FERMER</button>
        <div class="choice-btns">
            <button @click="emitNo" :class="{undisplayed : type !== 'choice'}"  id="no">NON</button>
            <button @click="emitYes" :class="{undisplayed : type !== 'choice'}"  id="yes">OUI</button>
        </div>
       
    </div>
</template>

<script>
export default {
    name : "PopupComp",
    emits : ['no', 'yes'],
    data(){
        return{
            title : "",
            description : "",
            hidden : true,
            type : "choice",
            commandId : null
        }
    },
    methods : {
        showMessage(title, description){
            this.title = title
            this.description = description
            this.hidden = false
            this.type = "message"
        },
        showChoice(title, description, commandId){
            this.commandId = commandId
            this.title = title
            this.description = description
            this.hidden = false
            this.type = "choice"
        },
        emitNo(){
            this.$emit("no", this.commandId)
            this.hidden = true
        },
        emitYes(){
            this.$emit("yes", this.commandId)
            this.hidden = true
        }
    },
    mounted(){
       
    }
}
</script>

<style scoped>

.hidden{
    
    opacity: 0 !important;
    pointer-events: none;
}

.undisplayed{
    display: none;
}

#popup{
    transition: 0.2s;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    background-color: white;
    padding: 2vw 5vw;
    max-width: 50vw;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

#background-popup{
    transition: 0.2s;
    z-index: 998;
    content: "ff";
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(51, 51, 51, 0.315);
}

h5{
    font-size: 3vw;
    text-align: center;
    font-family: "pixel";
    text-transform: uppercase;
}

p{
    text-align: center;
    padding: 2vw;
    padding-top: 0.5vw;
    color: rgb(83, 83, 83);
    
}
button{
    font-family: "pixel";
    text-transform: uppercase;
    padding:0.3vw;
    font-size: 1vw;
    transition: 0.2s ease;
}

.choice-btns{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
}

button#close, button#yes{
    background-color: rgb(53, 191, 255);
}
button#close:hover, button#yes:hover{
    background-color: rgb(1, 158, 231);
}
button#close{
    width: 80%;
}

button#yes, button#no{
    width: 40%;
}

button#no{
    background-color: rgb(250, 49, 49);
}
button#no:hover{
    background-color: rgb(219, 15, 15);
}








</style>