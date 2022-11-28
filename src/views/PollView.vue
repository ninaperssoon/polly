<template>
  <!-- <div>
    <ReorderQuestion />
    {{pollId}}
    <QuestionComponent v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div> -->
  

<head>
  <title>Parcel Sandbox</title>
  <meta charset="UTF-8" />
</head>

<body>
  <div class="container">
    <button type="button" id="flip-btn" onclick="handleFlip()">
      Flip Card
    </button>
    <div class="card">
      <div id="back" class="cardBack">Back</div>
      <div id="front" class="cardFront">Front</div>
    </div>
  </div>

  
</body>


</template>

<script>
// @ is an alias to /src
// import QuestionComponent from '@/components/QuestionComponent.vue';
// import ReorderQuestion from '@/components/ReorderQuestion.vue';
import io from 'socket.io-client';
const socket = io();
// import "./styles.css";

const front = document.getElementById('front')
const back = document.getElementById('back')
// const btn = document.getElementById('flip-btn')

export default {
  name: 'PollView',
  components: {
    // QuestionComponent,
    // ReorderQuestion
  },
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll"
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
 
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    }
  },
  handleFlip: function() {
    front.classList.toggle('flipped')
    back.classList.toggle('flipped')
  }
}
</script>

<style>
button {
  border: solid 2px;
  padding: .5rem;
  border-radius: 0.25rem;
  font-weight: 700;
}

.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.card {
  margin-top: 1rem;
  height: 300px;
  width: 250px;
  position: relative;
  border-radius: 0.25rem;
}

.cardFront,
.cardBack {
  box-sizing: border-box;
  border-radius: 0.25rem;
  height: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  transition: transform 0.5s ease;
  position: absolute;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: #ebf4ff;
}
.cardBack {
  transform: perspective(1000px) rotateY(180deg);
}

.cardBack.flipped {
  transform: perspective(1000px) rotateY(0deg);
}

.cardFront {
  transform: perspective(1000px) rotateY(0deg);
}

.cardFront.flipped {
  transform: perspective(1000px) rotateY(-180deg);
}


</style>
