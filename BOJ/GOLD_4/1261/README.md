# 알고스팟

[백준 1261번: 알고스팟](https://www.acmicpc.net/problem/1261)

## 문제 파악하기

(1, 1)에서 (N, M)까지 이동할 때 **부숴야 하는 벽의 최소 개수**를 구하는 문제입니다.

### 조건

- 0: 빈 칸 (비용 0)
- 1: 벽 (부수면 비용 1)
- 상하좌우 이동 가능

> [!NOTE]
> 가중치가 0 또는 1인 그래프의 최단 경로 → **다익스트라** 또는 **0-1 BFS**로 해결!

## 풀이

### 다익스트라 접근

벽을 부수는 것을 "비용"으로 생각하면, 최소 비용으로 목적지에 도달하는 문제가 됩니다.

### 1. 초기화

```javascript
const dists = Array.from({ length: M }, () => Array(N).fill(Infinity));
const pq = new MinHeap();
pq.push([0, 0, 0]); // [x, y, 부순 벽 수]
dists[0][0] = 0;
```

### 2. 다익스트라 탐색

```javascript
while (pq.size) {
  const [x, y, dist] = pq.pop();
  if (dists[x][y] !== dist) continue; // 이미 더 좋은 경로로 방문됨

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
    const nd = dist + board[nx][ny]; // 벽이면 +1, 빈 칸이면 +0
    if (nd < dists[nx][ny]) {
      dists[nx][ny] = nd;
      pq.push([nx, ny, nd]);
    }
  }
}
```

### 3. 결과 출력

```javascript
console.log(dists[M - 1][N - 1]);
```

> [!TIP] > **핵심 아이디어**
>
> - 벽(1)을 부수면 비용 +1
> - 빈 칸(0)은 비용 +0
> - MinHeap으로 항상 최소 비용 경로 우선 탐색

## 동작 예시

```
입력:
3 3
011
111
110

    0  1  1
    1  1  1
    1  1  0

최적 경로: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
부순 벽: 3개
```

## 핵심 정리

| 개념       | 설명                            |
| ---------- | ------------------------------- |
| 가중치 0/1 | 빈 칸/벽에 따라 비용 결정       |
| 다익스트라 | MinHeap으로 최소 비용 우선 탐색 |
| dists 배열 | 각 칸까지의 최소 벽 부수기 횟수 |

### 다른 풀이: 0-1 BFS

```javascript
// 비용 0이면 덱 앞에, 비용 1이면 덱 뒤에 추가
// 다익스트라보다 더 효율적 (O(V+E))
```

### 시간 복잡도

- 다익스트라: **O(NM log(NM))**
- 0-1 BFS: O(NM)
