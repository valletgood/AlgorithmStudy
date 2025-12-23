const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const lines = input
  .slice(1)
  .map((item) => item.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);
const dp = Array(K + 1).fill(0);

for (let i = 0; i < N; i++) {
  const [weight, value] = lines[i];
  for (let j = K; j >= weight; j--) {
    dp[j] = Math.max(dp[j], dp[j - weight] + value);
  }
}

console.log(dp[K]);
