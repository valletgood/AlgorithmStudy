## 문제

https://school.programmers.co.kr/learn/courses/30/lessons/132266

### 문제 파악하기

위 문제는 프로그래머스 부대복귀 문제이다.

여러 병사들(sources)이 각자 위치에서 목적지(destination)까지 가는 **최단 거리**를 각각 구하는 문제다. 도달할 수 없으면 -1을 반환한다.

> [!NOTE] > **핵심 아이디어: 목적지에서 BFS 한 번!**
>
> - 각 병사마다 BFS 실행 → O(sources.length × N) ❌
> - 목적지에서 BFS 한 번 → O(N) ✅
>
> 양방향 그래프이므로 destination → source 거리 = source → destination 거리

## 풀이

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < roads.length; i++) {
  const [start, end] = roads[i];
  graph[start].push(end);
  graph[end].push(start); // 양방향
}
```

- 양방향 그래프로 구성
- 가중치가 없으므로 BFS로 최단 거리 계산 가능

### 2. 목적지에서 BFS

```javascript
const visited = Array(n + 1).fill(false);
const dist = Array(n + 1).fill(0);

const bfs = (start) => {
  let q = [start];
  let head = 0;
  visited[start] = true;

  while (head < q.length) {
    const loc = q[head++];
    for (const next of graph[loc]) {
      if (!visited[next]) {
        visited[next] = true;
        dist[next] = dist[loc] + 1;
        q.push(next);
      }
    }
  }
};

bfs(destination); // 목적지에서 시작!
```

> [!TIP] > **BFS 한 번으로 모든 거리 계산**
>
> - `dist[i]`: destination에서 i까지의 거리
> - BFS는 가중치 없는 그래프에서 최단 거리 보장
> - 양방향이므로 i → destination 거리와 동일

### 3. 결과 반환

```javascript
let out = [];
for (let i = 0; i < sources.length; i++) {
  const s = sources[i];
  if (s === destination) {
    out.push(0);
    continue;
  }
  out.push(dist[s] === 0 ? -1 : dist[s]);
}
return out;
```

- 출발지가 목적지면 거리 0
- dist[s]가 0이면 도달 불가 → -1
- 그 외에는 dist[s] 반환

### 4. 예시

```
n = 5
roads = [[1,2], [1,4], [2,4], [2,5], [4,5]]
sources = [1, 3, 5]
destination = 5

그래프:
1 - 2 - 5
|   |   |
4 ------+

BFS (5에서 시작):
- dist[5] = 0
- dist[2] = 1, dist[4] = 1
- dist[1] = 2

결과:
- sources[0] = 1 → dist[1] = 2
- sources[1] = 3 → dist[3] = 0 → -1 (도달 불가)
- sources[2] = 5 → 목적지 = 0

반환: [2, -1, 0]
```

### 5. 시간 복잡도

- O(N + M): BFS 한 번만 실행
- sources 순회는 O(sources.length)
