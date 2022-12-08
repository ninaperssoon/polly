<template>
  <body>
    <homeButton></homeButton>
    <section>
      <div>
      <h1>{{uiLabels.myQuizzes}}</h1>
      </div>

        <div id="myQuizzes" v-for="(contain, id) in quizzes" v-bind:key="id">{{id}} 
          <router-link v-bind:to="('/create/'+lang+'/'+id)"> Edit </router-link>
          
        
        
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
    margin-top: 2em;
    padding: 2em;
    height: 2em;
    width: 40em;
    background-color:#0079918f;

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
  }

  #create:hover {
    box-shadow: 0 5px 15px #439A86;

  }
  
  
</style>
