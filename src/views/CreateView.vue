<template>

<div class="body">
<homeButton class="homeButton"></homeButton>
 
 <div>
   <Question v-for="(question,index) in questions" 
   v-bind:question="question"
  v-bind:key="question.q"
  v-on:myquestion="saveQuestion($event, index)"
  v-on:deleteIndex="deleteQuestion($event,index)"
  v-on:deleteAnswer="editQuestion($event, index)"
  :questionNumber = index > </Question>
 
  <button v-on:click="newQuestion">
    {{uiLabels.AddQuestion}}
  </button>

<div id="wrapper">
  <div id="backButton">
    
    <router-link v-bind:to="'/start/'+lang"><img class="flipPic" src="../../public/img/leftfliparrow.png"/></router-link>
    </div>

<div id="nextButton">
    
  <router-link v-bind:to="'/createq/'+pollId+'/'+lang"><img class="flipPic" src="../../public/img/rightfliparrow.png"/></router-link>
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
      //answers: {},
      //question: "",
      //questionId: '',
      
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
      // this.question=this.questions.q 
      // this.answers=this.questions.a
    }
      
      )
    
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      socket.emit("anotherQuestion", {pollId: this.pollId})
    },
   // addQuestion: function (index) {

       //socket.emit("addQuestion", {pollId: this.pollId, index: index, q: this.question, a: this.answers } )
      
   // },
    newQuestion: function(){
      console.log(this.pollId)
      socket.emit("anotherQuestion", {pollId: this.pollId})
      console.log("NewQuestion", this.questions)

    },
    
  
    editQuestion: function(event, index){
      //this.question=event.name;
      //this.answers=event.answer;
      console.log("editQuestion index: ", index);
      socket.emit("editQuestion", {pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected})
    }, 
   
    // runQuestion: function () {
    //   socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    // },
    saveQuestion: function (event,index) {
      //this.questionId = event.questionId;
      //console.log(question.questionId)
      // this.answers = event.answer;
      // this.question = event.q;
      // this.questions[index]={q: this.question,
      //                       a: this.answers        
      //                     }
                          socket.emit("addQuestion", {pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected} )                    
      // this.addQuestion(index);
      console.log(this.question) 
      console.log(this.answers);
      console.log(event.selected)
    },
    deleteQuestion: function(event,index){
      // console.log(event.element);
      // console.log(this.questions);
      // var deleteIndex = this.questions.indexOf(event);
      // console.log(deleteIndex);
      console.log("det här är index: ", index);
      //this.question=event.name;
      //this.answers=event.answer;
      //this.$delete(this.questions, index);
      //this.questions.splice(index, 1);
      socket.emit("deleteQuestion",{pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected} )
      console.log(this.questions);
       
    }
   
  }
}
</script>

<style scoped>
.body { margin: auto;
    background-color: #A6E9A3 ;
    text-align: center;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    position:fixed;
    overflow: auto;   

}


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



#pollButton {
  margin-top: 1em;
  border-radius: 1em;
}

#deleteAnswerButton {
  
  grid-column: 2;
  
  
}



#wrapper {
  grid-gap: 55em;
  display: grid;
  grid-template-columns: 20em;
  margin-bottom: 3em;
}
#backButton{
  grid-column: 1;
  padding: 20 em;
  
}

#nextButton{
  grid-column: 2;
  padding: 20 em;
  
}

</style>