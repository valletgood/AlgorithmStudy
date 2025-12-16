## 문제

https://school.programmers.co.kr/learn/courses/30/lessons/12927

### 문제 파악하기

위 문제는 프로그래머스 야근 지수 문제이다.

퇴근까지 남은 n시간 동안 작업량을 줄여서 야근 지수(남은 작업량의 제곱의 합)를 최소화하는 문제다. 1시간에 작업량 1만큼 처리할 수 있다.

<aside>
💡

야근 지수를 최소화하려면 가장 큰 작업량부터 줄여야 한다. 제곱의 특성상 큰 수를 줄이는 것이 작은 수를 줄이는 것보다 효과적이기 때문이다. (예: 5² + 5² = 50 < 4² + 6² = 52)

</aside>

## 풀이

### 1. 예외 처리

```javascript
const sum = works.reduce((acc, v) => acc + v, 0);
if (sum < n) return 0;
if (sum === n) return 1;
```

- 전체 작업량이 n보다 작거나 같으면 모든 작업을 처리할 수 있으므로 야근 지수는 0이다.

<aside>
💡

문제에서 야근을 하지 않을 경우 야근 지수는 0이라고 명시되어 있다.

</aside>

### 2. Map을 활용한 작업량 카운팅

```javascript
const map = new Map();
const set = new Set(works);
const sorted = works.sort((a, b) => b - a);
let max = sorted[0];

for (let i = 0; i < works.length; i++) {
  const num = works[i];
  const value = map.get(num);
  map.set(works[i], value ? value + 1 : 1);
}
```

- Map에 각 작업량별 개수를 저장한다.
- 배열을 내림차순 정렬하여 최댓값을 추적한다.

### 3. 탐욕적으로 최댓값 줄이기

```javascript
for (let i = 0; i < n; i++) {
  const maxCount = map.get(max);
  const v = map.get(max - 1);
  map.set(max - 1, v ? v + 1 : 1);
  if (maxCount === 1) {
    set.delete(max);
    set.add(max - 1);
    map.delete(max);
    max--;
  } else {
    map.set(max, map.get(max) - 1);
  }
}
```

- n번 반복하면서 매번 가장 큰 작업량을 1씩 줄인다.
- 현재 최댓값의 개수가 1개면 최댓값을 삭제하고 max를 1 감소시킨다.
- 여러 개면 개수만 1 줄인다.

<aside>
💡

Map을 사용하면 같은 작업량이 여러 개 있을 때 효율적으로 관리할 수 있다. 배열을 직접 수정하는 것보다 시간 복잡도가 개선된다.

</aside>

### 4. 야근 지수 계산

```javascript
for (const [key, values] of map) {
  answer += Math.pow(key, 2) * values;
}

return answer;
```

- Map에 저장된 각 작업량을 제곱한 뒤 개수만큼 곱해서 합산한다.
- 최종 야근 지수를 반환한다.
