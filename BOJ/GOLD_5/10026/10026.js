const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);

const board = input.slice(1);
// N행 N열 모든 좌표에 대해 방문 여부를 저장할 visited 배열
let visited = Array.from({ length: N }, () => Array(N).fill(false));

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]; // 상하좌우로 이동하도록 하는 좌표
let count = 0;
let countBlind = 0;

const bfsBoard = (sx, sy, isBlind) => {
  let q = [[sx, sy]]; // 시작 좌표를 큐에 저장
  visited[sx][sy] = true; // 시작과 동시에 방문 여부 표시
  let head = 0;
  if (isBlind) {
    countBlind++;
  } else {
    count++;
  }

  while (head < q.length) {
    const [x, y] = q[head++];
    const color = board[x][y]; // 현재 좌표에 색상
    for (const [dx, dy] of dirs) {
      // 현재 좌표를 기준으로 상하좌우로 이동시킴
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue; // 도달할 수 없다면 pass
      if (!isBlind) {
        if (color !== board[nx][ny]) continue; // 색이 다르면 탐색 대상에서 제외
      } else {
        if (color !== board[nx][ny]) {
          if (color === "B" || board[nx][ny] === "B") continue; // 색이 다르면 탐색 대상에서 제
        }
      }

      if (!visited[nx][ny]) {
        // 방문한 적이 없는 좌표라면 방문 표시를 남기고 탐색 대상으로 추가
        visited[nx][ny] = true;
        q.push([nx, ny]);
      }
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    bfsBoard(i, j, false);
  }
}

visited = Array.from({ length: N }, () => Array(N).fill(false));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    bfsBoard(i, j, true);
  }
}

console.log(`${count} ${countBlind}`);
