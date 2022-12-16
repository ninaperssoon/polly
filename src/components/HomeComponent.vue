<template>
  <div id="homeButton">
    <router-link to="/"><img id="homePic" src="../../public/img/fliplogo.png"/></router-link>
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
  padding: 1.5em;
}
#homePic {
  height: 7em;

  cursor: pointer;
}

 
</style>
