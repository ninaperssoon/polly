<template>
  <body>
    <homeButton></homeButton>
    <div id="host">

      Hosting the quiz: {{id}}
      <p v-for="participant in participants" v-bind:key = "participant">
      {{participant}}
    </p>
    </div>

    <button v-on:click="startQuiz"> {{uiLabels.startQuiz}}</button>

    
  
</body>

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

    font-size:1.5em;
    margin: auto;
    background-color: #5C95FF;
    height: 5em;
    width: 20em;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 3em;
    border-style:outset;
    border-color: #5C95FF;
    margin-top: 2em;

  }

  input {

    font-size: 1em;
    border-radius: 1em;
    border-style: outset;
  }
  button {
    color:black;
    margin: 1em;
    text-decoration: none; 
    background-color:  #FFF1AD;
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    border-color:  #FFF1AD;
    color: #F87575;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
  }

  button:hover {
    box-shadow: 0 5px 15px #0079918f;
    transform: translateY(-2px);
    cursor: pointer;

  }
 
</style>
