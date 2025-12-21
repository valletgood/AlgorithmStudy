## 문제

https://www.acmicpc.net/problem/1504

### 문제 파악하기

위 문제는 백준 알고리즘 1504 특정한 최단 경로 문제이다.

1번 정점에서 N번 정점으로 이동하는 최단 경로를 구하는데, **반드시 두 정점(v1, v2)을 거쳐야** 하는 문제다.

> [!NOTE]
> **핵심 아이디어**: v1과 v2를 모두 거치는 경로는 두 가지뿐이다.
>
> - 경로 1: 1 → v1 → v2 → N
> - 경로 2: 1 → v2 → v1 → N
>
> 다익스트라를 여러 번 실행해 각 구간의 최단 거리를 구한 뒤 조합한다.

## 풀이

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  graph[a].push([b, c]);
  graph[b].push([a, c]);  // 양방향 간선
}
```

- 양방향 그래프이므로 양쪽 모두에 간선 추가

### 2. 다익스트라 3번 실행

```javascript
const distFrom1 = dijkstra(1);   // 1번에서 모든 정점까지
const distFromV1 = dijkstra(v1); // v1에서 모든 정점까지
const distFromV2 = dijkstra(v2); // v2에서 모든 정점까지
```

> [!TIP]
> **왜 3번 실행하나?**
>
> 필요한 거리 정보:
> - 1 → v1, 1 → v2 (distFrom1에서)
> - v1 → v2, v1 → N (distFromV1에서)
> - v2 → v1, v2 → N (distFromV2에서)
>
> 양방향 그래프이므로 `v1 → v2 = v2 → v1`

### 3. 두 경로 비교

```javascript
const route1 = distFrom1[v1] + distFromV1[v2] + distFromV2[N]; // 1→v1→v2→N
const route2 = distFrom1[v2] + distFromV2[v1] + distFromV1[N]; // 1→v2→v1→N

const ans = Math.min(route1, route2);
console.log(ans === Infinity ? -1 : ans);
```

- 두 경로 중 더 짧은 것 선택
- 경로가 존재하지 않으면 (Infinity) -1 출력

### 4. 예시

```
N = 4, E = 6
간선: [[1,2,3], [2,3,3], [3,4,1], [1,3,5], [2,4,5], [1,4,4]]
v1 = 2, v2 = 3

다익스트라 결과:
- distFrom1:  [∞, 0, 3, 5, 4]  (1에서)
- distFromV1: [∞, 3, 0, 3, 4]  (2에서)
- distFromV2: [∞, 5, 3, 0, 1]  (3에서)

경로 계산:
- route1: 1→2→3→4 = 3 + 3 + 1 = 7
- route2: 1→3→2→4 = 5 + 3 + 4 = 12

결과: 7
```

