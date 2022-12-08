<template>

<div id="consequenceBox" >
     
        {{message}}
        <div id="rewardGrid">
          <input type="text"  class="input" placeholder="Write your reward here..." v-model="reward">


          
          <button v-on:click="sendRewards">
                 Save {{message}}
              </button>
          
          <button v-on:click="deleteReward" class="delButton">
            -
          </button>
      
      </div>
   </div>
</template>

<script>



export default{
name: 'PunishmentReward',
props: {
consequence: Object,
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
      this.rewards.pop("")
    },

}

}
</script>


<style>
/*#consequenceBox{
height: 1em;
}
*/

#rewardGrid {
  background-color: blue;
  display: grid;
  grid-gap: 83m;
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
  width: 2.5em;
  height: 2.5em;
  
  margin-top: 1em;

}


</style>