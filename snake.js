//game variables
console.time("full script")
let body = document.getElementById("body");
let head = document.getElementById("head");
let food = document.getElementById("food");
let sfood= document.getElementById('sfood');
let board = document.querySelector(".container");
const score= document.getElementById('score');
const hiscore= document.getElementById('hiscore');
const eat = new Audio('audio/clap.wav');
const over= new Audio('audio/precursor.wav');
const dir= new Audio('audio/kick.wav');
const increaseSpeed = document.getElementById("increaseSpeed")
const decreaseSpeed = document.getElementById('decreaseSpeed')
const showSpeed = document.getElementById("showSpeed")

let snakeDir = { x: 0, y: 0 };
let snake = [
  { x: 10, y: 10 },
  { x: 10, y: 9 },
  { x: 10, y: 8 }
];

let lastTime=0;
let speed = localStorage.getItem("speed")|| 5;
let foodLoaction = { x: 5, y: 15 }; 
let sfoodLocation= { x: 5, y: 15 };
let pause = true;


let point=0;
let highestPoint=0;
let supfood=0;

    showSpeed.innerHTML= ` <b>speed : ${speed}</b> `
  increaseSpeed.addEventListener("click",()=>{
    speed++;
    showSpeed.innerHTML= ` <b>speed : ${speed}</b> `
    localStorage.setItem("speed",speed)
  })

  decreaseSpeed.addEventListener("click",()=>{
    speed= speed-1
    showSpeed.innerHTML= ` <b>speed : ${speed}</b> `
    localStorage.setItem("speed",speed)
  })
  
window.requestAnimationFrame(main);

// functions
// dont write code on main fucntion

function main(cTime) {
  window.requestAnimationFrame(main);
  // just to control the speed 
  if ((cTime - lastTime) / 1000 < 1 / speed) {
    return 0;
  }

  lastTime = cTime;
  board.innerHTML = "";

  snakeMove();

  foodUpdate();

  gameover();

  printScore();

  // superfood(); super food is still not ready

  // dont forget to call the function
}

window.addEventListener("keydown", (e) => {

  switch (e.key) {
    case "ArrowUp":
      if(snakeDir.y!=1){
      snakeDir = { x: 0, y: -1 };
      pause = false;
      dir.play()
      }
      break;
    case "ArrowDown":
      if(snakeDir.y!=-1){
     
      snakeDir = { x: 0, y: 1 };
      pause = false;
      dir.play()
      }
      break;
    case "ArrowLeft":
      if(snakeDir.x!=1){
      snakeDir = { x: -1, y: 0 };
      pause = false;
      dir.play()
      }
      break;
    case "ArrowRight":
      dir.play()
      if(snakeDir.x!=-1){
      snakeDir = { x: 1, y: 0 };
      pause = false;
      dir.play()
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
    console.log(foodLoaction,snake)
    point++;
    supfood++;
    // set timeout to change the after a litte delay to make it real
    setTimeout(() => {
      foodLoaction = {
        x: Math.round(Math.random() * 20),
        y: Math.round(Math.random() * 20),
      };
    }, 50);

    eat.play();
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

      over.play();
      window.location.reload();
      window.alert('game over dude');
      
    }
  }
  
}

function printScore(){
  score.innerHTML=`<b> Score: ${point}</b>`;
  hiscore.innerHTML=`<b> High Score: ${highestPoint}</b>`;

  highestPoint=localStorage.getItem('hp');

  highestPoint=localStorage.getItem('hp');
  

  if (highestPoint<point) {
    highestPoint=point;
    localStorage.setItem('hp',highestPoint)
  }

}

function superfood(){

 setInterval(() => {
    
  
  sfood.style.gridRowStart = sfoodLocation.y;
  sfood.style.gridColumnStart = sfoodLocation.x;

   board.appendChild(sfood);

   if (sfoodLocation.x == snake[0].x && sfoodLocation.y == snake[0].y)
  {
      snake.unshift({ x: sfoodLocation.x, y: sfoodLocation.y });
    
    sfoodLocation = {
      x: Math.round(Math.random() * 20),
      y: Math.round(Math.random() * 20),
    };

  
 
  }
 }, 5000);
 
}

console.timeEnd("full script")