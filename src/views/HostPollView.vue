<template>
  <div class="body">
      <homeButton class="homeButton"></homeButton>
  <div id="wrapper">
    <h1 v-if="(this.vote == true)"> {{ uiLabels.pleaceVote}}{{this.playingName}}{{uiLabels.s}} {{ uiLabels.rewardpunishment }} </h1>
    <h2> {{uiLabels.yourehosting}} {{pollId}} {{ voteRewards }} </h2> 


  <div class="container">
    
    <div class="scene scene--card">
      <div class="card" v-bind:class="{ flipme: cardOne == 'flipped' }">

        <div class="card__face card__face--front">

         <p v-if="(this.question !== null)">{{this.question.q}} <br> {{this.playingName}} {{uiLabels.IsAswering}}</p> 
          <p v-else>{{uiLabels.ReachedEndQuiz}}
            <br><br>
            <router-link class="button" id="yellow" v-bind:to="('/myquizzes/'+lang)"> {{uiLabels.Hostanotherquiz}} </router-link>
            <router-link class="button" id="yellow" v-bind:to="('/')"> {{uiLabels.Returntohomepage}} </router-link>
          </p>

        </div>
        <div class="card__face card__face--back" v-bind:class="{ correct: ans == uiLabels.correct}">
        <p v-if="(this.consequence !== '')"> <span id="correctness"> {{this.ans}}! </span> <br> {{this.playingName}}{{uiLabels.s}} {{this.con}} {{uiLabels.is}} {{this.consequence}}</p>
        <p v-else id="correctness"> {{this.ans}}! </p> 
      </div>
      </div>
      
      <div id="buttonContainer">  
        
        <VotingComponent v-bind:voting="voteRewards" v-on:vote="submitVoteR" v-if="visibleRewards" message="#A6E9A3"/>  
        <VotingComponent v-bind:voting="votePunishments" v-on:vote="submitVoteP" v-if="visiblePunishments" message="#F87575"/>
      
    </div>
    <div id="resetNext"> 
      <button v-on:click="nextQuestion" >
    {{uiLabels.NextQuestion}} 
  </button>
  <button v-on:click="resetQuiz">
    {{uiLabels.ResetQuiz}} 
  </button>
    </div>
    
  
    </div>
  </div>

 
</div>
</div>
</template>

<script>
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
import VotingComponent from '@/components/VotingComponent.vue';

const socket = io();

