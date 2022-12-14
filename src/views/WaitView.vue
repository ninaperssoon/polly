<template>
  <div id="body">
    <div>
      <h1>{{uiLabels.Waitingforhosttostart}}</h1>

    </div>
      
      <div class="board" v-for="participant in participants" v-bind:key = "participant">
        <img id="surfboard" src="../../public/img/surfboard.png">
        <div id="text">{{participant}}</div>
      </div>

 
    
  
  </div>

</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'WaitingView',
  components: {
    
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      participants: [],
      name: ""
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    
    socket.emit("pageLoaded", this.lang);
    socket.emit("joinPoll", this.id);
    socket.emit("joinWaiting", this.id);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("participantUpdate", (participants) => {
      this.participants = participants
    })
    socket.on("quizUpdate", () => {
      this.$router.push('/obs/'+this.id+'/'+this.lang+'/'+this.name)
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

  }
}
</script>
<style scoped>
  #body {
    margin: auto;
    background-color: #A6E9A3 ;
    text-align: center;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    position:fixed;
    overflow: auto;  
  }


  #host {
    font-size:1.5em;

    margin: auto;
    margin-top: 2em;
    height: 20em;
    width: 30em;
    background-color: #007991;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
    border-style: outset;
    border-color: #0079918f;

  }

  input {

    font-size: 1em;
    border-radius: 1em;
    border-style: outset;
  }

  #startQuiz {
    font-size:1.5em;
    background-color: rgb(235, 209, 106);
    border-color: rgba(235, 209, 106, 0.689);
    text-decoration: none;
    height: 2.5em;
    width: 8em;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 5em;
    margin-bottom: 5em;
    border-radius: 2em;
    border-style: outset;
    padding-top: 1.5em;
  }

  #startQuiz:hover {
    box-shadow: 0 5px 15px #0079918f;

  }
  h1 {
  display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 4em; 
  text-shadow: .08em .08em 0 #4779d6;
  }
  
 
</style>
