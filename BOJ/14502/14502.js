const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const board = input.slice(1).map((item) => item.split(" ").map(Number));
let answer = 0;

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const viruses = [];
const safe = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 2) viruses.push([i, j]);
    if (board[i][j] === 0) safe.push([i, j]);
  }
}

const getCombi = (arr, n) => {
  let result = [];
  let selected = [];

  const dfs = (start) => {
    if (selected.length === n) {
      result.push([...selected]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      selected.push(arr[i]);
      dfs(i + 1);
      selected.pop();
    }
  };
  dfs(0);
  return result;
};

const combi = getCombi(safe, 3);

const bfs = (wall) => {
  const tmp = board.map((row) => row.slice());
  let head = 0;
  const q = [];
  for (const [x, y] of viruses) {
    q.push([x, y]);
  }
  for (const [wx, wy] of wall) {
    tmp[wx][wy] = 1;
  }
  while (head < q.length) {
    const [x, y] = q[head++];
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (tmp[nx][ny] !== 0) continue;
      tmp[nx][ny] = 2;
      q.push([nx, ny]);
    }
  }

  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (tmp[i][j] === 0) count++;
    }
  }
  return count;
};

for (let i = 0; i < combi.length; i++) {
  answer = Math.max(answer, bfs(combi[i]));
}

console.log(answer);
