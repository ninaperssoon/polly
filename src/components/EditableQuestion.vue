

<template>
    <div>
<div id="question" >
    <div id="inputQuestion">
       {{question.number}}
      <input type="text" v-model="name" class="input" placeholder="Write your question here...">
      <br>
    </div>
    

    <div id="inputAnswer" v-for="(_,i) in ansBox" v-bind:key="'ansBox' + i">
      <div v-for="(_,i) in answers" v-bind:key="'answer' + i">

        <input type="text" v-model="answers[i]" class="input" id="option" placeholder="Write your answers here...">
        <button v-on:click="deleteAnswers(i)" class="deleteB" id="deleteAnswerButton">
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
    </button >
    <button v-on:click="sendQuestion">
    Send question
    </button>
    <!--{{data}}
    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>-->
  </div>


</div>

</div>

</template>

<script>

export default{
name : 'editableQuestion',
props: { 
    question: Object

},

    data: function(){
        return{
            selectedAnswers : [],
            answeralt: [],
            name: "",
            ansBox: [""],
            answers: ["",""]



        }

    },

    methods:{
  
     addAnswer: function () {
      this.answers.push("");
    },
      deleteAnswers: function(i) {
        console.log(i)
      this.answers.splice(i,1);
      
    },
    deleteQuestion: function () {
      console.log();
      this.$emit('deleteIndex', {element: this.name, answer: this.answers}) //pop = delete/pull
    },
    sendQuestion: function(){
      this.$emit('myquestion',{name: this.name, answer: this.answers})
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
  background-color:lightblue;
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
}





</style>