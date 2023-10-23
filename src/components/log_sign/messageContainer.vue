<template>
    <span id="message" ref="message">{{ messageContent }}</span>
</template>

<script>
export default {
    name: "messageContainer",
    data() {
        return {
            messageContent: ""
        }
    },
    methods: {
        message(messageJson) {
            if (messageJson['error']) {
                this.messageContent = messageJson['error']
                this.$refs.message.classList.remove('animation-success')
                this.$refs.message.classList.remove('animation-error')
                this.$refs.message.offsetWidth
                this.$refs.message.classList.add('animation-error')
            }
            if (messageJson['success']) {
                this.messageContent = messageJson['success']
                this.$refs.message.classList.remove('animation-success')
                this.$refs.message.classList.remove('animation-error')
                this.$refs.message.offsetWidth
                this.$refs.message.classList.add('animation-success')
            }
        }
    },
}
</script>


<style scoped>
#message {
    opacity: 0;
    transition: 0.15s ease;
    color: rgb(85, 84, 84);
    padding: 10px 15px;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
    border-radius: 100px;
    animation: none;
}

#message.animation-error {
    animation: 3s linear 0s error;
    background-color: rgb(255, 75, 75);
}

#message.animation-success {
    animation: 3s linear 0s success;
    background-color: rgb(75 255 145);
}

@keyframes error {
    from {
        transform: translateX(0);
        opacity: 1;
    }

    2.5% {
        transform: translateX(-10px);
    }

    5% {
        transform: translateX(10px);
    }

    7.5% {
        transform: translateX(-10px);
    }

    10% {
        transform: translateX(10px);
    }

    12.5% {
        transform: translateX(0);
    }

    95% {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes success {
    from {
        opacity: 1;
    }

    95% {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@media screen and (max-width: 800px) {
    #message {
        font-size: 12px;
    }
}</style>