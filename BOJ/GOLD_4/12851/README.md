# 숨바꼭질 2

[백준 12851번: 숨바꼭질 2](https://www.acmicpc.net/problem/12851)

## 문제 파악하기

수빈이가 위치 N에서 동생이 있는 위치 K까지 이동할 때:

1. **최단 시간**
2. **최단 시간으로 가는 방법의 수**

를 모두 구하는 문제입니다.

### 이동 방법

- X-1로 이동 (1초)
- X+1로 이동 (1초)
- X\*2로 순간이동 (1초)

> [!NOTE] > **최단 경로의 개수**도 구해야 합니다!
>
> 일반 BFS에서는 방문한 노드를 다시 방문하지 않지만, 이 문제에서는 **같은 거리로 도달하는 경우** 경로 수를 누적해야 합니다.

## 풀이

이 문제는 **BFS + 경로 수 카운팅**으로 해결합니다.

### 1. 배열 초기화

```javascript
const visited = Array.from({ length: MAX + 1 }).fill(-1); // 최단 거리
const dists = Array.from({ length: MAX + 1 }).fill(0); // 경로 수
```

- `visited[i]`: 위치 i까지의 최단 거리 (-1은 미방문)
- `dists[i]`: 위치 i까지 최단 거리로 가는 경로의 수

### 2. BFS 탐색

```javascript
const bfs = (start) => {
  let q = [[start, 0]];
  let head = 0;
  visited[start] = 0;
  dists[start] = 1;

  while (head < q.length) {
    const [pos, dist] = q[head++];
    if (pos === K) break;

    // X-1, X+1, X*2 세 방향 탐색
    // ...
  }
};
```

### 3. 핵심: 경로 수 누적 로직

```javascript
if (nb >= 0) {
  if (visited[nb] === -1) {
    // 처음 방문: 거리 기록 + 경로 수 복사
    visited[nb] = nd;
    q.push([nb, nd]);
    dists[nb] = dists[pos];
  } else if (visited[nb] === nd) {
    // 같은 거리로 다시 도달: 경로 수 누적
    dists[nb] += dists[pos];
  }
}
```

> [!TIP] > **경로 수 계산의 핵심**
>
> - 처음 방문: `dists[next] = dists[current]` (현재까지의 경로 수 그대로)
> - 같은 거리로 재방문: `dists[next] += dists[current]` (경로 수 누적)
>
> 예를 들어 A→C, B→C가 모두 최단 거리라면, C의 경로 수 = A의 경로 수 + B의 경로 수

### 4. 결과 출력

```javascript
console.log(`${visited[K]}\n${dists[K]}`);
```

## 예시

N=5, K=17인 경우:

```
5 → 10 → 9 → 18 → 17  (4초)
5 → 4 → 8 → 16 → 17   (4초)
```

최단 시간: 4, 방법의 수: 2

## 핵심 아이디어

1. **BFS**: 모든 이동의 가중치가 1이므로 BFS로 최단 거리 탐색
2. **경로 수 누적**: 같은 최단 거리로 도달하는 모든 경우를 합산
3. **조건 분기**: 미방문 vs 같은 거리 재방문 구분

### 시간 복잡도

- 각 위치를 한 번씩 방문
- **O(N)** (N은 최대 좌표값 100,000)
