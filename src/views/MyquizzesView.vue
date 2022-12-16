<template>
  <div id="body">
    <homeButton class="homeButton"></homeButton>
    
      <h1>{{uiLabels.myQuizzes}}</h1>
  
      <div class="myQuizzes" v-for="(contain, id) in quizzes" v-bind:key="id">{{id}} 

          <router-link class="button" v-bind:to="('/host/'+id+'/'+lang)"> {{uiLabels.Host}} </router-link>

          <button class="button" v-on:click="edit" >
            <img id="edit"  src="../../public/img/edit.png"/>
          </button>

          <button class="button"  v-on:click="deletequiz" >
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
      id: "hej",
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
  },
  methods: {
    edit: function () {
      this.$router.push('/create/'+this.lang+'/'+this.id)
    },
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
    box-shadow: 0 5px 15px #80B57D;
    transform: translateY(-2px);
  }
 

  .button:hover {
    transform: translateY(-2px);
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
  display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 3em; 
  text-shadow: .08em .08em 0 #4779d6;
  }
  

#createDiv {
  margin-top: 3em;
  margin-bottom: 3em;
}
.myQuizzes {
    margin: auto;
    padding: 2em;
    padding-bottom: 2em;
    width: 30em;
    margin-top: 1em;
    margin-bottom: 1em;
    background-color:#5C95FF;
    display: grid;
    grid-template-columns: 50% 17% 12% 12%;
    grid-template-rows: 1em;
    place-items: center start;
    border-style:outset;
    border-color: #5C95FF;
    border-radius: 2em;
    color: #FFF1AD;
    font-weight: bold;
    font-size:1.5em;
  }
  .button {
    margin: 1em;
    text-decoration: none; 
    background-color: transparent;
    padding: 1.2em;
    border-color: transparent;
    font-size: 1em;
    color: white;
    
  }

  #edit {
    height: 2em;
  }

  #delete {
    height: 2.5em;
  }
</style>
