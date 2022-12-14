<template>

  <div id="consequenceBox" >
    
      {{uiLabels.punishment}} {{p}}
     
        <input type="text" v-model="p" class="input" :placeholder="uiLabels.WritePunishmentHere" v-on:keypress="resetSavebutton()" >
        

        <button v-on:click="sendPunishment" v-bind:style="{'background-color':savedbackground}" id="SaveButton">
          {{uiLabels.SavePunishment}}
        </button>
        
        <button v-on:click="deletePunishment" class="delButton">
          -
        </button>
      </div>
  
 
</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default{
name: 'PunishmentsComponent',
props: {
punishment: String
},

data: function(){
  return{
    p : this.punishment,
    lang: "",
    uiLabels: {},
    savedbackground : "aqua",  
    savetext: " Save Punishment" 

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


