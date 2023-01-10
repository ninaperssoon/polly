<template>
  <div id="body">
    <homeButton class="homeButton"></homeButton>
    
      <h1>{{uiLabels.myQuizzes}}</h1>
  
      <div class="myQuizzes" v-for="(contain, id) in quizzes" v-bind:key="id">{{id}} 

          <button class="button" v-on:click="host(id)"> {{uiLabels.Host}} </button>

          <button class="button" v-on:click="edit(id)" >
            <img id="edit"  src="../../public/img/edit.png"/>
          </button>

          <button class="button"  v-on:click="deleteQuiz(id)" >
            <img id="delete" src="../../public/img/trashcan.png"/>
          </button>
          
      </div>

      <div id="createDiv">       
        <router-link id="create" v-bind:to="('/create/'+lang)">{{uiLabels.createQuiz}}</router-link>
      </div> 

  </div>

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
      quizzes: {},

    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.emit("getQuizzes");
    socket.on("sendQuizzes", (quizzes) => this.quizzes = quizzes);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("updateQuiz", (data) => {
      this.quizzes = data
    })
  },
  methods: {
    edit: function (id) {
      this.$router.push('/create/'+this.lang+'/'+id)
    },
    deleteQuiz: function (id) {
      socket.emit("deleteQuiz", id)
    },
    host: function(id) {
      this.$router.push('/host/'+id+'/'+this.lang)
    }
  }
 
}
</script>
<style scoped>
  #body {
    background-color: #A6E9A3 ;
    width: 100%;
    height: 100%;
    position:fixed;
    overflow-y: auto;  
    overflow-x: hidden; 
  }

  #create {
    padding: 1em;
    font-size: 1.5em;
    border-style: outset;
    background-color: #FFF1AD;
    border-color: #fff1adbd;
    text-decoration: none; 
    border-radius: 2em;
    color: #F87575;
    font-family: 'Righteous', serif;
    text-shadow: .05em .05em 0 #4779d6;
  }

  #create:hover {
    box-shadow: 0 0.3em 1em #80B57D;
    transform: translateY(-0.125em);
  }
 

  .button:hover {
    transform: translateY(-0.125em);
  }


  @import url(https://fonts.googleapis.com/css?family=Righteous);

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  }

  h1 {
    margin-top:-5em;
  }

#createDiv {
  margin-top: 3em;
  margin-bottom: 3em;
}
.myQuizzes {
    margin: auto;
    padding: 2em;
    padding-bottom: 2em;
    width: 50%;
    margin-top: 1em;
    margin-bottom: 1em;
    background-color:#5C95FF;
    display: grid;
    grid-template-columns: 50% 17% 12% 12%;
    grid-template-rows: 1em;
    place-items: center start;
    border-style: outset;
    border-color: #5C95FF;
    border-radius: 2em;
    color: #FFF1AD;
    font-weight: bold;
    font-size:1.5em;
  }
  .button {
    text-decoration: none; 
    background-color: transparent;
    padding: 1.2em;
    border-color: transparent;
    font-size: 1em;
    color: white;
    font-weight: bold;

  }

  #edit {
    height: 2em;
  }

  #delete {
    height: 2.5em;
  }

  @media screen and (max-width:50em) {
    .myQuizzes {
      width: 90%;
      grid-template-columns: 30% 25% 18% 18%;

    }


  }

</style>
