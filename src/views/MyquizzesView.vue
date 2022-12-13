<template>
  <body>
    <homeButton></homeButton>
    <section>
      <div id="title">
      <h1>{{uiLabels.myQuizzes}}</h1>
      </div>

        <div id="myQuizzes" v-for="(contain, id) in quizzes" v-bind:key="id">{{id}} 
          <router-link class="button" v-bind:to="('/create/'+lang+'/'+id)"> Edit </router-link>
          <router-link class="button" v-bind:to="('/host/'+id+'/'+lang)"> Host this quiz </router-link>

        </div>

      

        <!-- <router-link  v-bind:to="('/create/'+lang+'/'+id)">{{uiLabels.joinQuiz}}</router-link> -->


    </section>

      <div>       
         <router-link id="create" v-bind:to="('/create/'+lang+'/'+id)">{{uiLabels.createQuiz}}</router-link>
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
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
   
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
    margin-top: 2em;
    padding: 2em;
    padding-bottom: 3em;
    height: 2em;
    width: 40em;
    background-color:#5C95FF;

  }
  

  #create {
    margin-top: 100em;
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
    background-color: rgb(235, 209, 106);
    padding: 0.5em;
    border-radius: 3em;
    border-style: outset;
    border-color: rgba(235, 209, 106, 0.689);
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
  margin-bottom: 2em;
}
</style>
