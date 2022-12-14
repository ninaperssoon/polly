<template>

  <div id="consequenceBox" >
    <div id="inputReward">
      {{uiLabels.punishment}}
      <div id="rewardGrid">
        <input type="text" v-model="p" class="input" :placeholder="uiLabels.WritePunishmentHere" >

        <button v-on:click="sendPunishment">
          {{uiLabels.SendPunishment}}
        </button>
        
        <button v-on:click="deletePunishment" class="delButton">
          -
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default{
name: 'PunishmentsComponent',
props: {
punishment: String
},

data: function(){
  return{
    p : this.punishment,
    lang: "",
    uiLabels: {}
      

  }

},
created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    
    } )
  },
methods:{
  sendPunishment: function (){
    this.$emit('myPunishment', {p: this.p})
    console.log("Sended punishment: ", this.p)
  },
    deletePunishment: function() {
      this.$emit('deletePunishment', {p: this.p})
    },

}

}
</script>


<style>
#consequenceBox{
height: 8em;
}
#inputReward {
  
  margin: 2em 3em 2em 3em;
  padding-right: 2em;

}

#rewardGrid {
  
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 90% 10%;
  

}
.input {
  border-radius: 1em;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  display: grid;
}
.delButton {
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  margin-top: 1em;

}


</style>