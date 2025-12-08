## 문제

https://school.programmers.co.kr/learn/courses/30/lessons/43105

### 문제 파악하기

위 문제는 프로그래머스 정수 삼각형 문제이다.

삼각형의 꼭대기에서 바닥까지 이어지는 경로 중, 거쳐간 숫자의 합이 가장 큰 경우를 찾는 문제다.

각 위치에서는 대각선 왼쪽 또는 대각선 오른쪽으로만 이동할 수 있다.

> [!NOTE]
> 모든 경로를 탐색하면 시간 복잡도가 O(2^N)이 되어 시간 초과가 발생한다.
> **동적 프로그래밍(DP)**을 사용해 각 위치까지의 최대 합을 저장하면서 내려가면 O(N^2)으로 해결할 수 있다.

## 풀이

### 1. DP 배열 초기화

```javascript
let dp = Array.from({ length: length }, (_, i) => Array(i + 1).fill(0));
dp[0][0] = triangle[0][0];
dp[1][0] = triangle[0][0] + triangle[1][0];
dp[1][1] = triangle[0][0] + triangle[1][1];
```

- `dp[i][j]`: i행 j열까지 도달했을 때의 최대 합
- 삼각형 형태에 맞춰 각 행마다 열 크기가 1씩 증가하는 2D 배열 생성
- 첫 번째 행과 두 번째 행은 경로가 하나이므로 직접 초기화

### 2. 점화식

```javascript
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
```

> [!TIP] > **3가지 케이스로 분기 처리**
>
> - **왼쪽 끝 (j === 0)**: 위에서 올 수 있는 경로가 `dp[i-1][0]` 하나뿐
> - **오른쪽 끝 (j === i)**: 위에서 올 수 있는 경로가 `dp[i-1][i-1]` 하나뿐
> - **중간**: 왼쪽 위 `dp[i-1][j-1]`와 오른쪽 위 `dp[i-1][j]` 중 큰 값 선택

### 3. 결과 반환

```javascript
const last = dp[dp.length - 1];
return Math.max(...last);
```

- 마지막 행의 dp 값들 중 최대값이 정답
- 스프레드 연산자를 사용해 배열에서 최대값 추출
