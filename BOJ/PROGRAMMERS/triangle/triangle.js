function solution(triangle) {
  const length = triangle.length;
  const m = triangle[triangle.length - 1].length;
  if (length === 1) return triangle[0][0];
  let dp = Array.from({ length: length }, (_, i) => Array(i + 1).fill(0));
  dp[0][0] = triangle[0][0];
  dp[1][0] = triangle[0][0] + triangle[1][0];
  dp[1][1] = triangle[0][0] + triangle[1][1];
  for (let i = 2; i < length; i++) {
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        dp[i][j] = dp[i - 1][0] + triangle[i][j];
        continue;
      }
      if (j === i) {
        dp[i][j] = dp[i - 1][i - 1] + triangle[i][i];
        continue;
      }
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j];
    }
  }
  const last = dp[dp.length - 1];
  return Math.max(...last);
}
