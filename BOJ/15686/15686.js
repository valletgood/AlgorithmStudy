const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const board = input.slice(1).map((item) => item.split(" ").map(Number));
let answer = Infinity;
const cs = [];
const hs = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 2) cs.push([i, j]);
    else if (board[i][j] === 1) hs.push([i, j]);
  }
}

const getcsCombi = (arr, M) => {
  let result = [];
  let selected = [];

  function dfs(start) {
    if (selected.length === M) {
      result.push([...selected]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      selected.push(arr[i]);
      dfs(i + 1);
      selected.pop();
    }
  }

  dfs(0);
  return result;
};

const csArr = getcsCombi(cs, M);

for (let i = 0; i < csArr.length; i++) {
  const c = csArr[i];
  let count = 0;
  for (let j = 0; j < hs.length; j++) {
    let min = 651;
    const [hx, hy] = hs[j];
    for (let z = 0; z < c.length; z++) {
      const [x, y] = c[z];
      min = Math.min(min, Math.abs(x - hx) + Math.abs(y - hy));
    }
    count += min;
  }
  answer = Math.min(answer, count);
}
console.log(answer);
