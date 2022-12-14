<template>
  <div class="body">
  
  <header>
    
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav"> 
    </div>
    <!-- <div class="logo"> punishment play: the flip. Also known as "Flip or Flop"  </div> -->
    <div>
    <div><img id="flag" v-bind:src=uiLabels.languageFlag v-on:click="switchLanguage"></div>

    <h1 data-shadow='Flip or Flop!'>Flip or Flop!    <img id="logo" src="../../public/img/fliplogo.png">
</h1></div>
    
  </header>
  
  
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
  </div>

</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
 
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

  .body {
    margin: 0;
    background-color: #A6E9A3;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
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
 
  .wrapper {
    margin-top: 1em;
    margin-left: 12.5em;
    display: grid;
    grid-gap: 1.2em;
    grid-template-columns: 15em 15em 15em 15em;
    grid-template-rows: 5em 5em 5em 5em;  
  }
  .startchoice {
    text-decoration: none; 
    padding: 2em;
    background-color: #5C95FF;
    border-radius: 3em;
    font-size: 2em;
    border-style: outset;
    border-color: #5C95FF;
    color: #FFF1AD;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 rgb(77, 94, 179);
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
    color: #F87575;
  }
  #flag {
  width: 3em;
  height: 3em;
  cursor: pointer;
  left: -43em;
  margin-top: 1em;
}

#navDiv {
  background-color: #A6E9A3;
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
  font-size: 8em; 
  text-shadow: .08em .08em 0 #4779d6;
  }

  #logo{
    height: 1.2em;
    padding-top: 0.1em;
  }

@media screen and (max-width:50em) {
  body {
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: auto;
  }
  #flag {
    width: 3em;
    height: 3em;
    cursor: pointer;

}

  .startchoice {
    text-decoration: none; 
    padding: 1em;
    background-color: #5C95FF;
    border-radius: 1.5em;
    font-size: 2em;
    border-style: outset;
    border-color: #5C95FF;
    color: #FFF1AD;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 rgb(77, 94, 179);
    height: 4em;
    width: 5em;
  }
  
  .wrapper {
    margin-top: 0em;
    margin-left: 1em;
    display: grid;
    grid-gap: 0.6em;
    grid-template-columns: 5em 5em 5em 5em;
    grid-template-rows: 4em 4em 6em 4em;  
  }
  h1 {
    display: inline-block;
    color: white;
    font-family: 'Righteous', serif;
    font-size: 3em; 
    text-shadow: .08em .08em 0 #4779d6;
  }
  #smallerbuttons {
    padding: 0.5em;
    background-color: #FFF1AD;
    border-color: #fff1adbd;
    color: #F87575;
    font-size: 1.5em;
    margin-left: 1em;
  }

}



</style>
