<template>
  <body>
    <homeButton></homeButton>
    <section>
      <div>
      <h1>{{uiLabels.myQuizzes}}</h1>
      </div>
      <div id="myQuizzes">
        här dyker mina quizzes upp när jag faktiskt  har skapat dom...
      </div>
    
  
    </section>

    <div>       
         <router-link id="create" v-bind:to="'/create/'+lang">{{uiLabels.createQuiz}}</router-link>
      </div>
      <div></div>
  </body>


</template>

<script>
import homeButton from '@/components/HomeComponent.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'MyquizzesView',
  components: {
    homeButton
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
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
 
}
</script>
<style scoped>
  body {
    margin: auto;
    background-color: #BCD8C1;
  }
  div {
    margin: auto;
    border-radius: 2em;
    height: 3.17em;
  }
  section {
    height:35em;
  }

  #myQuizzes {
    padding: 2em;
    height: 20em;
    width: 40em;
    background-color: blue;
  }
  

  #create {
    margin-top: 100em;
    padding: 1em;
    height: 1em; 
    width: 10em;
    font-size: 2em;
    border-style: outset;
    background-color: #FFF1AD;
    border-color: #fff1adbd;
    text-decoration: none; 
    border-radius: 2em;
  }

  #create:hover {
    box-shadow: 0 5px 15px #439A86;

  }
  
  
</style>
