const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

const dp = Array.from({ length: N }, () => 1);
const prev = Array.from({ length: N }, () => -1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      if (dp[i] < dp[j] + 1) {
        prev[i] = j;
        dp[i] = dp[j] + 1;
      }
    }
  }
}

let maxIndex = -1;
let max = 0;
for (let i = 0; i < N; i++) {
  if (dp[i] > max) {
    maxIndex = i;
    max = dp[i];
  }
}
let out = [];
while (maxIndex >= 0) {
  out.push(nums[maxIndex]);
  maxIndex = prev[maxIndex];
}

console.log(`${max}\n${out.reverse().join(" ")}`);
