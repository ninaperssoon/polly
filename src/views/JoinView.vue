<template>
<body>
  <homeButton></homeButton>
  <section>
    <div id="top"> </div>
    <div id="joinQuiz">
    <div>
    <p> {{uiLabels.EnterYourName}} </p>
    <input type="text" v-model="name">
    </div>
    <div>
   <p> <label>
    {{uiLabels.writeQuizId}}: 
    <input type="text" v-model="id">
  </label>
  <button id="joinbutton" v-on:click="sendName" >{{uiLabels.joinQuiz}}</button>
  </p>



  <!-- <router-link id="joinbutton" v-bind:to="('/poll/'+id+'/'+lang)" v-on:click="sendName" >{{uiLabels.joinQuiz}}</router-link> </p> -->
  </div>
  </div>

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
  #top {
    height: 12em;
  }

  #joinbutton {
    margin: 1em;
    text-decoration: none; 
    background-color: rgb(235, 209, 106);
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    border-color: rgba(235, 209, 106, 0.689);
  }

  #joinbutton:hover {
    box-shadow: 0 5px 15px black;
  }

  input {
    border-radius: 1em;
  }
  
</style>
