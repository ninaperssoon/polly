<template>
  <body>
    <div>
      waiting for host to start...
      <br>
      other players:
      <p v-for="participant in participants" v-bind:key = "participant">
      {{participant}}
    </p>
    </div>
    
  
</body>

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
  body {
    margin: 0;
    background-color: #A6E9A3;
    width: 100%;
    height: 100%;
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
 
</style>
