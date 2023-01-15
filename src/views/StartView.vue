<template>
<div id="body">
  <header id="header">
    

      <div class="dropdown">
  <button class="dropbtn"><img id="mainFlag" v-bind:src=uiLabels.languageFlag> 
    <br>{{ uiLabels.language }}</button>
  <div class="dropdown-content">
    <a href="#" v-on:click="switchLanguageEn">
      <img id="flag" src="../../public/img/english.png"> English </a>
    <a href="#" v-on:click="switchLanguageSv">
      <img id="flag" src="../../public/img/svenska.png"> Svenska</a>
    <a href="#" v-on:click="switchLanguageFi">
      <img id="flag" src="../../public/img/suomi.png"> Suomi</a>
  </div>
</div>
<div class="J">
      <h1 >   
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

    switchLanguageSv: function() {
      this.lang = "sv"
      socket.emit("switchLanguage", this.lang)
    },

    switchLanguageEn: function() {
      this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },

    switchLanguageFi: function() {
      this.lang = "fi"
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
      else if (this.lang=="sv") {
        swal({
          title: "HUR DU SPELAR",
          text: "Innan du spelar ditt första quiz är det bra att veta följande: endast en av spelarna kommer (slumpmässigt) att svara på varje fråga. Innan de kan svara måste dock de andra spelarna rösta på den svarande spelarens belöningar och bestraffningar. Om spelaren svarar rätt på frågan kommer hen att få en belöning och vice versa. Om du har tur kan du bli 'Jokern' och skicka vidare din belöning eller straff till en annan spelare eller välja att behålla den själv. När ni känner er klara med frågan är det Värden (Host) som går vidare till nästa fråga.",
          button: "Börja FlipFloppa!"
        })
      }
      else if (this.lang=="fi") {
        swal({
          title: "KUINKA PELAAT",
          text: "Ennen kuin pelaat ensimmäistä quizziäsi, on hyvä tietää seuraavat asiat: vain yksi pelaajista vastaa (sattumaisesti) jokaiseen kysymykseen. Ennen kuin he voivat vastata, muiden peelajien on äänestättävä vastaavan pelaajan palkintoja ja rangaistuksija. Jos peelaja vastaa oikein kysymykseen, niin hän saa palkinnon, ja päinvastoin. Jos olet onnekas, sinusta voit tulla 'Jokeri', ja voit lähettää palkintosi tai rangaistuksesi toiselle pelaajalle. Kun olette valmiita kysymyksen kanssa, niin Juontaja (Host) etenee seuraavaan kysymykseen.",
          button: "Aloita FlipFloppaus!"
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
  height: 3vh;
  width: 3vh;
  cursor: pointer;
  margin-top: 1em;
}

#mainFlag {
  height: 6vh;
  width: 6vh;
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

  #ft:hover {
  animation: bounce 2s ease infinite;
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
  grid-column: 2 / span 3;
  }

  #logo{
    height: 1.2em;
    padding-top: 0.1em;

  }




  .dropbtn {
  background-color: #A6E9A3;
  color: white;
  text-shadow: .08em .08em 0 #4779d6;
  padding: 16px;
  font-size: 16px;
  font-family: 'Righteous', serif;
  border:none;
  margin-top: 1em;
}

.dropdown {
  position: relative;
  display: inline-block;
  grid-column: 1;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}


#header {
  display: grid;
  grid-template-columns: 1fr 5fr;
} 



@media screen and (max-width:70em) {
  #body {
    overflow: auto;
  }

  .startchoice {
    
    padding: 0em;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wrapper {
    margin-top: -6em;
  }

 #smallerbuttons {
  font-size: 1.6em;
  grid-column: 2 / span 4;
  height: 12vh;
 }

 
  .J{
    margin-top: 3em;
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
    grid-row: 5;
    height: 2em;
  }
 

}



</style>
