<template>
  
  <div id="consequenceBox" >
    <div id="inputReward">
      {{message}}
      <div id="rewardGrid">
        <input type="text"  class="input" placeholder="Write your reward here..." v-model="r">
        
        <button v-on:click="sendRewards">
           Send Reward
        </button>
        
        <button v-on:click="deleteReward" class="delButton">
          -
        </button>
      </div>
      </div>
   </div>
</template>

<script>



export default{
name: 'RewardsComponent',
props: {
reward: String,
message: String,
},

data: function(){
    return{
        r : this.reward,
        

    }

},
methods:{
  sendRewards: function (){
    this.$emit('myReward', {r: this.r})
    console.log("Sended reward: ", this.r)
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