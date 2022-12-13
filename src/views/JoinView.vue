<template>
<body>
  <homeButton></homeButton>
  <section>
    <h1>Join Quiz</h1>
   
   
    <div id="joinQuiz">
    <p> {{uiLabels.EnterYourName}} </p>
    <input type="text" v-model="name">
   <p> <label>
    {{uiLabels.writeQuizId}}: 
    <input type="text" v-model="id">
  </label>
  <button id="joinbutton" v-on:click="sendName" >{{uiLabels.joinQuiz}}</button>
  </p>
    
      
      <p>Enter your name: <input type="text" v-model="name"></p>
      
    <p><label>{{uiLabels.writeQuizId}}: <input type="text" v-model="id"></label></p>
    



  <!-- <router-link id="joinbutton" v-bind:to="('/poll/'+id+'/'+lang)" v-on:click="sendName" >{{uiLabels.joinQuiz}}</router-link> </p> -->

  </div>
  <button id="joinbutton" v-on:click="sendName" >{{uiLabels.joinQuiz}}</button>

</section>

</body>

</template>

<script>
import homeButton from '@/components/HomeComponent.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'JoinView',
  components: {
    homeButton
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "",
      name: "",
    }
  },
  methods: {
  
  sendName: function() {
    console.log("--- sendName i JoinView.vue ---")
    console.log("this.name: ", this.name)
    console.log("this.id: ", this.id)

    console.log(this.name)
    socket.emit("addParticipant", { name: this.name,
                            pollId: this.id }
                 );
    this.$router.push('/wait/'+this.id+'/'+this.lang+'/'+this.name)
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
    background-color: #A6E9A3;
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
  }

  #joinQuiz {
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
  }
  #joinbutton {
    margin: 1em;
    text-decoration: none; 
    background-color:#FFF1AD;
    padding: 0.5em;
    border-radius: 2em;
    border-style: outset;
    border-color: #FFF1AD;

    color: #F87575;
    font-size:1.5em;
    bottom: 0;
    right: 0;
    border-style: outset;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
  }

  #joinbutton:hover {
    box-shadow: 0 5px 15px black;
  }

  input {
    border-radius: 1em;
  }

  button:hover {
    cursor:pointer;
  }

  p {
    margin: 0.5em;
  }

  *, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  }

h1 {
  display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 4em; 
  text-shadow: .08em .08em 0 #4779d6;
  margin-bottom: 1em;
  }

  
</style>
