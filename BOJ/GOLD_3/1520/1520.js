const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((item) => item.split(" ").map(Number));

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
let dp = Array.from({ length: N }, () => Array(M).fill(-1));

const dfs = (x, y) => {
  if (x === N - 1 && y === M - 1) return 1;
  if (dp[x][y] !== -1) return dp[x][y];

  dp[x][y] = 0;
  const h = board[x][y];

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (board[nx][ny] < h) {
      dp[x][y] += dfs(nx, ny);
    }
  }
  return dp[x][y];
};

console.log(dfs(0, 0));
