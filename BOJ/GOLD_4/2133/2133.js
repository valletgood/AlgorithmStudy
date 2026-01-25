const fs = require("fs");
const N = Number(fs.readFileSync(0, "utf8").trim());

const dp = Array(N + 1).fill(0);
dp[2] = 3;
dp[4] = 11;
for (let i = 6; i <= N; i++) {
  if (i % 2 === 1) continue;
  dp[i] = 3 * dp[i - 2] + (dp[i - 2] - dp[i - 4]);
}
console.log(dp[N]);
