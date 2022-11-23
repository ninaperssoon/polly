<template>
  <div class="pollLink">
      Poll link: 
      <input type="text" v-model="pollId">
      <button v-on:click="createPoll" id="pollButton">
       Create poll
      </button>
    </div>
  <div v-for="(_,i) in questions" v-bind:key="'question' + i">
    
    <div id="question" >
      <div id="inputQuestion">
        {{uiLabels.question}}: {{i}}
        <input type="text" v-model="question[i]" class="input" placeholder="Write your question here...">

        <br>
      </div>
        <div id="ansBox" v-for="(_, i) in ansBox" v-bind:key="'ansBox'+i">
        
          <div class="answer" v-for="(_, i) in answers" v-bind:key="'answer'+i">
            <input id="option" value:options v-model="answers[i]" placeholder="Write your answer alternatives here...">
            
            <input type="checkbox" id="checked" value:answer v-model="selectedAnswers" class="input">

            <button v-on:click="deleteAnswers" class="deleteB">
              -
            </button>
          </div>
          <button v-on:click="addAnswer" id="addAnswerButton">
            +
          </button>

        </div>
     

      <div id="buttons">
      
      <!--<input type="number" v-model="questionNumber">-->
      <button v-on:click="deleteQuestion" class="deleteB" id="deleteQuestions">
        Delete question
      </button>
      <!--{{data}}
      <router-link v-bind:to="'/result/'+pollId">Check result</router-link>-->
    </div>


  </div>
  
  </div>
  <button v-on:click="addQuestion">
        Add question
  </button>
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
      questions:[""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      selectedAnswers: [],
      ansBox: [""],
      text: ""
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
      //socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
      this.questions.push("")
    },
    addAnswer: function () {
      this.answers.push("");
    },
    deleteAnswers: function() {
      this.answers.pop("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    },
    deleteQuestion: function () {
      this.questions.pop("") //pop = delete/pull
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

#question {
  margin: 2em 8em 2em 8em;
  display: grid;
  /*grid-template-columns: 1fr ;*/
  /*row-gap: 50px;
  column-gap: 30px;*/
  background-color:lightblue;
  border-radius: 2em;
  padding: 1em;
}

.answer {
  
  /*background-color:blueviolet;
  border-radius: 1em;
  padding-top: 1em;*/
  
}
#ansBox {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 0em;
  row-gap: 2em;
  padding: 1em;
  grid-auto-rows: 4em;
}
#buttons{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2em;
}

.deleteB:hover {
  background-color: salmon;
  cursor:pointer;
}

#deleteQuestions {
  width: 5em;
  height: 5em;
  margin-left: 80em;
  border-radius: 2em;
  border-radius: 1em;
}

#pollButton {
  margin-top: 1em;
  border-radius: 1em;
}

.input {
  border-radius: 1em;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

#option {
  border-radius: 1em;
  width: 15em;
  height: 5em;
  padding: 0px 0px;
  margin: 8px 0;
  box-sizing: border-box;
}

#inputQuestion {
  margin: 2em 2em 2em 2em;
  padding-right: 2em;
}

#addAnswerButton {
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  margin: 18px 0;
}

#checked {
  padding: 20em;

}
</style>