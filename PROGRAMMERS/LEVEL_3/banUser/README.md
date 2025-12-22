## 문제

https://school.programmers.co.kr/learn/courses/30/lessons/64064

### 문제 파악하기

위 문제는 프로그래머스 불량 사용자 문제이다.

불량 사용자 목록(banned_id)과 유저 목록(user_id)이 주어질 때, 제재 대상이 될 수 있는 경우의 수를 구하는 문제다. banned_id에서 `*`는 어떤 문자든 매칭된다.

> [!NOTE] > **두 단계로 해결**
>
> 1. 각 banned_id 패턴에 매칭되는 user_id 후보군 찾기
> 2. DFS + 백트래킹으로 모든 가능한 조합 탐색 (중복 제거)

## 풀이

### 1. 패턴 매칭

```javascript
for (let i = 0; i < banned_id.length; i++) {
  const n = banned_id[i].length;
  let target = [];
  for (let j = 0; j < user_id.length; j++) {
    const m = user_id[j].length;
    if (n !== m) continue; // 길이가 다르면 skip

    let userPos = 0,
      banPos = 0;
    while (banPos < n) {
      if (
        user_id[j][userPos] === banned_id[i][banPos] ||
        banned_id[i][banPos] === "*"
      ) {
        userPos++;
        banPos++;
      } else {
        break;
      }
    }
    if (userPos === m && banPos === n) {
      target.push(user_id[j]);
    }
  }
  t.push(target);
}
```

> [!TIP] > **매칭 조건**
>
> - 문자가 같거나 banned_id가 `*`이면 매칭
> - 끝까지 매칭되면 (userPos === m && banPos === n) 후보에 추가
> - 길이가 다르면 애초에 매칭 불가

### 2. DFS로 조합 탐색

```javascript
const set = new Set();

const dfs = (idx, chosen) => {
  if (idx === t.length) {
    const key = [...chosen].sort().join(",");
    set.add(key);
    return;
  }

  for (const user of t[idx]) {
    if (chosen.has(user)) continue; // 이미 선택된 유저 skip
    chosen.add(user);
    dfs(idx + 1, chosen);
    chosen.delete(user); // 백트래킹
  }
};
dfs(0, new Set());
return set.size;
```

> [!TIP] > **중복 제거가 핵심!**
>
> - 같은 유저 조합이라도 순서가 다르면 다른 경로로 도달 가능
> - 선택된 유저들을 **정렬 후 문자열로 변환**해서 Set에 저장
> - 예: {A, B}와 {B, A}는 같은 조합 → "A,B"로 통일

### 3. 예시

```
user_id = ["frodo", "fradi", "crodo", "abc123", "frodoc"]
banned_id = ["fr*d*", "abc1**"]

1단계 - 패턴 매칭:
- "fr*d*" → ["frodo", "fradi"]
- "abc1**" → ["abc123"]

2단계 - DFS 조합:
- ["frodo", "abc123"] → "abc123,frodo"
- ["fradi", "abc123"] → "abc123,fradi"

결과: 2
```

### 4. 예시 2 (중복 케이스)

```
user_id = ["frodo", "fradi", "crodo", "abc123", "frodoc"]
banned_id = ["*rodo", "*rodo", "*rodo"]

1단계 - 패턴 매칭:
- "*rodo" → ["frodo", "crodo"]
- "*rodo" → ["frodo", "crodo"]
- "*rodo" → ["frodo", "crodo"]

하지만 같은 유저를 중복 선택할 수 없음!
→ 3개 패턴에 2명 유저 → 불가능 → 0

(실제로는 frodoc도 매칭되어 가능)
```
