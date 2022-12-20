<template>
  
  <div class="body">
    <homeButton class="homeButton"></homeButton>
    <div id="wrapper">
   <h1> {{uiLabels.yourePlaying}}{{pollId}} </h1> 

  <div class="container">
    <div class="scene scene--card">
      <div class="card" v-bind:class="{ flipme: cardOne == 'flipped' }">
      
        <div class="card__face card__face--front">
          
          <p v-if="(this.question!== null)">{{this.question.q}} </p>
          <p v-else> {{uiLabels.ReachedEndQuiz}}
            <br><br>
            <router-link class="button" v-bind:to="('/join/'+lang)">{{uiLabels.joinanotherquiz}}</router-link>
            <router-link class="button" v-bind:to="('/')">{{uiLabels.Returntohomepage}}</router-link>

          </p>
          

        </div>
        <div class="card__face card__face--back" v-bind:class="{ correct: ans == uiLabels.correct}">
        <p > <span id="correctness"> {{this.ans}}! </span><br> {{uiLabels.Your}} {{this.con}}{{uiLabels.is}}{{this.consequence}} </p>
        </div>
      </div>
      <div >  
        <QuestionComponent v-bind:question="question" v-on:answer="submitAnswer" v-if="visibleButtons"/>      
      
    </div>
  </div>

    </div>
  </div>
 
</div>
</template>

<script>
// @ is an alias to /src
import QuestionComponent from '@/components/QuestionComponent.vue';
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';



const socket = io();

export default {
  name: 'PollView',
  components: {
    QuestionComponent,    
    homeButton
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
      reward: "",
      punishment: "",
      consequence: "",
      visibleButtons: true,
     
    }
  },
  created: function () {
    this.pollId = this.$route.params.id;
    this.name = this.$route.params.name;
    this.lang = this.$route.params.lang;

    socket.emit('joinPoll', this.pollId)
    socket.emit("pageLoaded", this.lang);

    socket.on("newQuestion", q =>{
      console.log("I PollView.vue: newQuestion, q: ", q)
      this.question = q
      console.log(this.cardOne)
      if (this.cardOne !== "start"){
        console.log("här är jag")
        this.cardOne = 'start';
        
      }
    })

    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("checkVoting",(data) => {
      console.log("checkVoting")
      if(data == true){
        this.visibleButtons=false;
        console.log("wating for votes")
      }
      else{
        this.visibleButtons=true;
      } 
  })

    socket.on("getVotedReward", (data) => {
      this.reward = data
      console.log("Mottagen framröstad r:", this.reward)
    }
    )
    socket.on("getVotedPunishment", (data) =>{
      this.punishment = data
      console.log("Mottagen framröstad p:", this.punishment)
    })
    socket.on("answeringParticipant", (data) =>{
      console.log("answeringParticipant:  ", data)
      if (this.name !== data){
        this.$router.push('/obs/'+this.pollId+'/'+this.lang+'/'+this.name)
      }

    })

    socket.on("flipUpdate", data =>{
      this.ans = data.wor === "correct"?this.uiLabels.correct:this.uiLabels.incorrect
      this.con = data.con === "punishment"?this.uiLabels.punishment2:this.uiLabels.reward
      this.consequence= data.consequence
      console.log("flipUpdate: PollView.vue, ans: ", data.wor, " con: ", data.con)
      console.log(this.consequence)
      console.log(this.playingName)
      this.cardOne = 'flipped'
    })
  },
  methods: {
    submitAnswer: function (answer) {
      console.log(answer)
      this.ans = this.question.s[answer.index];
      this.cardOne == 'start' ? (this.cardOne = 'flipped' ) : (this.cardOne = 'start' );
      

      if (this.ans == 'correct') {
        this.con = "reward"
        this.consequence = this.reward
      }
      else {
        this.con = "punishment"
        this.consequence = this.punishment
      }
      this.visibleButtons=false;
      console.log(this.reward)
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer.a, wor: this.ans, con: this.con, consequence: this.consequence})
      
      
    },
    
  },
}
</script>

<style scoped>

.body {
  /*background-color: #A6E9A3;*/
  height: 100%;
  width: 100%;
  position: fixed;

  background-image: url("https://images.template.net/104478/pink-ocean-background-pdlb9.jpg?fbclid=IwAR1f5-_NQThWwcxCzlH0jRBLgD_Zh6ER41Kue--nu1mQAA5ybx0MyEwq3E4");
  background-repeat:no-repeat;
  background-size: cover;
  overflow: auto;
}
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
  font-weight: bold;
  border-style:outset;
}
.card__face--front {
  background: #FFF1AD;
  color: black;
  font-weight: bold;
  padding: 5%;

  border-color: #f9e998;
  box-shadow: 0 5px 15px #c0ac48;
}

.card__face--back {
  background: #F87575;
  transform: rotateY(180deg); 
  border-color: #f76868;
  box-shadow: 0 5px 15px #bb3939 ;
}

/* this style is applied when the card is clicked */
.flipme {
  transform: rotateY(180deg);
}



.correct {
  background-color:#5C95FF;
  border-color: #4c88f8;
  box-shadow: 0 5px 15px #2453a9 ;
}

#correctness {
  font-size: 30px;
}

.button {
    margin: 1em;
    text-decoration:none; 
    background-color: #5C95FF;
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    font-size: small;
    border-color: #5C95FF;
    color: #FFF1AD;
    text-shadow: .05em .05em 0 #0a2049;
  }

  .button:hover {
    box-shadow: 0 5px 15px #0079918f;
    transform: translateY(-2px);
    

  }

  #wrapper {
    margin-top: -3em;
  }

  @import url(https://fonts.googleapis.com/css?family=Righteous);

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  }

h1 {
  display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 4em; 
  text-shadow: .08em .08em 0 #4779d6;
  margin-top: -6em;
  }

#background {
  width: 100%;
}
</style>