export default {
  name: 'HostPollView',
  components: {
    homeButton,
    VotingComponent,
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
      con: "punishment",
      name: "",
      questionNumber: 1,
      consequence: "",
      playingName: "",
      votesP: [],
      votesR: [],
      punishment: "",
      reward: "",
      amountOfVotesR: 0,
      amountOfVotesP: 0,
      voteRewards: [],
      votePunishments: [],
      allRewards: [],
      allPunishments: [],
      waitningVote: {
        p: true,
        r: true

      },
      voteNeeded: {
        r: "",
        p: ""
      },
      visibleRewards: true,
      visiblePunishments: true,
      vote: false,
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinHostPoll', this.pollId)
    socket.on("isVotingNeeded", (data) => {
      this.voteNeeded = data
      console.log("votedNeeded: ", this.voteNeeded)
      if (this.voteNeeded.r == "yes") {
        socket.emit("createRewardsVoting", this.pollId)
        console.log("HostPollView.vue, socket isVoitngNeeded: started voting for Rewards")
        this.waitningVote.r = false;
      }
      if (this.voteNeeded.p == "yes") {
        socket.emit("createPunishmentsVoting", this.pollId)
        console.log("HostPollView.vue, socket isVoitngNeeded: started voting for Punishments")
        this.waitningVote.p = false;
      }
    })
    socket.on("newQuestion", q => {
      this.question = q
      if(q !== null){
        this.visiblePunishments=true;
        this.visibleRewards= true;
      }
    })
    socket.on("checkVoting", (data) => {
    console.log("HostPollView.vue: checkVoting: ", data)
    if(data == true){
      this.vote=true
    }
    else{
      this.vote=false
    }
  })

    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    this.name = this.$route.params.name;
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("getPollRewards", (data) => {
      this.allRewards = data

    }
    )
    socket.on("getPollPunishments", (data) =>
      this.allPunishments = data
    )
    socket.on("getVotingRewards", (data) => {
      this.voteRewards = data
      console.log("HostPollView, getVotingRewards: ", this.voteRewards, data)
  
    }
    )
    socket.on("getVotingPunishments", (data) =>{
      this.votePunishments = data
      console.log("HostPollView, getVotingPunishments: ", this.votePunishments, data)
  })
    socket.on("flipUpdate", data => {
      this.ans = data.wor === "correct"?this.uiLabels.correct:this.uiLabels.incorrect
      this.con = data.con === "punishment"?this.uiLabels.punishment2:this.uiLabels.reward
      this.consequence = data.consequence
      this.cardOne = 'flipped'
      console.log("flipUpdate")
    })
    socket.on("answeringParticipant", (data) => {
      this.playingName = data
      console.log("answeringParticipant:  ", data)
      console.log(this.playingName)
    })
    socket.on("voteUpdateR", (data) => {
      console.log("tagit emot meddelande om röstR")
      if (data == "R-voting done") {
        socket.emit("votingDoneR", this.pollId)
        console.log("votingDoneR")
        this.waitningVote.r = true;
        if (this.waitningVote.p && this.waitningVote.r == true) {
          console.log("votingDone")
          socket.emit("votingDone", this.pollId)
        }
      }
    })
    socket.on("voteUpdateP", (data) => {
      console.log("tagit emot meddelande om röstP")
      if (data == "P-voting done") {
        socket.emit("votingDoneP", this.pollId)
        console.log("votingDoneP")
        this.waitningVote.p = true;
        if (this.waitningVote.p && this.waitningVote.r == true) {
          console.log("votingDone")
          socket.emit("votingDone", this.pollId)
        }
      }
    })

  },
  methods: {
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

    nextQuestion: function () {

      socket.emit("runQuestion", { pollId: this.pollId, questionNumber: this.questionNumber });
      this.questionNumber = this.questionNumber + 1;
      if (this.cardOne !== "start") {
        this.cardOne = 'start';
      }
      
      if (this.voteNeeded.r == "yes") {
        socket.emit("createRewardsVoting", this.pollId)
        console.log("HostPollView.vue, runQuestion: started voting for Rewards")
        this.waitningVote.r = false;
      }
      if (this.voteNeeded.p == "yes") {
        
        socket.emit("createPunishmentsVoting", this.pollId)
        console.log("HostPollView.vue, runQuestion: started voting for Punishments")
        this.waitningVote.p = false;
      }
    },
    resetQuiz: function () {
      socket.emit("runQuestion", { pollId: this.pollId, questionNumber: 0 });
      if (this.voteNeeded.r == "yes") {
        socket.emit("createRewardsVoting", this.pollId)
        console.log("HostPollView.vue, resetQuiz: started voting for Rewards")
        this.waitningVote.r = false;
      }
      if (this.voteNeeded.p == "yes") {
        socket.emit("createPunishmentsVoting", this.pollId)
        console.log("HostPollView.vue, resetQuiz: started voting for Punishments")
        this.waitningVote.p = false;
      }
     
      this.questionNumber = 1;
      if (this.cardOne !== "start") {
        this.cardOne = 'start';
      }
    }

  }
}

</script>

<style scoped>

.body {
  height: 100%;
  width: 100%;
  position: fixed;

  background-image: url("https://images.template.net/104478/pink-ocean-background-pdlb9.jpg?fbclid=IwAR1f5-_NQThWwcxCzlH0jRBLgD_Zh6ER41Kue--nu1mQAA5ybx0MyEwq3E4");
  background-repeat:no-repeat;
  background-size: cover;
  overflow: auto;
}

#wrapper {
    margin-top: -2em;
  }

.container{
  height: 40em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -10em;
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
  background-color:#F87575;
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
#resetNext{
  margin-top: 2em;
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
    box-shadow: 0 5px 15px rgb(158, 100, 145);
    transform: translateY(-2px);
    cursor: pointer;

  }

  @import url(https://fonts.googleapis.com/css?family=Righteous);

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  }

h1 {
  font-size: 4em; 
  margin-top: -5em;
  }
  h2 {
    margin-top: 1em;
    margin-bottom: -1em;
    font-weight: bold;
    color: white;
    text-shadow: .08em .08em 0 #4779d6;

  }

  button {
    margin-top: -10em;
    text-decoration: none; 
    background-color:#FFF1AD;
    padding: 0.5em;
    border-radius: 2em;
    border-style: outset;
    border-color: #FFF1AD;
    color: #F87575;
    font-size:1.5em;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
  }

  button:hover {
    cursor:pointer;
    box-shadow: 0 5px 15px rgb(158, 100, 145);
    transform: translateY(-2px);
  }

  #yellow:hover {
    box-shadow: 0 5px 15px #90875b;

  }
@media screen and (max-width:50em) {
h1 {
  margin-top: 0em;
  font-size: 9vw;
}

}
</style>
