MATCH (n) DETACH DELETE n;
MATCH (n)-[r]->(m) RETURN n, r, m;
