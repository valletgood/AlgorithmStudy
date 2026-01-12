const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M, x, y, K] = input[0].split(" ").map(Number);
const cases = input.slice(1, N + 1).map((item) => item.split(" ").map(Number));
const command = input
  .slice(N + 1)[0]
  .split(" ")
  .map(Number);
let board = Array.from({ length: N }, () => Array(M).fill(0));
let sx = x;
let sy = y;
let answer = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    board[i][j] = cases[i][j];
  }
}

let dice = [0, 0, 0, 0, 0, 0];
// 0번: 윗면, 1번: 앞면, 2번: 오른쪽, 3번: 왼쪽, 4번: 남쪽, 5번: 바닥

const moveRight = () => {
  if (sx < 0 || sx >= N || sy + 1 < 0 || sy + 1 >= M) return;
  sy += 1;
  const floor = dice[5]; // 바닥
  const right = dice[2]; // 오른쪽
  const left = dice[3];
  const top = dice[0];
  dice[0] = left;
  dice[2] = top;
  dice[5] = right;
  dice[3] = floor;
  if (board[sx][sy] !== 0) {
    dice[5] = board[sx][sy];
    board[sx][sy] = 0;
  } else {
    board[sx][sy] = dice[5];
  }
  answer.push(dice[0]);
};

const moveLeft = () => {
  if (sx < 0 || sx >= N || sy - 1 < 0 || sy - 1 >= M) return;
  sy -= 1;
  const floor = dice[5]; // 바닥
  const right = dice[2]; // 오른쪽
  const left = dice[3];
  const top = dice[0];
  dice[3] = top;
  dice[0] = right;
  dice[5] = left;
  dice[2] = floor;
  if (board[sx][sy] !== 0) {
    dice[5] = board[sx][sy];
    board[sx][sy] = 0;
  } else {
    board[sx][sy] = dice[5];
  }
  answer.push(dice[0]);
};

const moveUp = () => {
  if (sx - 1 < 0 || sx - 1 >= N || sy < 0 || sy >= M) return;
  sx -= 1;
  const top = dice[0];
  const front = dice[1];
  const back = dice[4];
  const floor = dice[5];
  dice[1] = top;
  dice[0] = back;
  dice[4] = floor;
  dice[5] = front;
  if (board[sx][sy] !== 0) {
    dice[5] = board[sx][sy];
    board[sx][sy] = 0;
  } else {
    board[sx][sy] = dice[5];
  }
  answer.push(dice[0]);
};

const moveDown = () => {
  if (sx + 1 < 0 || sx + 1 >= N || sy < 0 || sy >= M) return;
  sx += 1;
  const top = dice[0];
  const front = dice[1];
  const back = dice[4];
  const floor = dice[5];
  dice[1] = floor;
  dice[0] = front;
  dice[4] = top;
  dice[5] = back;
  if (board[sx][sy] !== 0) {
    dice[5] = board[sx][sy];
    board[sx][sy] = 0;
  } else {
    board[sx][sy] = dice[5];
  }
  answer.push(dice[0]);
};

for (let i = 0; i < command.length; i++) {
  const c = command[i];
  if (c === 1) {
    // 오른쪽으로
    moveRight();
  } else if (c === 2) {
    // 왼쪽으로
    moveLeft();
  } else if (c === 3) {
    // 위로
    moveUp();
  } else {
    // 아래로
    moveDown();
  }
}

console.log(answer.join("\n"));
