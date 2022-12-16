<template>
  <router-view/>
</template>

<style>

body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}


.board {
  margin:auto;
  position: relative;
  text-align: center;
  margin-bottom: -5em;
  animation: tilt-n-move-shaking 3s infinite;
  width:50%;
}

#text {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
}

#surfboard {
  height: 12em;
  
}


.flipPic {
  height: 5em;
}

.flipPic:hover {
  animation: tilt-n-move-shaking 0.5s infinite;
}


button:hover {
  cursor:pointer;
}

.homeButton:hover {
  animation: tilt-n-move-shaking 0.5s infinite;
}

#logo {
  animation: tilt-n-move-shaking 0.9s infinite;
}

@keyframes tilt-n-move-shaking {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(5px, 5px) rotate(5deg); }
  50% { transform: translate(0, 0) rotate(0eg); }
  75% { transform: translate(-5px, 5px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

</style>
