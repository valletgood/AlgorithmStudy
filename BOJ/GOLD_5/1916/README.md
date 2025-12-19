## 문제

https://www.acmicpc.net/problem/1916

### 문제 파악하기

위 문제는 백준 알고리즘 1916 최소비용 구하기 문제이다.

N개의 도시와 M개의 버스가 있을 때, 출발 도시에서 도착 도시까지 가는 최소 비용을 구하는 문제다.

> [!NOTE] > **다익스트라 알고리즘**: 가중치가 있는 그래프에서 최단 경로를 구하는 대표적인 알고리즘이다.
>
> - 우선순위 큐(최소 힙)를 사용해 가장 비용이 작은 노드부터 처리
> - 시간 복잡도: O((V + E) log V)

## 풀이

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  graph[a].push([b, c]); // [도착지, 비용]
}
```

- 인접 리스트로 그래프 구성
- 단방향 간선이므로 한쪽만 추가

### 2. 최소 힙 구현

```javascript
class MinHeap {
  constructor() {
    this.arr = [];
  }
  push(item) {
    this.arr.push(item);
    this._up(this.arr.length - 1);
  }
  pop() {
    const top = this.arr[0];
    const last = this.arr.pop();
    if (this.arr.length > 0) {
      this.arr[0] = last;
      this._down(0);
    }
    return top;
  }
  // ... heapify up/down 구현
}
```

> [!TIP] > **JavaScript에는 내장 우선순위 큐가 없다**
>
> - 직접 MinHeap을 구현해야 함
> - `[노드, 거리]` 형태로 저장하고 거리 기준으로 정렬
> - `_up`: 삽입 시 위로 올리며 정렬
> - `_down`: 삭제 시 아래로 내리며 정렬

### 3. 다익스트라 알고리즘

```javascript
const dijkstra = (s) => {
  const pq = new MinHeap();
  costs[s] = 0;
  pq.push([s, 0]);

  while (pq.size) {
    const [city, dist] = pq.pop();

    if (dist !== costs[city]) continue; // 이미 처리된 노드 스킵

    for (const [des, cost] of graph[city]) {
      const nd = dist + cost;
      if (nd < costs[des]) {
        costs[des] = nd;
        pq.push([des, nd]);
      }
    }
  }
};
```

> [!TIP] > **핵심 최적화: `dist !== costs[city]`**
>
> - 같은 노드가 여러 번 큐에 들어갈 수 있음
> - 현재 꺼낸 거리가 이미 갱신된 최소 거리와 다르면 스킵
> - 불필요한 연산을 줄여 성능 향상

### 4. 예시

```
N = 5, M = 8
버스: [[1,2,2], [1,3,3], [1,4,1], [1,5,10], [2,4,2], [3,4,1], [3,5,1], [4,5,3]]
출발: 1, 도착: 5

다익스트라 진행:
- 시작: costs = [∞, 0, ∞, ∞, ∞, ∞]
- 1번 처리: costs = [∞, 0, 2, 3, 1, 10]
- 4번 처리 (비용 1): costs = [∞, 0, 2, 3, 1, 4]
- 2번 처리 (비용 2): costs = [∞, 0, 2, 3, 1, 4]
- 3번 처리 (비용 3): costs = [∞, 0, 2, 3, 1, 4]
- 5번 처리 (비용 4): 완료

결과: 4
```
