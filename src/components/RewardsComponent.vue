<template>
  <div>
  <div id="consequenceBox" >
    
     
        <input type="text"  class="input" v-model="r" :placeholder= "uiLabels.WriteRewardHere" >
        
        <button v-on:click="sendRewards" v-bind:style="{'background-color': savedColor}" id="Savebutton">
           {{uiLabels.SendReward}}
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
    this.savedColor = "#A6E9A3 ";
  },
    deleteReward: function() {
      this.$emit('deleteReward', {r: this.r})
    },

}

}
</script>


<style>
#consequenceBox{
display: grid;

grid-template-columns: 8fr 2fr ;
column-gap: 0.5em;
padding: 1em;
margin: 2em 1em 2em 1em ;
}

#Savebutton{
grid-column: 2;
padding: 0.5em;
    background-color: #FFF1AD;
    color: #F87575;
    font-size: 1.5em;
    border-radius: 3em;
}

.input {
 
  grid-column: 1;
  border-radius: 1em;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
 
}
.delButton {
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  margin-top: 1em;

}


</style>