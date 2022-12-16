<template>
<!-- <p>{{question.q}} {{question.s}}</p> -->
<button v-for="(p,index) in voting.p" v-on:click="voteP(p,index)" v-bind:key="p">
  {{ p}}
</button>

</template>
<script>
export default {
  name: 'VotingComponent',
  props: {
    voting: Object
  },
  emits: ["voteP"],
  methods: {
    voteP: function (vote,index) {
      console.log(vote,index)
      this.$emit("voteP", {v: vote, index: index});
    } 
  }
}
</script>
<style scoped>
 button {
  color: black;
    background-color: #F87575;
    border-radius: 1em;
    font-size: 1.2em;
    border-style: outset;
    border-color: #F87575;
    height: 2em;
 }

 button:hover{
  box-shadow: 0 5px 15px #439A86;
    transform: translateY(-2px);

 }
 

</style>
