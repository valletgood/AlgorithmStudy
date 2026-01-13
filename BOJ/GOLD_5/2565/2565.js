const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const lines = input
  .slice(1)
  .map((item) => item.split(" ").map(Number))
  .sort((a, b) => {
    return a[0] - b[0];
  });

const dp = Array.from({ length: N }, () => 1);
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (lines[i][1] > lines[j][1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}
console.log(N - Math.max(...dp));
