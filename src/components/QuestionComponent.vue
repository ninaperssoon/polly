<template>
<!-- <p>{{question.q}}</p> -->
<button v-for="a in question.a" v-on:click="answer(a)" v-bind:key="a">
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
    answer: function (answer) {
      this.$emit("answer", answer);
    } 
  }
}
</script>
<style>
 button {
  color: black;
    background-color: #FFF1AD;
    border-radius: 1em;
    font-size: 1.2em;
    border-style: outset;
    border-color: #fff1adbd;
    height: 2em;
 }

 button:hover{
  box-shadow: 0 5px 15px #439A86;
    transform: translateY(-2px);

 }
 

</style>
