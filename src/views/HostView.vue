<template>
  <body>
    <homeButton></homeButton>

    
    <section>
      <h1>{{uiLabels.hostQuiz}}</h1>
      <div id="host">
        <p> {{uiLabels.writeQuizId}}: 
          <br>
          <input type="text" v-model="id">  </p>
          
        
        
              
      </div>

     <!-- Kom ihåg att ändra länken nedan!!!! -->
      <router-link id="startQuiz" v-bind:to="('/host/'+id+'/'+lang)">{{uiLabels.startQuiz}}</router-link> 
   
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
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
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
    background-color:  #A6E9A3;
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    
  }

  div {
    height: 4.78em;
    line-height: 3em;
  }

  #host {
    font-size:1.5em;
    margin: auto;
    margin-top: 2em;
    height: 20em;
    width: 30em;
    background-color: #5C95FF;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
    border-style: outset;
    border-color: #5C95FF;

  }

  input {

    font-size: 1em;
    border-radius: 1em;
    border-style: outset;
  }

  #startQuiz {
    color: #F87575;
    font-size:1.5em;
    background-color: #FFF1AD;
    border-color: #FFF1AD;
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
    padding-top: 0.5em;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
  }

  #startQuiz:hover {
    box-shadow: 0 5px 15px #0079918f;

  }

  @import url(https://fonts.googleapis.com/css?family=Righteous);

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
  }

 
</style>
