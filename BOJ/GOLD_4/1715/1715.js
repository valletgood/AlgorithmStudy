const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n").map(Number);
const N = input[0];
const nums = input.slice(1).sort((a, b) => a - b);

class MinHeap {
  constructor() {
    this.arr = [];
  }
  _up(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.arr[parent] <= this.arr[i]) break;
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
      if (l < n && this.arr[l] < this.arr[m]) m = l;
      if (r < n && this.arr[r] < this.arr[m]) m = r;
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

for (let i = 0; i < N; i++) {
  pq.push(nums[i]);
}
let answer = 0;
while (pq.size > 1) {
  const first = pq.pop();
  const second = pq.pop();
  const sum = first + second;
  pq.push(sum);
  answer += sum;
}
console.log(answer);
