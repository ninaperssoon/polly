<template>
<div id="body">
  <homeButton class="homeButton"></homeButton>
  <section>
    <h1>{{uiLabels.joinQuiz}}</h1>
   
    <div id="joinQuiz">

      <div class="box" id="name">
        <p> 
          <label>
            {{uiLabels.EnterYourName}}
            <input type="text" v-model="name">
          </label> 
        </p>
      </div>

      <div class="box" id="idbox">
        <p> 
        <label>
          {{uiLabels.writeQuizId}}: 
          <input type="text" v-model="id">
        </label>
        </p>
      </div>

    </div>
  <button id="joinbutton" v-on:click="sendName" >{{uiLabels.joinQuiz}}</button>

  </section>

</div>

</template>

<script>
import homeButton from '@/components/HomeComponent.vue';
import io from 'socket.io-client';
import swal from 'sweetalert';
const socket = io();

export default {
  name: 'JoinView',
  components: {
    homeButton
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "",
      name: "",
      idInQuizzes: false
      
    }
  },
  methods: {
  
  sendName: function() {
    if (this.name !== ""){for (const id in this.quizzes) {
        if (this.id == id){
          this.idInQuizzes = true
          socket.emit("addParticipant", { name: this.name,
                                          pollId: this.id }
                 );       
          this.$router.push('/wait/'+this.id+'/'+this.lang+'/'+this.name)
        }
      }  
      if (this.idInQuizzes == false) {
        if (this.lang == "en") {
          swal({ 
              title: "invalid QuizId",
              text: "You cannot join a quiz that doesn't exist ",
              icon: "warning",})
           }
           else {
              swal({ 
                title: "Felaktigt QuizId",
                text: "Du kan inte delta i ett quiz som inte finns ",
                icon: "warning",})
              }
           }
         
           
     
      } 
      else {
        if (this.lang == "en") {
              swal({ 
  text: "You forgot to enter your name, do it before you can play",
  icon: "warning",})
           }
            else {
              ({  
  text: "Du glömde fylla i ditt namn, gör det innan du kan spela",
  icon: "warning",})
           }
          }
      
     
  }},

  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit("getQuizzes");
    socket.on("sendQuizzes", (quizzes) => this.quizzes = quizzes);
  }
}
</script>

<style scoped>


  #body {
    background-color: #A6E9A3 ;
    width: 100%;
    height: 100%;
    position:fixed;
  }

  #joinbutton {
    margin: 1em;
    text-decoration: none; 
    background-color:#FFF1AD;
    padding: 0.5em;
    border-radius: 2em;
    border-style: outset;
    border-color: #FFF1AD;
    color: #F87575;
    font-size:1.5em;
    bottom: 0;
    right: 0;
    border-style: outset;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
  }

  #joinbutton:hover {
    box-shadow: 0 0.3em 1em #80B57D;
    transform: translateY(-0.125em);

  }

  button:hover {
    cursor:pointer;
  }

  p {
    margin: 0.5em;
  }

  *, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  }

h1 {
  margin-bottom: 1em;
  }

  #joinQuiz {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1em;
    grid-gap: 15%;
    font-size: 1.5em;
    height: 10em;
    place-items: center start;
    width: 70%;
    margin: auto;
  }
  .box{
    background-color: #5C95FF;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 3em;
    border-style:outset;
    border-color: #5C95FF;
    color: #FFF1AD;
    font-weight: bold;
    height: 100%;    
  }
  #name {
    grid-column: 1;
    margin-left: 30%;
  }

  #idbox {
    grid-column: 2;
    margin-right: 30%;
  }

  input {
    padding-left: 0.5em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    font-size:medium;
    border-radius: 1em;
    border-color:#5C95FF;
    border-style: outset;
  }
  @media screen and (max-width:50em) {
    #joinQuiz {
      grid-template-columns: 100%;
      grid-template-rows: 50% 50%;

    }
    #name {
      grid-column:1;
      grid-row:1;
      margin-left: 0%;
      width: 100%;

    }
    #idbox {
      grid-column:1;
      grid-row: 2;
      margin-right: 0%;
      width: 100%;
    }
  }

</style>
