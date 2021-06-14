//game variables

let body = document.getElementById("body");
let head = document.getElementById("head");
let food = document.getElementById("food");
let board = document.querySelector(".container");

let snakeDir = { x: 0, y: 0 };
let snake = [
  { x: 10, y: 10 },
  { x: 10, y: 9 },
  { x: 10, y: 9 },
];

let speed = 20;
let lastTime = 0;
let foodLoaction = { x: 5, y: 15 };

window.requestAnimationFrame(main);

// functions

function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastTime) / 1000 < 1 / speed) {
    return 0;
  }
  lastTime = cTime;
  // console.log(cTime);

  engine();
}

function engine() {
  board.innerHTML = "";
  // changing the snake arrey
  snake.forEach((e, index) => {
    // i know this part is really bad but at 2 am i cnat think something else
    if (e.x >= 20) e.x = e.x - 20;
    if (e.y >= 20) e.y = e.y - 20;
    if (e.x <= 0) e.x += 20;
    if (e.y <= 0) e.y += 20;

    if (index != 0) {
      body.style.gridRowStart = e.y;
      body.style.gridColumnStart = e.x;
      snake[snake.length - index].x = snake[snake.length - index - 1].x;
      snake[snake.length - index].y = snake[snake.length - index - 1].y;
      let sbody = body.cloneNode(true);
      board.appendChild(sbody);
    } else {
      head.style.gridRowStart = e.y;
      head.style.gridColumnStart = e.x;
      e.x += snakeDir.x;
      e.y += snakeDir.y;
    }

    board.appendChild(head);
  });

  // updating the food and snake arrey

  if (foodLoaction.x == snake[0].x && foodLoaction.y == snake[0].y) {
    snake.unshift({ x: foodLoaction.x, y: foodLoaction.y });

    foodLoaction = {
      x: Math.round(Math.random() * 20),
      y: Math.round(Math.random() * 20),
    };
    console.log("food loacation change");
  }
  food.style.gridRowStart = foodLoaction.y;
  food.style.gridColumnStart = foodLoaction.x;
  board.appendChild(food);

  console.log(snake);
}

// arrow button events

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      snakeDir = { x: 0, y: -1 };

      break;
    case "ArrowDown":
      snakeDir = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      snakeDir = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      snakeDir = { x: 1, y: 0 };
      break;
    default:
      break;
  }
});
