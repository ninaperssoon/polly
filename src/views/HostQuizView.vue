<template>
  <div id="body">
    <homeButton class="homeButton"></homeButton>
  
    <h1> {{uiLabels.yourehosting}}{{id}} </h1>
     <h2> {{uiLabels.waitingForParticipants}} <span class="dot1"> .</span><span class="dot2">.</span><span class="dot3">.</span> </h2>

      <br>

      <div class="board" v-for="participant in participants" v-bind:key = "participant">
        <img id="surfboard" src="../../public/img/surfboard.png">
        <div id="text">{{participant}}</div>
      </div>

      <button v-on:click="startQuiz"> {{uiLabels.startQuiz}}</button>
      

    </div>

</template>

<script>
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
const socket = io();

export default {
  name: 'HostQuizView',
  components: {
    homeButton
    
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
  #body {
    margin: auto;
    background-color: #75bdf8 ;
    text-align: center;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    position:fixed;
    overflow-y: auto;
    overflow-x: hidden;
  }
 
  button {
    color:black;
    margin: 1em;
    margin-top: 4em;
    text-decoration: none; 
    background-color:  #FFF1AD;
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    border-color:  #FFF1AD;
    color: #F87575;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
    font-size: 1.5em;
  }

  button:hover {
    box-shadow: 0 5px 15px #4779d6;
    transform: translateY(-2px);
    cursor: pointer;

  }
  h1 {
    margin-top: -3em; 
    font-size: 4em; 
    
  }

  h2 {
    margin-top: -1em;
    margin-bottom: -1em;
    font-weight: bold;
    color: #FFF1AD;
    text-shadow: .08em .08em 0 #4779d6;

  }

  #text {
    color: white;
    font-family: 'Righteous', serif;
    text-shadow: .08em .08em 0 black;
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

 
</style>
