const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [R, C] = input[0].split(" ").map(Number);
const board = input.slice(1);

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const toBit = (char) => 1 << (char.charCodeAt(0) - 65);

let answer = 0;

const dfs = () => {
  let stack = [[0, 0, toBit(board[0][0]), 1]];
  while (stack.length) {
    const [x, y, mask, len] = stack.pop();
    if (len > answer) {
      answer = len;
    }
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      const bit = toBit(board[nx][ny]);
      if (mask & bit) continue;
      stack.push([nx, ny, mask | bit, len + 1]);
    }
  }
};

dfs();
console.log(answer);
