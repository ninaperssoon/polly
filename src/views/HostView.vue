<template>
  <div id="body">
    <homeButton class="homeButton"> </homeButton>
    <h1>{{uiLabels.hostQuiz}}</h1>
    
    <div class="wrapper">
      <div id="palm1"><img class="palmtree" src="../../public/img/palmtree.gif"></div>
      <div class="theHost">
        <div id="host">
          <p> {{uiLabels.writeQuizId}}: 
          <br>
          <input type="text" v-model="id" v-on:keyup.enter="hostQuiz"></p>      
        </div>
        <button id="startQuiz" v-on:click="hostQuiz">{{uiLabels.hostQuiz}}</button> 
      </div>
      <div id="palm2"><img class="palmtree" src="../../public/img/palmtree.gif"></div>
    </div>

  </div>
</template>

<script>
import homeButton from '@/components/HomeComponent.vue';
import io from 'socket.io-client';
import swal from 'sweetalert';

const socket = io();

export default {
  name: 'HostView',
  components: {
    homeButton,
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      quizzes: {},
      idInQuizzes: false
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit("getQuizzes");
    socket.on("sendQuizzes", (quizzes) => this.quizzes = quizzes);
    socket.on("isHosted", () => {
      this.$router.push('/host/'+this.id+'/'+this.lang)
    })
    socket.on("hostingDenied", () => {
      if (window.confirm("Do you really want to host?")) {
        socket.emit("forceHost", this.id)
    }
      
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
    hostQuiz: function() {
      for (const id in this.quizzes) {
        if (this.id == id){
          this.idInQuizzes = true
          socket.emit("hostingQuiz", this.id)
          socket.emit("resetParticipants", this.id)
        }
      }
      if (this.idInQuizzes == false) {
        if (this.lang == "en") {
              swal({   
                title: "Invalid QuizID",
                text: "You cannot host a quiz that doesn't exist!",
                icon: "warning",})
           }
            else if (this.lang == "sv") {
              swal({   
                title: "Felaktigt QuizID",
                text: "Du kan inte anordna ett quiz som inte finns",
                icon: "warning",})
           }
           else if (this.lang == "fi") {
              swal({   
                title: "Väärä QuizID",
                text: "Et voi järjestää quizzi, jota ei ole olemassa",
                icon: "warning",})
           }
          }
      }
    }
}
</script>

<style scoped>
  #body {
    margin: 0;
    background-color:  #A6E9A3;
    min-height: 100%;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
  }

  .wrapper {
    margin-top: -6em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  #palm1 {
    grid-column: 1;
  }

  .theHost {
    grid-column: 2;
  }

  #palm2 {
    grid-column: 3;
  }

  #host {
    font-size:1.5em;
    margin: auto;
    margin-top: 1em;
    height: 50%;
    width: 75%;
    background-color: #5C95FF;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
    border-style: outset;
    border-color: #5C95FF;
    color:#FFF1AD;
    font-weight: bold;
  }

  #startQuiz {
    color: #F87575;
    font-size:1.5em;
    background-color: #FFF1AD;
    border-color: #FFF1AD;
    text-decoration: none;
    height: 2.5em;
    width: 8em;
    margin-top: 1em;
    border-radius: 2em;
    border-style: outset;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
  }

  #startQuiz:hover {
    box-shadow: 0 0.3em 1em #80B57D;
    transform: translateY(-0.125em);
  }

h1 {
  margin-bottom: 3em;
  margin-top: -5em;
  }

  input {
    padding-left: 0.5em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    font-size:medium;
    border-radius: 1em;
    border-color:#5C95FF;
    border-radius: 1em;
    border-style: outset;
  }

  .palmtree {
    width: 80%;
  }
  
  @media screen and (max-width:50em) {
  .palmtree {
    width: 0%;
  }
  #host {
    width: 100%;
    height: 40%;
  }
  h1 {
    margin-top: 0.8em;
  }
  #host {
    width: 80vw;
    height: 20vh;
    margin-top: -1em;
  }
  
  }
 
</style>
