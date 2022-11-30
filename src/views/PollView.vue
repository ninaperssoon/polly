<template>
  <div>
    <ReorderQuestion />
    {{pollId}}
    
  </div>
  <div class="container">
    <div class="scene scene--card">
      <div class="card" v-bind:class="{ flipme: cardOne == 'flipped' }">
      
        <div class="card__face card__face--front">
          
          Question 1

          <p> This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....This is question 1....</p>
        </div>
        <div class="card__face card__face--back">back</div>
      </div>


      <div id="buttonContainer">  
        <QuestionComponent v-bind:question="question" v-on:answer="submitAnswer" @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )"/>
        <button  @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )">hej</button>
        <ButtonComponent v-for="a in question.a" v-bind:key="a" @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )">{{a}}</ButtonComponent>
      
      
    </div>

    </div>
  </div>
 

</template>

<script>
// @ is an alias to /src
import QuestionComponent from '@/components/QuestionComponent.vue';
// import ReorderQuestion from '@/components/ReorderQuestion.vue';
import io from 'socket.io-client';
const socket = io();
import ButtonComponent from '@/components/ButtonComponent.vue';

export default {
  name: 'PollView',
  components: {
    QuestionComponent,
    // ReorderQuestion
    ButtonComponent
    
  },
  data: function () {
    return {
      question: {
        q: "",
        a: ["hej","hola","ciao"]
      },
      pollId: "inactive poll",
      cardOne: "start"
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
    },
    
  },
}
</script>

<style scoped>
body {
  font-family: sans-serif;
}
.container{
  height: 40em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene {
  width: 25em;
  height: 30em;
  margin: 40px 0;
  perspective: 600px;
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
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 100px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  backface-visibility: hidden;
  border-radius: 2em;
}
p {
  font-size: 15px;
  line-height: 20px;

}
.card__face--front {
  background: #007991;
}

.card__face--back {
  background: blue;
  transform: rotateY(180deg);
}

/* this style is applied when the card is clicked */
.flipme {
  transform: rotateY(180deg);
}

#buttonContainer {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr;
}
</style>
