const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [V, E] = input[0].split(" ").map(Number);
const ROOT = Number(input[1]);
const lines = input.slice(2).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: V + 1 }, () => []);
for (let i = 0; i < lines.length; i++) {
  const [s, e, d] = lines[i];
  graph[s].push([e, d]);
}

const dists = Array(V + 1).fill(Infinity);

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
};
dijkstra(ROOT);
let out = "";
for (let i = 1; i <= V; i++) {
  out += dists[i] === Infinity ? "INF\n" : `${dists[i]}\n`;
}
console.log(out.trim());
