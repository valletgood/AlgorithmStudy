const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const cases = input.slice(1).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0);
for (let i = 0; i < M; i++) {
  const [small, big] = cases[i];
  graph[small].push(big);
  indegree[big] += 1;
}

let queue = [];
for (let i = 1; i < indegree.length; i++) {
  if (indegree[i] === 0) queue.push(i);
}

let answer = [];

while (queue.length) {
  let check = queue.shift();
  answer.push(check);
  for (const next of graph[check]) {
    indegree[next] -= 1;
    if (indegree[next] === 0) queue.push(next);
  }
}
console.log(answer.join(" "));
