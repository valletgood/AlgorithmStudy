## 문제

https://www.acmicpc.net/problem/9251

### 문제 파악하기

위 문제는 백준 알고리즘 9251 LCS (Longest Common Subsequence) 문제이다.

두 문자열이 주어졌을 때, **최장 공통 부분 수열**의 길이를 구하는 문제다. 부분 수열은 연속하지 않아도 되며, 순서만 유지하면 된다.

> [!NOTE] > **LCS란?**
>
> 예: "ACAYKP"와 "CAPCAK"
>
> - 공통 부분 수열: "A", "C", "CA", "AC", "CAK", "ACAK" 등
> - 최장 공통 부분 수열: "ACAK" (길이 4)
>
> **DP로 해결**: 두 문자열의 각 위치까지 고려했을 때 LCS 길이를 저장

## 풀이

### 1. DP 테이블 정의

```javascript
const dp = Array.from({ length: first.length + 1 }, () =>
  Array(second.length + 1).fill(0)
);
```

- `dp[i][j]`: first의 i번째까지, second의 j번째까지 고려했을 때 LCS 길이
- 0번 행/열은 빈 문자열을 의미 (모두 0)

### 2. 점화식

```javascript
for (let i = 1; i <= first.length; i++) {
  for (let j = 1; j <= second.length; j++) {
    if (first[i - 1] === second[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}
```

> [!TIP] > **두 가지 케이스**
>
> 1. **문자가 같을 때** (`first[i-1] === second[j-1]`)
>
>    - 이 문자를 LCS에 포함시킴
>    - `dp[i][j] = dp[i-1][j-1] + 1`
>
> 2. **문자가 다를 때**
>    - 이 문자를 포함시키지 않음
>    - first를 한 칸 줄이거나, second를 한 칸 줄인 것 중 큰 값
>    - `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

### 3. 결과

```javascript
console.log(dp[first.length][second.length]);
```

- 두 문자열 전체를 고려했을 때의 LCS 길이

### 4. 예시

```
first = "ACAYKP", second = "CAPCAK"

DP 테이블:
      ""  C  A  P  C  A  K
  ""   0  0  0  0  0  0  0
  A    0  0  1  1  1  1  1
  C    0  1  1  1  2  2  2
  A    0  1  2  2  2  3  3
  Y    0  1  2  2  2  3  3
  K    0  1  2  2  2  3  4
  P    0  1  2  3  3  3  4

결과: dp[6][6] = 4
LCS: "ACAK"
```

### 5. 시간/공간 복잡도

- 시간 복잡도: O(N × M) - 두 문자열 길이의 곱
- 공간 복잡도: O(N × M) - DP 테이블 크기
