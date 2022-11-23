<template>
  <div class="wrapper">
    <div id="pollLink">
    Poll link: 
    <input type="text" v-model="pollId">
    <button v-on:click="createPoll">
      Create poll
    </button>
    </div>
    <div class="question">
      <div >
        {{uiLabels.question}}:
        <input type="text" v-model="question">
        <br>
        Answers:
        <div id="ansBox">
          

          <div class="answer" v-for="(_, i) in answers" v-bind:key="'answer'+i">
            <input v-model="answers[i]">
            
            <input type="checkbox" id="checked" value:answer v-model="selectedAnswers">Correct
          </div>
          <button v-on:click="addAnswer">
            Add answer alternative
          </button>

        </div>
      </div>

      <div id="buttons">
      <button v-on:click="addQuestion">
        Add question
      </button>
      <input type="number" v-model="questionNumber">
      <button v-on:click="runQuestion">
        Run question
      </button>
      {{data}}
      <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
    </div>

  </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      selectedAnswers: []
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
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>

<style>
button:hover {
  background-color:lightgreen;
  cursor:pointer;
}

.wrapper {
  background-color: aquamarine;
  margin: 1em ;
  padding: 1em;
  border:solid;
}

#pollLink {
  margin: 1em;
}

.question {
  margin: 1em;
  display: grid;
  grid-template-columns: 1fr ;
  row-gap: 50px;
  column-gap: 30px;
  background-color:lightblue;
  border-radius: 2em;
}

.answer {
  
  background-color:blueviolet;
  border-radius: 1em;
  
}
#ansBox {
  display: grid;
  
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 2em;
  row-gap: 2em;
  padding: 1em;
  grid-auto-rows: 100px;
}
#buttons{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>