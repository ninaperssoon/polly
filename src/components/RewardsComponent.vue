<template>
  
  <div id="consequenceBox" >
    
      {{uiLabels.reward}}
      <div id="rewardGrid">
        <input type="text"  class="input" v-model="r" :placeholder= "uiLabels.WriteRewardHere" >
        
        <button v-on:click="sendRewards" v-bind:style="{'background-color': savedColor}">
           {{uiLabels.SaveReward}}
        </button>
        
        <button v-on:click="deleteReward" class="delButton">
          -
        </button>
      </div>
      </div>
 
</template>

<script>

import io from 'socket.io-client';
const socket = io();


export default{
name: 'RewardsComponent',
props: {
reward: String,
message: String,
},

data: function(){
    return{
        r : this.reward,
        lang: "",
        uiLabels: {},
        textett : "",
        savedColor: ""
        

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
  sendRewards: function (){
    this.$emit('myReward', {r: this.r})
    console.log("Sended reward: ", this.r)
    this.savedColor = "olivedrab ";
  },
    deleteReward: function() {
      this.$emit('deleteReward', {r: this.r})
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
  grid-template-columns: 8fr 2fr;
  

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
  
  margin-top: 1em;

}


</style>