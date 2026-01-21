const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const T = Number(input[0]);
let out = [];
let idx = 1;

for (let i = 0; i < T; i++) {
  const [N, K] = input[idx++].split(" ").map(Number);
  const buildings = input[idx++].split(" ").map(Number);

  const graph = Array.from({ length: N + 1 }, () => []);
  const indegree = Array(N + 1).fill(0);

  const dp = Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    dp[i] = buildings[i - 1];
  }

  for (let i = 0; i < K; i++) {
    const [s, e] = input[idx++].split(" ").map(Number);
    graph[s].push(e);
    indegree[e] += 1;
  }
  const target = Number(input[idx++]);
  let queue = [];
  for (let i = 1; i < indegree.length; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  if (indegree[target] === 0) {
    out.push(buildings[target - 1]);
    continue;
  }

  while (queue.length) {
    let check = queue.shift();
    for (const next of graph[check]) {
      indegree[next] -= 1;
      dp[next] = Math.max(dp[check] + buildings[next - 1], dp[next]);
      if (indegree[next] === 0) queue.push(next);
    }
  }
  out.push(dp[target]);
}
console.log(out.join("\n"));
