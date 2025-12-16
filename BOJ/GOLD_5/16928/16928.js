const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const lines = input.slice(1);
const jump = Array.from({ length: 101 }).fill(0);
const visited = Array.from({ length: 101 }).fill(false);

for (let i = 0; i < lines.length; i++) {
  const [start, end] = lines[i].split(" ").map(Number);
  jump[start] = end;
}

const bfs = (n, dist) => {
  let q = [[n, dist]];
  let head = 0;
  visited[n] = true;

  while (head < q.length) {
    const [pos, dist] = q[head++];
    if (pos === 100) return dist;
    for (let i = 1; i <= 6; i++) {
      let np = pos + i;
      if (np > 100) continue;
      if (jump[np] !== 0) np = jump[np];
      if (!visited[np]) {
        visited[np] = true;
        q.push([np, dist + 1]);
      }
    }
  }
};

console.log(bfs(1, 0));
