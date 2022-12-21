<template>
  <div>
  <div id="consequenceBox" >
    
     
        <input type="text"  class="input" v-model="c" :placeholder= "uiLabels.WriteRewardHere" v-on:keypress="resetSavebutton()" >
        
        <button v-on:click="sendRewards" v-bind:style="{'background-color': savedColor}" class="button" id="Savebutton">
           {{uiLabels.Save}}
        </button>
        
        <button v-on:click="deleteReward" class="delButton">
          <img class="button" src="../../public/img/trashcan.png"/>
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
consequence: String,
message: String,
},

data: function(){
    return{
        c : this.consequence,
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
    this.$emit('myReward', {c: this.c})
    console.log("Sended reward: ", this.c)
    
  },
    deleteReward: function() {
      this.$emit('deleteReward', {c: this.c})
    },
    resetSavebutton: function(){
      this.savedColor = "orange";
    }

}

}
</script>


<style scoped >
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
width: 4em;
  height: 2em; 
  font-size: 1.25em;
  grid-column: 2; 
  color:white;
  font:bolder;
  background-color: transparent;
  border-color: White;
  border-style:solid;
  border-radius: 0.5em;
  margin-top:0.2em;
}

.input {
 
  grid-column: 1;
  grid-row: 2;
  border-radius: 1em;
  padding: 12px 20px;
  box-sizing: border-box;

 
}
.delButton {
  background-color: transparent;
  border-style: solid;
  border-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 3;
  grid-row: 2;
}
.button{
  height: 3.25em;
}

.button:hover {
  transform: translateY(-2px);
}




</style>