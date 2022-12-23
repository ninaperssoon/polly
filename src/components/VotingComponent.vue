<template>

  <button v-for="(v,index) in voting" v-on:click="vote(v, index)" v-bind:key="v" v-bind:style="{'background-color':buttonColor}">
    {{ v }}
  </button>

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
      console.log(vote,index)
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
  box-shadow: 0 5px 15px #59615f;
  transform: translateY(-2px);  
 }


</style>
