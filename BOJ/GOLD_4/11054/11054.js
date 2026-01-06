const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

const iDp = Array(N).fill(1);
const dDp = Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (nums[i] > nums[j]) {
      iDp[i] = Math.max(iDp[i], iDp[j] + 1);
    }
  }
}

for (let i = N - 1; i >= 0; i--) {
  for (let j = i + 1; j < N; j++) {
    if (nums[i] > nums[j]) {
      dDp[i] = Math.max(dDp[i], dDp[j] + 1);
    }
  }
}

let max = 0;
for (let i = 0; i < N; i++) {
  max = Math.max(max, iDp[i] + dDp[i] - 1);
}
console.log(max);
