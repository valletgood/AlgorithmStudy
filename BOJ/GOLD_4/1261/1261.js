const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((item) => item.split("").map(Number));
const dists = Array.from({ length: M }, () => Array(N).fill(Infinity));

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

class MinHeap {
  constructor() {
    this.arr = [];
  }
  _up(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.arr[parent][2] <= this.arr[i][2]) break;
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
      if (l < n && this.arr[l][2] < this.arr[m][2]) m = l;
      if (r < n && this.arr[r][2] < this.arr[m][2]) m = r;
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

const pq = new MinHeap();
pq.push([0, 0, 0]);
dists[0][0] = 0;
while (pq.size) {
  const [x, y, dist] = pq.pop();
  if (dists[x][y] !== dist) continue;
  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
    const nd = dist + board[nx][ny];
    if (nd < dists[nx][ny]) {
      dists[nx][ny] = nd;
      pq.push([nx, ny, nd]);
    }
  }
}

console.log(dists[M - 1][N - 1]);
