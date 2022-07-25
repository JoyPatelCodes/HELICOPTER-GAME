// FUNCTIONS

// Draw Start Screen
function drawStart() {
    drawMainComponents();
  
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
  
    ctx.font = "25px Consolas";
    ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
    ctx.fillText("RELEASE TO GO DOWN", 415, 480);

    score();
  }

  // Responsible to make game work when "gameon"
  function runGame() {
    // Logic
    moveHeli();
    moveWalls();
    checkCollisions();
    score();
    // Draw
    drawGame();
  }
  
  // Deals with the movement of the Helicopter
  function moveHeli() {
    // Accelerate Upwards if Mouse if Pressed
    if (mouseIsPressed) {
        heli.speed += -1;
    }
    // Apply gravity (acceleration)
    heli.speed += heli.accel;

    // Constrain the Speed (have a terminal or max/min velocity)
    if (heli.speed > 6) {
        heli.speed = 6;
    } else if (heli.speed < -6) {
        heli.speed = -6;
    }
    
    // Move the Helicopter by its speed
    heli.y += heli.speed;
  }

  function moveWalls() {
    // Wall 1
    wall1.x += wallSpeed;
    if (wall1.x + wall1.w < 0) {
        wall1.x = wall3.x + 500;
        wall1.y = Math.random() * 300 + 100;
    }

    // Wall 2
    wall2.x += wallSpeed;
    if (wall2.x + wall2.w < 0) {
        wall2.x = wall1.x + 500;
        wall2.y = Math.random() * 300 + 100;
    }

    // Wall 3
    wall3.x += wallSpeed;
    if (wall3.x + wall1.w < 0) {
        wall3.x = wall2.x + 500;
        wall3.y = Math.random() * 300 + 100;
    }
  }

  // Collision Detection
  function checkCollisions() {
    // Check collision with the Top and Bottom green bars
    if (heli.y < 50) {
        gameOver();
    } else if (heli.y + heli.h > cnv.height - 50) {
        gameOver();
    }

    // Check collisions with the Walls
    rectCollide(heli, wall1);
    rectCollide(heli, wall2);
    rectCollide(heli, wall3);
  }

  // Collision Detection with the Walls
  function rectCollide(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.h + rect1.y > rect2.y) {
        gameOver();
     }

  }

  function gameOver() {
    // Play Explosion Sound
    explosionSound.play();
    state = "gameover";
    setTimeout(reset, 2000);
  }

  // Draw Game Elements
  function drawGame() {
    drawMainComponents();  
    drawWalls();
  }
  
  // Draw Game Over Screen
  function drawGameOver() {
    drawMainComponents();  
    drawWalls();
  
    // Circle around Helicopter
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
  
    // Game Over Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("GAME OVER", 350, 285);
  }

  // Helper Functions

  function reset() {
    state = "start";
    heli = {
      x: 200,
      y: 250,
      w: 80,
      h: 40,
      speed: 0,
      accel: 0.7
    };
    wall1 = {
      x: cnv.width,
      y: Math.random() * 300 + 100,
      w: 50,
      h: 100
    };
    wall2 = {
      x: cnv.width + 500,
      y: Math.random() * 300 + 100,
      w: 50,
      h: 100
    };
    wall3 = {
      x: cnv.width + 1000,
      y: Math.random() * 300 + 100,
      w: 50,
      h: 100
    };
  }

  function drawWalls() {
    ctx.fillStyle = "green";
    ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
    ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
    ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
  }

  function drawMainComponents() {
    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Green Bars
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, cnv.width, 50);
    ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
  
    // Green Bar Text
    ctx.font = "30px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("HELICOPTER GAME", 25, 35);
    ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
    ctx.fillText(`BEST: ${bestScore}`, cnv.width - 250, cnv.height - 15);
  
    // Helicopter
    ctx.drawImage(heliImg, heli.x, heli.y);
  }

  // Determines the distance of the player
  function score() {
    if (state === "start") {
      distance = 0;
    } else if (state === "gameon") {
      distance++;
    }

    best();
  }

  // Responsible for the Best
  function best() {
    if (distance > bestScore && state === "gameover") {
      bestScore = distance;
    }
  }