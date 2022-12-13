<template>

  <div id="consequenceBox" >
    <div id="inputReward">
      {{message}}
      <div id="rewardGrid">
        <input type="text"  class="input" placeholder="Write your reward here..." v-model="p"  v-on:keypress="resetSavebutton()">

        <button v-on:click="sendPunishment" v-bind:style="{'background-color':savedbackground}" id="SaveButton">
          {{savetext}}
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
name: 'PunishmentsComponent',
props: {
punishment: String,
message: String,
},

data: function(){
  return{
    p : this.punishment,
    savedbackground : "aqua",  
    savetext: " Save Punishment" 

  }

},
methods:{
  sendPunishment: function (){
   
    this.savedbackground = "olivedrab";
    console.log("color color color: "+ this.savedbackground)
    this.$emit('myPunishment', {p: this.p});
    console.log("Sended punishment: ", this.p);
    this.savedbackground = "olivedrab";
    this.savetext = "Saved!"
    
  },
    deletePunishment: function() {
      this.$emit('deletePunishment', {p: this.p})
    },
    resetSavebutton: function(){
      this.savedbackground = "orange";
      this.savetext = "save changes"
    }

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
#saveButton{
  border-radius: 50%;
}
#SaveButton:hover {
  background-color:lightgreen;
  
}


</style>