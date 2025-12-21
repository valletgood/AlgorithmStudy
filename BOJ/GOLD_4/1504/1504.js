const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, E] = input[0].split(" ").map(Number);
const lines = input.slice(1, E + 1).map((item) => item.split(" ").map(Number));
const [v1, v2] = input[input.length - 1].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

class MinHeap {
  constructor() {
    this.arr = [];
  }
  _up(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.arr[parent][1] <= this.arr[i][1]) break;
      [this.arr[parent], this.arr[i]] = [this.arr[i], this.arr[parent]];
      i = parent;
    }
  }
  _down(i) {
    const n = this.arr.length;
    while (true) {
      let l = 2 * i + 1;
      let r = l + 1;
      let m = i;

      if (l < n && this.arr[l][1] < this.arr[m][1]) m = l;
      if (r < n && this.arr[r][1] < this.arr[m][1]) m = r;
      if (m === i) break;
      [this.arr[m], this.arr[i]] = [this.arr[i], this.arr[m]];
      i = m;
    }
  }
  push(item) {
    this.arr.push(item);
    this._up(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return null;
    const top = this.arr[0];
    const last = this.arr.pop();
    if (this.arr.length > 0) {
      this.arr[0] = last;
      this._down(0);
    }
    return top;
  }
  get size() {
    return this.arr.length;
  }
}

const dijkstra = (start) => {
  const dists = Array(N + 1).fill(Infinity);
  const pq = new MinHeap();
  dists[start] = 0;
  pq.push([start, 0]);

  while (pq.size) {
    const [node, dist] = pq.pop();
    if (dist !== dists[node]) continue;

    for (const [des, cost] of graph[node]) {
      const nd = dist + cost;
      if (nd < dists[des]) {
        dists[des] = nd;
        pq.push([des, nd]);
      }
    }
  }
  return dists;
};
const distFrom1 = dijkstra(1);
const distFromV1 = dijkstra(v1);
const distFromV2 = dijkstra(v2);

const route1 = distFrom1[v1] + distFromV1[v2] + distFromV2[N]; // 1->v1->v2->N
const route2 = distFrom1[v2] + distFromV2[v1] + distFromV1[N]; // 1->v2->v1->N

const ans = Math.min(route1, route2);

console.log(ans === Infinity ? -1 : ans);
