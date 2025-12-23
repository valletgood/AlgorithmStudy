## 문제

https://school.programmers.co.kr/learn/courses/30/lessons/161988

### 문제 파악하기

위 문제는 프로그래머스 연속 펄스 부분 수열의 합 문제이다.

수열에 펄스를 곱한 후 **연속 부분 수열의 최대 합**을 구하는 문제다.

펄스는 두 종류가 있다:

- `[1, -1, 1, -1, ...]` (1로 시작)
- `[-1, 1, -1, 1, ...]` (-1로 시작)

> [!NOTE] > **카데인 알고리즘(Kadane's Algorithm) 활용**
>
> - 연속 부분 수열의 최대 합을 O(N)에 구하는 알고리즘
> - 두 가지 펄스 패턴 모두에 대해 적용
> - `dp[i] = max(arr[i], arr[i] + dp[i-1])`

## 풀이

### 1. 두 가지 펄스 패턴 생성

```javascript
const startPlus = []; // [1, -1, 1, -1, ...]
const startMinus = []; // [-1, 1, -1, 1, ...]

for (let i = 0; i < sequence.length; i++) {
  if (i % 2 === 0) {
    startPlus.push(1);
    startMinus.push(-1);
  } else {
    startPlus.push(-1);
    startMinus.push(1);
  }
}
```

- `startPlus`: 짝수 인덱스에서 1, 홀수 인덱스에서 -1
- `startMinus`: 짝수 인덱스에서 -1, 홀수 인덱스에서 1

### 2. 카데인 알고리즘 적용

```javascript
const dp1 = Array(sequence.length).fill(0); // startPlus 적용
const dp2 = Array(sequence.length).fill(0); // startMinus 적용

dp1[0] = sequence[0];
dp2[0] = -1 * sequence[0];

for (let i = 1; i < sequence.length; i++) {
  dp1[i] = Math.max(
    sequence[i] * startPlus[i] + dp1[i - 1],
    sequence[i] * startPlus[i]
  );
  dp2[i] = Math.max(
    sequence[i] * startMinus[i] + dp2[i - 1],
    sequence[i] * startMinus[i]
  );
  max = Math.max(max, dp1[i], dp2[i]);
}
```

> [!TIP] > **카데인 알고리즘 핵심**
>
> - `dp[i]`: i에서 끝나는 연속 부분 수열의 최대 합
> - 두 가지 선택:
>   1. 이전 부분 수열에 현재 원소 추가: `dp[i-1] + arr[i]`
>   2. 현재 원소부터 새로 시작: `arr[i]`
> - 둘 중 큰 값 선택

### 3. 최대값 갱신

```javascript
let max = Math.max(dp1[0], dp2[0]);

for (let i = 1; i < sequence.length; i++) {
  // ... dp 계산
  max = Math.max(max, dp1[i], dp2[i]);
}

return max;
```

- 두 펄스 패턴 모두에서 최대값 추적

### 4. 예시

```
sequence = [2, 3, -6, 1, 3, -1, 2, 4]

startPlus 펄스: [1, -1, 1, -1, 1, -1, 1, -1]
적용 결과: [2, -3, -6, -1, 3, 1, 2, -4]
최대 부분합: [3, 1, 2] = 6

startMinus 펄스: [-1, 1, -1, 1, -1, 1, -1, 1]
적용 결과: [-2, 3, 6, 1, -3, -1, -2, 4]
최대 부분합: [3, 6, 1] = 10

결과: 10
```

### 5. 시간/공간 복잡도

- 시간 복잡도: O(N)
- 공간 복잡도: O(N)
