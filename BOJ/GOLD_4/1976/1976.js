const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const M = Number(input[1]);

const lines = input.slice(2, N + 2).map((item) => item.split(" ").map(Number));
const plans = input[N + 2].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < N; i++) {
  const temp = [];
  for (let j = 0; j < N; j++) {
    if (lines[i][j] === 1) {
      temp.push(j + 1);
    }
  }
  graph[i + 1].push(...temp);
}

const visited = Array(N + 1).fill(false);

const dfs = (start) => {
  const stack = [];
  stack.push(start);
  visited[start] = true;
  while (stack.length) {
    const node = stack.pop();
    for (const next of graph[node]) {
      if (visited[next]) continue;
      visited[next] = true;
      stack.push(next);
    }
  }
};

dfs(plans[0]);

let out = "YES";
let v = 0;
for (let i = 0; i < M; i++) {
  if (visited[plans[i]]) continue;
  if (!visited[plans[i]]) {
    out = "NO";
    break;
  }
}

console.log(out);
