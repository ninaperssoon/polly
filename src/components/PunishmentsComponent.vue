<template>

  <div id="consequenceBox" >
    
      {{message}} {{p}}
     
        <input type="text"  class="input" placeholder="Write your reward here..." v-model="p"  v-on:keypress="resetSavebutton()">
        

        <button v-on:click="sendPunishment" v-bind:style="{'background-color':savedbackground}" id="SaveButton">
          {{savetext}}
        </button>
        
        <button v-on:click="deletePunishment" class="delButton">
          -
        </button>
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


