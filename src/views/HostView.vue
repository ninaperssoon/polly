<template>
  <body>
    <homeButton></homeButton>
    <section>
      <h1>Host a quiz</h1>
      <div id="host">
        Enter quiz id: <input type="text" v-model="pollId">        
      </div>

     <!-- Kom ihåg att ändra länken nedan!!!! -->
      <router-link id="startQuiz" v-bind:to="'/poll/'+id">Start Quiz</router-link> 
   
      <div></div>

    </section>
  
</body>

</template>

<script>
import homeButton from '@/components/HomeComponent.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'HostView',
  components: {
    homeButton,
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },

  }
}
</script>
<style scoped>
  body {
    margin: 0;
    background-color: #BCD8C1;
    
  }

  div {
    height: 4.78em;
   
  }

  #host {
    font-size:1.5em;

    margin: auto;
    margin-top: 2em;
    height: 20em;
    width: 30em;
    background-color: #007991;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
    border-style: outset;
    border-color: #0079918f;

  }

  #startQuiz {
    font-size:1.5em;
    background-color: rgb(235, 209, 106);
    border-color: rgba(235, 209, 106, 0.689);
    text-decoration: none;
    height: 2.5em;
    width: 8em;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 5em;
    margin-bottom: 5em;
    border-radius: 2em;
    border-style: outset;
    padding-top: 1.5em;
  }

  #startQuiz:hover {
    box-shadow: 0 5px 15px #0079918f;

  }
 
</style>
