<template>
<div class="body">
  <homeButton class="homeButton"></homeButton>
  <div id="wrapper">
    <h2>{{uiLabels.yourePlaying}}{{pollId}}</h2>
    <div class="container">
      <div class="scene scene--card">
        <div class="card" v-bind:class="{ flipme: cardOne == 'flipped' }">
      
          <div class="card__face card__face--front">
            <p v-if="(this.isJoker == true)">  <JokerComponent></JokerComponent> <br> {{ this.playingName }} {{uiLabels.isJoker}} </p>
            <p v-else-if="(this.vote == true && this.lang!=='fi')"> {{ uiLabels.placeVote}}{{this.playingName}}{{uiLabels.s}} {{ uiLabels.rewardpunishment }} </p>
            <p v-else-if="(this.vote == true && this.lang=='fi')"> {{ uiLabels.placeVote}}{{ uiLabels.rewardpunishment }}{{this.playingName}}{{uiLabels.willGet}}  </p>
            <p v-else-if="(this.question !== null)"> {{this.playingName}} {{uiLabels.IsAswering}} <br> {{this.question.q}} </p>
            <p v-else>{{uiLabels.ReachedEndQuiz}}
              <br><br>
              <router-link class="button" v-bind:to="('/join/'+lang)"> {{uiLabels.joinanotherquiz}} </router-link>
              <router-link class="button" v-bind:to="('/')"> {{uiLabels.Returntohomepage}} </router-link>
            </p>
          </div>
        <div class="card__face card__face--back" v-bind:class="{ correct: ans == uiLabels.correct}">
          <p v-if="(this.consequence !== '' && this.lang!=='fi')"><span id="correctness"> {{this.ans}}! </span> <br> {{playingName}}{{uiLabels.s}} {{this.con}} {{uiLabels.is}} {{this.consequence}} </p>
          <p v-else-if="(this.consequence !== '' && this.lang=='fi')"><span id="correctness"> {{this.ans}}! </span> <br> {{playingName}}{{uiLabels.willGet}}{{this.con}}: {{this.consequence}}   </p>
          <p v-else id="correctness"> {{this.ans}}! </p> 
        </div>
      </div>
      <div id="buttonContainer">  
        <!-- <p v-if="visibleRewards" class="textbutton" id="textbuttonflip"> Flip </p>         -->
        <VotingComponent v-bind:voting="voting.r" v-on:vote="submitVoteR" v-if="visibleRewards" message="#A6E9A3"/> 
        <!-- <p v-if="visiblePunishments" class="textbutton" id="textbuttonflop"> Flop</p>  -->
        <VotingComponent v-bind:voting="voting.p" v-on:vote="submitVoteP" v-if="visiblePunishments" message="#F87575"/>
      </div>
    </div>
  </div>
</div>
 
</div>
</template>

<script>
import VotingComponent from '@/components/VotingComponent.vue';
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
import JokerComponent from '@/components/JokerComponent.vue';

const socket = io();

export default {
  name: 'ObsView',
  components: {
    homeButton,
    VotingComponent,
    JokerComponent,
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
      vote: false,
      isJoker: false,
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
      this.isJoker = false;
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
  socket.on("checkVoting", (data) => {
    // console.log("ObsView.vue: checkVoting: ", data)
    if(data == true){
      this.vote=true
    }
    else{
      this.vote=false
    }
  })

    socket.on("getVotingRewards", (data) => {
      this.voting.r = data
      // console.log("Inkommande rötsning r:", this.voting.r)
    }
    )
    socket.on("getVotingPunishments", (data) =>{
      this.voting.p = data
      // console.log("Inkommande rötsning p:", this.voting.p)
     } )
    socket.on("answeringParticipant", (data) =>{
      this.playingName=data
      // console.log("answeringParticipant:  ", data)
      if (this.name == data){
        this.$router.push('/poll/'+this.pollId+'/'+this.lang+'/'+this.name)
      }
    })

    socket.on("flipUpdate", data =>{
      // console.log("flipUpdate, ObsView.vue, data:", data)
      if(typeof data.name !== 'undefined'){
        this.playingName=data.name
      }
      this.ans = data.wor === "correct"?this.uiLabels.correct:this.uiLabels.incorrect
      this.con = data.con === "punishment"?this.uiLabels.punishment2:this.uiLabels.reward
      this.consequence= data.consequence
      this.cardOne = 'flipped'
    })
    socket.on("Joker", data =>{
      // console.log("ObsView, Joker, data", data)
      if (data == true){
      this.cardOne = 'start'
      this.isJoker = true
      }

    })
  },
  methods: {
     submitVoteR: function (vote) {
      socket.emit("submitVoteR", {pollId: this.pollId, vote: vote.v, index: vote.index})
      this.visibleRewards=false;
     
      
    },
    submitVoteP: function (vote) {
      socket.emit("submitVoteP", {pollId: this.pollId, vote: vote.v, index: vote.index})
      this.visiblePunishments=false;
  },
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
}
.scene {
  margin-top: -10em;
  width: 25em;
  height: 26em;
  perspective: 125em;
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
  font-size: 1.5em;
  line-height: 2em;
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
  box-shadow: 0 0.3em 1em #c0ac48;
}

.card__face--back {
  background: #F87575;
  transform: rotateY(180deg); 
  border-color: #f76868;
  box-shadow: 0 0.3em 1em #bb3939 ;
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
  box-shadow: 0 0.3em 1em #2453a9 ;
}

#correctness {
  font-size: 2em;
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
    box-shadow: 0 0.3em 1em #c0ac48;
    transform: translateY(-0.125em);

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

  @media screen and (max-width:50em) {
h1 {
  margin-top: 0em;
  font-size: 9vw;
}

  }
  .textbutton{
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    font-weight: bold;
    
    font-size: 1.8em;
  }
  #textbuttonflip{
    color:  #eb8cb0;
    text-shadow: .08em .08em 0 #97b13e;

  }
  #textbuttonflop{
    color: #97b13e;
    text-shadow: .08em .08em 0 #eb8cb0;

  }
</style>
