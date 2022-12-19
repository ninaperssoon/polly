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
      hostingQuiz: ""
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

  #joinQuiz {
    display: grid;
    background-color: #A6E9A3 ;
    grid-template-columns: 1fr 1fr;
    padding: 1em;
    grid-gap: 2em;
    

    
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
    box-shadow: 0 5px 15px #80B57D;
    transform: translateY(-2px);

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
  margin-bottom: 1em;
  }

  #name {
    grid-column: 1;
    font-size:1.5em;
    margin: auto;
    margin-left: 30%;
    background-color: #5C95FF;
    height: 10em;
    width: 20em;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 3em;
    border-style:outset;
    border-color: #5C95FF;
    color: #FFF1AD;
    font-weight: bold;
    
  }

  #id {
    grid-column: 2;
    font-size:1.5em;
    margin: auto;
    margin-right: 30%;
    background-color: #5C95FF;
    height: 10em;
    width: 20em;
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
    border-style: outset;
  }

</style>
