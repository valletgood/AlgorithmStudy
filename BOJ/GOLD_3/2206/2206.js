const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((line) => line.split("").map(Number));

const visited = Array.from(
  { length: N },
  () => Array.from({ length: M }, () => [false, false]) // [안부숨, 부숨]
);

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const bfs = () => {
  let q = [[0, 0, 1, 0]]; // x, y, dist(시작 포함), broken(0/1)
  let head = 0;
  visited[0][0][0] = true;

  while (head < q.length) {
    const [x, y, dist, broken] = q[head++];

    if (x === N - 1 && y === M - 1) return dist;

    for (const [dx, dy] of dirs) {
      const nx = x + dx,
        ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

      const nextBroken = broken + board[nx][ny]; // ✅ 0/1/2
      if (nextBroken === 2) continue; // ✅ 벽 2번은 불가

      if (visited[nx][ny][nextBroken]) continue;
      visited[nx][ny][nextBroken] = true;

      q.push([nx, ny, dist + 1, nextBroken]);
    }
  }
  return -1;
};

console.log(bfs());
