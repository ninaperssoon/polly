<template>
<div id="body">
  <div class="upperGrid">
    <homeButton class="homeButton"></homeButton>
    <button id="ft" v-on:click="rules"><img id="questionmark" src="../../public/img/frågetecken.png"> </button>
  </div>

  <div class="wrapper">
    <div class="innerWrapper">
      <h1>{{uiLabels.rewards}}</h1>
      <br>

      <Consequence  v-for=" (reward, index) in rewards"
        v-bind:consequence= "reward"
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
      
      <Consequence v-for=" (punishment, index) in punishments"
        v-bind:consequence = "punishment"
        v-bind:key="punishment"
        v-on:myReward="sendPunishment($event, index)"
        v-on:deleteReward="deletePunishment($event, index)"
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
        {{uiLabels.hostThisQuiz}}
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
    <router-link v-bind:to="('/create/'+lang+'/'+pollId)">
      <img class="flipPic" src="../../public/img/leftarrow.png"/>
    </router-link>
  </div>
</div>
</template>

<script>
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
import Consequence from '@/components/consequencesComponent.vue';
import swal from 'sweetalert';
const socket = io();

export default {
  name: 'CreaterewardView',
  components: {
    homeButton, 
    Consequence,
    
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
      // console.log("Skickade rewards från data:", data)
    })
    socket.on("punishmentUpdate", (data) =>{
      this.punishments= data
      // console.log("Skickade punishments från data:", data)
    })


  },
  methods: {
    newReward: function () {
      socket.emit("newReward", {pollId: this.pollId} )
      
    },
    sendReward: function (event, index) {
      // console.log("reward: ", event.r)
      socket.emit("sendReward", {pollId: this.pollId, index: index, r: event.c} )
      
    },

    deleteReward: function(event,index){
      // console.log("det här är index: ", index);
      socket.emit("deleteReward",{pollId: this.pollId, index: index, r: event.c} )
       
    },
    newPunishment: function () {
      socket.emit("newPunishment", {pollId: this.pollId} )
      
    },
    sendPunishment: function (event, index) {
      socket.emit("sendPunishment", {pollId: this.pollId, index: index, p: event.c } )
      // console.log("punishment: ", event.r)
    },
    deletePunishment: function(event,index){
      // console.log("det här är index: ", index);
      socket.emit("deletePunishment",{pollId: this.pollId, index: index, p: event.c} )
       
    },
    sendPollIdToH: function(){
      socket.emit("comenceQuiz",{pollId: this.pollId});
    },

    rules: function(){
      if (this.lang == "en") {
        swal({
          title: "How to use Rewards & Penalties ",
          text: "Here you create your rewards and penalties. They are used in the quiz when a player answers a question: they will get a reward if they answer correctly and a penalty if they answer incorrectly. Rewards and penalties are not tied to specific questions, which means that you can also choose to play entirely without them. Remember to save them all before moving forward!" ,
          button: "Got it!"
        })
      }
      else if(this.lang=="sv") {
        swal({
          title: "Hur du använder belöningar och bestraffningar",
          text: "Här skapar du dina belöningar och bestraffningar. De används i quizet när en spelare besvarar en fråga: de kommer att få en belöning om de svarar rätt och en bestraffning om de svarar fel. Belöningar och bestraffningar är inte bundna till några specifika frågor, så du kan välja att spela helt utan dem om du vill. Kom ihåg att spara dem innan du går vidare! ",
          button: "Fattar!"
        })
      }
      else if(this.lang=="fi") {
        swal({
          title: "Kuinka käytät palkintoja ja rangaistuksija",
          text: "Tässä luot palkintosi ja rangaistuksesi. Niitä käytetään quizzissä kun pelaaja vastaa kysymykseen: jos vastaa oikein, saa palkinnon ja jos vastaa väärin, saa rangaistuksen. Palkinnot ja rangaistukset ei ole sidottu mihinkään tiettyyn kysymykseen, niin voit pelata ilman niitä jos haluat. Muista tallentaa ne ennen kun jatkat! ",
          button: "Fattar!"
        })
      }
    }
  }
}
</script>

<style scoped>

h1{
  font-size: 4em; 
}
  
#body{
  margin: auto;
  padding-right: 1em;
  background-color: #A6E9A3 ;
  text-align: center;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  position:fixed;
  overflow-y: auto;
  overflow-x: hidden;

}

#addButtonPunishment{
  background-color: #F87575;
  border-color: #F87575;
    
}

#addButtonReward{
  background-color:  #5C95FF;
  border-color:  #5C95FF;
}

.wrapper {
  display: grid;
  grid-gap: 0.625em;
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
  padding-top: 3em;
  padding-left: 20em;
  padding-right: 20em;
}

#testButton {
  grid-column: 1;
}

#saveButton {
  grid-column: 2;
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
  font-size: 1.2em;
  border-radius: 3em;
  color: #FFF1AD;
  font-weight: bold;
  width: 10em;  
}

#backButton{
  margin-right: 85%;
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

.upperGrid {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 1fr;
  }

.homeButton {
  grid-column: 1;
  grid-row: 1;
  }

#questionmark{
  height: 5em;;
  width: 5em;;
}
  
#ft{
  background-color: transparent;
  border: none;
  grid-column: 3;
  grid-row: 1;
  box-shadow: none;
  
}

#ft:hover {
  animation: bounce 2s ease infinite;
}

@media screen and (max-width:80em) {
  .wrapper{
    grid-template-columns: 1fr;
  }
  .nextButton{
    padding-left: 0em;
    padding-right: 0em;
    font-size: 0.8em;
  }
  .wrapper {
    grid-gap: 0em;
  }
  h1 {
    margin-top:0.3em;
    margin-bottom: 0em;
    font-size: 3em;
  }
  .flipPic {
    height: 5em;
  }
}

</style>