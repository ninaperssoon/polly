<template>
  <div id="homeButton">
    <router-link to="/"><img id="homePic" src="https://cdn-icons-png.flaticon.com/512/15/15766.png"/></router-link>
  </div>
</template>

<script>

export default {
  name: 'HomeComponent',
  props: {
      homeButton: Object
    },
  
}
</script>
<style scoped>
#homeButton {
  margin-right: 100%;
  padding: 0.4em;
}
#homePic {
  height: 3em;
  width: 3em;
  cursor: pointer;
}

 
</style>
