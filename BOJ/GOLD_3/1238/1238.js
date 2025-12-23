const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M, X] = input[0].split(" ").map(Number);
const lines = input.slice(1).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const reverse = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [start, end, cost] = lines[i];
  graph[start].push([end, cost]);
  reverse[end].push([start, cost]);
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

const dijkstra = (graph, start) => {
  const dists = Array(N + 1).fill(Infinity);
  const pq = new MinHeap();
  dists[start] = 0;
  pq.push([start, 0]);
  while (pq.size) {
    const [city, cost] = pq.pop();
    if (cost !== dists[city]) continue;
    for (const [des, c] of graph[city]) {
      const nd = cost + c;
      if (nd < dists[des]) {
        dists[des] = nd;
        pq.push([des, nd]);
      }
    }
  }
  return dists;
};

let answer = 0;
const going = dijkstra(graph, X);
const back = dijkstra(reverse, X);

for (let i = 1; i <= N; i++) {
  answer = Math.max(answer, going[i] + back[i]);
}
console.log(answer);
