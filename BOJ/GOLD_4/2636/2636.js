const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
let board = input.slice(1).map((item) => item.split(" ").map(Number));
let temp = Array.from({ length: N }, () => Array(M).fill(false));

let time = 0;
let last = 0;

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const bfs = () => {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let q = [[0, 0]];
  let head = 0;
  visited[0][0] = true;
  while (head < q.length) {
    const [x, y] = q[head++];
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 1) continue;
      if (visited[nx][ny]) continue;
      visited[nx][ny] = true;
      q.push([nx, ny]);
    }
  }
  return visited;
};

while (true) {
  let target = 0;
  const r = bfs(0, 0); // 구멍 포함 녹지 않을 곳
  // 녹을 곳 전체 탐색
  for (let i = 1; i < N; i++) {
    for (let j = 1; j < M; j++) {
      if (board[i][j] === 0) continue;
      for (const [dx, dy] of dirs) {
        const nx = i + dx;
        const ny = j + dy;
        if (board[nx][ny] === 0 && r[nx][ny]) {
          temp[i][j] = true;
          target++;
          break;
        }
      }
    }
  }

  if (target === 0) break;

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < M; j++) {
      if (temp[i][j]) {
        board[i][j] = 0;
        temp[i][j] = false;
      }
    }
  }
  time++;
  last = target;
}
console.log(`${time}\n${last}`);
