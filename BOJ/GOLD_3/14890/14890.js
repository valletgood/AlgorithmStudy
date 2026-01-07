const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [N, L] = input[0].split(" ").map(Number);
const board = input.slice(1).map((item) => item.split(" ").map(Number));
const stairsX = Array.from({ length: N }, () => Array(N).fill(false));
const stairsY = Array.from({ length: N }, () => Array(N).fill(false));

let answer = 0;

const canPassX = (arr, xIndex) => {
  for (let i = 0; i < N - 1; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) > 1) return false;
    if (Math.abs(arr[i] - arr[i + 1]) === 1) {
      let index = 1;
      while (index <= L) {
        let p = arr[i] > arr[i + 1] ? i + index : i - index + 1;
        if (p < 0 || p >= N) return false;
        if (stairsX[xIndex][p]) return false;
        stairsX[xIndex][p] = true;
        index++;
      }
    }
  }
  return true;
};

const canPassY = (arr, yIndex) => {
  for (let i = 0; i < N - 1; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) > 1) return false;
    if (Math.abs(arr[i] - arr[i + 1]) === 1) {
      let index = 1;
      while (index <= L) {
        let p = arr[i] > arr[i + 1] ? i + index : i - index + 1;
        if (p < 0 || p >= N) return false;
        if (stairsY[p][yIndex]) return false;
        stairsY[p][yIndex] = true;
        index++;
      }
    }
  }
  return true;
};

// 가로 줄
for (let i = 0; i < N; i++) {
  const can = canPassX(board[i], i);
  if (can) answer++;
}

for (let i = 0; i < N; i++) {
  const arr = [];
  for (let j = 0; j < N; j++) {
    arr.push(board[j][i]);
  }
  const can = canPassY(arr, i);
  if (can) answer++;
}

console.log(answer);
