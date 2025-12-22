const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const lines = input.slice(2, M + 2).map((item) => item.split(" ").map(Number));
const [start, end] = input[input.length - 1].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  graph[a].push([b, c]);
}

const dists = Array(N + 1).fill(Infinity);
let prev = Array(N + 1).fill(0);

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
  let pq = new MinHeap();
  dists[start] = 0;
  prev[start] = 0;
  pq.push([start, 0]);

  while (pq.size) {
    const [node, dist] = pq.pop();
    if (dists[node] !== dist) continue;

    for (const [des, cost] of graph[node]) {
      const nd = cost + dist;

      if (nd < dists[des]) {
        dists[des] = nd;
        prev[des] = node;
        pq.push([des, nd]);
      }
    }
  }
};
dijkstra(start);

let cur = end;
let path = [];
while (cur !== 0) {
  path.push(cur);
  if (cur === start) break;
  cur = prev[cur];
}
path.reverse();

let out = `${dists[end]}\n${path.length}\n${path.join(" ")}`;
console.log(out);
