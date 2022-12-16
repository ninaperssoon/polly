<template>
   <h1> {{uiLabels.yourePlaying}} {{pollId}} Alla hamnar här </h1> 

  <div class="container">
    <div class="scene scene--card">
      <div class="card" v-bind:class="{ flipme: cardOne == 'flipped' }">
      
        <div class="card__face card__face--front">

          
          <p v-if="(this.question !== null)"> {{this.playingName}} is answering: <br> {{this.question.q}} </p>
          <p v-else>You have reached the end of the quiz!
            <br>
            <router-link class="button" v-bind:to="('/join/'+lang)"> Join another quiz </router-link>
            <router-link class="button" v-bind:to="('/')"> Return to homepage </router-link>

          </p>
          

        </div>
        <div class="card__face card__face--back" v-bind:class="{ correct: ans == 'correct'}">
        <p><span id="correctness"> {{this.ans}}! </span> <br> {{playingName}}'s {{this.con}} is {{this.consequence}} </p>
        </div>
      </div>
      <div id="buttonContainer">  
        <!-- <QuestionComponent v-bind:question="question" v-on:answer="submitAnswer" v-if="visibleButtons"/>    -->
        <VotingRewardComponent v-bind:voting="voting" v-on:voteR="submitVoteR" v-if="visibleRewards"/>
        <VotingPunishmentComponent v-bind:voting="voting" v-on:voteP="submitVoteP" v-if="visiblePunishments"/>
      
        <!-- <VotingComponent v-bind:voting="voting" v-on:voteR="submitVoteR" v-on:voteP="submitVoteP"  v-if="visibleButtons"/> -->
      
    </div>

    </div>
  </div>
 

</template>

<script>
// @ is an alias to /src
// import QuestionComponent from '@/components/QuestionComponent.vue';
// import VotingComponent from '@/components/VotingComponent.vue';
import VotingRewardComponent from '@/components/VotingRewardComponent.vue';
import VotingPunishmentComponent from '@/components/VotingPunishmentComponent.vue';
import io from 'socket.io-client';

const socket = io();

export default {
  name: 'ObsView',
  components: {
    // QuestionComponent, 
    // VotingComponent,
    VotingRewardComponent,
    VotingPunishmentComponent,
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
      rewards: [],
      punishments: [],
      consequence: "",
      visibleRewards: true,
      visiblePunishments: true,
      playingName: "",
      voting: { r: [],
                p: []},
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinObs', this.pollId)
    socket.on("newQuestion", q =>{
      this.question = q
      console.log(this.cardOne)
      if (this.cardOne !== "start"){
        this.cardOne = 'start';       
      }
      if(q !== null){
        this.visiblePunishments=true;
        this.visibleRewards= true;
      }
    }
    )
    
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    this.name = this.$route.params.name;
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

    socket.on("getVotingRewards", (data) => {
      this.voting.r = data
      console.log("Inkommande rötsning r:", this.voting.r)
    }
    )
    socket.on("getVotingPunishments", (data) =>{
      this.voting.p = data
      console.log("Inkommande rötsning p:", this.voting.p)
     } )
    socket.on("answeringParticipant", (data) =>{
      this.playingName=data
      console.log("answeringParticipant:  ", data)
      console.log(this.playingName)
      if (this.name == data){
        this.$router.push('/poll/'+this.pollId+'/'+this.lang+'/'+this.name)
      }
    })
    socket.on("flipUpdate", data =>{
      this.ans = data.wor
      this.con = data.con
      this.consequence= data.consequence
      console.log(this.consequence)
      console.log(this.playingName)
      this.cardOne = 'flipped'
    })
  },
  methods: {
    // submitAnswer: function (answer) {
    //   console.log(answer)
    //   socket.emit("submitAnswer", {pollId: this.pollId, answer: answer.a})
    //   this.cardOne == 'start' ? (this.cardOne = 'flipped' ) : (this.cardOne = 'start' );
    //   this.ans = this.question.s[answer.index];

    //   if (this.ans == 'correct') {
    //     this.con = "reward"
    //     this.consequence = this.rewards[Math.floor(Math.random() * (this.rewards.length))]
    //   }
    //   else {
    //     this.consequence = this.punishments[Math.floor(Math.random() * (this.punishments.length))]
    //   }
    //   this.visibleButtons=false;
    //   console.log(this.rewards)
      
    // },

     submitVoteR: function (vote) {
      console.log(vote)
      socket.emit("submitVoteR", {pollId: this.pollId, vote: vote.v, index: vote.index})
      this.visibleRewards=false;
     
      
    },
    submitVoteP: function (vote) {
      console.log(vote)
      socket.emit("submitVoteP", {pollId: this.pollId, vote: vote.v, index: vote.index})
      this.visiblePunishments=false;
  },
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
  text-align: center;
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

.button {
    color:black;
    margin: 1em;
    text-decoration:none; 
    background-color: rgb(235, 209, 106);
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    font-size:x-small;
    border-color: rgba(235, 209, 106, 0.689);
  }

  .button:hover {
    box-shadow: 0 5px 15px #0079918f;
    transform: translateY(-2px);

  }

</style>
