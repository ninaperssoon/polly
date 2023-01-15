<template>
  <router-view/>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Righteous);

body {
  margin: 0;
  padding: 0;
}

button:hover {
  cursor: pointer;
  transform: translateY(-0.125em);
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
  text-shadow: .08em .08em 0 #4779d6;
  font-size: 3em;
}

.board {
  margin:auto;
  position: relative;
  text-align: center;
  margin-bottom: -5em;
  animation: tilt-n-move-shaking 3s infinite;
  width:22em;
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

.container {
  height: 40em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene {
  margin-top: -10em;
  width: 25em;
  height: 26em;
  perspective: 125em;
}

.card {
  margin: auto;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  position: relative;
}

.card__face {
  padding: 0.2em;
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  backface-visibility: hidden;
  border-radius: 2em;
  font-size: 1.5em;
  line-height: 2em;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-style:outset;
}

.card__face--front {
  background: #FFF1AD;
  color: black;
  font-weight: bold;
  padding: 5%;
  border-color: #f9e998;
  box-shadow: 0 0.3em 1em #c0ac48;
}

.card__face--back {
  background: #F87575;
  transform: rotateY(180deg); 
  border-color: #f76868;
  box-shadow: 0 0.3em 0.3em #bb3939 ;
}

.flipme {
  transform: rotateY(180deg);
}


.flipPic {
  height: 8em;
}

.flipPic:hover {
  animation: tilt-n-move-shaking 0.5s infinite;
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

@keyframes bounce {
	0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-30px);}
	60% {transform: translateY(-15px);}
}

</style>
