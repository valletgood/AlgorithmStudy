const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const B = Number(input[1]);
const lines = input.slice(2, B + 2).map((item) => item.split(" ").map(Number));
const [start, end] = input[input.length - 1].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  graph[a].push([b, c]);
}

const costs = Array(N + 1).fill(Infinity);

class MinHeap {
  constructor() {
    this.arr = [];
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
  _up(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.arr[p][1] <= this.arr[i][1]) break; // [node, dist]에서 dist 기준
      [this.arr[p], this.arr[i]] = [this.arr[i], this.arr[p]];
      i = p;
    }
  }
  _down(i) {
    const n = this.arr.length;
    while (true) {
      let l = i * 2 + 1;
      let r = l + 1;
      let m = i;

      if (l < n && this.arr[l][1] < this.arr[m][1]) m = l;
      if (r < n && this.arr[r][1] < this.arr[m][1]) m = r;
      if (m === i) break;

      [this.arr[m], this.arr[i]] = [this.arr[i], this.arr[m]];
      i = m;
    }
  }
  get size() {
    return this.arr.length;
  }
}

const dijkstra = (s) => {
  const pq = new MinHeap();
  costs[s] = 0;
  pq.push([s, 0]);

  while (pq.size) {
    const [city, dist] = pq.pop();

    if (dist !== costs[city]) continue;

    for (const [des, cost] of graph[city]) {
      const nd = dist + cost;
      if (nd < costs[des]) {
        costs[des] = nd;
        pq.push([des, nd]);
      }
    }
  }
};

dijkstra(start);
console.log(costs[end]);
