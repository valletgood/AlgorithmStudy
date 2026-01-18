# 빙산

[백준 2573번: 빙산](https://www.acmicpc.net/problem/2573)

## 문제 파악하기

빙산이 녹아서 **두 덩어리 이상으로 분리되는 최초의 시간**을 구하는 문제입니다.

### 규칙

- 매년 빙산은 인접한 바다(0) 칸 수만큼 높이가 감소
- 높이가 0 이하가 되면 바다로 변함
- 빙산이 다 녹을 때까지 분리되지 않으면 0 출력

> [!NOTE] > **시뮬레이션 + DFS/BFS** 조합 문제입니다. 매년 녹이고 → 분리 여부 체크!

## 풀이

### 1. 초기화

```javascript
let remain = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 0) continue;
    remain++;
  }
}
```

빙산 칸의 총 개수를 미리 세어둡니다.

### 2. 인접 바다 수 계산

```javascript
const afterYear = (x, y) => {
  let isZero = 0;
  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (board[nx][ny] === 0) {
      isZero++;
    }
  }
  temp[x][y] = isZero;
  return isZero;
};
```

- 각 빙산 칸마다 인접한 바다 수를 `temp` 배열에 저장
- **중요**: 같은 해에 녹는 양을 동시에 계산해야 하므로 temp 사용

### 3. 빙산 녹이기

```javascript
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (temp[i][j] === 0) continue;
    if (board[i][j] <= temp[i][j]) {
      board[i][j] = 0;
      remain--;
    } else {
      board[i][j] = board[i][j] - temp[i][j];
    }
    temp[i][j] = 0;
  }
}
```

### 4. 분리 여부 체크 (DFS)

```javascript
const checkIsFinish = (sx, sy, visited) => {
  let stack = [[sx, sy]];
  visited[sx][sy] = true;
  let visits = 1;
  while (stack.length) {
    const [x, y] = stack.pop();
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (board[nx][ny] === 0) continue;
      if (visited[nx][ny]) continue;
      visited[nx][ny] = true;
      stack.push([nx, ny]);
      visits++;
    }
  }
  return visits;
};
```

- 한 빙산에서 시작해서 연결된 모든 빙산 수를 셈
- `remain > check`이면 분리된 것!

> [!TIP] > **분리 판단 로직**
>
> - DFS로 연결된 빙산 수(check) 계산
> - 전체 빙산 수(remain) > check → 분리됨!
> - remain === 0 → 다 녹음 → 0 출력

## 전체 흐름

```
while (true) {
  1. 각 빙산의 인접 바다 수 계산 (temp에 저장)
  2. answer++ (1년 경과)
  3. 빙산 녹이기 (board 업데이트)
  4. 다 녹았으면 → answer = 0, break
  5. DFS로 분리 여부 체크
  6. 분리됐으면 → break
}
```

## 핵심 정리

| 단계          | 동작                | 주의점                         |
| ------------- | ------------------- | ------------------------------ |
| 녹는 양 계산  | 인접 바다 수 → temp | 동시에 녹아야 하므로 temp 필요 |
| 보드 업데이트 | board -= temp       | 0 이하면 바다로                |
| 분리 체크     | DFS로 연결된 칸 수  | remain > check면 분리          |

### 시간 복잡도

- 매 년마다 O(N × M) 탐색
- 최대 빙산 높이만큼 반복
- **O(최대높이 × N × M)**
