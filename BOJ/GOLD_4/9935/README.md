# 문자열 폭발

[백준 9935번: 문자열 폭발](https://www.acmicpc.net/problem/9935)

## 문제 파악하기

문자열에서 **폭발 문자열**이 포함되어 있으면 폭발시키고, 남은 문자들이 다시 폭발 문자열을 만들면 연쇄 폭발하는 과정을 반복하는 문제입니다.

### 예시

```
문자열: mirkovC4teleborC4va
폭발 문자열: C4

mirkovC4teleborC4va → mirkovteleborC4va → mirkovteleborva
```

> [!NOTE] > **스택**을 활용하면 O(N)에 해결할 수 있습니다. 문자를 하나씩 넣으면서 폭발 문자열이 완성되면 즉시 제거!

## 풀이

### 1. 스택에 문자 추가

```javascript
const stack = [];

for (let i = 0; i < string.length; i++) {
  stack.push(string[i]);
  // ...
}
```

### 2. 폭발 문자열 체크

```javascript
if (stack.length >= bomb.length) {
  let index = 0;
  while (index < bomb.length) {
    if (stack[stack.length - index - 1] === bomb[bomb.length - index - 1]) {
      index++;
    } else {
      break;
    }
  }
  if (index === bomb.length) {
    for (let i = 0; i < bomb.length; i++) {
      stack.pop();
    }
  }
}
```

- 스택 길이가 폭발 문자열 길이 이상일 때만 체크
- 스택의 **끝에서부터** 폭발 문자열과 비교
- 완전히 일치하면 폭발 문자열 길이만큼 pop

### 3. 결과 출력

```javascript
console.log(stack.length === 0 ? "FRULA" : stack.join(""));
```

> [!TIP] > **왜 스택인가?**
>
> - 폭발 후 양쪽 문자가 붙어서 새로운 폭발 문자열이 될 수 있음
> - 스택은 이 과정을 자연스럽게 처리: 폭발 후 스택 top에서 다시 체크

## 동작 예시

```
문자열: "12ab3", 폭발: "ab"

i=0: push '1' → stack=['1']
i=1: push '2' → stack=['1','2']
i=2: push 'a' → stack=['1','2','a']
i=3: push 'b' → stack=['1','2','a','b'], "ab" 일치! → pop 2번 → stack=['1','2']
i=4: push '3' → stack=['1','2','3']

결과: "123"
```

## 핵심 정리

| 동작       | 조건                    | 결과                      |
| ---------- | ----------------------- | ------------------------- |
| push       | 항상                    | 스택에 문자 추가          |
| 폭발 체크  | 스택 길이 ≥ 폭발 문자열 | 끝에서부터 비교           |
| pop (폭발) | 완전 일치               | 폭발 문자열 길이만큼 제거 |

### 왜 O(N)인가?

- 각 문자는 최대 1번 push, 1번 pop
- 폭발 체크는 폭발 문자열 길이만큼 비교 (상수)
- **총: O(N × M)** (N: 문자열 길이, M: 폭발 문자열 길이)

### 주의사항

- 단순 replace 반복은 시간 초과! (최악 O(N²))
- 스택으로 한 번의 순회로 해결
