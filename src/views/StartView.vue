<template>
  <body>
    
  <header>
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo"> punishment play: the flip </div>
  </header>
  <ResponsiveNav v-bind:hideNav="hideNav">
    <img id="flag" v-bind:src=uiLabels.languageFlag v-on:click="switchLanguage">
  </ResponsiveNav>
  <section>
    <div class="wrapper">
  
      <router-link class="startchoice a" v-bind:to="'/join/'+lang">{{uiLabels.joinQuiz}}</router-link>

      <router-link class="startchoice b" v-bind:to="'/create/'+lang">{{uiLabels.createQuiz}}</router-link>

      <router-link class="startchoice c" id="smallerbuttons" v-bind:to="'/host/'+lang">{{uiLabels.hostQuiz}}</router-link>

      <router-link class="startchoice d" id="smallerbuttons" v-bind:to="'/myquizzes/'+lang"> {{uiLabels.myQuizzes}}</router-link>
   
    </div>
  </section>
<footer> 
  
</footer>
</body>

</template>

<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
    ResponsiveNav,
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true
    }
  },
  created: function () {
    socket.emit("pageLoaded", this.lang)
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
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    }

  }
}
</script>
<style scoped>
  body {
    margin: 0;
    background-color: #BCD8C1;
  }
  header {
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }
  footer {
    height: 8.6em;
    width: 100%;
  }

  .logo {
    color: black;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    padding-top:0.2em;
  }
  .logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem; 
  }
  .hamburger {
    width:1em;
    display: flex;
    align-items: center;
    justify-content: left;
    padding:0.5rem;
    top:0;
    left:0;
    height: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }
  .wrapper {
    margin-top: 7em;
    margin-left: 17em;
    display: grid;
    grid-gap: 1.2em;
    grid-template-columns: 15em 15em 15em 15em;
    grid-template-rows: 5em 5em 5em 5em;
  }
  .startchoice {
    color: black;
    text-decoration: none; 
    padding: 2em;
    background-color: #007991;
    border-radius: 3em;
    font-size: 2em;
    border-style: outset;
    border-color: #0079918f;
  }
  .startchoice:hover {
    box-shadow: 0 5px 15px #439A86;
    transform: translateY(-2px);


  }
  .a {
    grid-column-start: 1 ;
    grid-column-end: 3;
    grid-row: 1 / span 2;
  }

  .b {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row: 1 /span 2;
  }

  .c { 
    grid-column-start: 2 ;
    grid-column-end: 4;
    grid-row: 3;
  }

  .d {
    grid-column-start: 2 ;
    grid-column-end: 4;
    grid-row: 4;
  }

  #smallerbuttons {
    padding: 0.8em;
    background-color: #FFF1AD;
    border-color: #fff1adbd;
  }

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
}
#flag {
  margin: 2em;
  width: 3em;
  height: 3em;
  cursor: pointer;
}
</style>
