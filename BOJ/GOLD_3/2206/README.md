# 벽 부수고 이동하기

[백준 2206번: 벽 부수고 이동하기](https://www.acmicpc.net/problem/2206)

## 문제 파악하기

N×M 크기의 맵에서 (1,1)에서 (N,M)까지 이동하는 최단 경로를 구하는 문제입니다. 단, 벽을 **최대 1개**까지 부수고 이동할 수 있습니다.

> [!NOTE]
> 같은 위치라도 **벽을 부순 상태**와 **부수지 않은 상태**를 다르게 취급해야 합니다.
>
> 예를 들어, 벽을 부수지 않고 (3, 4)에 도착한 경우와 벽을 부수고 (3, 4)에 도착한 경우는 다른 상태입니다. 후자는 더 이상 벽을 부술 수 없기 때문입니다.

## 풀이

이 문제는 **BFS + 3차원 방문 배열**로 해결할 수 있습니다.

### 1. 3차원 방문 배열 정의

```javascript
const visited = Array.from(
  { length: N },
  () => Array.from({ length: M }, () => [false, false]) // [안부숨, 부숨]
);
```

- `visited[x][y][0]`: 벽을 부수지 않고 (x, y)에 도착한 적이 있는지
- `visited[x][y][1]`: 벽을 부수고 (x, y)에 도착한 적이 있는지

### 2. BFS 큐 상태 정의

```javascript
let q = [[0, 0, 1, 0]]; // x, y, dist(시작 포함), broken(0/1)
```

- `x, y`: 현재 위치
- `dist`: 시작점부터 현재까지의 거리 (시작점 포함)
- `broken`: 벽을 부순 횟수 (0 또는 1)

### 3. 이동 처리

```javascript
for (const [dx, dy] of dirs) {
  const nx = x + dx,
    ny = y + dy;
  if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

  const nextBroken = broken + board[nx][ny]; // ✅ 0/1/2
  if (nextBroken === 2) continue; // ✅ 벽 2번은 불가

  if (visited[nx][ny][nextBroken]) continue;
  visited[nx][ny][nextBroken] = true;

  q.push([nx, ny, dist + 1, nextBroken]);
}
```

> [!TIP] > **`nextBroken = broken + board[nx][ny]`** 가 핵심입니다!
>
> - 빈 칸(0)으로 이동: `nextBroken = broken + 0` → 상태 유지
> - 벽(1)으로 이동: `nextBroken = broken + 1` → 벽 부숨
> - 이미 부순 상태(1)에서 벽(1)으로 이동: `nextBroken = 2` → **불가능!**
>
> 이렇게 하면 if문 없이 간단하게 벽 부수기 로직을 처리할 수 있습니다.

### 4. 결과 반환

```javascript
if (x === N - 1 && y === M - 1) return dist;
// ...
return -1; // 도달 불가능
```

목적지에 도착하면 현재 거리를 반환하고, BFS가 끝날 때까지 도착하지 못하면 -1을 반환합니다.
