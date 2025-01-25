MATCH (n) DETACH DELETE n;
MATCH (n)-[r]->(m) RETURN n, r, m;


MATCH (n)
WHERE id(n) = 1
DETACH DELETE n