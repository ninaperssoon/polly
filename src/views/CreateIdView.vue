<template>
  
<body>
  <homeButton></homeButton>
  <div class="pollLink">
    Enter the name of your quiz: 
    <input type="text" v-model="id">
    <button v-on:click="createPoll" id="pollButton">
      Continue to create the quiz
    </button>
    </div>


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
    background-color: rgb(235, 209, 106);
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    border-color: rgba(235, 209, 106, 0.689);
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

  }

  input {
    border-radius: 1em;
  }
  
  
</style>
