<template>

<link href='https://fonts.googleapis.com/css?family=Pixelify Sans' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=VT323' rel='stylesheet'>
    <div class="background">
        <h1>Choisi(e) un puzzle</h1>
        <div v-for="p of puzzles" :key="p.id" class="row ">
                    <div>
                <h2>{{ p.title }}</h2>
                <img :src="require(`../assets/${p.image}`)" >
                            <div class="play">
                
          
                <button class="favorite styled" @click="selectPuzzle(p)">Choisir</button>  </div>
            </div>



        </div>
    </div>    
</template>

<script>


export default {
    name: "Puzzle-component",
    data(){
        return {
            // reactive properties
            // array object containing puzzlie id, image & title
            puzzles: [
                {
                    id: "geographie",
                    image: "geographie.jpg",
                    title: "Carte de l'Europe"

                }, {
                    id: "maths",
                    image: "math.jpg",
                    title: "Tables de multiplications"
                },{
                    id: "chimie",
                    image: "chimie.jpg",
                    title: "Symboles et outils scientifiques"
                } 
            ]
        }
    },
    methods: {
        // on click will set the choice of puzzle by user
        // puzzzle-chage event will be emited
        selectPuzzle(puzzle){
            // puzzle-changed - name of event
            // puzzle.id - payload
            this.$emit('puzzle-changed', puzzle.id)
        }
    }
}

</script>

<style >

      h1 {
    font-size: 62px;
    font-family: 'Pixelify Sans';
   color: yellow;
   text-align: center;

}
      h2 {
    font-size: 32px;
     font-family: 'VT323';

}
.background{
  background-color: rgb(29, 86, 122);  
}
.row {
    color: yellow;
    display: inline-block;
    align-items: center; 
    border-style: double;
    border-width: 20px;
    max-width: 30vw;
    padding:5px;
    margin:50px;
      text-align: center;
     margin-bottom:8em;
}
.row img {
    width: 300px;
    height: 300px;
    
}
.styled {
  margin:20px;
  border: 0;
  line-height: 2.5;
  padding: 0 20px;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  background-color: rgba(220, 0, 0, 1);
  text-align: center;
  font-family: 'Pixelify Sans';
}

.styled:hover {
  background-color: rgba(255, 0, 0, 1);
}

.styled:active {
  box-shadow:
    inset -2px -2px 3px rgba(255, 255, 255, 0.6),
    inset 2px 2px 3px rgba(0, 0, 0, 0.6);
}






</style>