//game variables

let body = document.getElementById("body");
let head = document.getElementById("head");
let food = document.getElementById("food");
let board = document.querySelector(".container");
const score= document.getElementById('score');
const hiscore= document.getElementById('hiscore');


let snakeDir = { x: 0, y: 0 };
let snake = [
  { x: 10, y: 10 },
  { x: 10, y: 9 },
  { x: 10, y: 8 },
  { x: 10, y: 7 },
];

let speed = 5;
let lastTime = 0;
let foodLoaction = { x: 5, y: 15 };
let pause = true;

let point=0;
let highestPoint=0;


window.requestAnimationFrame(main);

// functions
// dont write code on main fucntion

function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastTime) / 1000 < 1 / speed) {
    return 0;
  }

  lastTime = cTime;
  board.innerHTML = "";

  snakeMove();

  foodUpdate();

  gameover();

  printScore();

  // dont forget to call the function
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if(snakeDir.y!=1){
      snakeDir = { x: 0, y: -1 };
      pause = false;
      }
      break;
    case "ArrowDown":
      if(snakeDir.y!=-1){
     
      snakeDir = { x: 0, y: 1 };
      pause = false;
      }
      break;
    case "ArrowLeft":
      if(snakeDir.x!=1){
      snakeDir = { x: -1, y: 0 };
      pause = false;
      }
      break;
    case "ArrowRight":
      if(snakeDir.x!=-1){
      snakeDir = { x: 1, y: 0 };
      pause = false;
      }
      break;
    case "Enter":
      snakeDir = { x: 0, y: 0 };
      pause = true;
      break;

    default:
      break;
  }
});

// moving the snake

function snakeMove() {
  snake.forEach((e, index) => {
    if (e.x >= 20) e.x = e.x - 20;
    if (e.y >= 20) e.y = e.y - 20;
    if (e.x <= 0) e.x += 20;
    if (e.y <= 0) e.y += 20;

    if (index != snake.length - 1) {
      if (!pause) {
        snake[snake.length - index - 1].x = snake[snake.length - index - 2].x;
        snake[snake.length - index - 1].y = snake[snake.length - index - 2].y;
        console.log(snake.length - index - 1);
      }
        body.style.gridRowStart =snake[snake.length - index - 1].y;
        body.style.gridColumnStart =snake[snake.length - index - 1].x;

        let sbody = body.cloneNode(true);
      board.appendChild(sbody);
      
    }

  });

  snake[0].x += snakeDir.x;
  snake[0].y += snakeDir.y;
  head.style.gridRowStart = snake[0].y;
  head.style.gridColumnStart = snake[0].x;
  board.appendChild(head);
}
// gameover function

function foodUpdate() {
  if (foodLoaction.x == snake[0].x && foodLoaction.y == snake[0].y) {
    snake.unshift({ x: foodLoaction.x, y: foodLoaction.y });

    point++;
    // set timeout to change the after a litte delay to make it real
    setTimeout(() => {
      foodLoaction = {
        x: Math.round(Math.random() * 20),
        y: Math.round(Math.random() * 20),
      };
    }, 50);

    console.log("food loacation change");
  }
  food.style.gridRowStart = foodLoaction.y;
  food.style.gridColumnStart = foodLoaction.x;

  board.appendChild(food);
}

function gameover() {
  // there is a bug i it should work from zero but it did not
  for (let i = 3; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      snakeDir = { x: 0, y: 0 };
      pause = true;
      
      window.location.reload();// 
      window.alert('game over dude')
    }
  }
}

function printScore(){
  score.innerHTML=`<b> Score: ${point}</b>`;
  hiscore.innerHTML=`<b> High Score: ${highestPoint}</b>`

  highestPoint=localStorage.getItem('hp');

  highestPoint=localStorage.getItem('hp');
  

  if (highestPoint<point) {
    highestPoint=point;
    localStorage.setItem('hp',highestPoint)
  }

}