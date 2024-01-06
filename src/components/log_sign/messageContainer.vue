<template>
    <span :class="{visible : visible, success : success, error : error}" id="message" ref="message">{{ messageContent }}</span>
</template>

<script>
export default {
    name: "messageContainer",
    data() {
        return {
            messageContent: "dad",
            visible : false,
            success : false,
            error : false,
        }
    },
    mounted(){ 

    },

    methods: {
        message(messageJson) {
            if (messageJson['error']) {
                this.error = true
                this.success = false
                this.messageContent = messageJson['error']
            }
            if (messageJson['success']) {
                this.error = false
                this.success = true
                this.messageContent = messageJson['success']
            }
            this.visible = true
            setTimeout(()=>{
                this.visible =false
            }, 3000)
        }
    },
}
</script>


<style scoped>
#message {
    transition: 0.15s ease;
    color: rgb(255, 255, 255);
    font-size: 1vw;
    text-align: center;
    animation: none;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1vw;
    pointer-events: none;
    opacity: 0;
    transition: 0.5s ease;
    box-sizing: border-box;
}
#message.error{
    background-color: rgb(255, 0, 0);
}

#message.success{
    background-color: rgb(26, 226, 0);
}
#message.visible{
    opacity: 1;
}


</style>