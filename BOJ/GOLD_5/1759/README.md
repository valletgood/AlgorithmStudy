## 문제

https://www.acmicpc.net/problem/1759

### 문제 파악하기

위 문제는 백준 알고리즘 1759 암호 만들기 문제이다.

C개의 문자 중 L개를 선택해 가능한 모든 암호를 구하는 문제다. 암호는 다음 조건을 만족해야 한다:

- 최소 1개 이상의 모음 (a, e, i, o, u)
- 최소 2개 이상의 자음
- 알파벳 오름차순으로 정렬

> [!NOTE] > **조합 + 조건 검사**: 문자들을 먼저 정렬한 후 조합을 생성하면 자동으로 사전순 출력이 된다.
>
> - 정렬된 문자에서 L개를 선택하는 조합 생성
> - 각 조합에서 모음/자음 개수 조건 검사

## 풀이

### 1. 문자 정렬

```javascript
const chars = input[1].split(" ").sort((a, b) => a.localeCompare(b));
```

- 입력받은 문자들을 알파벳 순으로 정렬
- 정렬된 상태에서 조합을 생성하면 결과도 사전순

### 2. 조합 생성 + 조건 검사

```javascript
const ms = ["a", "e", "i", "o", "u"];

const getCombi = (arr, n) => {
  let result = [];
  let selected = [];

  const dfs = (start) => {
    if (selected.length === n) {
      let isM = 0;
      for (let i = 0; i < selected.length; i++) {
        const char = selected[i];
        for (const m of ms) {
          if (char === m) isM++;
        }
      }
      if (isM >= 1 && selected.length - isM >= 2) {
        result.push(selected.join(""));
      }
      return;
    }

    for (let i = start; i < arr.length; i++) {
      selected.push(arr[i]);
      dfs(i + 1);
      selected.pop();
    }
  };

  dfs(0);
  return result;
};
```

> [!TIP] > **조건 검사 로직**
>
> - `isM`: 선택된 문자 중 모음의 개수
> - `selected.length - isM`: 자음의 개수
> - 모음 1개 이상 AND 자음 2개 이상일 때만 결과에 추가

### 3. 백트래킹

```javascript
for (let i = start; i < arr.length; i++) {
  selected.push(arr[i]);
  dfs(i + 1);
  selected.pop(); // 백트래킹
}
```

- `start` 인덱스부터 탐색해 중복 선택 방지
- 선택 → 재귀 → 선택 취소 (백트래킹)

### 4. 예시

```
L = 4, C = 6
chars = ["a", "c", "i", "s", "t", "w"]  (정렬됨)

가능한 조합 중 조건 만족하는 것:
- acis: 모음 2개(a,i), 자음 2개(c,s) ✅
- acit: 모음 2개(a,i), 자음 2개(c,t) ✅
- aciw: 모음 2개(a,i), 자음 2개(c,w) ✅
- acst: 모음 1개(a), 자음 3개(c,s,t) ✅
...

결과: acis, acit, aciw, acst, actw, aist, aitw, astw, cist, citw, istw
```
