<template>
  <homeButton></homeButton>
  <div class="pollLink">
    Poll link: 
    <input type="text" v-model="pollId">
    <button v-on:click="createPoll" id="pollButton">
      Create poll
    </button>
    </div>


 <div>
   <Question v-for="(question,index) in questions" 
      v-bind:question="question"
      v-bind:key="question.q"
      v-on:myquestion="saveQuestion($event, index)"
      v-on:deleteIndex="deleteQuestion($event,index)"
      v-on:deleteAnswer="editQuestion($event, index)"
      :questionNumber = index > 
    </Question>
 
    <button v-on:click="newQuestion">
      Add question
    </button>

    <div id="backButton">
      <router-link v-bind:to="'/start/'+lang"><img id="backPic" src="https://freesvg.org/img/pitr_green_arrows_set_4.png"/></router-link>
    </div>

    <div id="nextButton">
      <router-link v-bind:to="'/createq/'+pollId+'/'+lang"><img id="nextPic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMPs6LqvZihgtDeHWZ95Q0mEyUCRo5H5aJA&usqp=CAU"/></router-link>
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
      this.data = data
    )
    socket.on("updateQuestions", (data) =>{
      this.questions= data
      console.log("Skickade frågor från data:",data)
    }
      
      )
    
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      socket.emit("anotherQuestion", {pollId: this.pollId})
    },
    newQuestion: function(){
      socket.emit("anotherQuestion", {pollId: this.pollId})
      console.log("NewQuestion", this.questions)

    },
    
  
    editQuestion: function(event, index){
      console.log("editQuestion index: ", index);
      socket.emit("editQuestion", {pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected})
    }, 
   
    // runQuestion: function () {
    //   socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    // },
    saveQuestion: function (event,index) {
      socket.emit("addQuestion", {pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected} )                    
      console.log(event.selected)
    },
    deleteQuestion: function(event,index){
      console.log("det här är index: ", index);
      socket.emit("deleteQuestion",{pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected} );
      console.log(this.questions);
       
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











#deleteAnswerButton {
  height: 2em;
  width: 2em;
  grid-column: 2;
  grid-row: 2;
  
}

#backButton{
  
  margin-right: 85%;
  padding: 20 em;
  
}

#backPic {
  height: 3em;
  width: 3em;
  cursor: pointer;
}

#nextPic {
  height: 3em;
  width: 3em;
  cursor: pointer;
}
#nextButton{
  
  margin-left: 85%;
  padding: 20 em;
  
}



</style>