<template>
  <homeButton></homeButton>
  <div class="pollLink">
    Poll link: 
    <input type="text" v-model="pollId">
    <button v-on:click="createPoll" id="pollButton">
      Create poll
    </button>
  </div>

  <div class="wrapper">
 
    <div class="innerWrapper"  >

      <Reward  v-for=" (reward, index) in rewards"
      v-bind:reward= "reward"
      v-bind:key="reward"
      v-on:myReward="sendReward($event, index)"
      v-on:deleteReward="deleteReward($event, index)"
      message ="reward"
      class="reward"/>

      <button v-on:click="newReward" class="addButton">
        +
      </button> Add Reward
    </div>


    <div  class="innerWrapper" >
      <Punishment v-for=" (punishment, index) in punishments"
      v-bind:punishment = "punishment"
      v-bind:key="punishment"
      v-on:myPunishment="sendPunishment($event, index)"
      v-on:deletePunishment="deletePunishment($event, index)"
      message = "punishment"
      class="punishment" />
    

    
      <button v-on:click="newPunishment" class="addButton">
        +
      </button> Add Punishment

      
    </div>
  </div>
  <div id="backButton">
    
    <router-link v-bind:to="'/creater/'+lang"><img id="backPic" src="https://freesvg.org/img/pitr_green_arrows_set_4.png"/></router-link>
    </div>

    <div id="nextButton">
    
    <router-link v-bind:to="'/createq/'+lang"><img id="nextPic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMPs6LqvZihgtDeHWZ95Q0mEyUCRo5H5aJA&usqp=CAU"/></router-link>
    </div>

</template>

<script>
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
//import consequence from '@/components/consequence.vue';
import Reward from '@/components/RewardsComponent.vue';
import Punishment from '@/components/PunishmentsComponent.vue';
const socket = io();


export default {
  name: 'CreaterewardView',
  components: {
    homeButton, 
    //consequence,
    Reward,
    Punishment
  },
  data: function () {
    return {
      lang: "",
      pollId: "",
      uiLabels: {},
      text: "",
      //consequences: {r: [], p:[]},
      rewards: [],
      punishments: [],
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

  }
}
</script>

<style>
.pollLink {
  margin: 1em 2em 1em 70em;
  background-color:coral;
  border-radius: 2em;
  padding: 2em;

}

#pollButton {
  margin-top: 1em;
  border-radius: 1em;
}
button:hover {
  background-color:lightgreen;
  cursor:pointer;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50% 50%;
  margin-top: 5em;

}
.box{
   border-radius: 2em;
  padding: 1em;

}
.reward{
grid-column: 1;
grid-row: auto;
background-color: greenyellow;
border-radius: 1em;


}
.punishment{
grid-column: 2;
grid-row: auto;
background-color: red;
border-radius: 1em; 



}

.pollLink {
  margin: 1em 2em 1em 70em;
  background-color:coral;
  border-radius: 2em;
  padding: 2em;

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




.innerWrapper {
grid-template-columns: 1fr;
padding: 3em;
row-gap: 1 em;

}

.addButton {
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  margin: 18px 0;
}

.delButton:hover {
  background-color:salmon;

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
#nextButton{
  
  margin-left: 85%;
  padding: 20 em;
  
}

</style>