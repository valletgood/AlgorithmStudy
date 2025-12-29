const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const [sx, sy, d] = input[1].split(" ").map(Number);
const board = input.slice(2).map((item) => item.split(" ").map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(false));

let answer = 0;

const dx = [-1, 0, 1, 0]; // 북 동 남 서
const dy = [0, 1, 0, -1];

const getResult = (x, y, d) => {
  // 1. 현재 칸 청소
  if (board[x][y] === 0) {
    board[x][y] = 2;
    answer++;
  }

  // 2. 주변 칸 확인
  for (let i = 0; i < 4; i++) {
    d = (d + 3) % 4; // 왼쪽 회전
    const nx = x + dx[d];
    const ny = y + dy[d];

    if (board[nx][ny] === 0) {
      return getResult(nx, ny, d);
    }
  }

  // 3) 4방향 다 못 갔으면 뒤로
  const backDir = (d + 2) % 4;
  const bx = x + dx[backDir];
  const by = y + dy[backDir];

  if (board[bx][by] === 1) return; // 뒤가 벽이면 종료
  return getResult(bx, by, d); // 방향은 유지하고 후진
};

getResult(sx, sy, d);
console.log(answer);
