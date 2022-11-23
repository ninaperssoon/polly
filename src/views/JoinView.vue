<template>
<body>
  <div id="joinQuiz">
    <label>
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  <router-link v-bind:to="'/poll/'+lang">Join Quiz</router-link>
  </div>

</body>

</template>

<script>
// import io from 'socket.io-client';
// const socket = io();

export default {
  name: 'JoinView',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true
    }
  },
  

}
</script>

<style scoped>
  body {
    margin: 0;
    background-color: #BCD8C1;
  }
  #joinQuiz {
    margin: auto;
    margin-top: 15em;
    background-color: red;
    height: 10em;
    width: 30em;
  }
  
</style>
