const fs = require("fs");
const N = Number(fs.readFileSync(0, "utf8").trim());

const nums = new Set();

outer: for (let i = 2; i <= N; i++) {
  for (let j = 2; j * j <= i; j++) {
    if (i % j === 0) continue outer;
  }
  nums.add(i);
}

const dp = Array.from({ length: N + 1 }, () => 0);

for (const n of nums) {
  dp[n] = 1;
}

// 구현
const numArr = Array.from(nums);
let answer = 0;
let l = 0;
let r = 1;
let sum = numArr[0];
while (l <= r) {
  if (sum < N) {
    sum += numArr[r];
    r++;
  } else if (sum > N) {
    sum -= numArr[l];
    l++;
  } else if (sum === N) {
    answer++;
    sum -= numArr[l];
    l++;
  }
  if (r >= numArr.length - 1) r = numArr.length - 1;
}
console.log(answer);
