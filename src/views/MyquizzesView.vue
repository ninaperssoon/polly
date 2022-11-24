<template>
  <body>
    <homeButton></homeButton>
    <section>
      <div>
      <h1>My quizzes</h1>
      </div>
      <div id="myQuizzes">
        här dyker mina quizzes upp när jag faktiskt  har skapat dom...
      </div>
      <div id="create">
        <router-link  v-bind:to="'/create/'+lang">{{uiLabels.createQuiz}}</router-link>
      </div>
    </section>
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
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
 
}
</script>
<style scoped>
  body {
    margin: 0;
    background-color: #BCD8C1;
  }
  div {
    margin: auto;
    border-radius: 2em;
  }

  #myQuizzes {
    padding: 2em;
    height: 20em;
    width: 40em;
    background-color: blue;
  }

  #create {
    padding: 1em;
    margin-top: 1em;
    height: 1em; 
    width: 10em;
    text-decoration: none; 
    font-size: 2em;
    border-style: outset;
    background-color: #FFF1AD;
    border-color: #fff1adbd;
  }

  #create:hover {
    box-shadow: 0 5px 15px #439A86;

  }
  
</style>
