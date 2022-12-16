<template>

<div id="consequenceBox" >
     
        {{message}}
        <div id="rewardGrid">
          <input type="text"  class="input" placeholder="Write your reward here..." v-model="r">


          
          <button v-on:click="sendRewards">
                 Save {{message}}
              </button>
          
          <button v-on:click="deleteReward" class="delButton">
            -
          </button>


      
      </div>
   </div>
   <div id="consequenceBox" >
    <div id="inputReward">
      {{message}}
      <div id="rewardGrid">
        <input type="text"  class="input" placeholder="Write your reward here..." v-model="p">

        <button v-on:click="sendPunishment">
          Send Punishment
        </button>
        
        <button v-on:click="deletePunishment" class="delButton">
          -
        </button>
      </div>
    </div>
  </div>
</template>

<script>



export default{
name: 'PunishmentReward',
props: {
consequencse: Object,
message: String,
},

data: function(){
    return{
        r : this.consequences.r,
        p: this.consequences.p
        

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