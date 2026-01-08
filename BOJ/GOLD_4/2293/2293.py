import sys

input = sys.stdin.read().strip().split('\n')

N, K = map(int, input[0].split())
coins = list(map(int, input[1:]))

dp = [0] * (K + 1)

dp[0] = 1
for i in range(N):
    for j in range(coins[i], K + 1):
        dp[j] = dp[j] + dp[j - coins[i]]

print(dp[K])
