const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [R, C, T] = input[0].split(" ").map(Number);
let board = input.slice(1).map((item) => item.split(" ").map(Number));
let temp = Array.from({ length: R }, () => Array(C).fill(0));

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let upPos = [];
let downPos = [];

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] === -1) {
      if (upPos.length === 0) {
        upPos = [i, j];
      } else {
        downPos = [i, j];
      }
    }
  }
}

const getS = (x, y) => {
  let isD = 0;
  const r = Math.floor(board[x][y] / 5);
  for (let z = 0; z < dirs.length; z++) {
    const [dx, dy] = dirs[z];
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
    if (board[nx][ny] === -1) continue;
    temp[nx][ny] += r;
    isD++;
  }
  temp[x][y] += isD * r === 0 ? 0 : isD * r * -1;
};

const afterSecond = () => {
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (temp[i][j] !== 0) {
        board[i][j] += temp[i][j];
        temp[i][j] = 0;
      }
    }
  }
};

const work = () => {
  // 위 구역
  for (let i = upPos[0] - 1; i >= 1; i--) {
    board[i][0] = board[i - 1][0];
  }
  for (let i = 0; i < C - 1; i++) {
    board[0][i] = board[0][i + 1];
  }
  for (let i = 0; i < upPos[0]; i++) {
    board[i][C - 1] = board[i + 1][C - 1];
  }
  for (let i = C - 1; i >= 2; i--) {
    board[upPos[0]][i] = board[upPos[0]][i - 1];
  }
  board[upPos[0]][1] = 0;

  for (let i = downPos[0] + 1; i < R - 1; i++) {
    board[i][0] = board[i + 1][0];
  }
  for (let i = 0; i < C - 1; i++) {
    board[R - 1][i] = board[R - 1][i + 1];
  }
  for (let i = R - 1; i > downPos[0]; i--) {
    board[i][C - 1] = board[i - 1][C - 1];
  }
  for (let i = C - 1; i >= 2; i--) {
    board[downPos[0]][i] = board[downPos[0]][i - 1];
  }
  board[downPos[0]][1] = 0;
};

for (let second = 0; second < T; second++) {
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (board[i][j] !== 0 && board[i][j] !== -1) {
        getS(i, j);
      }
    }
  }
  afterSecond();
  work();
}

let out = 0;
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] !== 0 && board[i][j] !== -1) out += board[i][j];
  }
}
console.log(out);
