MATCH (n) DETACH DELETE n;
MATCH (n)-[r]->(m) RETURN n, r, m;

// Create Nodes

// Create Regions with Cost Multipliers
CREATE (:Region {name: "us-east-1", cost_multiplier: 1.0});
CREATE (:Region {name: "us-west-1", cost_multiplier: 1.2});
CREATE (:Region {name: "eu-west-1", cost_multiplier: 1.1});
CREATE (:Region {name: "ap-southeast-1", cost_multiplier: 1.3});
CREATE (:Region {name: "sa-east-1", cost_multiplier: 1.4});

// Create Availability Zones within Regions
CREATE (:AZ {name: "us-east-1a", cost_multiplier: 1.0});
CREATE (:AZ {name: "us-east-1b", cost_multiplier: 1.1});
CREATE (:AZ {name: "us-west-1a", cost_multiplier: 1.2});
CREATE (:AZ {name: "eu-west-1a", cost_multiplier: 1.1});
CREATE (:AZ {name: "ap-southeast-1a", cost_multiplier: 1.3});
CREATE (:AZ {name: "sa-east-1a", cost_multiplier: 1.4});

// Create Compute Options
CREATE (:Compute {name: "EC2 P4d", instance_type: "p4d.24xlarge", cost_per_hour: 32});
CREATE (:Compute {name: "AWS Batch G5", instance_type: "g5.12xlarge", cost_per_hour: 4});
CREATE (:Compute {name: "AWS Lambda", instance_type: "serverless", cost_per_invocation: 0.00001667});

// Create Storage Options
CREATE (:Storage {name: "FSx for Lustre", storage_type: "High-Performance Block", cost_per_GB: 0.13});
CREATE (:Storage {name: "EBS General Purpose", storage_type: "Block Storage", cost_per_GB: 0.08});
CREATE (:Storage {name: "S3 Intelligent-Tiering", storage_type: "Object Storage", cost_per_GB: 0.023});

// Create Network Options
CREATE (:Network {name: "AWS Direct Connect", transfer_cost_per_GB: 0.02});
CREATE (:Network {name: "AWS Transit Gateway", transfer_cost_per_GB: 0.04});
CREATE (:Network {name: "Standard AWS Transfer", transfer_cost_per_GB: 0.09});

// Create Security Options
CREATE (:Security {name: "AWS WAF & Shield", protection_level: "Advanced", cost_per_month: 3000});
CREATE (:Security {name: "AWS WAF", protection_level: "Standard", cost_per_month: 500});
CREATE (:Security {name: "Basic AWS Security", protection_level: "Basic", cost_per_month: 0});

// Create Additional Cost Components
CREATE (:CostComponent {name: "Inter-Region Data Transfer", cost_per_GB: 0.02});
CREATE (:CostComponent {name: "Egress to Internet", cost_per_GB: 0.09});
CREATE (:CostComponent {name: "Inter-AZ Data Transfer", cost_per_GB: 0.01});
CREATE (:CostComponent {name: "RDS SQL Server License", cost_per_hour: 0.15});
CREATE (:CostComponent {name: "Windows Server License", cost_per_hour: 0.12});
CREATE (:CostComponent {name: "AWS Elemental MediaConvert", cost_per_minute: 0.0075});
CREATE (:CostComponent {name: "Amazon Rekognition", cost_per_image: 0.001});
CREATE (:CostComponent {name: "AWS CloudWatch Logs", cost_per_GB: 0.50});
CREATE (:CostComponent {name: "AWS X-Ray", cost_per_million_traces: 5});
CREATE (:CostComponent {name: "AWS CloudTrail", cost_per_100k_events: 2});
CREATE (:CostComponent {name: "AWS Backup", cost_per_GB: 0.05});
CREATE (:CostComponent {name: "S3 Cross-Region Replication", cost_per_GB: 0.03});
CREATE (:CostComponent {name: "AWS Disaster Recovery", cost_per_GB: 0.028});
CREATE (:CostComponent {name: "AWS Business Support", cost_percent_of_spend: 0.10});
CREATE (:CostComponent {name: "AWS Enterprise Support", cost_percent_of_spend: 0.15});

