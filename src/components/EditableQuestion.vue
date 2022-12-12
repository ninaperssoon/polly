

<template>
  <div>
    <div id="question" >
      <div id="inputQuestion">
        <h2>Question: {{questionNumber +1}}</h2> 
        <input type="text" v-model="q" class="input" placeholder="Write your question here...">
        <br> 
      </div>
      

      <div id="inputAnswer" >
        <div v-for="(_,i) in answers" v-bind:key="'answer' + i">
          <input type="text"  v-model="answers[i]" class="input" id="option" placeholder="Write your answers here..." 
         >

          <button v-on:click="deleteAnswers(i)" class="deleteB" id="deleteAnswerButton">
             -
          </button>

          <button v-on:click="setCorectAnswer(i)"  v-bind:style="{'background-color':altColor[i]}">
            correct answer 
          </button>
          <button v-on:click="setWrongAnswer(i)"  >
            wrong answer 
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
          Delete question
        </button >

        <button v-on:click="sendQuestion">
          Save question
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
    question: Object,
    questionNumber: Number,
      

  },


  data: function(){
    return{
      selectedAnswers : [...this.question.s],
      q: this.question.q,
      answers: [...this.question.a],
      
      altColor:["white","white"],
    }

  },
 

  methods:{
    getQuestionId: function () {
    return Math.floor(Math.random()*100000);
    },

    addAnswer: function () {
      this.answers.push("");
      this.altColor.push("");
    },
    deleteAnswers: function(i) {
      console.log(i)
      this.answers.splice(i,1);
      this.selectedAnswers.splice(i,1);
      this.altColor.splice(i,1);
      this.$emit('deleteAnswer', { q: this.q, a: this.answers, selected: this.selectedAnswers})
    },
    deleteQuestion: function () {
      this.$emit('deleteIndex', {q: this.q, a: this.answers, selected: this.selectedAnswers}) //pop = delete/pull'
      },
    sendQuestion: function(){
      this.$emit('myquestion', {q: this.q, a: this.answers, selected: this.selectedAnswers})
      console.log("Edit: ",this.selectedAnswers)
    },
    setCorectAnswer: function(i){
      this.selectedAnswers[i] = 'correct';
      this.altColor[i] = "lightgreen";  
    },
    setWrongAnswer: function(i){
      this.selectedAnswers[i] = 'incorrect';
      this.altColor[i] = "salmon";   
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
  background-color: aliceblue;
}





</style>