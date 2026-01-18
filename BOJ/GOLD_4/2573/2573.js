const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
let board = input.slice(1).map((item) => item.split(" ").map(Number));
let temp = Array.from({ length: N }, () => Array(M).fill(0));

let remain = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 0) continue;
    remain++;
  }
}

let answer = 0;

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const afterYear = (x, y) => {
  let isZero = 0;
  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (board[nx][ny] === 0) {
      isZero++;
    }
  }
  temp[x][y] = isZero;
  return isZero;
};

const checkIsFinish = (sx, sy, visited) => {
  let stack = [[sx, sy]];
  visited[sx][sy] = true;
  let visits = 1;
  while (stack.length) {
    const [x, y] = stack.pop();
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (board[nx][ny] === 0) continue;
      if (visited[nx][ny]) continue;
      visited[nx][ny] = true;
      stack.push([nx, ny]);
      visits++;
    }
  }
  return visits;
};
outer: while (true) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) continue;
      const r = afterYear(i, j);
      if (r === 4) break outer;
    }
  }
  answer++;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (temp[i][j] === 0) continue;
      if (board[i][j] <= temp[i][j]) {
        board[i][j] = 0;
        remain--;
      } else {
        board[i][j] = board[i][j] - temp[i][j];
      }
      temp[i][j] = 0;
    }
  }

  if (remain === 0) {
    answer = 0;
    break;
  }

  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) continue;
      if (visited[i][j]) continue;
      const check = checkIsFinish(i, j, visited);
      if (remain > check) break outer;
    }
  }
}

console.log(answer);
