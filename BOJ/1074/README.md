## 문제

https://www.acmicpc.net/problem/1074

### 문제 파악하기

위 문제는 백준 알고리즘 1074 Z 문제이다.

2^N × 2^N 크기의 배열을 Z 모양으로 탐색할 때, (r, c) 위치가 몇 번째로 방문되는지 구하는 문제다.

Z 탐색 순서는 다음과 같다:

1. 배열을 4등분한다
2. 1사분면(왼쪽 위) → 2사분면(오른쪽 위) → 3사분면(왼쪽 아래) → 4사분면(오른쪽 아래) 순서로 방문
3. 각 사분면 내에서도 재귀적으로 같은 Z 순서를 적용

> [!NOTE]
> 배열의 모든 칸을 순회하면 시간 초과가 발생한다. 2^15 × 2^15 = 약 10억 개의 칸을 모두 방문할 수 없으므로, **분할 정복**으로 해당 좌표가 속한 사분면만 탐색해야 한다.

## 풀이

### 1. 핵심 아이디어

```javascript
let total = Math.pow(2, N * 2); // 전체 칸의 개수
```

- 전체 칸의 개수에서 시작하여, 해당 좌표가 속하지 않는 사분면의 크기만큼 빼나가는 방식으로 접근했다.

### 2. 분할 정복 함수

```javascript
const getResult = (r, c, N, cur) => {
  const length = Math.pow(2, N);
  const half = length / 2;
  const sum = Math.pow(2, 2 * (N - 1)); // 한 사분면의 크기
  // ...
};
```

- `length`: 현재 탐색 영역의 한 변의 길이
- `half`: 영역을 반으로 나눈 크기 (사분면 판별용)
- `sum`: 한 사분면에 포함된 칸의 개수

### 3. 사분면 판별

```javascript
if (r >= half && c >= half) {
  // 4사분면 (오른쪽 아래)
  getResult(r % half, c % half, N - 1, cur);
} else if (r >= half && c < half) {
  // 3사분면 (왼쪽 아래)
  getResult(r % half, c % half, N - 1, cur - sum);
} else if (r < half && c >= half) {
  // 2사분면 (오른쪽 위)
  getResult(r % half, c % half, N - 1, cur - 2 * sum);
} else {
  // 1사분면 (왼쪽 위)
  getResult(r % half, c % half, N - 1, cur - 3 * sum);
}
```

> [!TIP] > **Z 순서는 1 → 2 → 3 → 4 사분면**이므로, 4사분면이 마지막에 방문된다.
>
> - 4사분면: cur 그대로 (이전 3개 사분면이 모두 방문됨)
> - 3사분면: cur - sum (4사분면 제외)
> - 2사분면: cur - 2\*sum (3, 4사분면 제외)
> - 1사분면: cur - 3\*sum (2, 3, 4사분면 제외)

### 4. 기저 조건 (N = 1)

```javascript
if (N === 1) {
  if (r >= half && c >= half) answer = cur - 1; // 4사분면
  else if (r >= half && c < half) answer = cur - 2; // 3사분면
  else if (r < half && c >= half) answer = cur - 3; // 2사분면
  else answer = cur - 4; // 1사분면
  return;
}
```

- 2×2 크기가 되면 더 이상 분할하지 않고 직접 계산한다.
- Z 순서에 따라 각 위치의 순번을 cur에서 빼서 answer를 구한다.
