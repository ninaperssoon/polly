<template>
<div id="question" v-bind:style="{'background-color':SavedQuestionColor, 'border-color':SavedBorderColor}">
  <h1>{{uiLabels.Question}} {{questionNumber +1}} </h1>
  <input id="questionInput" type="text" v-model="q" class="input" :placeholder="uiLabels.WriteQuestionHere" v-on:keypress="resetColor()" v-bind:style="{'border-color':SavedBorderColor}"  v-on:keyup.enter="nextInput">

  <br> 

  <div id="inputAnswer" >
    <div v-for="(_,i) in answers" v-bind:key="'answer' + i" class="answerLayout">
      <input type="text"  v-model="answers[i]" class="input" id="option" :placeholder= "uiLabels.WriteAnswersHere" v-on:keypress="resetColor()" v-bind:style="{'border-color':SavedBorderColor}"> 
      
      <button v-on:click="deleteAnswers(i)" class="buttonContainer" id="deleteAnswerButton"> 
        <img class="button" src="../../public/img/trashcan.png"/>
      </button> 
      
      <button class="buttonContainer" v-on:click="setCorrectAnswer(i)" id="Right"  v-bind:style="{'background-color':altColor[i], 'filter':grayScale[i], 'opacity':opacity[i]}">
        <img class="button" src="../../public/img/checkmark_nobackground.png"/>
      </button>
      <br>
    </div>
    
    <button v-if="(i<4)"  v-on:click="addAnswer" class="buttonContainer">
       +
    </button>
  </div>
  <div id="gridWrapper">
    <p id="correctString"> {{ correctString }}</p>
    <div id="saveDelete">
      <button  v-on:click="sendQuestion" class="saveDeleteButton" id="saveQuestion" v-bind:style="{'background-color':SavebuttonColor}">
        {{uiLabels.SaveQuestion}}
      </button>
      <button v-on:click="deleteQuestion" class="saveDeleteButton" id="deleteQuestion">
        {{uiLabels.DeleteQuestion}}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import io from 'socket.io-client';
import swal from 'sweetalert';

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
      correctString: "",
      grayScale: [""],
      opacity: [""]

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
    nextInput: function () {
      document.getElementById('option').focus();

    },
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
      if (this.i>0) {
        this.$emit('myquestion', {q: this.q ,a: this.answers, selected: this.selectedAnswers})
      // console.log("Edit: ",this.selectedAnswers)
      this.SavedQuestionColor = "#5C95FF"
      this.savebutonReset();
      }
      else {
        if (this.lang == "en") {
        swal({   title: "No answer options",
                text: "You must create atleast one answer before saving the question!",
                icon: "warning",})
        }
        else {
          swal({   title: "Inga svarsalternativ",
                text: "Du måste skapa åtminstone ett svarsalternativ innan du kan spara frågan!",
                icon: "warning",})
        }
      }
      
      
      
     
    },
    setCorrectAnswer: function(i){
      if (this.selectedAnswers[i] == 'correct') {
        this.selectedAnswers[i] = 'incorrect';
        this.deleteColor[i] = "#D34848"; 
        this.altColor[i] = "";  
        this.resetColor(); 
        this.grayScale[i] = "grayscale(100%)";
        this.opacity[i] = "0.5";
      }
      else {
        this.selectedAnswers[i] = 'correct';
        this.altColor[i] = "#6BA468";  
        this.deleteColor[i] = ""; 
        this.resetColor();
        this.grayScale[i] = "grayscale(0%)";
        this.opacity[i] = "1";

      }
           
    },

    resetColor: function(){
      this.SavedQuestionColor = "#B9E6FF";
      this.SavedBorderColor = "#B9E6FF";
      this.savebuttonText = "save changes";
      this.SavebuttonColor = "orange";
      this.correctString = this.uiLabels.correctString
    
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
  filter: grayscale(50%);
  opacity: 0.5;
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
#gridWrapper {
  margin-top: -2em;
  display: grid;
  grid-template-columns: 1 fr 1fr;
}
#saveDelete {
  grid-column: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  transform: translateY(-0.125em);
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
  margin-top: -1em;
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
  transform: translateY(-0.125em);

}
.buttonContainer {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin-top: 0.5em;
  margin-bottom: 0.8em;
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
#correctString {
  grid-column: 1;
  font-size: 1.4em;
  color: white;
  text-shadow: .08em .08em 0 #4779d6;
  padding-top: 1em;
}

@media screen and (max-width:80em) {
#inputAnswer {
  grid-template-columns: 1fr;
  padding: 1em;
}
#question {
  margin-top: 1em;
  width: 82vw;
  padding: 0em;
  margin-left:-3em;
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
  margin: 0.4em;
  margin-bottom:0.8em;
}
#gridWrapper {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}
#correctString {
  grid-column: 1;
  grid-row: 1;
}
#saveDelete {
  grid-column: 1;
  grid-row: 2;
}
#correctString {
  font-size: 1.2em;
}
}
</style>