WITH ['AWS', 'Azure', 'GCP', 'Multi-Cloud'] as csps
UNWIND csps as csp
MATCH (start:Pipelines {
    name: 'Global Finance Analytics Platform',
    csp: csp,
    state: 'start'
}),
(end:Pipelines {
    name: 'Global Finance Analytics Platform',
    csp: csp,
    state: 'end'
}),
path = (start)-[*]->(end)
DETACH DELETE path;