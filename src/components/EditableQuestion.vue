

<template>
  <div>
    <div id="question" v-bind:style="{'background-color':SavedQuestionColor}">
      <div id="inputQuestion">
        {{uiLabels.Question}} {{questionNumber +1}} 
        <input type="text" v-model="q" class="input" :placeholder="uiLabels.WriteQuestionHere" v-on:keypress="resetColor()">

        <!-- {{uiLabels.WriteQuestionHere}} -->

        <br> 
      </div>
      

      <div id="inputAnswer" >
        <div v-for="(_,i) in answers" v-bind:key="'answer' + i">
          <input type="text"  v-model="answers[i]" class="input" id="option" :placeholder= "uiLabels.WriteAnswersHere"
          v-on:keypress="resetColor()">

           <!-- {{uiLabels.WriteAnswersHere}} -->
          

          <button v-on:click="deleteAnswers(i)" class="deleteB" id="deleteAnswerButton">
             -
          </button>

          <button class="buttonContainer" v-on:click="setCorectAnswer(i)"  v-bind:style="{'background-color':altColor[i]}">
            <img class="button" src="https://cdn4.iconfinder.com/data/icons/essentials-72/24/040_-_Tick-512.png"/>
          </button>
          
          <button class="buttonContainer" v-on:click="setWrongAnswer(i)" v-bind:style="{'background-color':deleteColor[i]}" >
            <img class="button" src="https://cdn4.iconfinder.com/data/icons/essentials-72/24/039_-_Cross-512.png"/>

          </button>
          <br>
        </div>
        <!--Svarsalternativ: {{question}}-->

        <button v-on:click="addAnswer" id="addAnswerButton">
          +
        </button>

      </div>

      <div>
        <button v-on:click="deleteQuestion" class="deleteB" id="deleteQuestions">
          {{uiLabels.DeleteQuestion}}
        </button >

        <button v-on:click="sendQuestion" v-bind:style="{'background-color':SavebuttonColor}">
          {{uiLabels.SaveQuestion}}
        </button>
        <!--{{data}}
        <router-link v-bind:to="'/result/'+pollId">Check result</router-link>-->
      </div>


    </div>

  </div>

</template>

<script>

import io from 'socket.io-client';
const socket = io();


export default{
  name : 'editableQuestion',
  props: { 
    question: Object,
    questionNumber: Number,
      

  },


  data: function(){
    return{
      selectedAnswers : [...this.question.s],
      q: this.question.q,
      answers: [...this.question.a],
      
      altColor:[""],
      deleteColor: [""],
      SavedQuestionColor: "lightblue",
      savebuttonText:"Save Question",
      SavebuttonColor: "",
      lang: "",
      uiLabels: {}
    }

  },

  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    
    } )
  },
  
 

  methods:{
    getQuestionId: function () {
    return Math.floor(Math.random()*100000);
    },

    addAnswer: function () {
      this.answers.push("");
      this.altColor.push("");
      this.resetColor();
    },
    deleteAnswers: function(i) {
      console.log(i)
      this.answers.splice(i,1);
      this.selectedAnswers.splice(i,1);
      this.altColor.splice(i,1);
      this.$emit('deleteAnswer', { q: this.q, a: this.answers, selected: this.selectedAnswers})
      this.resetColor();
    },
    deleteQuestion: function () {
      this.$emit('deleteIndex', {q: this.q, a: this.answers, selected: this.selectedAnswers}) //pop = delete/pull'
      },
    sendQuestion: function(){
      
      this.$emit('myquestion', {q: this.q, a: this.answers, selected: this.selectedAnswers})
      console.log("Edit: ",this.selectedAnswers)
      this.SavedQuestionColor = "seagreen"
      
     
    },
    setCorectAnswer: function(i){
      this.selectedAnswers[i] = 'correct';
      this.altColor[i] = "green";  
      this.deleteColor[i] = ""; 
      this.resetColor();
     
    },
    setWrongAnswer: function(i){
      this.selectedAnswers[i] = 'incorrect';
      this.deleteColor[i] = "red"; 
      this.altColor[i] = "";  
      this.resetColor();
     
     
    },
    resetColor: function(){
      this.SavedQuestionColor = "lightgreen";
      this.savebuttonText = "save changes";
      this.SavebuttonColor = "orange";
    
    },
    savebutonReset: function(){
      this.SavebuttonColor = "";
      this.savebuttonText = "question saved"
    }

  }
}

</script>





<style>

#deleteAnswerButton {
  height: 2em;
  width: 2em;
  grid-column: 2;
  grid-row: 2;
  
}

#checked {
  height: 2em;
  width: 2em;
  /*grid-column: 2;
  grid-row: 1;*/
  

}

#question {
  margin: 2em 8em 2em 8em;
  display: grid;
  /*grid-template-columns: 1fr ;*/
  /*row-gap: 50px;
  column-gap: 30px;*/
 /* background-color:lightblue;*/
  border-radius: 2em;
  padding: 1em;
}

.answer {
  display: grid;
  
}
#inputAnswer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
  column-gap: 0em;
  row-gap: 2em;
  padding: 1em;
  grid-auto-rows: 4em;
  column-gap: 1em;
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


#option {
  border-radius: 1em;
 
  height: auto;
  padding: 1em 1em;
  margin: 0 2em 0 0;
  /*grid-column: 1 / span 2;
  grid-row: 1 / span 2;*/

  box-sizing:border-box;
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
.input {
  border-radius: 1em;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: aliceblue;
}
.button {
  cursor: pointer;
  height: 4em;
}
.buttonContainer {
  padding: 1em;
  cursor: pointer;
  border: none;
  background: none;
}




</style>