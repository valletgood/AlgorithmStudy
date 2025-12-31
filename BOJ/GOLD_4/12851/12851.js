const fs = require("fs");
const [N, K] = fs.readFileSync(0, "utf8").trim().split(" ").map(Number);

const MAX = 100000;

const visited = Array.from({ length: MAX + 1 }).fill(-1); // 최단 경로
const dists = Array.from({ length: MAX + 1 }).fill(0); // 해당 경로로 가는 개수

const bfs = (start) => {
  let q = [[start, 0]];
  let head = 0;
  visited[start] = 0;
  dists[start] = 1;
  while (head < q.length) {
    const [pos, dist] = q[head++];
    if (pos === K) break;
    const nb = pos - 1;
    const nf = pos + 1;
    const nt = pos * 2;
    const nd = dist + 1;
    if (nb >= 0) {
      if (visited[nb] === -1) {
        visited[nb] = nd;
        q.push([nb, nd]);
        dists[nb] = dists[pos];
      } else if (visited[nb] === nd) {
        dists[nb] += dists[pos];
      }
    }
    if (nf <= MAX) {
      if (visited[nf] === -1) {
        visited[nf] = nd;
        q.push([nf, nd]);
        dists[nf] = dists[pos];
      } else if (visited[nf] === nd) {
        dists[nf] += dists[pos];
      }
    }
    if (nt <= MAX) {
      if (visited[nt] === -1) {
        visited[nt] = nd;
        q.push([nt, nd]);
        dists[nt] = dists[pos];
      } else if (visited[nt] === nd) {
        dists[nt] += dists[pos];
      }
    }
  }
};
bfs(N);
console.log(`${visited[K]}\n${dists[K]}`);
