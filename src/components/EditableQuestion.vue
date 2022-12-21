

<template>
    <div id="question" v-bind:style="{'background-color':SavedQuestionColor, 'border-color':SavedBorderColor}">
     
      <h1>{{uiLabels.Question}} {{questionNumber +1}} </h1>
      <input id="questionInput" type="text" v-model="q" class="input" :placeholder="uiLabels.WriteQuestionHere" v-on:keypress="resetColor()" v-bind:style="{'border-color':SavedBorderColor}">

      <br> 

      <div id="inputAnswer" >
        <div v-for="(_,i) in answers" v-bind:key="'answer' + i" class="answerLayout">
          <input type="text"  v-model="answers[i]" class="input" id="option" :placeholder= "uiLabels.WriteAnswersHere" v-on:keypress="resetColor()" v-bind:style="{'border-color':SavedBorderColor}"> 

          <button v-on:click="deleteAnswers(i)" class="buttonContainer" id="deleteAnswerButton"> 
            <img class="button" src="../../public/img/trashcan.png"/>
          </button> 

          <button class="buttonContainer" v-on:click="setCorrectAnswer(i)" id="Right"  v-bind:style="{'background-color':altColor[i]}">
            <img class="button" src="../../public/img/checkmark_nobackground.png"/>
          </button>
          
          <button class="buttonContainer" id="Wrong" v-on:click="setWrongAnswer(i)" v-bind:style="{'background-color':deleteColor[i]}" >
            <img class="button" src="../../public/img/redcross_nobackground.png"/>

          </button>
          <br>
        </div>

        <button v-if="(i<4)"  v-on:click="addAnswer" class="buttonContainer">
          +
        </button>

      </div>

      <div id="saveDelete">
        
        <button v-on:click="sendQuestion" class="saveDeleteButton" id="saveQuestion" v-bind:style="{'background-color':SavebuttonColor}">
          {{uiLabels.SaveQuestion}}
        </button>

        <button v-on:click="deleteQuestion" class="saveDeleteButton" id="deleteQuestion">
          {{uiLabels.DeleteQuestion}}
        </button >

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
      myquestion: "",
      q: this.question.q,
      answers: [...this.question.a],
      
      altColor:[""],
      deleteColor: [""],
      SavedQuestionColor: "#5C95FF",
      SavedBorderColor: "#5C95FF",
      savebuttonText:"Save Question",
      SavebuttonColor: "",
      lang: "",
      uiLabels: {},
      i: 0,
    }

  },

  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
      this.i = this.answers.length;
    
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
      this.i += 1
    },
    deleteAnswers: function(i) {
      console.log(i)
      this.answers.splice(i,1);
      this.selectedAnswers.splice(i,1);
      this.altColor.splice(i,1);
      this.$emit('deleteAnswer', { q: this.q, a: this.answers, selected: this.selectedAnswers})
      this.resetColor();
      this.i -= 1;
    },
    deleteQuestion: function () {
      this.$emit('deleteIndex', {q: this.q, a: this.answers, selected: this.selectedAnswers})
      
      },
    sendQuestion: function(){
      
      this.$emit('myquestion', {q: this.q ,a: this.answers, selected: this.selectedAnswers})
      console.log("Edit: ",this.selectedAnswers)
      this.SavedQuestionColor = "#5C95FF"
      this.savebutonReset();
      
     
    },
    setCorrectAnswer: function(i){
      this.selectedAnswers[i] = 'correct';
      this.altColor[i] = "#6BA468";  
      this.deleteColor[i] = ""; 
      
      this.resetColor();
     
    },
    setWrongAnswer: function(i){
      this.selectedAnswers[i] = 'incorrect';
      this.deleteColor[i] = "#D34848"; 
      this.altColor[i] = "";  
      this.resetColor();
     
     
    },
    resetColor: function(){
      this.SavedQuestionColor = "#B9E6FF";
      this.SavedBorderColor = "#B9E6FF";
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


<style scoped>

#Right{
  grid-column: 2;
  grid-row: 2;
}

#deleteAnswerButton {
  grid-row: 2; 
  grid-column: 1/1;
}

#checked {
  height: 2em;
  width: 2em;
}

#question {
  margin: auto;
  display: grid;
  grid-template-columns: 1fr ;
  border-radius: 2em;
  padding: 1em;
  row-gap: 1em;
  border-radius: 3em;
  border-style:outset;
  border-color: #5C95FF;
  color: #FFF1AD;
  font-weight: bold;
  width: 80%;
  margin-bottom:1em;
}


#inputAnswer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  column-gap: 3em;
}

#saveDelete {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 2em;
  margin-top: -2em;
}

.saveDeleteButton {
  width: 7em;
  height: 3em;
  font-size: 1.25em;
  color:white;
  font:bolder;
  background-color: transparent;
  border-color: white;
  border-style:solid;
  border-radius: 0.5em;
  margin: 1em;
}

.saveDeleteButton:hover {
  transform: translateY(-2px);
}


#deleteQuestion:hover {
  background-color: salmon;
  border-color: salmon;
}
#saveQuestion:hover {
  background-color: #A6E9A3;
  border-color: #A6E9A3;
}

#option {
  grid-column: 1 /4; 
  grid-row: 1;
} 
.answerLayout{
  display: grid;
  grid-template-columns: 10fr 4fr fr;
  row-gap: 0em;
}

.input {
  border-radius: 1em;
}
.button {
  cursor: pointer;
  height: 1em;
}

.buttonContainer:hover{
  transform: translateY(-2px);

}
.buttonContainer {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 18px 0;
  background-color: transparent;
  border-style: solid;
  border-color: transparent;
  color: white;
  font-family: 'Righteous', serif;
  text-shadow: .05em .05em 0 rgb(77, 94, 179);
  font-size: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}
#Wrong{
  grid-column: 3;
  grid-row: 2;
}

h1{
  display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 2em; 
  text-shadow: .08em .08em 0 #4779d6;
}
input {
    padding-left: 0.5em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    font-size: medium;
    border-radius: 1em;
    border-style: outset;
  }
#questionInput {
  font-size: large;
  margin-left: 26%;
  margin-right: 26%;
}

@media screen and (max-width:80em) {
#inputAnswer {
  grid-template-columns: 1fr;
  padding: 2em;
}
#question {
  width: 100%;
  padding: 0em;
}
#questionInput {
  margin: auto;
}
.saveDeleteButton {
  width: 50%;
  font-size: 1em;
}
#saveDelete {
  justify-content: center;
  align-items: center;
  padding-right: 0em;
  margin-top: -2em;
}
.buttonContainer {
  font-size: 2em;
}

}
</style>