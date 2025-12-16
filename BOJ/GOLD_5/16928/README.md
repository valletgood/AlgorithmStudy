## 문제

https://www.acmicpc.net/problem/16928

### 문제 파악하기

위 문제는 백준 알고리즘 16928 뱀과 사다리 게임 문제이다.

1번 칸에서 시작해서 100번 칸에 도착하는 최소 주사위 횟수를 구하는 문제다. 사다리를 만나면 위로 올라가고, 뱀을 만나면 아래로 내려간다.

<aside>
💡

최소 횟수를 구하는 문제이므로 BFS를 사용한다. 주사위로 1~6칸을 이동할 수 있고, 사다리나 뱀이 있으면 해당 위치로 즉시 이동한다.

</aside>

## 풀이

### 1. 사다리와 뱀 정보 저장

```javascript
const jump = Array.from({ length: 101 }).fill(0);

for (let i = 0; i < lines.length; i++) {
  const [start, end] = lines[i].split(" ").map(Number);
  jump[start] = end;
}
```

- `jump` 배열에 사다리와 뱀의 이동 정보를 저장한다.
- `jump[x] = y`이면 x번 칸에서 y번 칸으로 이동한다.
- 사다리와 뱀을 구분하지 않고 동일하게 처리한다.

### 2. BFS로 최소 횟수 탐색

```javascript
const bfs = (n, dist) => {
  let q = [[n, dist]];
  let head = 0;
  visited[n] = true;

  while (head < q.length) {
    const [pos, dist] = q[head++];
    if (pos === 100) return dist;
    for (let i = 1; i <= 6; i++) {
      let np = pos + i;
      if (np > 100) continue;
      if (jump[np] !== 0) np = jump[np];
      if (!visited[np]) {
        visited[np] = true;
        q.push([np, dist + 1]);
      }
    }
  }
};
```

- 현재 위치가 100이면 주사위 횟수를 반환한다.
- 주사위 눈 1~6에 대해 이동 가능한 모든 위치를 탐색한다.
- 100을 초과하면 이동하지 않는다.
- 사다리나 뱀이 있으면 해당 위치로 즉시 이동한다.
- 방문하지 않은 칸만 큐에 추가한다.

<aside>
💡

BFS는 가중치가 동일한 그래프에서 최단 경로를 보장한다. 주사위 한 번이 한 번의 이동이므로 가장 먼저 100에 도달하는 경로가 최소 횟수다.

</aside>

### 3. 결과 출력

```javascript
console.log(bfs(1, 0));
```

- 1번 칸에서 시작하여 0번의 주사위를 굴린 상태로 BFS를 시작한다.
