## 문제

https://school.programmers.co.kr/learn/courses/30/lessons/43164

### 문제 파악하기

위 문제는 프로그래머스 여행경로 문제이다.

주어진 항공권을 모두 사용하여 ICN에서 출발하는 여행 경로를 구하는 문제다. 가능한 경로가 여러 개일 경우 **알파벳 순서가 앞서는 경로**를 반환해야 한다.

> [!NOTE] > **오일러 경로 문제**: 모든 간선을 정확히 한 번씩 방문하는 경로를 찾는 문제다.
>
> - **Hierholzer 알고리즘**을 사용하여 해결
> - 스택 기반 DFS로 경로를 구성
> - 더 이상 갈 곳이 없을 때 경로에 추가

## 풀이

### 1. 그래프 구성

```javascript
const map = new Map();
for (const [from, to] of tickets) {
  if (!map.has(from)) map.set(from, []);
  map.get(from).push(to);
}
```

- Map을 사용해 출발지별 도착지 목록 저장
- `map.get("ICN")` → ICN에서 갈 수 있는 공항들

### 2. 알파벳 역순 정렬

```javascript
for (const [from, des] of map) {
  des.sort((a, b) => b.localeCompare(a));
}
```

> [!TIP] > **왜 역순으로 정렬하나?**
>
> - `pop()`으로 도착지를 꺼내기 때문!
> - 역순 정렬 후 pop하면 알파벳 순서대로 방문
> - 예: ["ATL", "SFO"] → 역순 ["SFO", "ATL"] → pop하면 "ATL" 먼저

### 3. Hierholzer 알고리즘

```javascript
let stack = ["ICN"];
let path = [];

while (stack.length) {
  const cur = stack[stack.length - 1];
  const tos = map.get(cur);

  if (tos && tos.length) {
    stack.push(tos.pop()); // 갈 곳이 있으면 이동
  } else {
    path.push(stack.pop()); // 막다른 길이면 경로에 추가
  }
}
return path.reverse();
```

> [!TIP] > **Hierholzer 알고리즘 핵심**
>
> 1. 현재 위치에서 갈 곳이 있으면 → 스택에 push하고 이동
> 2. 막다른 길이면 → 현재 위치를 경로에 추가하고 뒤로 돌아감
> 3. 경로는 역순으로 쌓이므로 마지막에 reverse

### 4. 예시

```
tickets = [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL", "SFO"]]

그래프 (역순 정렬 후):
ICN → [SFO, ATL]  (역순: ATL이 나중에 pop)
SFO → [ATL]
ATL → [SFO, ICN]

실행 과정:
stack: [ICN] → ATL pop → [ICN, ATL]
stack: [ICN, ATL] → ICN pop → [ICN, ATL, ICN]
stack: [ICN, ATL, ICN] → SFO pop → [ICN, ATL, ICN, SFO]
stack: [ICN, ATL, ICN, SFO] → ATL pop → [ICN, ATL, ICN, SFO, ATL]
stack: [ICN, ATL, ICN, SFO, ATL] → SFO pop → [ICN, ATL, ICN, SFO, ATL, SFO]
ATL의 tos 비어있음 → path에 SFO 추가
... (역추적)

path: [SFO, ATL, SFO, ICN, ATL, ICN]
reverse: [ICN, ATL, ICN, SFO, ATL, SFO]
```
