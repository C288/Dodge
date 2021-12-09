var brush = document.getElementById("c1").getContext("2d")  
var states = [[10,10,-3,-1], [40,10,2,3], [200,10,-1,2], [200, 200, 1, 2], [250, 200, -4, -1], [70, 100, 4, 3], [120, 85, -3, 4], [100, 120, 4, -2]]  
var size = 20;  
var x = 100; 
var y = 100; 
var speed = 2; 
var playerSize = 20; 
var keys = { 
    up : false, 
    left : false, 
    down : false, 
    right : false 
} 
var timer;
var timer2;

init();
drawBackground();  
drawSquares();
startGame();
drawPlayer(); 

function drawFrame(){  
  // update the data of squares  
    for (var i = 0; i < states.length; ++i) {  
        states[i][0] -= states[i][2];  
        states[i][1] -= states[i][3];  
    if(states[i][0] <= 0|| states[i][0] >= 400 - size){  
        states[i][2]=-states[i][2]  
    }  
    if(states[i][1] <= 0|| states[i][1] >= 400 - size){  
        states[i][3]=-states[i][3]  
    }  
  } 

  drawBackground();  
  drawPlayer(); 
  drawSquares();  
  drawTime(); 
  if(shipDead()){ 
    gameOver(); 
    clearInterval(timer); 
    clearInterval(timer1); 
    clearInterval(timer2); 
    return; 
  } 
}  

function drawPlayer(){ 
    brush.fillStyle = "#0000FF" 
    brush.fillRect(x, y, playerSize, playerSize) 
 } 

 function drawSquares(){ 
    // three squares  
    for(var i = 0; i < states.length; ++i){  
      drawSquare(  states[i][0], states[i][1]);  
    }  
  }  

  function drawSquare(x, y){// a single square  
    brush.fillStyle = "#FF0000";  
    brush.fillRect(x, y, size, size);  
  }  

  function drawBackground(){  
    brush.fillStyle = "#000000";  
    brush.fillRect(0, 0, 400, 400);  
  }  

  document.addEventListener("keydown", validateKey); 
  function validateKey(e){ 
      if(e.key === "ArrowUp" || e.key === "w"){ 
          keys.up = true; 
      } 
      if(e.key === "ArrowLeft" || e.key === "a"){ 
          keys.left = true; 
      } 
      if(e.key === "ArrowDown" || e.key === "s"){ 
          keys.down = true; 
      } 
      if(e.key === "ArrowRight" || e.key === "d"){ 
          keys.right = true; 
      } 
      if(e.key === "Enter"){ 
        clearInterval(timer); 
        clearInterval(timer2); 
        init(); 
        startGame();
        timer = setInterval(drawFrame, 20); 
        timer2=setInterval(movement, 10); 
    } 
  } 

  document.addEventListener("keyup", invalidateKey); 
  function invalidateKey(e){ 
      if(e.key === "ArrowUp" || e.key === "w"){ 
          keys.up = false; 
      } 
      if(e.key === "ArrowLeft" || e.key === "a"){ 
          keys.left = false; 
      } 
      if(e.key === "ArrowDown" || e.key === "s"){ 
          keys.down = false; 
      } 
      if(e.key === "ArrowRight" || e.key === "d"){ 
          keys.right = false; 
      } 
  } 

  function movement(){ 
      if(keys.up){ 
          if(y > 0){ 
              y -= speed; 
          } 
          else{ 
              y = 0; 
          } 
      } 
      if(keys.left){ 
          if(x > 0){ 
              x -= speed; 
          } 
          else{ 
              x = 0; 
          } 
      } 
      if(keys.down){ 
          if(y < 400 - playerSize){ 
              y += speed; 
          } 
          else{ 
              y = 400 - playerSize; 
          } 
      } 
      if(keys.right){ 
          if(x < 400 - playerSize){ 
              x += speed; 
          } 
          else{ 
              x = 400 - playerSize; 
          } 
      } 
  }  

  function isXyInRect(x, y, rockX, rockY){ 
    if (x >= rockX && x <= rockX + size && y >= rockY &&  y <= rockY + size){  
        return true; 
    }  
    else {  
        return false;  
    }  
  }  

  function shipDead(){  
    for(var i = 0; i < states.length; ++i){ 
    //ship 
    var ship_top_right_x = x+20;  
    var ship_top_right_y = y;  
    var ship_top_left_x = x;  
    var ship_top_left_y = y;  
    var ship_botttom_right_x = x+20; 
    var ship_bottom_right_y = y+20; 
    var ship_bottom_left_x = x;  
    var ship_bottom_left_y = y+20;  
    //asteroids 
    var rock_top_right_x = states[i][0] + 20; 
    var rock_top_right_y = states[i][1];  
    var rock_top_left_x = states[i][0]; 
    var rock_top_left_y = states[i][1]; 
    var rock_botttom_right_x = states[i][0] + 20;  
    var rock_bottom_right_y = states[i][1]+20;  
    var rock_bottom_left_x = states[i][0];  
    var rock_bottom_left_y = states[i][1] + 20; 
    if(isXyInRect(ship_top_left_x, ship_top_left_y, rock_top_left_x, rock_top_left_y) || 
       isXyInRect(ship_top_right_x, ship_top_right_y, rock_top_left_x, rock_top_left_y) || 
       isXyInRect(ship_botttom_right_x, ship_bottom_right_y, rock_top_left_x, rock_top_left_y) || 
       isXyInRect(ship_bottom_left_x, ship_bottom_left_y, rock_top_left_x, rock_top_left_y)){ 
       return true; 
       } 
  }  
} 

function gameOver(){ 
    brush.font = "60px Arial"; 
    brush.fillStyle = "#0000FF" 
    brush.textBaseline = "top"; 
    brush.textAlign = "center"; 
    brush.fillText("GAME OVER", 200, 200); 
  } 

function startGame(){ 
    brush.font = "40px Arial"; 
    brush.fillStyle = "#FFFFFF" 
    brush.textBaseline = "top"; 
    brush.textAlign = "center"; 
    brush.fillText("Press Enter to Begin", 200, 200); 
  } 

function init(){ 
    states = [[10,10,-3,-1], [40,10,2,3],[200,10,-1,2], [200, 200, 1, 2], [250, 200, -4, -1], [70, 100, 4, 3], [120, 85, -3, 4], [100, 120, 4, -2]] 
    x = 100; 
    y = 100; 
    time = 0; 
    
} 

function drawTime(){ 
    brush.font = "20px Arial"; 
    brush.fillStyle = "#0000FF" 
    brush.textBaseline = "top"; 
    brush.textAlign = "left"; 
    brush.fillText("TIME: " + time, 10, 10); 
} 

setInterval(scoreTimer, 1000) 
function scoreTimer(){ 
    time++; 
} 
 