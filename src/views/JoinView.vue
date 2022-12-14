<template>
<body>
  <homeButton class="homeButton"></homeButton>
  <section>
    <h1>Join Quiz</h1>
   
    <div id="joinQuiz">

      <div id="name">
        <p> 
          <label>
            {{uiLabels.EnterYourName}}
            <input type="text" v-model="name">
          </label> 
        </p>
      </div>

      <div id="id">
        <p> 
        <label>
          {{uiLabels.writeQuizId}}: 
          <input type="text" v-model="id">
        </label>
        </p>
      </div>

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
  input {
    font-size: 1em;
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
    box-shadow: 0 5px 15px #439A86;
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

  #joinQuiz {
    padding: 1em;
    display: grid;
    grid-template-rows: 3em 3em;
    grid-gap: 1em;
  }

  #name {
    grid-row: 1;
  }

  #id {
    grid-row: 2;
  }

</style>
