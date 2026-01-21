# ACM Craft

[백준 1005번: ACM Craft](https://www.acmicpc.net/problem/1005)

## 문제 파악하기

건물마다 건설 시간이 있고, 특정 건물을 짓기 위해 **선행 건물들을 먼저 지어야** 합니다. 목표 건물을 짓는 데 필요한 **최소 시간**을 구하는 문제입니다.

### 핵심 포인트

- 선행 건물들이 모두 완료되어야 다음 건물 건설 가능
- 동시에 지을 수 있는 건물은 **병렬로 진행**
- → 선행 건물들 중 **가장 오래 걸리는 경로**가 병목

> [!NOTE] > **위상 정렬 + DP** 조합 문제입니다!

## 풀이

### 1. 그래프 및 진입차수 초기화

```javascript
const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0);
const dp = Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  dp[i] = buildings[i - 1]; // 각 건물의 건설 시간으로 초기화
}

for (let i = 0; i < K; i++) {
  const [s, e] = input[idx++].split(" ").map(Number);
  graph[s].push(e);
  indegree[e] += 1;
}
```

### 2. 시작점 찾기 (진입차수 0)

```javascript
let queue = [];
for (let i = 1; i < indegree.length; i++) {
  if (indegree[i] === 0) queue.push(i);
}
```

### 3. 위상 정렬 + DP

```javascript
while (queue.length) {
  let check = queue.shift();
  for (const next of graph[check]) {
    indegree[next] -= 1;
    dp[next] = Math.max(dp[check] + buildings[next - 1], dp[next]);
    if (indegree[next] === 0) queue.push(next);
  }
}
```

> [!TIP] > **DP 점화식**
>
> `dp[next] = max(dp[next], dp[prev] + buildings[next])`
>
> 여러 선행 건물이 있을 때, 가장 늦게 끝나는 경로를 선택해야 합니다.

## 동작 예시

```
건물: 1(10초), 2(1초), 3(100초), 4(10초)
순서: 1→2, 1→3, 2→4, 3→4
목표: 4

     [1:10]
     /    \
  [2:1]  [3:100]
     \    /
     [4:10]

경로1: 1→2→4 = 10+1+10 = 21
경로2: 1→3→4 = 10+100+10 = 120

dp[4] = max(21, 120) = 120
```

## 핵심 정리

| 개념      | 설명                               |
| --------- | ---------------------------------- |
| 위상 정렬 | 선행 조건이 있는 작업 순서 결정    |
| 진입차수  | 해당 노드로 들어오는 간선 수       |
| DP 갱신   | 선행 건물 중 최대 시간 + 현재 건설 |
| 병렬 처리 | 독립적인 건물은 동시에 진행        |

### 시간 복잡도

- 위상 정렬: O(N + K)
- **총: O(N + K)**
