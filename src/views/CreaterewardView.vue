<template>
  <homeButton></homeButton>
 <div class="wrapper">
 <div>
 <div class="innerWrapper"  >
 <consequence  v-for=" reward in rewards"
    v-bind:reward = "reward"
    v-bind:key="reward"
    message ="reward"
    class="reward"
   />
    
    
  </div>
  <button v-on:click="addReward" class="addButton">
        +
   </button> Add Reward
   <button v-on:click="sendReward" class="addButton">
        +
   </button> Save Reward
</div>

  

  <div>
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
    <button v-on:click="sendPunishment" class="addButton">
        +
    </button> Save Punishment
  </div>
  </div>
  <div id="backButton">
    
    <router-link v-bind:to="'/creater/ '+lang"><img id="backPic" src="https://freesvg.org/img/pitr_green_arrows_set_4.png"/></router-link>
    </div>

    <div id="nextButton">
    
    <router-link v-bind:to="'/createq/ '+lang"><img id="nextPic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMPs6LqvZihgtDeHWZ95Q0mEyUCRo5H5aJA&usqp=CAU"/></router-link>
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
      reward: "",
      rewards: [""],
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
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addReward: function () {
      //socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
      this.rewards.push("")
    },
    addPunishment: function () {
      //socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
      this.punishments.push("")
    },
    sendReward: function () {
      console.log("reward: ", this.reward)
      socket.emit("sendReward", {pollId: this.pollId, r: this.rewards } )
      
    },
    sendPunishment: function () {
      socket.emit("sendPunishment", {pollId: this.pollId, r: this.punishments } )
      console.log("punishment: ", this.punishment)
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