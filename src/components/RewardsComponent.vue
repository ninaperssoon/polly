<template>
  <div>
  <div id="consequenceBox" >
    
     
        <input type="text"  class="input" v-model="r" :placeholder= "uiLabels.WriteRewardHere" >
        
        <button v-on:click="sendRewards" v-bind:style="{'background-color': savedColor}" id="Savebutton">
           {{uiLabels.Save}}
        </button>
        
        <button v-on:click="deleteReward" class="delButton">
         {{uiLabels.Delete}}
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


<style >
#consequenceBox{
display: grid;
grid-template-columns: 6fr 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr;
column-gap: 0.5em;
padding: 1em;
margin: 2em 1em 2em 1em ;
height:8em
}

#Savebutton{
grid-column: 2;
grid-row: 2;
    background-color: #FFF1AD;
    color: #F87575;
    font-size: 1em; 
    border-radius: 2em;
    font-weight: bold;
   
   
    
    
}

.input {
 
  grid-column: 1;
  grid-row: 2;
  border-radius: 1em;
  padding: 12px 20px;
  /* height:3.5em; */
  box-sizing: border-box;

  
 
}
.delButton {
    grid-column: 3;
    grid-row: 2;
    background-color: #FFF1AD;
    color: #F87575;
    font-size: 1em;
    border-radius: 2em;
    font-weight: bold;
    

}


</style>