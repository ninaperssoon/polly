<template>

<div class="body">
<homeButton class="homeButton"></homeButton>
 
  <div id="backgroundDiv">
    <Question v-for="(question,index) in questions" 
    v-bind:question="question"
    v-bind:key="question.q"
    v-on:myquestion="saveQuestion($event, index)"
    v-on:deleteIndex="deleteQuestion($event,index)"
    v-on:deleteAnswer="editQuestion($event, index)"
    :questionNumber = index > </Question>
 
  
    <div id="wrapper">

      <button id="addButton" v-on:click="newQuestion">
        {{uiLabels.AddQuestion}}
      </button>

      <div id="nextButton">
        <router-link v-bind:to="'/createq/'+pollId+'/'+lang"><img class="flipPic" src="../../public/img/rightarrow.png"/></router-link>
      </div>
    </div>
  
  </div>
</div>



</template>

<script>
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
import Question from '@/components/EditableQuestion.vue';


const socket = io();

export default {
  name: 'CreateView',
  components: {
    homeButton,
    Question,
  },
  data: function () {
    return {
      lang: "",
      pollId: "",
      questions: [],
      uiLabels:{},
    }
  },
  created: function () {
    this.pollId = this.$route.params.id;
    this.lang = this.$route.params.lang;
    
    socket.emit("pageLoaded", this.lang);
    socket.emit("joinCreate", this.pollId);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("getPoll", (data) =>
      this.questions = data,
    )
    socket.on("updateQuestions", (data) =>{
      this.questions= data
      console.log("Skickade frågor från data:",data)
    })
    
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      socket.emit("anotherQuestion", {pollId: this.pollId})
    },
    newQuestion: function(){
      console.log(this.pollId)
      socket.emit("anotherQuestion", {pollId: this.pollId})
      console.log("NewQuestion", this.questions)
    },
    editQuestion: function(event, index){
      console.log("editQuestion index: ", index);
      socket.emit("editQuestion", {pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected})
    }, 
    saveQuestion: function (event,index) {
      socket.emit("addQuestion", {pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected} )                    
      console.log(this.question) 
      console.log(this.answers);
      console.log(event.selected)
    },
    deleteQuestion: function(event,index){
      console.log("det här är index: ", index);
      socket.emit("deleteQuestion",{pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected} )
      console.log(this.questions);
    }
  }
}
</script>

<style scoped>
.body { 
  margin: auto;
  background-color: #A6E9A3 ;
  text-align: center;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  position:fixed;
  overflow-y: auto; 
  overflow-x: hidden;  
}

#backgroundDiv{
  padding: 5em;
  margin-top: -7em;
}
button:hover {
  background-color:lightgreen;
  cursor:pointer;
}

#pollButton {
  margin-top: 1em;
  border-radius: 1em;
}

#deleteAnswerButton {
  grid-column: 2;
}

#addButton {
  text-decoration: none; 
  background-color:#FFF1AD;
  padding: 1em;
  border-radius: 2em;
  border-style: outset;
  border-color: #FFF1AD;
  color: #F87575;
  font-size:1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: outset;
  font-family: 'Righteous', serif;
  text-shadow: .05em .05em 0 #4779d6;
  grid-column: 2;
}

#addButton:hover {
  box-shadow: 0 5px 15px #80B57D;
}

#wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1em 1em;
  row-gap: 0.1em;
}

#nextButton{
  grid-column: 3;
  grid-row: 2;
  padding: 20 em;
}

@media screen and (max-width:80em) {
.flipPic {
  height: 3em;
}

#addButton {
  font-size:1em;
}
}
</style>