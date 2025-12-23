const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const lines = input.slice(1).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < lines.length; i++) {
  const [parent, child, dist] = lines[i];
  graph[parent].push([child, dist]);
  graph[child].push([parent, dist]);
}

const dfs = (start) => {
  const dist = Array(N + 1).fill(-1);
  const stack = [[start, 0]];
  dist[start] = 0;

  while (stack.length) {
    const [node, d] = stack.pop();
    for (const [des, cost] of graph[node]) {
      if (dist[des] !== -1) continue;
      dist[des] = d + cost;
      stack.push([des, d + cost]);
    }
  }

  let farNode = start;
  let farDist = 0;
  for (let i = 1; i <= N; i++) {
    if (dist[i] > farDist) {
      farNode = i;
      farDist = dist[i];
    }
  }
  return [farNode, farDist];
};

if (N === 1) {
  console.log(0);
} else {
  const [node, dist] = dfs(1);
  const [n, d] = dfs(node);
  console.log(d);
}
