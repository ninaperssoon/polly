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
      

      <div id="inputAnswer" v-for="(_,i) in ansBox" v-bind:key="'ansBox' + i">
        <div v-for="(_,i) in answers" v-bind:key="'answer' + i">

          <input type="text" v-model="question[i]" class="input" id="option" placeholder="Write your answers here...">
          <button v-on:click="deleteAnswers" class="deleteB" id="deleteAnswerButton">
              -
          </button>

          <input type="checkbox" id="checked" value:answer v-model="selectedAnswers">
          <br>
        </div>

        <button v-on:click="addAnswer" id="addAnswerButton" value:answer>
            +
        </button>

      </div>

        <!--<div v-for="(_, i) in ansBox" v-bind:key="'ansBox'+i">
          <div id="ansBox">
            <input type="text" v-model="ansBox[i]" class="input" id="option" placeholder="Write your answes here...">
          </div>
        
          <div class="answer" v-for="(_, i) in answers" v-bind:key="'answer'+i">
            
              <input type="checkbox" id="checked" value:answer v-model="selectedAnswers">
            <button v-on:click="deleteAnswers" class="deleteB" id="deleteAnswerButton">
              -
            </button>
          </div>
          <button v-on:click="addAnswer" id="addAnswerButton">
            +
          </button>

        </div>-->

      <div>
      
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
      text: "",
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
  display: grid;
  
}
#inputAnswer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 0em;
  row-gap: 2em;
  padding: 1em;
  grid-auto-rows: 4em;
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

#option {
  border-radius: 1em;
  width: 20em;
  height: auto;
  padding: 1em 1em;
  margin: 0 2em 0 0;
  /*grid-column: 1 / span 2;
  grid-row: 1 / span 2;*/

  box-sizing:border-box;
} 

#checked {
  height: 2em;
  width: 2em;
  /*grid-column: 2;
  grid-row: 1;*/
  

}

#deleteAnswerButton {
  height: 2em;
  width: 2em;
  grid-column: 2;
  grid-row: 2;
  
}

</style>