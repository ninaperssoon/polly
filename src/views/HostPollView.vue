<template>
  
   <h1> you're hosting {{pollId}}  </h1> 

  <div class="container">
    <div class="scene scene--card">
      <div class="card" v-bind:class="{ flipme: cardOne == 'flipped' }">
      
        <div class="card__face card__face--front">

          <p> {{this.question.q}}</p>
        </div>
        <div class="card__face card__face--back" v-bind:class="{ correct: ans == 'correct'}">
        <p id="correctness"> {{this.ans}}! </p>
        <p> Your {{this.con}} is </p>
        </div>
      </div>
      <div id="buttonContainer">  
        <QuestionComponent v-bind:question="question" v-on:answer="submitAnswer" />      
      
    </div>

    </div>
  </div>
  <button v-on:click="nextQuestion">
    Next Question
  </button>
 

</template>

<script>
// @ is an alias to /src
import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
// import rewards from '@/CreaterewardView.vue';
// import punishments from '@/CreaterewardView.vue';

const socket = io();

export default {
  name: 'HostPollView',
  components: {
    QuestionComponent,    
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "",
      question: {
        q: "",
        a: [],
        s: []
      },
      pollId: "inactive poll",
      cardOne: "start",
      ans: "correct",
      con: "punishment" ,
      name: "",
      questionNumber: 1,
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
    
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    this.name = this.$route.params.name;
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
 
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
      this.cardOne == 'start' ? (this.cardOne = 'flipped' ) : (this.cardOne = 'start' );
      if (this.ans == 'correct') {
        this.con = "reward"
      }
      const buttonContainer = document.getElementById('buttonContainer');
      buttonContainer.remove();
    },
    nextQuestion: function (){
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber});
      this.questionNumber= this.questionNumber +1;
    }
   
  }
}

</script>

<style scoped>

.container{
  height: 40em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene {
  margin-top: -10em;
  width: 25em;
  height: 26em;
  perspective: 2000px;
}

.card {
  margin: auto;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  position: relative;
}

.card__face {
  padding: 0.2em;
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  backface-visibility: hidden;
  border-radius: 2em;
  font-size: 25px;
  line-height: 30px;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__face--front {
  background: #007991;
}

.card__face--back {
  background: rgba(226, 60, 60, 0.915);
  transform: rotateY(180deg); 
}

/* this style is applied when the card is clicked */
.flipme {
  transform: rotateY(180deg);
}

#buttonContainer {
  margin-top: 1em;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: 1fr;
}

.correct {
  background-color: rgb(63, 194, 63);
}

#correctness {
  font-size: 30px;
}

</style>
