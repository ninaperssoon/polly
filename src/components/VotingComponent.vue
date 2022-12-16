<template>
<!-- <p>{{question.q}} {{question.s}}</p> -->
<button v-for="(r,index) in voting.r" v-on:click="voteR(r,index)" v-bind:key="r">
  {{ r }}
</button>
<p><br> Mellanrum <br> </p>
<button v-for="(p,index) in voting.p" v-on:click="voteP(p,index)" v-bind:key="p">
  {{ p }}
</button>

</template>
<script>
export default {
  name: 'VotingComponent',
  props: {
    voting: Object
  },
  emits: ["voteR", "voteP"],
  methods: {
    voteR: function (vote,index) {
      console.log(vote,index)
      this.$emit("voteR", {v: vote, index: index});
    },
    voteP: function (vote,index) {
      console.log(vote,index)
      this.$emit("voteP", {v: vote, index: index});
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
