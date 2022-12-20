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
h1 {
  display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 3em; 
  text-shadow: .08em .08em 0 #4779d6;
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
  5% { transform: translate(1px, 1px) rotate(1deg); }
  10% { transform: translate(2px, 2px) rotate(2deg); }
  15% { transform: translate(3px, 3px) rotate(3deg); }
  20% { transform: translate(4px, 4px) rotate(4deg); }
  25% { transform: translate(5px, 5px) rotate(5deg); }
  30% { transform: translate(4px, 4px) rotate(4deg); }
  35% { transform: translate(3px, 3px) rotate(3deg); }
  40% { transform: translate(2px, 2px) rotate(2deg); }
  45% { transform: translate(1px, 1px) rotate(1deg); }
  50% { transform: translate(0, 0) rotate(0deg); }
  55% { transform: translate(-1px, 1px) rotate(-1deg); }
  60% { transform: translate(-2px, 2px) rotate(-2deg); }
  65% { transform: translate(-3px, 3px) rotate(-3deg); }
  70% { transform: translate(-4px, 4px) rotate(-4deg); }
  75% { transform: translate(-5px, 5px) rotate(-5deg); }
  80% { transform: translate(-4px, 4px) rotate(-4deg); }
  85% { transform: translate(-3px, 3px) rotate(-3deg); }
  90% { transform: translate(-2px, 2px) rotate(-2deg); }
  95% { transform: translate(-1px, 1px) rotate(-1deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

</style>
