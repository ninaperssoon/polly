<template>
  <body>
    <div>

      hosting the quiz: {{id}}
      <p v-for="participant in participants" v-bind:key = "participant">
      {{participant}}
    </p>
    </div>

    <button v-on:click="startQuiz"> {{uiLabels.startQuiz}}</button>

    
  
</body>

</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'HostQuizView',
  components: {
    
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      participants: [],
      name: "host"
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.id = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.emit("joinPoll", this.id);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("participantUpdate", (participants) => {
      console.log
      this.participants = participants
      console.log("efter Update: ", this.participants)
    })
  },
  methods: {
    startQuiz: function() {
      console.log("Host Started quiz", this.participants)
      this.$router.push('/poll/'+this.id+'/'+this.lang+'/'+this.name)
      socket.emit("startedQuiz",{ pollId: this.id, 
                                  participants: this.participants }
                                );
    },

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
  body {
    margin: 0;
    background-color:  #A6E9A3;
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
 
    
  }

  div {
    height: 4.78em;
    line-height: 3em;
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

  button {
    color:black;
    margin: 1em;
    text-decoration: none; 
    background-color: rgb(235, 209, 106);
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    border-color: rgba(235, 209, 106, 0.689);
  }

  button:hover {
    box-shadow: 0 5px 15px #0079918f;
    transform: translateY(-2px);

  }
 
</style>
