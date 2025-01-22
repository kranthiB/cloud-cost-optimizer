package com.cloud.costoptimizer.controller;

import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/graph")
@CrossOrigin(origins = "*")
public class GraphController {

    private final Neo4jClient neo4jClient;

    @Autowired
    public GraphController(Neo4jClient neo4jClient) {
        this.neo4jClient = neo4jClient;
    }

    @GetMapping("/compute")
    public Map<String, Object> getComputeGraph() {
        String query = """ 
                MATCH path = (c:Compute)-[r1]->(n)-[r2]->(m) WHERE 
                c.name IN ["EC2 P4d", "AWS Batch G5", "AWS Lambda"] 
                RETURN collect(DISTINCT {id: id(c), props: properties(c), labels: labels(c)}) AS computeNodes, 
                collect(DISTINCT {id: id(n), props: properties(n), labels: labels(n)}) AS intermediateNodes, 
                collect(DISTINCT {id: id(m), props: properties(m), labels: labels(m)}) AS targetNodes, 
                collect(DISTINCT {type: type(r1), start: id(startNode(r1)), end: id(endNode(r1)), props: properties(r1)}) 
                AS firstRelations, collect(DISTINCT {type: type(r2), start: id(startNode(r2)), 
                end: id(endNode(r2)), props: properties(r2)}) AS secondRelations """;
        Optional<Map<String, Object>> rawResult = neo4jClient.query(query).fetch().one();
        if (rawResult.isEmpty()) {
            return Map.of("error", "No data found in database");
        }
        Set<Map<String, Object>> uniqueNodes = new HashSet<>();
        uniqueNodes.addAll((List<Map<String, Object>>) rawResult.get().getOrDefault("computeNodes", Collections.emptyList()));
        uniqueNodes.addAll((List<Map<String, Object>>) rawResult.get().getOrDefault("intermediateNodes", Collections.emptyList()));
        uniqueNodes.addAll((List<Map<String, Object>>) rawResult.get().getOrDefault("targetNodes", Collections.emptyList()));
        Set<Map<String, Object>> uniqueRelationships = new HashSet<>();
        uniqueRelationships.addAll((List<Map<String, Object>>) rawResult.get().getOrDefault("firstRelations", Collections.emptyList()));
        uniqueRelationships.addAll((List<Map<String, Object>>) rawResult.get().getOrDefault("secondRelations", Collections.emptyList()));
        return Map.of("nodes", new ArrayList<>(uniqueNodes), "relationships", new ArrayList<>(uniqueRelationships));
    }

    @GetMapping("/shortest-path")
    public List<Map<String, Object>> getShortestPath() {
        String query = """
            MATCH (c:Compute)-[r1:DEPLOYED_IN]->(region:Region)
            MATCH (region)-[r2:CONTAINS]->(az:AZ)
            MATCH (az)-[r3:STORES]->(s:Storage)
            OPTIONAL MATCH (s)-[r4:DELIVERS]->(n:Network)
            OPTIONAL MATCH (c)-[r5:SECURED_BY]->(sec:Security)
            OPTIONAL MATCH (s)-[r6:ADDS_COST]->(dt:CostComponent)
            OPTIONAL MATCH (c)-[r7:REQUIRES]->(lic:CostComponent)
            OPTIONAL MATCH (n)-[r8:MONITORED_BY]->(obs:CostComponent)
            OPTIONAL MATCH (s)-[r9:BACKED_UP_BY]->(backup:CostComponent)
            OPTIONAL MATCH (c)-[r10:SUPPORT_PLAN]->(support:CostComponent)
            WITH c, region, az, s, n, sec, dt, lic, obs, backup, support, 
                 COALESCE(r1.cost, 0) AS Compute_Cost,
                 COALESCE(r2.cost, 0) AS Region_Cost,
                 COALESCE(r3.cost, 0) AS Storage_Cost,
                 COALESCE(r4.cost, 0) AS Network_Cost,
                 COALESCE(r5.cost, 0) AS Security_Cost,
                 COALESCE(r6.cost, 0) AS Data_Transfer_Cost,
                 COALESCE(r7.cost, 0) AS Licensing_Cost,
                 COALESCE(r8.cost, 0) AS Monitoring_Cost,
                 COALESCE(r9.cost, 0) AS Backup_Cost,
                 COALESCE(r10.cost, 0) AS Support_Cost,
                 (COALESCE(r1.cost, 0) + COALESCE(r2.cost, 0) + COALESCE(r3.cost, 0) + COALESCE(r4.cost, 0) + 
                  COALESCE(r5.cost, 0) + COALESCE(r6.cost, 0) + COALESCE(r7.cost, 0) + COALESCE(r8.cost, 0) + 
                  COALESCE(r9.cost, 0) + COALESCE(r10.cost, 0)) AS Total_Cost
            RETURN c.name AS Compute_Service, region.name AS Region, az.name AS Availability_Zone,
                   s.name AS Storage_Type, n.name AS Network_Type, sec.name AS Security,
                   Compute_Cost, Region_Cost, Storage_Cost, Network_Cost, Security_Cost, Data_Transfer_Cost,
                   Licensing_Cost, Monitoring_Cost, Backup_Cost, Support_Cost, Total_Cost
            ORDER BY Total_Cost ASC
        """;

        return neo4jClient.query(query)
                .fetch().all().stream().toList();
    }
}
