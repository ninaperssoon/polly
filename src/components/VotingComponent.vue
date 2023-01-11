<template>
<div id="buttonContainer">
  <button v-for="(v,index) in voting" v-on:click="vote(v, index)" v-bind:key="v" v-bind:style="{'background-color':buttonColor}">
    {{ v }}
  </button>
</div>
</template>

<script>
export default {
  name: 'VotingComponent',
  props: {
    voting: Array,
    message: String
  },
  data: function(){
    return {
      buttonColor: this.message,
    }
  },
  emits: ["vote"],
  methods: {
    vote: function (vote,index) {
      this.$emit("vote", {v: vote, index: index});
    },
  }
}
</script>
<style>
 button {
  color: black;
  border-radius: 1em;
  font-size: 1.2em;
  border-style: outset;
  border-color: #fff1adbd;
  height: 2em;
 }

 button:hover{
  box-shadow: 0 0.3em 1em #59615f; 
 }
 #buttonContainer {
  margin-top: 1em;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: 1fr;
}


</style>
