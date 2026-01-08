const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, S] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

const MAX = 100001;

let l = 0;
let r = 1;
let answer = MAX;
let sum = nums[0];

while (l < r && l <= N && r <= N) {
  if (sum >= S) {
    answer = Math.min(r - l, answer);
    sum -= nums[l];
    l++;
  } else {
    const right = nums[r];
    sum += right;
    r++;
  }
}

console.log(answer === MAX ? 0 : answer);