// Create Relationships

// Connect Regions to Availability Zones
MATCH (r:Region {name: "us-east-1"}), (a:AZ {name: "us-east-1a"}) CREATE (r)-[:CONTAINS {cost: 1.0}]->(a);
MATCH (r:Region {name: "us-east-1"}), (a:AZ {name: "us-east-1b"}) CREATE (r)-[:CONTAINS {cost: 1.1}]->(a);
MATCH (r:Region {name: "us-west-1"}), (a:AZ {name: "us-west-1a"}) CREATE (r)-[:CONTAINS {cost: 1.2}]->(a);
MATCH (r:Region {name: "eu-west-1"}), (a:AZ {name: "eu-west-1a"}) CREATE (r)-[:CONTAINS {cost: 1.1}]->(a);
MATCH (r:Region {name: "ap-southeast-1"}), (a:AZ {name: "ap-southeast-1a"}) CREATE (r)-[:CONTAINS {cost: 1.3}]->(a);
MATCH (r:Region {name: "sa-east-1"}), (a:AZ {name: "sa-east-1a"}) CREATE (r)-[:CONTAINS {cost: 1.4}]->(a);


// Link Compute to Regions
MATCH (c:Compute {name: "EC2 P4d"}), (r:Region {name: "us-east-1"}) CREATE (c)-[:DEPLOYED_IN {cost: 32 * r.cost_multiplier}]->(r);
MATCH (c:Compute {name: "AWS Batch G5"}), (r:Region {name: "us-west-1"}) CREATE (c)-[:DEPLOYED_IN {cost: 4 * r.cost_multiplier}]->(r);
MATCH (c:Compute {name: "AWS Lambda"}), (r:Region {name: "eu-west-1"}) CREATE (c)-[:DEPLOYED_IN {cost: 0.00001667 * r.cost_multiplier}]->(r);

// Link Availability Zones to Storage
MATCH (a:AZ {name: "us-east-1a"}), (s:Storage {name: "FSx for Lustre"}) CREATE (a)-[:STORES {cost: 0.13 * a.cost_multiplier}]->(s);
MATCH (a:AZ {name: "us-west-1a"}), (s:Storage {name: "EBS General Purpose"}) CREATE (a)-[:STORES {cost: 0.08 * a.cost_multiplier}]->(s);
MATCH (a:AZ {name: "eu-west-1a"}), (s:Storage {name: "S3 Intelligent-Tiering"}) CREATE (a)-[:STORES {cost: 0.023 * a.cost_multiplier}]->(s);


// Create Compute to Storage Relationships
MATCH (c:Compute {name: "EC2 P4d"}), (s:Storage {name: "FSx for Lustre"})
CREATE (c)-[:STORES {cost: 0.13}]->(s);
MATCH (c:Compute {name: "AWS Batch G5"}), (s:Storage {name: "EBS General Purpose"})
CREATE (c)-[:STORES {cost: 0.08}]->(s);
MATCH (c:Compute {name: "AWS Lambda"}), (s:Storage {name: "S3 Intelligent-Tiering"})
CREATE (c)-[:STORES {cost: 0.023}]->(s);

// Create Storage to Network Relationships
MATCH (s:Storage {name: "FSx for Lustre"}), (n:Network {name: "AWS Direct Connect"})
CREATE (s)-[:DELIVERS {cost: 0.02}]->(n);
MATCH (s:Storage {name: "EBS General Purpose"}), (n:Network {name: "AWS Transit Gateway"})
CREATE (s)-[:DELIVERS {cost: 0.04}]->(n);
MATCH (s:Storage {name: "S3 Intelligent-Tiering"}), (n:Network {name: "Standard AWS Transfer"})
CREATE (s)-[:DELIVERS {cost: 0.09}]->(n);

