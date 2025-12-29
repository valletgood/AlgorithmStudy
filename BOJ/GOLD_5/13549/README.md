# 숨바꼭질 3

[백준 13549번: 숨바꼭질 3](https://www.acmicpc.net/problem/13549)

## 문제 파악하기

수빈이가 위치 N에서 동생이 있는 위치 K까지 이동하는 **최소 시간**을 구하는 문제입니다.

### 이동 방법

- **걷기**: X-1 또는 X+1로 이동 → **1초**
- **순간이동**: X\*2로 이동 → **0초**

> [!NOTE]
> 순간이동이 **0초**이기 때문에 일반 BFS로는 풀 수 없습니다!
>
> BFS는 모든 간선의 가중치가 동일할 때만 최단 거리를 보장합니다. 이 문제는 가중치가 0과 1로 다르므로 **다익스트라** 또는 **0-1 BFS**를 사용해야 합니다.

## 풀이

이 문제는 **다익스트라 알고리즘**으로 해결할 수 있습니다.

### 1. MinHeap 구현

```javascript
class MinHeap {
  constructor() {
    this.arr = [];
  }
  push(item) {
    /* 최소 힙에 삽입 */
  }
  pop() {
    /* 최솟값 추출 */
  }
  get size() {
    return this.arr.length;
  }
}
```

다익스트라에서 최소 거리 노드를 효율적으로 꺼내기 위해 MinHeap을 사용합니다.

### 2. 다익스트라 함수

```javascript
const dijkestra = (start) => {
  let pq = new MinHeap();
  visited[start] = 0;
  pq.push([start, 0]);

  while (pq.size) {
    const [pos, dist] = pq.pop();
    if (dist !== visited[pos]) continue; // 이미 처리된 노드 스킵

    // 걷기: X-1 (1초)
    if (b >= 0 && dist + 1 < visited[b]) {
      visited[b] = dist + 1;
      pq.push([pos - 1, dist + 1]);
    }
    // 걷기: X+1 (1초)
    if (f <= 1000000 && dist + 1 < visited[f]) {
      visited[f] = dist + 1;
      pq.push([pos + 1, dist + 1]);
    }
    // 순간이동: X*2 (0초)
    if (pos * 2 < 1000000 && visited[pos * 2] > dist) {
      visited[pos * 2] = dist;
      pq.push([pos * 2, dist]);
    }
  }
};
```

> [!TIP] > **순간이동(X\*2)의 비용이 0**이라는 점이 핵심!
>
> - 걷기: `dist + 1`
> - 순간이동: `dist` (비용 추가 없음)
>
> MinHeap을 사용하면 비용이 작은 순간이동이 먼저 처리되어 최적 경로를 찾을 수 있습니다.

### 3. 결과 출력

```javascript
dijkestra(N);
console.log(visited[K]);
```

시작 위치 N에서 다익스트라를 실행하고, 목표 위치 K까지의 최소 시간을 출력합니다.

### 시간 복잡도

- 각 위치를 한 번씩 방문하고, MinHeap 연산이 O(log N)
- 전체: **O(N log N)**
