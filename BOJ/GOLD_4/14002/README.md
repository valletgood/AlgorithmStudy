# 가장 긴 증가하는 부분 수열 4

[백준 14002번: 가장 긴 증가하는 부분 수열 4](https://www.acmicpc.net/problem/14002)

## 문제 파악하기

수열에서 **가장 긴 증가하는 부분 수열(LIS)** 의 길이와 **실제 수열**을 출력하는 문제입니다.

### 예시

```
수열: [10, 20, 10, 30, 20, 50]
LIS: [10, 20, 30, 50] → 길이 4
```

> [!NOTE]
> 일반 LIS 문제와 달리 **수열 자체를 복원**해야 합니다!
> 이전 원소의 인덱스를 저장하는 `prev` 배열이 필요합니다.

## 풀이

**DP + 경로 추적** 으로 해결합니다.

### 1. DP 및 prev 배열 초기화

```javascript
const dp = Array.from({ length: N }, () => 1);
const prev = Array.from({ length: N }, () => -1);
```

- `dp[i]`: i번째 원소를 마지막으로 하는 LIS 길이
- `prev[i]`: i번째 원소 바로 앞에 오는 원소의 인덱스

### 2. LIS 계산 + 경로 저장

```javascript
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
```

> [!TIP] > `dp[i]`를 갱신할 때 `prev[i] = j`도 함께 저장합니다.
> 이렇게 하면 나중에 수열을 역추적할 수 있습니다.

### 3. 최댓값 인덱스 찾기

```javascript
let maxIndex = -1;
let max = 0;
for (let i = 0; i < N; i++) {
  if (dp[i] > max) {
    maxIndex = i;
    max = dp[i];
  }
}
```

### 4. 수열 복원 (역추적)

```javascript
let out = [];
while (maxIndex >= 0) {
  out.push(nums[maxIndex]);
  maxIndex = prev[maxIndex];
}

console.log(`${max}\n${out.reverse().join(" ")}`);
```

prev를 따라가면 역순으로 수열이 구해지므로 `reverse()` 필요!

## 동작 예시

```
수열: [10, 20, 10, 30, 20, 50]
인덱스: 0   1   2   3   4   5

dp:   [1,  2,  1,  3,  2,  4]
prev: [-1, 0, -1,  1, 0,  3]

최댓값: dp[5] = 4, maxIndex = 5

역추적:
5 → prev[5]=3 → prev[3]=1 → prev[1]=0 → prev[0]=-1 (종료)

out (역순): [50, 30, 20, 10]
out.reverse(): [10, 20, 30, 50]
```

## 핵심 정리

| 배열    | 역할                                    |
| ------- | --------------------------------------- |
| dp[i]   | i를 끝으로 하는 LIS 길이                |
| prev[i] | i 바로 앞 원소의 인덱스 (-1이면 시작점) |

### 경로 복원 패턴

```
1. DP 계산 시 prev 배열에 이전 인덱스 저장
2. 최댓값 인덱스에서 시작
3. prev를 따라 -1이 될 때까지 역추적
4. reverse()로 순서 뒤집기
```

### 시간 복잡도

- LIS 계산: O(N²)
- 경로 복원: O(N)
- 총 **O(N²)**
