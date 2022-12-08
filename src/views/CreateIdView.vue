<template>
<body>
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
const socket = io();

export default {
  name: 'CreateIdView',
  components: {
    
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

    background-color: #BCD8C1;
  }
  
  
  
</style>
