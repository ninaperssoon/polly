<template>

  <div id="myBackground">

    <homeButton class="homeButton"></homeButton>
  
  <div class="wrapper">

    <div class="innerWrapper"  >
      
      <h1>{{uiLabels.rewards}}</h1>
      <br>

      <Reward  v-for=" (reward, index) in rewards"
      v-bind:reward= "reward"
      v-bind:key="reward"
      v-on:myReward="sendReward($event, index)"
      v-on:deleteReward="deleteReward($event, index)"
      message ="reward"
      class="reward"/>

      <button v-on:click="newReward" class="addButton" id="addButtonReward">
        + {{uiLabels.AddReward}}
      </button> 
    </div>


    <div  class="innerWrapper" >
      <h1>{{uiLabels.punishments}}</h1>
      <br>
      
      <Punishment v-for=" (punishment, index) in punishments"
      v-bind:punishment = "punishment"
      v-bind:key="punishment"
      v-on:myPunishment="sendPunishment($event, index)"
      v-on:deletePunishment="deletePunishment($event, index)"
      message = "punishment"
      class="punishment" />
    
      <button v-on:click="newPunishment" class="addButton" id="addButtonPunishment">
        + {{uiLabels.AddPunishment}}
      </button> 

      
    </div>
  </div>


    <div class="nextButton">
      <div id="testButton">
        <router-link v-bind:to="'/host/'+pollId+'/'+lang" > 
        <button id="submitButton" v-on:click="sendPollIdToH()">
          {{uiLabels.TestQuiz}}
      </button > </router-link>
      </div>


      <div id="saveButton">
        <router-link v-bind:to="'/start/'+lang"> 
        <button id="submitButton" >
        {{uiLabels.SaveandExit}}
      </button> </router-link>
    </div>
  </div>
  <div id="backButton">
    
    <router-link v-bind:to="('/create/'+lang+'/'+pollId)"><img class="flipPic" src="../../public/img/leftfliparrow.png"/></router-link>
    </div>

  </div>

   
</template>

<script>
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
//import consequences from '@/components/consequences.vue';
import Reward from '@/components/RewardsComponent.vue';
import Punishment from '@/components/PunishmentsComponent.vue';
const socket = io();


export default {
  name: 'CreaterewardView',
  components: {
    homeButton, 
    //consequences,
    Reward,
    Punishment
  },
  data: function () {
    return {
      lang: "",
      pollId: "",
      uiLabels: {},
      text: "",
      consequences: {r: [], p:[]},
      rewards: [],
      punishments: [],
    }
  },
  created: function () {

    this.pollId = this.$route.params.id
    //socket.emit('joinPoll', this.pollId)

    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.emit("joinCreatereward", this.pollId);
    socket.on("getRewards", (data) => {
      this.rewards = data
    })
    socket.on("getPunishments", (data) => {
      this.punishments = data
    })
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)

    socket.on("rewardUpdate", (data) =>{
      this.rewards= data
      console.log("Skickade rewards från data:", data)
      console.log(this.rewards)
    })
    socket.on("punishmentUpdate", (data) =>{
      this.punishments= data
      console.log("Skickade punishments från data:", data)
      console.log(this.punishments)
    })


  },
  methods: {
    newReward: function () {
      socket.emit("newReward", {pollId: this.pollId} )
      
    },
    sendReward: function (event, index) {
      console.log("reward: ", event.r)
      socket.emit("sendReward", {pollId: this.pollId, index: index, r: event.r} )
      
    },

    deleteReward: function(event,index){
      console.log("det här är index: ", index);
      socket.emit("deleteReward",{pollId: this.pollId, index: index, r: event.r} )
      console.log(this.rewards);
       
    },
    newPunishment: function () {
      socket.emit("newPunishment", {pollId: this.pollId} )
      
    },
    sendPunishment: function (event, index) {
      socket.emit("sendPunishment", {pollId: this.pollId, index: index, p: event.p } )
      console.log("punishment: ", event.p)
    },
    deletePunishment: function(event,index){
      console.log("det här är index: ", index);
      socket.emit("deletePunishment",{pollId: this.pollId, index: index, p: event.p} )
      console.log(this.punishments);
       
    },
    sendPollIdToH: function(){
      socket.emit("comenceQuiz",{pollId: this.pollId});
    }

  }
}
</script>

<style scoped>

h1{
display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 4em; 
  text-shadow: .08em .08em 0 #4779d6;
}
  
#myBackground{
  margin: auto;
    background-color: #A6E9A3 ;
    text-align: center;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    position:fixed;
    overflow-y: auto;
    overflow-x: hidden
    ;

}

#addButtonPunishment{
  background-color: #F87575;
    border-color: #F87575;
    
}

#addButtonReward{
  background-color:  #5C95FF;
  border-color:  #5C95FF;

}

button:hover {
  background-color: lightgreen;
  cursor:pointer;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin-top:-5em;
}

.innerWrapper {
grid-template-columns: 1fr;
padding: 1em;

}

.nextButton {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1em;
}

#testButton {
  grid-column: 1;
  margin-left: 70%;
}
#saveButton {
  grid-column: 2;
  margin-right: 70%;
}


.reward{
grid-column: 1;
grid-row: auto;
background-color: #5C95FF;
border-radius: 2em;

}
.punishment{
grid-column: 2;
grid-row: auto;
background-color: #F87575;;
border-radius: 2em; 

}


.addButton {
  padding: 0.5em;
  font-size: 1.5em;
  border-radius: 3em;
  color: #FFF1AD;
  font-weight: bold;
  width: 10em;  
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

#submitButton{
    padding: 0.5em;
    background-color: #FFF1AD;
    border-color: #fff1adbd;
    color: #F87575;
    font-size: 1.5em;
    width: 8em;
    border-radius: 3em;
    font-weight: bolder;
}

button:hover {
  box-shadow: 0 5px 15px #80B57D;
    transform: translateY(-2px);
}

</style>