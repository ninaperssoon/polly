<template>
  <div id="body">

    <div id="header">
      <h1>{{uiLabels.Waitingforhosttostart}}<span class="dot1"> .</span><span class="dot2">.</span><span class="dot3">.</span></h1> 
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
    background-color: #75bdf8 ;
    text-align: center;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    position:fixed;
    overflow: auto;  
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
    box-shadow: 0 0.3em 1em #0079918f;
  }

  #text {
    color: white;
    font-family: 'Righteous', serif;
    text-shadow: .08em .08em 0 black;
  }

  #header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dot1 {
 animation: visibility 2s linear infinite;
}
@keyframes visibility {
 0% {
 opacity: 1;
 }
 65% {
 opacity: 1;
 }
 66% {
 opacity: 0;
 }
 100% {
 opacity: 0;
 }
}
.dot2 {
 animation: visibility2 2s linear infinite;
}
@keyframes visibility2 {
 0% {
  opacity: 0;
 }
 21% {
  opacity: 0;
 }
 22% {
  opacity: 1;
 }
 65% {
  opacity: 1;
 }
 66% {
  opacity: 0;
 }
 100% {
  opacity: 0;
 }
}
.dot3 {
 animation: visibility3 2s linear infinite;
}
@keyframes visibility3 {
 0% {
  opacity: 0;
 }
 43% {
  opacity: 0;
 }
 44% {
  opacity: 1;
 }
 65% {
  opacity: 1;
 }
 66% {
  opacity: 0;
 }
 100% {
  opacity: 0;
 }
}

@media screen and (max-width:50em) {
  h1 {
    font-size: 2em;
  }
}
 
</style>
