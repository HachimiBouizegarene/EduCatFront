<template>
    <div class="popup">
        <h1 id="popup-title">Vous rencontrez un obstacle!
            <img id="alert-img-1" src="@/assets/images/games/Maze/Alert.svg">
            <img id="alert-img-2" src="@/assets/images/games/Maze/Alert.svg">
        </h1>

        <p id="infos">Conjugez le verbe aller au present</p>
        <div id="sentence">
            <p>Je</p>
            <p id="response">-------
                <img src="@/assets/images/games/Maze/Cat-question.svg">
            </p>
            <p>Un connard.</p>
        </div>

        <div id="choices">
            <p>Vais</p>
            <p>Allais</p>
            <p>Allon</p>
            <p>Vait</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopUpComponent",
    props: ['sentence', 'choices', 'answer'],
    data() {
        return {

        }
    },
    methods: {
        respons(nb) {
            nb
            if (this.answer == this.choices[nb]) {
                document.querySelectorAll('.choice')[nb].classList.add('correct')
            }
            else {
                document.querySelectorAll('.choice')[nb].classList.add('wrong')
            }
            document.querySelector('.popup').classList.remove('opened')
        },
        open() {
            document.querySelector('.popup').classList.add('opened')
            console.log('open');
        }
    }
}

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

.popup {
    z-index: 999;
    transform: scale(1.2);
    transition: 4s cubic-bezier(1, 0, 1, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    height: 50%;
    background-color: rgb(255, 230, 230);
    position: absolute;
    top: 20%;
    left: 15%;
    border-radius: 10px;
    overflow: hidden;
    color: rgb(75, 71, 71);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.popup.opened {
    transition: 0.3s ease;
    opacity: 100%;
    transform: scale(1);
}

#popup-title {
    width: 100%;
    font-family: 'Poppins';
    text-align: center;

    background-color: rgb(255, 116, 116);
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 10px solid rgb(202, 111, 111);
    position: relative;
    animation: shine 1.5s infinite linear;
}

@keyframes shine {
    from {
        background-color: rgb(255, 145, 145);
    }

    50% {
        background-color: rgb(255, 42, 42);
    }

    to {
        background-color: rgb(255, 145, 145);
    }
}

#alert-img-1,
#alert-img-2 {
    width: 50px;
    position: absolute;
}

#alert-img-1 {
    left: 10px
}

#alert-img-2 {
    right: 10px
}

#infos {
    width: 70%;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    background-color: #505050;
    position: relative;
    box-shadow: rgba(243, 218, 218, 0.24) 0px 3px 8px;
    color: white;
}

#infos::before,
#infos::after {
    display: block;
    position: absolute;
    content: "";
    width: 30px;
    height: 10px;
    background-color: rgb(255, 230, 230);
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
}

#infos::before {
    left: 10px;
}

#infos::after {
    right: 10px;
}


#sentence {
    display: flex;
    align-items: center;
}

#sentence p {
    font-size: 30px;
    margin-top: 10px;
}

#sentence #response {

    margin: 0 10px;
    margin-top: 10px;
    padding: 0 5px;
    position: relative;
    border: 5px #4e4e4e solid;
    border-radius: 10px;
}

#sentence #response img {
    position: absolute;
    width: 50px;
    top: 0%;
    transform: translateY(-100%);
    right: 0%;
}

#choices {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 60%;
    padding: 10px 0;

}

#choices p {
    display: block;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    border-radius: 4px;
    width: 30%;
    margin: 5px 6%;
    padding: 2%;
    text-align: center;
    position: relative;
    cursor: pointer;
    transition: 0.3s;
}

#choices p:hover {
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 0px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

}

#choices p::before,
#choices p::after {
    display: block;
    position: absolute;
    content: "";
    width: 5px;
    height: 30px;
    background-color: rgb(167, 167, 167);
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
}

#choices p::before {
    left: 10px;
}

#choices p::after {
    right: 10px;
    color: #d1b8a8
}

.choice.correct {
    background-color: rgb(102, 230, 102);
}

.choice.correct:hover {
    background-color: rgb(78, 236, 78);
}

.choice.wrong {
    background-color: rgb(230, 102, 102);
}

.choice.wrong:hover {
    background-color: rgb(230, 102, 102);
}

.choice:hover {
    background-color: rgb(67, 147, 221);
}</style>