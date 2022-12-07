<template>
  <homeButton></homeButton>
  <div class="pollLink">
      Poll link: 
      <input type="text" v-model="pollId">
      <button v-on:click="createPoll" id="pollButton">
       Create poll
      </button>
    </div>

 <div class="wrapper">
 <div>
 <div class="innerWrapper"  >
 <consequence  v-for=" (reward,index) in rewards"
    v-bind:reward = "reward"
    v-bind:key="reward"
    v-on:myReward="sendReward($event, index)"
    message ="reward"
    class="reward"
   />
    
    
  </div>
  <button v-on:click="newReward" class="addButton">
        +
   </button> Add Reward
   <button v-on:click="sendReward" class="addButton">
        +
   </button> Save Reward
</div>

  

  <!-- <div>
   <div  class="innerWrapper" >
    <consequence v-for=" punishment in punishments"
    v-bind:punishment = "punishment"
    v-bind:key="punishment"
    message = "punishment"
    class="punishment" />
   </div>
   <button v-on:click="addPunishment" class="addButton">
        +
    </button> Add Punishment
    
  </div> -->
  </div>
  <div id="backButton">
    
    <router-link v-bind:to="'/creater/'+lang"><img id="backPic" src="https://freesvg.org/img/pitr_green_arrows_set_4.png"/></router-link>
    </div>

    <div id="nextButton">
    
    <router-link v-bind:to="'/createq/'+lang"><img id="nextPic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMPs6LqvZihgtDeHWZ95Q0mEyUCRo5H5aJA&usqp=CAU"/></router-link>
    </div>

</template>

<script>
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
import consequence from '@/components/consequence.vue';
const socket = io();


export default {
  name: 'CreaterewardView',
  components: {
    homeButton, consequence
  },
  data: function () {
    return {
      lang: "",
      pollId: "",
      data: {},
      uiLabels: {},
      text: "",
      consequences: {r: [], p:[]},
      
      rewards: [],
      punishment: "",
      punishments: [""],
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

    socket.on("rewardUpdate", (data) =>{
      this.rewards= data
      console.log("Skickade rewards från data:",data)
      // this.question=this.questions.q 
      // this.answers=this.questions.a
    }
      
      )

  },
  methods: {
    newReward: function () {
      socket.emit("newReward", {pollId: this.pollId} )
      
    },
    addPunishment: function () {
      //socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
      this.punishments.push("")
    },
    sendReward: function (event, index) {
      console.log("reward: ", this.reward)
      socket.emit("sendReward", {pollId: this.pollId, index: index, r: event.r} )
      
    },
    sendPunishment: function () {
      socket.emit("sendPunishment", {pollId: this.pollId, r: this.punishments } )
      console.log("punishment: ", this.punishment)
    },
    editPunishment: function(event, index){
      //this.question=event.name;
      //this.answers=event.answer;
      console.log("editPunishent index: ", index);
      socket.emit("editPunishment", {pollId: this.pollId, index: index, q: event.q, a: event.a, s: event.selected})
    }, 
 

    

    deletePunishment: function() {
      this.punishments.pop("")
    },

     deleteAnswers: function() {
      this.answers.pop("");
      
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    },
   
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      //socket.emit("anotherQuestion", {pollId: this.pollId})
    },
   // addQuestion: function (index) {

       //socket.emit("addQuestion", {pollId: this.pollId, index: index, q: this.question, a: this.answers } )
      
   // },
    newQuestion: function(){
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

<style>
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
button:hover {
  background-color:lightgreen;
  cursor:pointer;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50% 50%;
  margin-top: 5em;

}
.box{
   border-radius: 2em;
  padding: 1em;

}
.reward{
grid-column: 1;
grid-row: auto;
background-color: greenyellow;
border-radius: 1em;


}
.punishment{
grid-column: 2;
grid-row: auto;
background-color: red;
border-radius: 1em; 



}

.pollLink {
  margin: 1em 2em 1em 70em;
  background-color:coral;
  border-radius: 2em;
  padding: 2em;

}


 

#inputPunishment {
  margin: 2em 2em 2em 2em;
  padding-right: 2em;
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




.innerWrapper {
grid-template-columns: 1fr;
padding: 3em;
row-gap: 1 em;

}

.addButton {
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  margin: 18px 0;
}

.delButton:hover {
  background-color:salmon;

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