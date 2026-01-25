const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);

const lines = input.slice(1).map((item) => item.split(" ").map(Number));

const graph = Array.from({ length: V + 1 }, () => []);

for (let i = 0; i < E; i++) {
  const [s, e, c] = lines[i];
  graph[s].push([e, c]);
  graph[e].push([s, c]);
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

const visited = Array(V + 1).fill(false);
const pq = new MinHeap();

pq.push([1, 0]);

let answer = 0;
let picked = 0;

while (pq.size && picked < V) {
  const [node, cost] = pq.pop();
  if (visited[node]) continue;

  visited[node] = true;
  answer += cost;
  picked++;

  for (const [next, w] of graph[node]) {
    if (!visited[next]) {
      pq.push([next, w]);
    }
  }
}

console.log(answer);
