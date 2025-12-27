const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const board = input.slice(1).map((item) => item.split(" ").map(Number));

// dp[i][j][z] z:0 가로, z:1 세로, z:2 대각선
const dp = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [0, 0, 0])
);
dp[0][1][0] = 1;

for (let j = 2; j < N; j++) {
  if (board[0][j] === 1) break;
  dp[0][j][0] = dp[0][j - 1][0];
}

for (let i = 1; i < N; i++) {
  for (let j = 2; j < N; j++) {
    if (board[i][j] === 1) continue;
    // 가로
    dp[i][j][0] = dp[i][j - 1][0] + dp[i][j - 1][2];
    dp[i][j][1] = dp[i - 1][j][2] + dp[i - 1][j][1];
    if (board[i - 1][j] === 0 && board[i][j - 1] === 0) {
      dp[i][j][2] =
        dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1] + dp[i - 1][j - 1][2];
    }
  }
}

const [a, b, c] = dp[N - 1][N - 1];
console.log(a + b + c);
