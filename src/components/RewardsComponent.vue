<template>
  <div>
  <div id="consequenceBox" >
    
      {{message}}
     
        <input type="text"  class="input" placeholder="Write your reward here..." v-model="r">
        
        <button v-on:click="sendRewards" v-bind:style="{'background-color': savedColor}" id="Savebutton">
           Save Reward
        </button>
        
        <button v-on:click="deleteReward" class="delButton">
          -
        </button>
     
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
        savedColor: ""
        

    }

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
display: grid;

grid-template-columns: 8fr 2fr ;
column-gap: 0.5em;
padding: 1em;
margin: 2em 1em 2em 1em ;
}

#Savebutton{
grid-column: 2;
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