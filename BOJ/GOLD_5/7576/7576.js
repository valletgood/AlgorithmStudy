const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const board = input.slice(1).map((item) => item.split(" ").map(Number));

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const visited = Array.from({ length: M }, () => Array(N).fill(false));
let days = 0;

const tomatoPosition = [];
for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 1) tomatoPosition.push(i, j);
  }
}

const bfs = (tArr) => {
  // [x, y * n] 배열
  let q = [tArr];
  let head = 0;
  for (let i = 0; i < tArr.length; i += 2) {
    const x = tArr[i];
    const y = tArr[i + 1];
    visited[x][y] = true;
  }
  while (head < q.length) {
    const positions = q[head++];
    const move = [];
    for (let i = 0; i < positions.length; i += 2) {
      const x = positions[i];
      const y = positions[i + 1];
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (ny < 0 || nx < 0 || nx >= M || ny >= N) continue;
        if (board[nx][ny] === -1) continue;
        if (!visited[nx][ny]) {
          visited[nx][ny] = true;
          move.push(nx, ny);
        }
      }
    }
    if (move.length > 0) {
      q.push(move);
      days++;
    }
  }
};

bfs(tomatoPosition);

let possible = true;
outer: for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      if (board[i][j] !== -1) {
        possible = false;
        break outer;
      }
    }
  }
}

console.log(possible ? days : -1);
