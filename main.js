// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables that need to be used Once
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

let explosionSound = document.createElement("audio");
explosionSound.src = "sound/explosion.wav";

let propellerSound = document.createElement("audio");
propellerSound.src = "sound/propeller.wav";

let mouseIsPressed = false;

// Global Variables that need to be Reset
let state;
let heli;
let wall1, wall2, wall3;
let wallSpeed = -7;
let distance = 0;
let bestScore = 0;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

// Event Stuff
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

// Responsible for switching states from "start" to "gameon" when mouse in clicked (down)
function mousedownHandler() {
  mouseIsPressed = true;

  // Play Propeller Sound
  propellerSound.currentTime = 0;
  propellerSound.play();

  // Start Game on mouse down
  if (state === "start") {
    state = "gameon";
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
  propellerSound.pause();
}

setInterval(moveWalls, 3000);