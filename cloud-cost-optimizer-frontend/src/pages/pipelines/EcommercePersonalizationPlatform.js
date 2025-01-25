import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const ecommerceArchitecture = [
  {
    title: 'User Interaction Layer',
    icon: '🛒',
    color: '#E8F0FE',
    services: [
      { name: 'Session Management', details: ['User Tracking (1M concurrent)', 'Behavior Analysis (real-time)', 'Journey Mapping (<50ms)'] },
      { name: 'Event Processing', details: ['Click Stream (100K events/sec)', 'Search Patterns (50K/sec)', 'Cart Actions (10K/sec)'] },
      { name: 'Context Engine', details: ['Location Awareness (real-time)', 'Device Context (100% coverage)', 'Time-based Analysis (24/7)'] },
    ],
  },
  {
    title: 'Personalization Engine',
    icon: '🎯',
    color: '#EAF8E6',
    services: [
      { name: 'Real-time Recommendations', details: ['Product Suggestions (<100ms)', 'Cross-sell Analysis (real-time)', 'Basket Analysis (95% accuracy)'] },
      { name: 'ML Models', details: ['Collaborative Filtering (hourly)', 'Content-based (daily)', 'Hybrid Models (real-time)'] },
      { name: 'Dynamic Pricing', details: ['Price Optimization (5min)', 'Inventory Analysis (real-time)', 'Competitor Tracking (hourly)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'User Profiles', details: ['Profile Store (500M users)', 'Preference Data (2PB)', 'History Store (1PB)'] },
      { name: 'Product Catalog', details: ['Product Data (100M items)', 'Attribute Store (500TB)', 'Media Assets (1PB)'] },
      { name: 'Analytics Store', details: ['Behavioral Data (1PB)', 'Transaction History (500TB)', 'Model Features (200TB)'] },
    ],
  },
  {
    title: 'Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Commerce Integration', details: ['Order Management (10K/min)', 'Inventory Sync (real-time)', 'Pricing Engine (5min sync)'] },
      { name: 'API Services', details: ['REST APIs (<50ms)', 'GraphQL (real-time)', 'Event Streams (WebSocket)'] },
      { name: 'Analytics Services', details: ['A/B Testing (real-time)', 'Performance Analytics (1min)', 'Business Metrics (hourly)'] },
    ],
  },
];

