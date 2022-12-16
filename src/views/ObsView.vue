<template>
  <div class="body">
    <homeButton class="homeButton"></homeButton>
   <h1> {{uiLabels.yourePlaying}}{{pollId}}</h1> 

  <div class="container">
    <div class="scene scene--card">
      <div class="card" v-bind:class="{ flipme: cardOne == 'flipped' }">
      
        <div class="card__face card__face--front">

          
          <p v-if="(this.question !== null)"> {{this.playingName}} {{uiLabels.IsAswering}} <br> {{this.question.q}} </p>
          <p v-else>{{uiLabels.ReachedEndQuiz}}
            <br><br>
            <router-link class="button" v-bind:to="('/join/'+lang)"> {{uiLabels.joinanotherquiz}} </router-link>
            <router-link class="button" v-bind:to="('/')"> {{uiLabels.Returntohomepage}} </router-link>

          </p>
          

        </div>
        <div class="card__face card__face--back" v-bind:class="{ correct: ans == uiLabels.correct}">
        <p><span id="correctness"> {{this.ans}}! </span> <br> {{playingName}}{{uiLabels.s}} {{this.con}} {{uiLabels.is}} {{this.consequence}} </p>
        </div>
      </div>
      <div id="buttonContainer">  
        <!-- <QuestionComponent v-bind:question="question" v-on:answer="submitAnswer" v-if="visibleButtons"/>    -->
        <VotingComponent v-bind:voting="voting.r" v-on:vote="submitVoteR" v-if="visibleRewards" message="#A6E9A3"/>
        <VotingComponent v-bind:voting="voting.p" v-on:vote="submitVoteP" v-if="visiblePunishments" message="#F87575"/>
      
        <!-- <VotingComponent v-bind:voting="voting" v-on:voteR="submitVoteR" v-on:voteP="submitVoteP"  v-if="visibleButtons"/> -->
      
    </div>

    </div>
  </div>
 
</div>
</template>

<script>
// @ is an alias to /src
// import QuestionComponent from '@/components/QuestionComponent.vue';
import VotingComponent from '@/components/VotingComponent.vue';
// import VotingRewardComponent from '@/components/VotingRewardComponent.vue';
// import VotingPunishmentComponent from '@/components/VotingPunishmentComponent.vue';
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';

const socket = io();

export default {
  name: 'ObsView',
  components: {
    homeButton,
    // QuestionComponent, 
    VotingComponent,
    // VotingRewardComponent,
    // VotingPunishmentComponent,
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
    this.lang = this.$route.params.lang;
    this.name = this.$route.params.name;

    socket.emit('joinObs', this.pollId)
    socket.emit("pageLoaded", this.lang);

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
    })
    
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
      this.ans = data.wor === "correct"?this.uiLabels.correct:this.uiLabels.incorrect
      this.con = data.con === "punishment"?this.uiLabels.punishment2:this.uiLabels.reward
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

.body {
  /* background-color: #A6E9A3; */
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
  text-align: center;
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

#buttonContainer {
  margin-top: 1em;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: 1fr;
}

.correct {
  background-color: #5C95FF;
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
  margin-top: -5em;
  }

</style>
