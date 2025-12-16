function solution(m, n, puddles) {
  const MOD = 1_000_000_007;

  let dp = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = 0; i < puddles.length; i++) {
    const [x, y] = puddles[i];
    dp[y - 1][x - 1] = -1;
  }

  dp[0][0] = 1;

  for (let j = 1; j < m; j++) {
    if (dp[0][j - 1] === -1 || dp[0][j] === -1) {
      dp[0][j] = -1;
    } else {
      dp[0][j] = 1;
    }
  }

  for (let i = 1; i < n; i++) {
    if (dp[i][0] === -1 || dp[i - 1][0] === -1) {
      dp[i][0] = -1;
    } else {
      dp[i][0] = 1;
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (dp[i][j] === -1) {
        continue;
      }
      if (dp[i - 1][j] === -1 && dp[i][j - 1] === -1) {
        dp[i][j] = 0;
      } else if (dp[i - 1][j] === -1) {
        dp[i][j] = dp[i][j - 1] % MOD;
      } else if (dp[i][j - 1] === -1) {
        dp[i][j] = dp[i - 1][j] % MOD;
      } else {
        dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
      }
    }
  }

  return dp[n - 1][m - 1];
}
