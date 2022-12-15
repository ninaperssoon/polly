<template>
  
<body>
  <homeButton class="homeButton"></homeButton>
  <div class="pollLink">
    <p>{{uiLabels.Enternameyourquiz}} 
      <br> <br>
    <input type="text" v-model="id"> </p> 
  </div>
  <button v-on:click="createPoll" id="pollButton">
      {{uiLabels.Continuecreate}} 
  </button>


</body>

</template>

<script>
import io from 'socket.io-client';
import homeButton from '@/components/HomeComponent.vue';
const socket = io();

export default {
  name: 'CreateIdView',
  components: {
    homeButton
    
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "",
    }
  },
  methods: {
  
  createPoll: function() {
    socket.emit("createPoll", {pollId: this.id, lang: this.lang })
    socket.emit("anotherQuestion", {pollId: this.pollId})
    this.$router.push('/create/'+this.lang+'/'+this.id)
  }},

  created: function () {
     this.lang = this.$route.params.lang;
     socket.emit("pageLoaded", this.lang);
     socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  }
}
</script>

<style scoped>

  body {
    margin: 0;
    height: 46.5em;
    background-color: #A6E9A3;
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
  }
  #pollButton {
    color:black;
    margin: 1em;
    text-decoration: none; 
    background-color: #FFF1AD;
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    border-color: #FFF1AD;
    font-size: 1.5em;
    color: #F87575;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
  }

  #pollButton:hover {
    box-shadow: 0 5px 15px #0079918f;
    transform: translateY(-2px);
    cursor: pointer;
  }

  .pollLink {
    font-size:1.5em;
    margin: auto;
    background-color: #5C95FF;
    height: 10em;
    width: 30em;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 3em;
    border-style:outset;
    border-color: #5C95FF;
    color: #FFF1AD;
    font-weight: bold;

  }
  input {
    padding-left: 0.5em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    font-size:medium;
    border-radius: 1em;
    border-color:#5C95FF;
    border-radius: 1em;
    border-style: outset;
  }
  
</style>
