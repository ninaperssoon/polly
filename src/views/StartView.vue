<template>
<div id="body">
  <header>
    <div class="J">
      <h1 > <img id="flag" v-bind:src=uiLabels.languageFlag v-on:click="switchLanguage">   
        Flip or Flop!    
        <img id="logo" src="../../public/img/fliplogo.png">
      </h1>
    </div>
  </header>
  <div class="wrapper">
    <router-link class="startchoice a" v-bind:to="'/join/'+lang">{{uiLabels.joinQuiz}}</router-link>
    <router-link class="startchoice b" v-bind:to="'/create/'+lang">{{uiLabels.createQuiz}}</router-link>
    <router-link class="startchoice c" id="smallerbuttons" v-bind:to="'/host/'+lang">{{uiLabels.hostQuiz}}</router-link>
    <router-link class="startchoice d" id="smallerbuttons" v-bind:to="'/myquizzes/'+lang"> {{uiLabels.myQuizzes}}</router-link>
    <button id="ft" v-on:click="rules"><img id="questionmark" src="../../public/img/frågetecken.png"> </button>
  </div>
</div>
</template>

<script>
import swal from 'sweetalert';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
 
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true
    }
  },
  created: function () {
    socket.emit("pageLoaded", this.lang)
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    },
    rules: function(){
      if (this.lang == "en") {
        swal({
          title: "HOW TO PLAY",
          text: "Before you play your first quiz, it's good to know the following: Only one player will be (randomly) chosen to answer each question. However, before they can answer, the other players must vote for the answering player's rewards and penalties. If the player answers the question correctly, they will receive the most voted reward and vice versa.  If you're lucky, you can become 'the Joker' and pass your reward/punishment unto another player or choose to keep it yourself. When you feel finished with the question, it is the Host that will go to the next question.",
          button: "Start FlipFlop"
        })
      }
      else {
        swal({
          title: "HUR DU SPELAR",
          text: "Innan du spelar ditt första quiz är det bra att veta följande: endast en av spelarna kommer (slumpmässigt) att svara på varje fråga. Innan de kan svara måste dock de andra spelarna rösta på den svarande spelarens belöningar och bestraffningar. Om spelaren svarar rätt på frågan kommer hen att få en belöning och vice versa. Om du har tur kan du bli 'Jokern' och skicka vidare din belöning eller straff till en annan spelare eller välja att behålla den själv. När ni känner er klara med frågan är det Värden (Host) som går vidare till nästa fråga.",
          button: "Börja FlipFloppa!"
        })
      }
    }
  }
}
</script>

<style scoped>


  #body {
    margin: 0;
    background-color: #A6E9A3;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  .wrapper {
    padding: 3em;
    display: grid;
    grid-gap: 1.2em;
    row-gap: 2em;
    grid-template-columns: 15vw 15vw 15vw 15vw 15vw 15vw;
    grid-template-rows: 10vh 10vh 10vh 10vh;  
    justify-content: center;
    align-items: center;
  }
  .startchoice {
    background-color: coral;
    text-decoration: none; 
    padding: 2em;
    background-color: #5C95FF;
    border-radius: 3em;
    font-size: 2em;
    border-style: outset;
    border-color: #5C95FF;
    color: #FFF1AD;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 rgb(77, 94, 179);
  }
  .startchoice:hover {
    box-shadow: 0 0.3em 1em #80B57D;
    transform: translateY(-0.125em);
  }
  .a {
    grid-column-start: 2 ;
    grid-column-end: 4;
    grid-row: 1 / span 2;
  }

  .b {
    grid-column-start: 4;
    grid-column-end: 6;
    grid-row: 1 /span 2;
  }

  .c { 
    grid-column-start: 3 ;
    grid-column-end: 5;
    grid-row: 3;
  }

  .d {
    grid-column-start: 3 ;
    grid-column-end: 5;
    grid-row: 4;
  }

  #smallerbuttons {
    background-color: #FFF1AD;
    border-color: #fff1adbd;
    color: #F87575;
    padding: 0.8em;
  }
  #flag {
  height: 7vh;
  width: 7vh;
  cursor: pointer;
  margin-top: 1em;
}

#navDiv {
  background-color: #A6E9A3;
}

#questionmark{
    height: 6.25em;
   width: 6.25em;
}
  

  #ft{
    background-color: transparent;
    border: none;
    grid-column: 6;
    grid-row: 4;
  }
   
  

@import url(https://fonts.googleapis.com/css?family=Righteous);

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  }

h1 {
 
  color: white;
  font-family: 'Righteous', serif;
  font-size: 8em; 
  text-shadow: .08em .08em 0 #4779d6;
  }

  #logo{
    height: 1.2em;
    padding-top: 0.1em;

  }


@media screen and (max-width:70em) {
  #body {
    overflow: auto;
  }

  .startchoice {
    margin: auto;
    text-decoration: none; 
    padding: 1em;
    border-radius: 1.5em;
    font-size: 2em;
  }

 #smallerbuttons {
  font-size: 1.6em;
 }

 
  .J{
    height: 25vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 2em;
    grid-auto-rows: 10em;

  }
  h1{
    font-size: 12vw;
  }
  #flag{
   height: 4vh;
   width: 4vh;
  }
 
  #ft{
    grid-column: 5;
  }
 

}



</style>
