# 치즈

[백준 2636번: 치즈](https://www.acmicpc.net/problem/2636)

## 문제 파악하기

판 위의 치즈가 녹는 과정을 시뮬레이션하여, **모두 녹는 데 걸리는 시간**과 **마지막에 녹은 치즈 조각 수**를 구하는 문제입니다.

### 핵심 규칙

- **외부 공기**와 접촉한 치즈만 녹음
- 치즈 내부의 구멍은 외부 공기가 아님!
- 치즈가 녹으면 구멍도 외부 공기가 됨

> [!NOTE] > **BFS + 시뮬레이션** 문제입니다. 외부 공기 영역을 정확히 구분하는 게 핵심!

## 풀이

### 1. 외부 공기 탐색 (BFS)

```javascript
const bfs = () => {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let q = [[0, 0]];
  let head = 0;
  visited[0][0] = true;
  while (head < q.length) {
    const [x, y] = q[head++];
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 1) continue; // 치즈는 통과 못함
      if (visited[nx][ny]) continue;
      visited[nx][ny] = true;
      q.push([nx, ny]);
    }
  }
  return visited;
};
```

- (0, 0)은 항상 외부 공기 (문제 조건)
- 치즈(1)는 통과하지 않음 → 내부 구멍과 외부 공기 구분

### 2. 녹을 치즈 찾기

```javascript
const r = bfs(); // 외부 공기 영역
for (let i = 1; i < N; i++) {
  for (let j = 1; j < M; j++) {
    if (board[i][j] === 0) continue;
    for (const [dx, dy] of dirs) {
      const nx = i + dx;
      const ny = j + dy;
      if (board[nx][ny] === 0 && r[nx][ny]) {
        // 외부 공기와 인접
        temp[i][j] = true;
        target++;
        break;
      }
    }
  }
}
```

### 3. 치즈 녹이기

```javascript
for (let i = 1; i < N; i++) {
  for (let j = 1; j < M; j++) {
    if (temp[i][j]) {
      board[i][j] = 0;
      temp[i][j] = false;
    }
  }
}
time++;
last = target;
```

> [!TIP] > **왜 내부 구멍을 구분해야 하나?**
>
> 내부 구멍은 치즈로 둘러싸여 있어서 외부 공기가 아닙니다.
> (0, 0)에서 BFS를 시작하면 치즈를 통과 못하므로 자연스럽게 구분됩니다!

## 동작 예시

```
초기:
0 0 0 0 0
0 1 1 1 0
0 1 0 1 0  ← 내부 구멍 (외부 공기 X)
0 1 1 1 0
0 0 0 0 0

1시간 후:
0 0 0 0 0
0 0 1 0 0
0 1 0 1 0  ← 아직 내부 구멍
0 0 1 0 0
0 0 0 0 0

2시간 후:
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0  ← 구멍이 외부와 연결되어 같이 녹음
0 0 0 0 0
0 0 0 0 0
```

## 핵심 정리

| 단계           | 동작                          |
| -------------- | ----------------------------- |
| BFS            | (0,0)에서 외부 공기 영역 탐색 |
| 녹을 치즈 탐색 | 외부 공기와 인접한 치즈 찾기  |
| 치즈 녹이기    | temp 배열로 동시에 녹이기     |
| 반복           | target === 0이면 종료         |

### 시간 복잡도

- 매 시간마다 O(N × M) BFS + 탐색
- **O(치즈 녹는 시간 × N × M)**
