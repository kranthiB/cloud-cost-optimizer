package com.cloud.costoptimizer.controller;

import org.neo4j.driver.Value;
import org.neo4j.driver.types.TypeSystem;
import org.neo4j.driver.Record;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pipelines")
@CrossOrigin(origins = "*")
public class PipelineController {

    private final Neo4jClient neo4jClient;

    @Autowired
    public PipelineController(Neo4jClient neo4jClient) {
        this.neo4jClient = neo4jClient;
    }


    @GetMapping("/{pipelineName}/shortest-path")
    public ResponseEntity<ShortestPathResponse> getShortestPath(
            @PathVariable String pipelineName,
            @RequestParam String cloudProvider) {
        String query = """
            MATCH 
                (start:Pipelines {name: $pipelineName, csp: $cloudProvider, state: 'start'}),
                (end:Pipelines {name: $pipelineName, csp: $cloudProvider, state: 'end'})
            CALL apoc.algo.dijkstra(start, end, 'COST_EFFECTIVE_RATIO', 'cost') 
            YIELD path, weight
            RETURN 
                [{
                    nodes: [node IN nodes(path) | {
                        id: id(node),
                        labels: labels(node),
                        properties: properties(node)
                    }],
                    relationships: [rel IN relationships(path) | {
                        id: id(rel),
                        type: type(rel),
                        properties: properties(rel),
                        startNode: startNode(rel).name,
                        endNode: endNode(rel).name
                    }]
                }][0] as pathInfo,
                weight as totalCost
        """;

        return neo4jClient.query(query)
                .bind(pipelineName).to("pipelineName")
                .bind(cloudProvider).to("cloudProvider")
                .fetchAs(ShortestPathResponse.class)
                .mappedBy((TypeSystem typeSystem, Record record) -> {
                    Map<String, Object> pathInfo = record.get("pathInfo").asMap();
                    return new ShortestPathResponse(
                            new PathInfo(
                                    (List<Map<String, Object>>) pathInfo.get("nodes"),
                                    (List<Map<String, Object>>) pathInfo.get("relationships")
                            ),
                            record.get("totalCost").asDouble()
                    );
                })
                .one()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{pipelineName}/cost")
    public ResponseEntity<List<CostDetails>> getPipelineCost(
            @PathVariable String pipelineName,
            @RequestParam String cloudProvider) {
        String query = """
            MATCH path = (start:Pipelines {name: $pipelineName, csp: $cloudProvider, state: 'start'})
                -[r:COST_EFFECTIVE_RATIO*]->(end:Pipelines {name: $pipelineName, csp: $cloudProvider, state: 'end'})
            WITH path,
                [node IN nodes(path) | {
                    name: node.name, 
                    id: id(node)
                }] as nodeDetails,
                [r IN relationships(path) | r.cost] as costs,
                reduce(total = 0, rel IN relationships(path) | total + rel.cost) as totalPathCost,
                [region in [r IN relationships(path) | 
                    CASE 
                        WHEN startNode(r).region IS NOT NULL THEN startNode(r).region
                        WHEN endNode(r).region IS NOT NULL THEN endNode(r).region
                    END
                ] WHERE region IS NOT NULL][0] as region
            RETURN 
                totalPathCost as TotalCost,
                region as Region,
                apoc.map.fromPairs([i in range(1, size(nodeDetails)-1) 
                    WHERE costs[i-1] > 0 
                    | [nodeDetails[i].name, costs[i-1]]
                ]) as CostBreakdown,
                nodeDetails as PathDetails
            ORDER BY totalPathCost ASC
        """;

        List<CostDetails> result = neo4jClient.query(query)
                .bind(pipelineName).to("pipelineName")
                .bind(cloudProvider).to("cloudProvider")
                .fetchAs(CostDetails.class)
                .mappedBy((TypeSystem typeSystem, Record record) -> {
                    Double totalCost = record.get("TotalCost").asDouble();
                    String region = record.get("Region").asString();
                    Map<String, Double> costBreakdown = record.get("CostBreakdown").asMap(value -> value.asDouble());

                    List<Map<String, Object>> pathDetailsMap = record.get("PathDetails").asList(Value::asMap);
                    List<NodeDetail> pathDetails = pathDetailsMap.stream()
                            .map(detail -> new NodeDetail(
                                    (String) detail.get("name"),
                                    ((Number) detail.get("id")).longValue()
                            ))
                            .collect(Collectors.toList());

                    return new CostDetails(totalCost, region, costBreakdown, pathDetails);
                })
                .all().stream().toList();

        if (result.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{pipelineName}/graph")
    public List<Map<String, Object>> getPipelineGraph(
            @PathVariable String pipelineName,
            @RequestParam String cloudProvider) {
        String cypherQuery = """
        MATCH (start:Pipelines {name: $pipelineName, csp: $cloudProvider, state: 'start'}),
              (end:Pipelines {name: $pipelineName, csp: $cloudProvider, state: 'end'}),
              path = (start)-[*]->(end)
        UNWIND relationships(path) as r
        WITH DISTINCT startNode(r) as n, r, endNode(r) as m  
        RETURN properties(n) as startNode, type(r) as relationshipType, properties(r) as relationshipProperties, properties(m) as endNode;
    """;

        return neo4jClient.query(cypherQuery)
                .bind(pipelineName).to("pipelineName")
                .bind(cloudProvider).to("cloudProvider")
                .fetch()
                .all().stream().toList();
    }


}


class PipelineNode {
    private Long id;
    private List<String> labels;
    private Map<String, Object> properties;

    public PipelineNode(Long id, List<String> labels, Map<String, Object> properties) {
        this.id = id;
        this.labels = labels;
        this.properties = properties;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }
}
class PipelineRelationship {
    private Long id;
    private String type;
    private Map<String, Object> properties;
    private Map<String, Object> startNode;
    private Map<String, Object> endNode;

    public PipelineRelationship(Long id, String type, Map<String, Object> properties, Map<String, Object> startNode, Map<String, Object> endNode) {
        this.id = id;
        this.type = type;
        this.properties = properties;
        this.startNode = startNode;
        this.endNode = endNode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    public Map<String, Object> getStartNode() {
        return startNode;
    }

    public void setStartNode(Map<String, Object> startNode) {
        this.startNode = startNode;
    }

    public Map<String, Object> getEndNode() {
        return endNode;
    }

    public void setEndNode(Map<String, Object> endNode) {
        this.endNode = endNode;
    }
}

class NodeDetail {
    private String name;
    private Long id;

    public NodeDetail(String name, Long id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

class CostDetails {
    private Double totalCost;
    private String region;
    private Map<String, Double> costBreakdown;
    private List<NodeDetail> pathDetails;

    public CostDetails(Double totalCost, String region, Map<String, Double> costBreakdown, List<NodeDetail> pathDetails) {
        this.totalCost = totalCost;
        this.region = region;
        this.costBreakdown = costBreakdown;
        this.pathDetails = pathDetails;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Map<String, Double> getCostBreakdown() {
        return costBreakdown;
    }

    public void setCostBreakdown(Map<String, Double> costBreakdown) {
        this.costBreakdown = costBreakdown;
    }

    public List<NodeDetail> getPathDetails() {
        return pathDetails;
    }

    public void setPathDetails(List<NodeDetail> pathDetails) {
        this.pathDetails = pathDetails;
    }
}

class ShortestPathResponse {
    private PathInfo path;
    private Double totalCost;

    public ShortestPathResponse(PathInfo path, Double totalCost) {
        this.path = path;
        this.totalCost = totalCost;
    }

    public PathInfo getPath() {
        return path;
    }

    public void setPath(PathInfo path) {
        this.path = path;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }
}

class PathInfo {
    private List<Map<String, Object>> nodes;
    private List<Map<String, Object>> relationships;

    public PathInfo(List<Map<String, Object>> nodes, List<Map<String, Object>> relationships) {
        this.nodes = nodes;
        this.relationships = relationships;
    }

    public List<Map<String, Object>> getNodes() {
        return nodes;
    }

    public void setNodes(List<Map<String, Object>> nodes) {
        this.nodes = nodes;
    }

    public List<Map<String, Object>> getRelationships() {
        return relationships;
    }

    public void setRelationships(List<Map<String, Object>> relationships) {
        this.relationships = relationships;
    }
}