// Create Compute to Security Relationships
MATCH (c:Compute {name: "EC2 P4d"}), (sec:Security {name: "AWS WAF & Shield"})
CREATE (c)-[:SECURED_BY {cost: 0.05}]->(sec);
MATCH (c:Compute {name: "AWS Batch G5"}), (sec:Security {name: "AWS WAF"})
CREATE (c)-[:SECURED_BY {cost: 0.03}]->(sec);
MATCH (c:Compute {name: "AWS Lambda"}), (sec:Security {name: "Basic AWS Security"})
CREATE (c)-[:SECURED_BY {cost: 0.01}]->(sec);

// Create Storage to Additional Cost Components Relationships
MATCH (s:Storage {name: "FSx for Lustre"}), (dt:CostComponent {name: "Inter-Region Data Transfer"})
CREATE (s)-[:ADDS_COST {cost: 0.02}]->(dt);
MATCH (s:Storage {name: "EBS General Purpose"}), (dt:CostComponent {name: "Egress to Internet"})
CREATE (s)-[:ADDS_COST {cost: 0.09}]->(dt);
MATCH (s:Storage {name: "S3 Intelligent-Tiering"}), (dt:CostComponent {name: "Inter-AZ Data Transfer"})
CREATE (s)-[:ADDS_COST {cost: 0.01}]->(dt);

// Create Compute to Licensing Relationships
MATCH (c:Compute {name: "EC2 P4d"}), (lic:CostComponent {name: "Windows Server License"})
CREATE (c)-[:REQUIRES {cost: 0.12}]->(lic);
MATCH (c:Compute {name: "AWS Batch G5"}), (lic:CostComponent {name: "RDS SQL Server License"})
CREATE (c)-[:REQUIRES {cost: 0.15}]->(lic);

// Create ProcessingCluster to AI Service Relationships
MATCH (p:ProcessingCluster), (ai:CostComponent {name: "AWS Elemental MediaConvert"})
CREATE (p)-[:USES {cost: 0.0075}]->(ai);

// Create Network to Monitoring Relationships
MATCH (n:Network {name: "AWS Direct Connect"}), (obs:CostComponent {name: "AWS CloudWatch Logs"})
CREATE (n)-[:MONITORED_BY {cost: 0.50}]->(obs);
MATCH (n:Network {name: "AWS Transit Gateway"}), (obs:CostComponent {name: "AWS X-Ray"})
CREATE (n)-[:MONITORED_BY {cost: 5}]->(obs);
MATCH (n:Network {name: "Standard AWS Transfer"}), (obs:CostComponent {name: "AWS CloudTrail"})
CREATE (n)-[:MONITORED_BY {cost: 2}]->(obs);

// Create Storage to Backup Relationships
MATCH (s:Storage {name: "FSx for Lustre"}), (backup:CostComponent {name: "AWS Backup"})
CREATE (s)-[:BACKED_UP_BY {cost: 0.05}]->(backup);
MATCH (s:Storage {name: "EBS General Purpose"}), (backup:CostComponent {name: "S3 Cross-Region Replication"})
CREATE (s)-[:BACKED_UP_BY {cost: 0.03}]->(backup);
MATCH (s:Storage {name: "S3 Intelligent-Tiering"}), (backup:CostComponent {name: "AWS Disaster Recovery"})
CREATE (s)-[:BACKED_UP_BY {cost: 0.028}]->(backup);

// Create Compute to AWS Support Relationships
MATCH (c:Compute {name: "EC2 P4d"}), (support:CostComponent {name: "AWS Enterprise Support"})
CREATE (c)-[:SUPPORT_PLAN {cost: 0.15}]->(support);
MATCH (c:Compute {name: "AWS Batch G5"}), (support:CostComponent {name: "AWS Business Support"})
CREATE (c)-[:SUPPORT_PLAN {cost: 0.10}]->(support);

// Run Shortest Path Query to Find Cost-Effective Deployment
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
LIMIT 1;

// Show full visualisation full depth
MATCH path = (c:Compute)-[r1]-(n)-[r2]-(m)
WHERE c.name IN ["EC2 P4d", "AWS Batch G5", "AWS Lambda"]
RETURN path, 
       nodes(path) AS AllNodes, 
       relationships(path) AS AllRelationships