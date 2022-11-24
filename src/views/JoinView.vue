<template>
<body>
  <homeButton></homeButton>
  <section>
    <div id="top"> </div>
  <div id="joinQuiz">
   <p> <label>
    Write quiz id: 
    <input type="text" v-model="id">
  </label>
  <router-link id="joinbutton" v-bind:to="'/poll/'+id">{{uiLabels.joinQuiz}}</router-link> </p>
  </div>

</section>

</body>

</template>

<script>
// import io from 'socket.io-client';
// const socket = io();
import homeButton from '@/components/HomeComponent.vue';
import io from 'socket.io-client';
// import lang from '@/views/StartView.vue'
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
      // lang: lang,
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
    height: 46.5em;

    background-color: #BCD8C1;
  }
  section {
    
  }
  #joinQuiz {
    font-size:1.5em;
    margin: auto;
    background-color: #007991;
    height: 10em;
    width: 30em;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 3em;
    border-style:outset;
    border-color: #0079918f;
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
  
</style>
