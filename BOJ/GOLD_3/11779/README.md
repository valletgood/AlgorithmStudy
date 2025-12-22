## 문제

https://www.acmicpc.net/problem/11779

### 문제 파악하기

위 문제는 백준 알고리즘 11779 최소비용 구하기 2 문제이다.

1916번(최소비용 구하기)과 동일하게 출발 도시에서 도착 도시까지의 최소 비용을 구하지만, **경로도 함께 출력**해야 하는 문제다.

> [!NOTE] > **경로 추적 추가**: 다익스트라 실행 중 각 노드에 도달할 때 **이전 노드(prev)**를 기록한다.
>
> - 최단 거리 갱신 시 `prev[도착노드] = 현재노드`로 저장
> - 도착점에서 역추적하여 경로 복원

## 풀이

### 1. prev 배열 추가

```javascript
const dists = Array(N + 1).fill(Infinity);
let prev = Array(N + 1).fill(0); // 경로 추적용
```

- `dists[i]`: 시작점에서 i까지의 최단 거리
- `prev[i]`: i에 도달하기 직전 노드

### 2. 다익스트라 + 경로 기록

```javascript
const dijkstra = (start) => {
  let pq = new MinHeap();
  dists[start] = 0;
  prev[start] = 0; // 시작점은 이전 노드가 없음
  pq.push([start, 0]);

  while (pq.size) {
    const [node, dist] = pq.pop();
    if (dists[node] !== dist) continue;

    for (const [des, cost] of graph[node]) {
      const nd = cost + dist;
      if (nd < dists[des]) {
        dists[des] = nd;
        prev[des] = node; // 경로 기록!
        pq.push([des, nd]);
      }
    }
  }
};
```

> [!TIP] > **최단 거리 갱신 시 경로도 함께 갱신**
>
> - `nd < dists[des]`: 더 짧은 경로를 발견했을 때
> - `prev[des] = node`: des에 도달하는 최단 경로의 직전 노드는 node

### 3. 경로 역추적

```javascript
let cur = end;
let path = [];
while (cur !== 0) {
  path.push(cur);
  if (cur === start) break;
  cur = prev[cur];
}
path.reverse();
```

- 도착점(end)에서 시작해서 prev를 따라 역으로 추적
- 시작점에 도달하면 종료
- 역순으로 추적했으므로 `reverse()`로 뒤집기

### 4. 결과 출력

```javascript
let out = `${dists[end]}\n${path.length}\n${path.join(" ")}`;
console.log(out);
```

- 1번째 줄: 최소 비용
- 2번째 줄: 경로에 포함된 도시 수
- 3번째 줄: 경로 (공백으로 구분)

### 5. 예시

```
N = 5, M = 8
버스: [[1,2,2], [1,3,3], [1,4,1], [1,5,10], [2,4,2], [3,4,1], [3,5,1], [4,5,3]]
출발: 1, 도착: 5

다익스트라 실행:
- dists: [∞, 0, 2, 3, 1, 4]
- prev:  [0, 0, 1, 1, 1, 4]

경로 역추적 (end=5):
- path = [5] → prev[5]=4
- path = [5,4] → prev[4]=1
- path = [5,4,1] → cur=start, 종료
- reverse → [1,4,5]

결과:
4        (최소 비용)
3        (도시 수)
1 4 5    (경로)
```
