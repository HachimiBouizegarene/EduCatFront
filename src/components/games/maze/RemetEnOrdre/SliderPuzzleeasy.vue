<template>
<body>
    <div>
        <h1>Déplace les images pour obtenir l'image original</h1>
        <button class="favorite styled" @click="start" id="start-button">Démarrer</button>
     
     
        <p>Chronomètre: {{ elapsedTime }}</p>
   
        <h1 v-if="isWinning">Tu as gagné!!</h1>
       
        <div class="row">
            
            <div class="column" v-for="(s, index) of shuffledPuzzleArray" :key="s" @click="swap(index)">
                <img :src="require(`../assets/${puzzleId}/cut-easy/${s}`)">
            </div>
        </div>
    </div>
    </body>
</template>

<script>

import moment from "moment";


const correctPuzzleArray = [
    "image_part_001.jpg",
    "image_part_002.jpg",
    "image_part_003.jpg",
    "image_part_004.jpg",
    "image_part_005.jpg",
    "image_part_006.jpg",
    "image_part_007.jpg",
    "image_part_008.jpg",
    "image_part_009.jpg",
];

export default {
    name: "SliderPuzzleeasy",

    props: {
    
        puzzleId: {
            type: String,
            default: "geographie",
        },
    },
    data() {
        return {
            
            correctPuzzleArray,
           
            shuffledPuzzleArray: [...correctPuzzleArray].sort(
            
                () => Math.random() - 0.5
            ),
           
            indexesToSwap: [],
            timer: undefined,
            startDateTime: new Date(),
            currentDateTime: new Date(),
        };
    },
    computed: {
        isWinning() {
           
            for (let i = 0; i < correctPuzzleArray.length; i++) {
                
                if (correctPuzzleArray[i] !== this.shuffledPuzzleArray[i]) {
                    
                    return false;
                }
            }
            
            return true; 
        },
        elapsedDiff() {
            const currentDateTime = moment(this.currentDateTime);
            const startDateTime = moment(this.startDateTime);
            
            return currentDateTime.diff(startDateTime);

        },
        elapsedTime() {
            
            return moment.utc(this.elapsedDiff).format('HH:mm:ss');
        }
    },
    methods: {
      
        swap(index) {
            
            if (!this.timer) {
                return;
            }
          
            if (this.indexesToSwap.length < 2) {
                this.indexesToSwap.push(index);
            }
            
            if (this.indexesToSwap.length === 2) {
              
                const [index1, index2] = this.indexesToSwap;
                
                [this.shuffledPuzzleArray[index1], this.shuffledPuzzleArray[index2]] = [
                    this.shuffledPuzzleArray[index2],
                    this.shuffledPuzzleArray[index1]
                ];
                
                this.indexesToSwap = [];
            }
        },
        
     
        start() {
       
            this.resetTime();
         
            this.shuffledPuzzleArray = [...correctPuzzleArray].sort(
                () => Math.random() - 0.5
            );
         
            this.indexesToSwap = [];
       
            this.timer = setInterval(() => {
                this.currentDateTime = new Date();
        
                if (this.isWinning) {
                   
                    this.stop();

                }
            }, 1000);
        },

        stop() {
           
            clearInterval(this.timer);
          
        },
   
        resetTime() {
            this.startDateTime = new Date();
            this.currentDateTime = new Date();
        },
  

    },
};

</script>

<style scoped>
        body {
            text-align: center;
            background-color: rgb(29, 86, 122);
        }
      h1 {
    
    font-family: 'Pixelify Sans';
   color: yellow;
   text-align: center;

}

p{
    font-size: 32px;
    color: yellow;
    font-family: 'Pixelify Sans';
    text-align: center;
}
.row {
    display: flex;
    max-width: 48vw;
    flex-wrap: wrap;
    margin: auto;
    line-height:10px;
    
}
.column {
    flex-grow: 1;
    width: 33%;
}
.column img {
   width : 100%;
   height : 100%;
    
}
.styled {
  border: 0;
  line-height: 2.5;
  padding: 0 20px;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  background-color: rgba(220, 0, 0, 1);

}

.styled:active {
    
  box-shadow:
    inset -2px -2px 3px rgba(255, 255, 255, 0.6),
    inset 2px 2px 3px rgba(0, 0, 0, 0.6);
}

</style>