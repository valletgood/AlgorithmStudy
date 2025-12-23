function solution(n, roads, sources, destination) {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < roads.length; i++) {
    const [start, end] = roads[i];
    graph[start].push(end);
    graph[end].push(start);
  }

  const visited = Array(n + 1).fill(false);
  const dist = Array(n + 1).fill(0);

  const bfs = (start) => {
    let q = [start];
    let head = 0;
    visited[start] = true;
    while (head < q.length) {
      const loc = q[head++];
      for (const next of graph[loc]) {
        if (!visited[next]) {
          visited[next] = true;
          dist[next] = dist[loc] + 1;
          q.push(next);
        }
      }
    }
  };

  bfs(destination);

  let out = [];

  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    if (s === destination) {
      out.push(0);
      continue;
    }
    out.push(dist[s] === 0 ? -1 : dist[s]);
  }

  return out;
}
