<template>
<!-- <p>{{question.q}} {{question.s}}</p> -->
<button v-for="(a,index) in question.a" v-on:click="answer(a,index)" v-bind:key="a">
  {{ a }}
</button>
</template>
<script>

export default {
  name: 'QuestionComponent',
  props: {
    question: Object
  },
  emits: ["answer"],
  methods: {
    answer: function (answer,index) {
      console.log(answer,index)
      this.$emit("answer", {a: answer, index: index});
    } 
  }
}
</script>
<style>
 button {
  color: black;
    /* background-color:#FFF1AD; */
    /* border-radius: 1em; */
    font-size: 1.2em;
    border-style: outset;
    /* border-color:  #e3cf6b; */
    height: 2em;
    color: white;
    font: bolder;
 }

 button:hover{
  box-shadow: 0 5px 15px #439A86;
    transform: translateY(-2px);

 }
 

</style>