const EcommercePersonalizationPlatform = () => {
  const [expanded, setExpanded] = useState('approach');
  const [subExpanded, setSubExpanded] = useState(null);
  const [mermaidRendered, setMermaidRendered] = useState(true);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    setTimeout(() => {
      mermaid.contentLoaded();
      setMermaidRendered(true);
    }, 500);
  }, []);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleSubExpand = (panel) => (event, isExpanded) => {
    setSubExpanded(isExpanded ? panel : null);
  };

  return (
    <Container maxWidth="lg">
      {/* Title Section */}
      <Box sx={{ textAlign: 'center', my: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          🛒🎯 E-commerce Personalization Platform
        </Typography>
      </Box>

      {/* Approach Section */}
      <Accordion expanded={expanded === 'approach'} onChange={handleExpand('approach')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">Approach</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ p: 3, width: '100%' }}>
            <Typography variant="body1" gutterBottom>
              The platform provides AI-driven personalization, optimizing user experience with real-time recommendations, behavioral insights, and dynamic pricing.
            </Typography>

            {ecommerceArchitecture.map((layer, index) => (
              <Box key={index} sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {layer.icon} {layer.title}
                </Typography>
                <Paper sx={{ p: 2, backgroundColor: layer.color }}>
                  <Grid container spacing={2}>
                    {layer.services.map((service, idx) => (
                      <Grid item xs={12} sm={4} key={idx}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {service.name}
                          </Typography>
                          {service.details.map((detail, i) => (
                            <Typography key={i} variant="body2" color="textSecondary">
                              {detail}
                            </Typography>
                          ))}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Box>
            ))}
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Architecture Section */}
      <Accordion expanded={expanded === 'architecture'} onChange={handleExpand('architecture')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">Architecture</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ p: 3, width: '100%' }}>
            <div className="mermaid">
              {`
              flowchart TD
                subgraph UIL[User Interaction Layer]
                    UT[User Tracking] --> EP[Event Processing]
                    EP --> CE[Context Engine]
                    SR[Search & Browse] --> EP
                    CA[Cart Actions] --> EP
                end

                subgraph PE[Personalization Engine]
                    RR[Real-time Recommendations]
                    ML[ML Models]
                    DP[Dynamic Pricing]
                    AB[A/B Testing]
                end

                subgraph DM[Data Management]
                    UP[(User Profiles)]
                    PC[(Product Catalog)]
                    AS[(Analytics Store)]
                    FS[(Feature Store)]
                end

                subgraph IL[Integration Layer]
                    API[API Services]
                    ES[Event Streaming]
                    CI[Commerce Integration]
                    AN[Analytics Service]
                end

                %% User Interaction Flows
                CE --> RR
                EP --> ML
                EP --> AS

                %% Personalization Flows
                ML --> RR
                ML --> DP
                FS --> ML
                RR --> AB

                %% Data Flows
                UP --> RR
                PC --> RR
                AS --> ML
                AS --> AN

                %% Integration Flows
                RR --> API
                DP --> API
                AB --> AN
                CI --> PC
                EP --> ES

                %% Real-time Updates
                API --> UT
                ES --> CE
                AN --> AB

                classDef interaction fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef engine fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef integration fill:#E8A87C,stroke:#333
                classDef tracking fill:#95DAC1,stroke:#333

                class UIL,PE,DM,IL interaction
                class RR,ML,DP,AB engine
                class UP,PC,AS,FS storage
                class API,ES,CI,AN integration
                class UT,SR,CA,CE tracking
              `}
            </div>

            <NonFunctionalRequirements />

            {/* AWS Implementation */}
            <Accordion expanded={subExpanded === 'aws-core-processing'} onChange={handleSubExpand('aws-core-processing')} sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">AWS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 3, width: '100%' }}>
                  <div className="mermaid">
                    {`
                    flowchart TD
                      subgraph UserLayer[User Interaction Layer]
                          CF[CloudFront]
                          ALB[Application Load Balancer]
                          R53[Route 53]
                      end

                      subgraph WebTier[Web & API Layer]
                          ECS[ECS Fargate Cluster]
                          API[API Gateway]
                          EKS[EKS Cluster]
                      end

                      subgraph ProcessingLayer[Event Processing Layer]
                          KIN[Kinesis Data Streams]
                          KF[Kinesis Firehose]
                          MSK[Amazon MSK]
                      end

                      subgraph ComputeLayer[Computation Layer]
                          SAG[SageMaker]
                          EMR[EMR Cluster]
                          LAM[Lambda Functions]
                          PS[Personalize Service]
                      end

                      subgraph StorageLayer[Storage Layer]
                          DDB[(DynamoDB)]
                          RDS[(Aurora MySQL)]
                          S3[(S3 Data Lake)]
                          ES[(OpenSearch)]
                          RED[(ElastiCache Redis)]
                      end

                      subgraph MonitoringLayer[Monitoring & Management]
                          CW[CloudWatch]
                          XR[X-Ray]
                          CFM[Config]
                          GD[GuardDuty]
                      end

                      %% Network Flow
                      R53 --> CF
                      CF --> ALB
                      ALB --> ECS
                      ALB --> EKS

                      %% API Integration
                      ECS --> API
                      EKS --> API
                      API --> LAM
                      API --> PS

                      %% Event Processing Flow
                      ECS --> KIN
                      KIN --> KF
                      KF --> S3
                      MSK --> LAM

                      %% Compute Flow
                      LAM --> SAG
                      SAG --> PS
                      EMR --> S3
                      PS --> RED

                      %% Storage Access
                      LAM --> DDB
                      ECS --> RDS
                      SAG --> S3
                      PS --> ES
                      LAM --> RED

                      %% Monitoring Flow
                      CW --> ECS
                      CW --> EKS
                      XR --> API
                      CFM --> ECS
                      GD --> KIN

                      classDef userLayer fill:#FF9900,stroke:#232F3E,color:#232F3E
                      classDef webTier fill:#FF9900,stroke:#232F3E,color:#232F3E
                      classDef processing fill:#FF9900,stroke:#232F3E,color:#232F3E
                      classDef compute fill:#FF9900,stroke:#232F3E,color:#232F3E
                      classDef storage fill:#3B48CC,stroke:#232F3E,color:#fff
                      classDef monitoring fill:#CC2264,stroke:#232F3E,color:#fff

                      class UserLayer,WebTier,ProcessingLayer,ComputeLayer userLayer
                      class StorageLayer storage
                      class MonitoringLayer monitoring
                    `}
                  </div>
                </Paper>
              </AccordionDetails>
            </Accordion>
            
            {/* Azure Implementation */}
            <Accordion expanded={subExpanded === 'azure-core-processing'} onChange={handleSubExpand('azure-core-processing')} sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">Azure</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 3, width: '100%' }}>
                  <div className="mermaid">
                    {`
                    flowchart TD
                      subgraph FrontEnd[Front End Layer]
                          AFD[Azure Front Door]
                          CDN[Azure CDN]
                          TM[Traffic Manager]
                      end

                      subgraph AppLayer[Application Layer]
                          AKS[AKS Cluster]
                          ACA[Container Apps]
                          APIM[API Management]
                      end

                      subgraph EventLayer[Event Processing]
                          EH[Event Hubs]
                          ASA[Stream Analytics]
                          SF[Service Fabric]
                      end

                      subgraph CompLayer[Compute & ML Layer]
                          AML[Azure Machine Learning]
                          Databricks[Databricks]
                          Functions[Azure Functions]
                          PS[Personalizer Service]
                      end

                      subgraph DataLayer[Data Layer]
                          COSMOS[(Cosmos DB)]
                          SQLDB[(Azure SQL DB)]
                          ADLS[(Data Lake Storage)]
                          Redis[(Azure Cache Redis)]
                          Search[(Cognitive Search)]
                      end

                      subgraph MonitorLayer[Monitoring & Security]
                          Monitor[Azure Monitor]
                          Insights[Application Insights]
                          Sentinel[Azure Sentinel]
                          KeyVault[Key Vault]
                      end

                      %% Network Routing
                      TM --> AFD
                      AFD --> CDN
                      CDN --> AKS
                      CDN --> ACA

                      %% Application Flow
                      AKS --> APIM
                      ACA --> APIM
                      APIM --> Functions
                      APIM --> PS

                      %% Event Processing
                      ACA --> EH
                      EH --> ASA
                      ASA --> ADLS
                      SF --> Functions

                      %% Compute & ML Flow
                      Functions --> AML
                      AML --> PS
                      Databricks --> ADLS
                      PS --> Redis

                      %% Data Access
                      Functions --> COSMOS
                      AKS --> SQLDB
                      AML --> ADLS
                      PS --> Search
                      Functions --> Redis

                      %% Monitoring Flow
                      Monitor --> AKS
                      Monitor --> ACA
                      Insights --> APIM
                      Sentinel --> EH
                      KeyVault --> AKS

                      classDef frontend fill:#0078D4,stroke:#000,color:#fff
                      classDef app fill:#0078D4,stroke:#000,color:#fff
                      classDef event fill:#0078D4,stroke:#000,color:#fff
                      classDef compute fill:#0078D4,stroke:#000,color:#fff
                      classDef data fill:#459B45,stroke:#000,color:#fff
                      classDef monitor fill:#CA5010,stroke:#000,color:#fff

                      class FrontEnd,AppLayer,EventLayer,CompLayer frontend
                      class DataLayer data
                      class MonitorLayer monitor
                    
                    `}
                  </div>
                  
                </Paper>
              </AccordionDetails>
            </Accordion>

            {/* GCP Implementation */}
            <Accordion expanded={subExpanded === 'gcp-core-processing'} onChange={handleSubExpand('gcp-core-processing')} sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">GCP</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 3, width: '100%' }}>
                  <div className="mermaid">
                    {`
                    flowchart TD
                      subgraph FrontLayer[Frontend Layer]
                          GCLB[Cloud Load Balancing]
                          CDN[Cloud CDN]
                          DNS[Cloud DNS]
                      end

                      subgraph AppLayer[Application Layer]
                          GKE[Google Kubernetes Engine]
                          CloudRun[Cloud Run]
                          APIGW[API Gateway]
                      end

                      subgraph EventLayer[Event Processing]
                          Pub[Cloud Pub/Sub]
                          Dataflow[Cloud Dataflow]
                          Functions[Cloud Functions]
                      end

                      subgraph MLLayer[ML & Analytics Layer]
                          Vertex[Vertex AI]
                          Dataproc[Cloud Dataproc]
                          RecAI[Recommendations AI]
                          MLOps[Vertex AI Pipelines]
                      end

                      subgraph DataLayer[Data Layer]
                          FireStore[(Cloud Firestore)]
                          CloudSQL[(Cloud SQL)]
                          BigQuery[(BigQuery)]
                          Memstore[(Memorystore)]
                          Search[(Cloud Search)]
                      end

                      subgraph SecOpsLayer[Security & Operations]
                          Monitor[Cloud Monitoring]
                          Trace[Cloud Trace]
                          Security[Security Command]
                          SecretMgr[Secret Manager]
                      end

                      %% Network Flow
                      DNS --> GCLB
                      GCLB --> CDN
                      CDN --> GKE
                      CDN --> CloudRun

                      %% Application Flow
                      GKE --> APIGW
                      CloudRun --> APIGW
                      APIGW --> Functions
                      APIGW --> RecAI

                      %% Event Processing
                      CloudRun --> Pub
                      Pub --> Dataflow
                      Dataflow --> BigQuery
                      Functions --> Vertex

                      %% ML & Analytics Flow
                      Vertex --> RecAI
                      Dataproc --> BigQuery
                      MLOps --> Vertex
                      RecAI --> Memstore

                      %% Data Access Patterns
                      Functions --> FireStore
                      GKE --> CloudSQL
                      Vertex --> BigQuery
                      RecAI --> Search
                      Functions --> Memstore

                      %% Monitoring & Security
                      Monitor --> GKE
                      Monitor --> CloudRun
                      Trace --> APIGW
                      Security --> Pub
                      SecretMgr --> GKE

                      classDef frontend fill:#4285F4,stroke:#000,color:#fff
                      classDef app fill:#4285F4,stroke:#000,color:#fff
                      classDef event fill:#4285F4,stroke:#000,color:#fff
                      classDef ml fill:#4285F4,stroke:#000,color:#fff
                      classDef data fill:#34A853,stroke:#000,color:#fff
                      classDef ops fill:#EA4335,stroke:#000,color:#fff

                      class FrontLayer,AppLayer,EventLayer,MLLayer frontend
                      class DataLayer data
                      class SecOpsLayer ops
                    
                    `}
                  </div>
                  
                </Paper>
              </AccordionDetails>
            </Accordion>

          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Analyze Section */}
      <Accordion expanded={expanded === 'analyze'} onChange={handleExpand('analyze')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">Graph Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="E-commerce Personalization Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="E-commerce Personalization Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="E-commerce Personalization Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="E-commerce Personalization Platform" cloudProvider="Multi-Cloud"/>
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

const NonFunctionalRequirements = ({ }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
        🔹 Non-Functional Requirements (NFRs)
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>

        {/* Performance Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              🚀 Performance Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li>Real-time recommendation generation under <strong>100ms response time</strong></li>
                <li>Event processing latency <strong>below 50ms per transactio</strong>n</li>
                <li>API gateway <strong>response time within 200ms limit</strong></li>
                <li>Cache hit ratio maintained <strong>above 95% consistently</strong></li>
                <li>Data synchronization completed <strong>within 2-second threshold</strong></li>
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Scalability Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              📈 Scalability Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li>Horizontal scaling supports <strong>100,000 concurrent user sessions</strong></li>
                <li>Event streaming handles <strong>10,000 events per second</strong></li>
                <li><strong>Database clusters auto-scale</strong> based on demand peaks</li>
                <li>ML model serving scales <strong>across multiple processing nodes</strong></li>
                <li><strong>Load balancing distributes</strong> traffic across regional endpoints</li>
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Reliability Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              🛡️ Reliability Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li>System maintains <strong>99.99% uptime</strong> for core services</li>
                <li>Automatic failover completes within <strong>30 seconds maximum</strong></li>
                <li>Data replication ensures <strong>zero information</strong> loss guarantee</li>
                <li>Circuit breakers <strong>prevent cascading service failures</strong></li>
                <li><strong>Regular backup cycles</strong> occur every 4 hours</li>
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Security Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              🔒 Security Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li><strong>End-to-end encryption </strong>for all data transmissions</li>
                <li><strong>Multi-factor authentication</strong> enforced for administrative access</li>
                <li>Regular security <strong>audits conducted every 90 days</strong></li>
                <li><strong>Real-time threat detection</strong> and automated response</li>
                <li><strong>GDPR and PCI DSS</strong> compliance maintained</li>
              </ul>
            </Box>
          </Box>
        </Grid>

        {/* Maintainability Requirements */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
              ⚙️ Maintainability Requirements
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <ul style={{ fontSize: "1rem", margin: 0, paddingLeft: "1rem" }}>
                <li><strong>Automated deployment pipelines</strong> with rollback capability</li>
                <li><strong>Comprehensive logging</strong> covers all system interactions</li>
                <li><strong>Modular architecture</strong> enables independent service updates</li>
                <li><strong>Standardized API documentation</strong> updated automatically</li>
                <li>Monitoring dashboards <strong>track all critical metrics</strong></li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default EcommercePersonalizationPlatform;
