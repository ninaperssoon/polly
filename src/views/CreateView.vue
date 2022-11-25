<template>
  <div>

  <div class="pollLink">
      Poll link: 
      <input type="text" v-model="pollId">
      <button v-on:click="createPoll" id="pollButton">
       Create poll
      </button>
    </div>


 <div>
   <Question v-for="question in questions" 
  v-bind:question="question"
  v-bind:key="question.name"
  v-on:myquestion="saveQuestion($event)"/>
    
  <button v-on:click="newQuestion">
        Add question
  </button>
</div>


</div>
</template>

<script>
import io from 'socket.io-client';
import Question from '/Users/jason/Documents/github/polly/src/components/EditableQuestion.vue';

const socket = io();

//function singleQuestion (nm, alt, txt){
 //this.text = txt;
 //this.alternatives = alt;
// this.number = nm;
//}



export default {
  name: 'CreateView',
  components:{
    Question,
  },
  data: function () {
    return {
      lang: "",
      pollId: "",
      questions: [],
      uiLabels:{},
      answers: {},
      question: ""
    
      
      
      
      
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function () {
       socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
      
    },
    newQuestion: function(){
      this.questions.push("")
    },
    
    
   
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    },
    saveQuestion: function (event) {
      this.answers = event.answer;
      this.question = event.name;
      this.addQuestion();
      console.log(this.question) 
      console.log(this.answers);
    }
   
  }
}
</script>

<style>
button:hover {
  background-color:lightgreen;
  cursor:pointer;
}

/*.wrapper {
  /*background-color: aquamarine;
  margin: auto ;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr ;
  grid-template-rows: 1fr;
  border-radius: 1em;

}*/

.pollLink {
  margin: 1em 2em 1em 70em;
  background-color:coral;
  border-radius: 2em;
  padding: 2em;

}

#pollButton {
  margin-top: 1em;
  border-radius: 1em;
}













</style>