<template>
  <body>
    <homeButton class="homeButton"></homeButton>
    
      <div id="title">
      <h1>{{uiLabels.myQuizzes}}</h1>
      </div>
      
        <div id="myQuizzes" v-for="(contain, id) in quizzes" v-bind:key="id">{{id}} 
         
            <router-link class="button" v-bind:to="('/create/'+lang+'/'+id)"> {{uiLabels.edit}} </router-link>
            <router-link class="button" v-bind:to="('/host/'+id+'/'+lang)"> {{uiLabels.hostThisQuiz}} </router-link>
          
          

        </div>

        <div id="createDiv">       
         <router-link id="create" v-bind:to="('/create/'+lang)">{{uiLabels.createQuiz}}</router-link>
      </div>
  
   

      
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
 
}
</script>
<style scoped>
  body {
    margin: auto;
    background-color: #A6E9A3 ;
    text-align: center;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    position:fixed;
    overflow: auto;

   
  }
  div {
    margin: auto;
    border-radius: 2em;
    height: 3.17em;
    
    
  }
  section {
    background-color: #A6E9A3;
  }

  #myQuizzes {
    padding: 2em;
    padding-bottom: 3em;
    width: 40em;
    margin-bottom: 2em;
    background-color:#5C95FF;
    display: grid;
    grid-template-columns: 20em 5em 10em;
    grid-template-rows: 1em;
    place-items: center start;
    border-style:outset;
    border-color: #5C95FF;
  }
  

  #create {
    padding: 1em;
    height: 0.8em; 
    width: 10em;
    font-size: 2em;
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
    box-shadow: 0 5px 15px #439A86;

  }
  .button {
    color:black;
    margin: 1em;
    text-decoration: none; 
    background-color: #FFF1AD;
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    border-color: #fff1adbd;

  }

  .button:hover {
    box-shadow: 0 5px 15px #0079918f;
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
  display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 3em; 
  text-shadow: .08em .08em 0 #4779d6;
  }
  
#title {
  margin-bottom: 3em;
}

#createDiv {
  margin-top: 4em;
  margin-bottom: 2em;
}

</style>
