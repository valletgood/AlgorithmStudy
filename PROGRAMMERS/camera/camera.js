function solution(routes) {
  var answer = 0;
  routes.sort((a, b) => a[1] - b[1]);

  let cams = 0;
  let cctv = -Infinity;

  for (const [begin, end] of routes) {
    if (begin > cctv) {
      cams++;
      cctv = end;
    }
  }
  return cams;
}
