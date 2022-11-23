<template>
  <header>
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo">My super quiz</div>
  </header>
  <ResponsiveNav v-bind:hideNav="hideNav">
    <button id="language" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
  </ResponsiveNav>
  <div class="wrapper">
  <div class="startchoice a">
    <label>
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
  </div>
  <router-link class="startchoice b" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>

  <div class="startchoice c" id="smallerbuttons">
    Host quiz
  </div>
  <div class="startchoice d" id="smallerbuttons">
    My quizzes
  </div>
</div>
</template>

<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
    ResponsiveNav
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
  header {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }
  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
  }
  .logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem; 
  }
  .hamburger {
    color:white;
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
    margin: 10em;
    display: grid;
    grid-gap: 1.2em;
    grid-template-columns: 15em 15em 15em 15em;
    grid-template-rows: 5em 5em 5em 5em;
  }
  .startchoice {
    color: black;
    text-decoration: none; 
    padding: 2em;
    background-color: lightblue;
    border-radius: 3em;
    font-size: 2em;
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
    background-color: green;
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
#language {

}
</style>
