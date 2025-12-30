# 거짓말

[백준 1043번: 거짓말](https://www.acmicpc.net/problem/1043)

## 문제 파악하기

지민이가 **거짓말을 할 수 있는 파티의 최대 개수**를 구하는 문제입니다.

### 조건

- 진실을 아는 사람이 있는 파티에서는 거짓말 불가
- 같은 파티에 있던 사람들끼리는 정보가 공유됨
- 진실을 아는 사람과 같은 파티에 있었던 사람도 진실을 알게 됨

> [!NOTE]
> 핵심은 **진실의 전파**입니다!
>
> 진실을 아는 사람 A와 같은 파티에 있던 B도 진실을 알게 되고, B와 같은 파티에 있던 C도 진실을 알게 됩니다. 이렇게 연쇄적으로 전파됩니다.

## 풀이

이 문제는 **DFS**로 진실을 아는 사람들의 네트워크를 탐색하여 해결합니다.

### 1. 입력 처리

```javascript
const [N, M] = input[0].split(" ").map(Number);
const trueth = input[1].split(" ").slice(1).map(Number); // 진실 아는 사람들
const party = input
  .slice(2)
  .map((item) => item.split(" ").slice(1).map(Number));
const trueArr = Array(N + 1).fill(false); // 진실 여부 체크
```

### 2. DFS로 진실 전파

```javascript
const dfs = (start) => {
  let stack = [start];
  trueArr[start] = true;
  while (stack.length) {
    const person = stack.pop();
    for (const p of party) {
      if (p.includes(person)) {
        for (let i = 0; i < p.length; i++) {
          if (p[i] === person) continue;
          if (trueArr[p[i]]) continue;
          trueArr[p[i]] = true;
          stack.push(p[i]);
        }
      }
    }
  }
};
```

진실을 아는 사람에서 시작하여:

1. 그 사람이 참석한 모든 파티를 찾음
2. 해당 파티의 다른 참석자들도 진실을 알게 됨
3. 새로 진실을 알게 된 사람들에 대해서도 반복

### 3. 모든 진실 아는 사람에서 DFS 실행

```javascript
for (let i = 0; i < trueth.length; i++) {
  if (trueArr[trueth[i]]) continue;
  dfs(trueth[i]);
}
```

### 4. 거짓말 가능한 파티 개수 세기

```javascript
let answer = 0;
outer: for (const p of party) {
  for (const person of p) {
    if (trueArr[person]) continue outer; // 진실 아는 사람 있으면 스킵
  }
  answer++;
}
console.log(answer);
```

> [!TIP] > **labeled statement (`outer:`)** 를 사용하여 중첩 반복문을 한 번에 빠져나올 수 있습니다!
>
> 파티에 진실을 아는 사람이 한 명이라도 있으면 해당 파티는 건너뛰고 다음 파티로 넘어갑니다.

## 핵심 아이디어

1. **그래프 관점**: 같은 파티에 참석한 사람들은 연결된 것으로 봄
2. **진실 전파**: 진실을 아는 사람과 연결된 모든 사람은 진실을 알게 됨
3. **결과**: 진실 아는 사람이 없는 파티만 거짓말 가능

### 시간 복잡도

- DFS: O(N × M × 파티 크기)
- 전체: **O(N × M × P)** (P: 평균 파티 크기)
