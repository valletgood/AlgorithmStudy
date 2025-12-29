const fs = require("fs");
const [N, K] = fs.readFileSync(0, "utf8").trim().split(" ").map(Number);

const visited = Array(1000001).fill(Infinity);

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

const dijkestra = (start) => {
  let pq = new MinHeap();
  visited[start] = 0;
  pq.push([start, 0]);

  while (pq.size) {
    const [pos, dist] = pq.pop();
    if (dist !== visited[pos]) continue;
    const b = pos - 1;
    const f = pos + 1;
    const t = pos * 2;
    if (b >= 0 && dist + 1 < visited[b]) {
      visited[b] = dist + 1;
      pq.push([pos - 1, dist + 1]);
    }
    if (f <= 1000000 && dist + 1 < visited[f]) {
      visited[f] = dist + 1;
      pq.push([pos + 1, dist + 1]);
    }
    if (pos * 2 < 1000000 && visited[pos * 2] > dist) {
      visited[pos * 2] = dist;
      pq.push([pos * 2, dist]);
    }
  }
};

dijkestra(N);
console.log(visited[K]);
