# 보석 쇼핑

[프로그래머스: 보석 쇼핑](https://school.programmers.co.kr/learn/courses/30/lessons/67258)

## 문제 파악하기

진열대에 보석들이 일렬로 놓여 있을 때, **모든 종류의 보석을 포함하는 가장 짧은 연속 구간**을 찾는 문제입니다.

### 조건

- 모든 종류의 보석을 최소 1개 이상 포함해야 함
- 가장 짧은 구간이 여러 개면 시작 진열대 번호가 가장 작은 것
- 진열대 번호는 1부터 시작

> [!NOTE]
> 연속 구간에서 특정 조건을 만족하는 최소 길이를 찾는 문제는 **슬라이딩 윈도우**로 O(N)에 해결할 수 있습니다!

## 풀이

**슬라이딩 윈도우 + 투 포인터**로 해결합니다.

### 1. 전체 보석 종류 수 파악

```javascript
const allSize = new Set(gems).size;
if (allSize === 1) return [1, 1];
```

Set으로 중복을 제거하여 전체 보석 종류 수를 구합니다.

### 2. 슬라이딩 윈도우 탐색

```javascript
const buyMap = new Map();
let pos = 0; // 왼쪽 포인터
let cur = 1; // 오른쪽 포인터
buyMap.set(gems[0], 1);

while (cur < gems.length) {
  const gem = gems[cur];
  const v = buyMap.get(gem);
  buyMap.set(gem, v ? v + 1 : 1); // 오른쪽 보석 추가

  // 모든 종류 포함 시 윈도우 축소 시도
  while (buyMap.size === allSize) {
    // 최적 구간 갱신
    // 왼쪽 보석 제거
  }
  cur++;
}
```

- `buyMap`: 현재 윈도우 내 각 보석의 개수
- `buyMap.size`: 현재 윈도우 내 보석 종류 수

### 3. 윈도우 축소 및 최적 구간 갱신

```javascript
while (buyMap.size === allSize) {
  const g = gems[pos];
  const v1 = buyMap.get(g);

  // 더 짧은 구간이면 갱신
  if (bestLen > cur - pos || (bestLen === cur - pos && best[0] > pos + 1)) {
    best = [pos + 1, cur + 1];
    bestLen = cur - pos;
  }

  // 왼쪽 보석 제거
  if (v1 === 1) {
    buyMap.delete(g); // 마지막 1개면 Map에서 삭제
  } else {
    buyMap.set(g, v1 - 1);
  }
  pos++;
}
```

> [!TIP] > **Map.delete()로 종류 수 관리**
>
> 보석 개수가 0이 되면 `delete`로 Map에서 제거합니다.
> 이렇게 하면 `buyMap.size`가 자동으로 보석 종류 수를 나타냅니다.

### 동작 예시

```
gems: ["DIA", "RUBY", "RUBY", "DIA", "EMERALD", "SAPPHIRE", "DIA"]
전체 종류: 4개

pos=0, cur=5: [DIA, RUBY, RUBY, DIA, EMERALD, SAPPHIRE] → 4종류 ✓
  축소 → pos=1: [RUBY, RUBY, DIA, EMERALD, SAPPHIRE] → 4종류 ✓
  축소 → pos=2: [RUBY, DIA, EMERALD, SAPPHIRE] → 4종류 ✓ (길이 4)
  축소 → pos=3: [DIA, EMERALD, SAPPHIRE] → 3종류 ✗

최종 답: [3, 6]
```

## 핵심 아이디어

1. **슬라이딩 윈도우**: 오른쪽 확장 → 조건 만족 시 왼쪽 축소
2. **Map으로 개수 관리**: 각 보석의 개수와 종류 수를 효율적으로 추적
3. **탐욕적 축소**: 조건을 만족하는 동안 계속 윈도우를 줄임

### 시간 복잡도

- 각 포인터가 배열을 한 번씩 순회
- **O(N)**
