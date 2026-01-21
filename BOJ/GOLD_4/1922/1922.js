const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const cases = input.slice(2).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [s, e, d] = cases[i];
  graph[s].push([e, d]);
  graph[e].push([s, d]);
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

const visited = Array(N + 1).fill(false);

const pq = new MinHeap();
pq.push([1, 0]);

let answer = 0;
let picked = 0;

while (pq.size && picked < N) {
  const [node, cost] = pq.pop();
  if (visited[node]) continue;

  visited[node] = true;
  picked++;
  answer += cost;

  for (const [next, w] of graph[node]) {
    if (!visited[next]) {
      pq.push([next, w]);
    }
  }
}

console.log(answer);
