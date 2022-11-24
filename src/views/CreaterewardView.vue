<template>
 <div class="wrapper">
 <div v-for="(_,i) in rewards" v-bind:key="'reward' + i">
    
    <div id="reward" class="rewards box">
      <div id="inputReward">
        Reward: {{i}}
        <input type="text" v-model="reward[i]" class="input" placeholder="Write your reward here...">
        <br>
      </div>
   </div>
   </div>
  <button v-on:click="addReward">
        Add Reward
  </button>

   <div v-for="(_,i) in punishments" v-bind:key="'punishment' + i">
    
    <div id="punishment" class="punishments box">
      <div id="inputPunishment">
        Punishment: {{i}}
        <input type="text" v-model="punishment[i]" class="input" placeholder="Write your punishment here...">
        <br>
      </div>
   </div>
   </div>
  <button v-on:click="addPunishment">
        Add Punishment
  </button>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();


export default {
  name: 'CreaterewardView',
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
  grid-template-columns: 30% 30%;

}
.box{
   border-radius: 2em;
  padding: 1em;

}


.rewards{
grid-column: 1;
grid-row: 1;


}
.punishments{
grid-column: 2;
grid-row: 1;


}

.pollLink {
  margin: 1em 2em 1em 70em;
  background-color:coral;
  border-radius: 2em;
  padding: 2em;

}


#reward {
  background-color:green;
}

#punishment {

  background-color:red;
 
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



.input {
  border-radius: 1em;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}



#inputReward {
  margin: 2em 2em 2em 2em;
  padding-right: 2em;
}



</style>