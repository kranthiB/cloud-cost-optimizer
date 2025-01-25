import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const mediaArchitecture = [
  {
    title: 'Content Management Layer',
    icon: '🎬',
    color: '#E8F0FE',
    services: [
      { name: 'Ingestion Pipeline', details: ['Content Upload (50TB/day)', 'Quality Validation (real-time)', 'Metadata Extraction (auto)'] },
      { name: 'Transcoding Farm', details: ['Multi-format Encoding (8K)', 'Multi-bitrate Outputs (20)', 'DRM Integration (real-time)'] },
      { name: 'Content Processing', details: ['Scene Detection (ML)', 'Content Tagging (auto)', 'Subtitle Processing (100 langs)'] },
    ],
  },
  {
    title: 'Streaming Service Layer',
    icon: '📡',
    color: '#EAF8E6',
    services: [
      { name: 'Streaming Engine', details: ['Adaptive Bitrate (<100ms)', 'Multi-protocol Support (all)', 'Quality Monitoring (real-time)'] },
      { name: 'CDN Management', details: ['Global Edge Network (200+)', 'Cache Optimization (95% hit)', 'Load Balancing (automatic)'] },
      { name: 'Session Management', details: ['User Authentication (10ms)', 'DRM License (instant)', 'Quality Metrics (real-time)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Content Store', details: ['Master Content (50PB)', 'Encoded Variants (30PB)', 'Metadata Store (5PB)'] },
      { name: 'User Data Store', details: ['Profiles (500M+)', 'Viewing History (10PB)', 'Preferences (2PB)'] },
      { name: 'Analytics Store', details: ['Streaming Analytics (5PB)', 'Performance Data (2PB)', 'ML Features (1PB)'] },
    ],
  },
  {
    title: 'Intelligence Layer',
    icon: '🤖',
    color: '#FEF9E8',
    services: [
      { name: 'Recommendation Engine', details: ['Content Matching (50ms)', 'Personalization (real-time)', 'Trend Analysis (hourly)'] },
      { name: 'Quality Engine', details: ['Experience Monitoring', 'Network Analysis (live)', 'Performance Optimization'] },
      { name: 'Content Intelligence', details: ['Popularity Prediction', 'Content Analysis (ML)', 'Engagement Analytics'] },
    ],
  },
];

const GlobalMediaAnalyticsPlatform = () => {
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
          📡🌎 Global Media Streaming Platform
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
              The platform enhances media streaming with AI-driven content management, intelligent recommendations, and real-time user insights.
            </Typography>

            {mediaArchitecture.map((layer, index) => (
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
                subgraph CML[Content Management]
                    CI[Content Ingestion] --> QV[Quality Validation]
                    QV --> TF[Transcoding Farm]
                    TF --> CP[Content Processing]
                    CP --> DRM[DRM Encryption]
                end

                subgraph SSL[Streaming Service]
                    SE[Streaming Engine]
                    CDN[CDN Management]
                    SM[Session Management]
                    QE[Quality Engine]
                end

                subgraph DML[Data Management]
                    CS[(Content Store)]
                    US[(User Store)]
                    AS[(Analytics Store)]
                    MS[(Metadata Store)]
                end

                subgraph IL[Intelligence Layer]
                    RE[Recommendation Engine]
                    PA[Performance Analytics]
                    CA[Content Analytics]
                    ML[ML Models]
                end

                %% Content Flow
                DRM --> CS
                CS --> CDN
                CDN --> SE
                SE --> SM

                %% User Flow
                SM --> US
                US --> RE
                RE --> SE

                %% Analytics Flow
                SE --> AS
                AS --> PA
                PA --> QE
                QE --> SE

                %% Intelligence Flow
                AS --> ML
                ML --> RE
                ML --> CA
                CA --> RE

                %% Metadata Flow
                CP --> MS
                MS --> RE
                MS --> CA

                classDef content fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef streaming fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef intelligence fill:#E8A87C,stroke:#333
                classDef processing fill:#95DAC1,stroke:#333

                class CML content
                class SSL streaming
                class DML storage
                class IL intelligence
                class CI,QV,TF,CP processing
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
                      subgraph CML[Content Management Layer]
                          S3I[S3 Input Bucket]
                          MPC[MediaConvert]
                          ETC[Elastic Transcoder]
                          Lambda1[Lambda Functions]
                          SQS1[SQS Queue]
                      end

                      subgraph SSL[Streaming Service Layer]
                          CF[CloudFront]
                          ELB[Application Load Balancer]
                          ECS[ECS Fargate Cluster]
                          AutoScale[Auto Scaling Group]
                          ElCache[ElastiCache Redis]
                      end

                      subgraph DML[Data Management Layer]
                          S3C[S3 Content Bucket]
                          DDB1[DynamoDB Users]
                          DDB2[DynamoDB Analytics]
                          RDS[RDS Aurora]
                      end

                      subgraph IL[Intelligence Layer]
                          EMR[EMR Cluster]
                          SageMaker[SageMaker]
                          Kinesis[Kinesis Data Stream]
                          OpenSearch[OpenSearch Service]
                      end

                      %% Content Flow
                      S3I --> MPC
                      MPC --> ETC
                      ETC --> Lambda1
                      Lambda1 --> S3C
                      S3C --> CF

                      %% Streaming Flow
                      CF --> ELB
                      ELB --> ECS
                      ECS --> ElCache
                      AutoScale --> ECS

                      %% Data Flow
                      ECS --> DDB1
                      DDB1 --> SageMaker
                      SageMaker --> ElCache

                      %% Analytics Flow
                      ECS --> Kinesis
                      Kinesis --> EMR
                      EMR --> OpenSearch
                      OpenSearch --> SageMaker

                      %% Metadata Flow
                      Lambda1 --> RDS
                      RDS --> SageMaker
                      RDS --> OpenSearch

                      %% Additional AWS Services
                      WAF[WAF]
                      SG[Security Groups]
                      Route53[Route 53]
                      CloudWatch[CloudWatch]
                      SNS[SNS]

                      Route53 --> CF
                      WAF --> CF
                      CloudWatch --> SNS
                      SG --> ECS

                      classDef aws fill:#FF9900,stroke:#232F3E,color:black
                      classDef security fill:#7AA116,stroke:#232F3E,color:black
                      classDef monitoring fill:#BC6C25,stroke:#232F3E,color:black

                      class S3I,S3C,MPC,ETC,Lambda1,SQS1,CF,ELB,ECS,AutoScale,ElCache,DDB1,DDB2,RDS,EMR,SageMaker,Kinesis,OpenSearch aws
                      class WAF,SG security
                      class CloudWatch,SNS monitoring
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
                      subgraph CML[Content Management Layer]
                          Blob1[Blob Storage Input]
                          ME[Media Encoder]
                          MES[Media Services]
                          AF[Azure Functions]
                          SB[Service Bus]
                      end

                      subgraph SSL[Streaming Service Layer]
                          CDN[Azure CDN]
                          APIM[API Management]
                          AKS[AKS Cluster]
                          VMSS[VM Scale Set]
                          Redis[Azure Cache for Redis]
                      end

                      subgraph DML[Data Management Layer]
                          Blob2[Blob Storage Content]
                          Cosmos1[Cosmos DB Users]
                          Cosmos2[Cosmos DB Analytics]
                          SQL[Azure SQL DB]
                      end

                      subgraph IL[Intelligence Layer]
                          Databricks[Azure Databricks]
                          AML[Azure ML Service]
                          EventHub[Event Hubs]
                          Search[Cognitive Search]
                      end

                      %% Content Flow
                      Blob1 --> ME
                      ME --> MES
                      MES --> AF
                      AF --> Blob2
                      Blob2 --> CDN

                      %% Streaming Flow
                      CDN --> APIM
                      APIM --> AKS
                      AKS --> Redis
                      VMSS --> AKS

                      %% Data Flow
                      AKS --> Cosmos1
                      Cosmos1 --> AML
                      AML --> Redis

                      %% Analytics Flow
                      AKS --> EventHub
                      EventHub --> Databricks
                      Databricks --> Search
                      Search --> AML

                      %% Metadata Flow
                      AF --> SQL
                      SQL --> AML
                      SQL --> Search

                      %% Additional Azure Services
                      FD[Front Door]
                      NSG[Network Security Groups]
                      DNS[Azure DNS]
                      Monitor[Azure Monitor]
                      AppIns[Application Insights]

                      DNS --> FD
                      FD --> CDN
                      Monitor --> AppIns
                      NSG --> AKS

                      classDef azure fill:#0078D4,stroke:#000000,color:white
                      classDef security fill:#5BB75B,stroke:#000000,color:white
                      classDef monitoring fill:#DA4F49,stroke:#000000,color:white

                      class Blob1,Blob2,ME,MES,AF,SB,CDN,APIM,AKS,VMSS,Redis,Cosmos1,Cosmos2,SQL,Databricks,AML,EventHub,Search azure
                      class FD,NSG security
                      class Monitor,AppIns monitoring
                    
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
                      subgraph CML[Content Management Layer]
                          GCS1[Cloud Storage Input]
                          Transcode[Transcoder API]
                          Media[Media Processing]
                          CF[Cloud Functions]
                          PubSub[Pub/Sub]
                      end

                      subgraph SSL[Streaming Service Layer]
                          CDN[Cloud CDN]
                          APIGW[API Gateway]
                          GKE[GKE Cluster]
                          MIG[MIG]
                          Memstore[Memorystore]
                      end

                      subgraph DML[Data Management Layer]
                          GCS2[Cloud Storage Content]
                          Fire1[Firestore Users]
                          BQ[BigQuery Analytics]
                          SQL[Cloud SQL]
                      end

                      subgraph IL[Intelligence Layer]
                          Dataproc[Dataproc]
                          Vertex[Vertex AI]
                          Dataflow[Dataflow]
                          Search[Enterprise Search]
                      end

                      %% Content Flow
                      GCS1 --> Transcode
                      Transcode --> Media
                      Media --> CF
                      CF --> GCS2
                      GCS2 --> CDN

                      %% Streaming Flow
                      CDN --> APIGW
                      APIGW --> GKE
                      GKE --> Memstore
                      MIG --> GKE

                      %% Data Flow
                      GKE --> Fire1
                      Fire1 --> Vertex
                      Vertex --> Memstore

                      %% Analytics Flow
                      GKE --> Dataflow
                      Dataflow --> Dataproc
                      Dataproc --> Search
                      Search --> Vertex

                      %% Metadata Flow
                      CF --> SQL
                      SQL --> Vertex
                      SQL --> Search

                      %% Additional GCP Services
                      LB[Load Balancer]
                      FW[Cloud Firewall]
                      DNS[Cloud DNS]
                      Monitor[Cloud Monitoring]
                      Trace[Cloud Trace]

                      DNS --> LB
                      LB --> CDN
                      Monitor --> Trace
                      FW --> GKE

                      classDef gcp fill:#4285F4,stroke:#000000,color:white
                      classDef security fill:#34A853,stroke:#000000,color:white
                      classDef monitoring fill:#FBBC05,stroke:#000000,color:black

                      class GCS1,GCS2,Transcode,Media,CF,PubSub,CDN,APIGW,GKE,MIG,Memstore,Fire1,BQ,SQL,Dataproc,Vertex,Dataflow,Search gcp
                      class LB,FW security
                      class Monitor,Trace monitoring
                    
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
            <ComputeGraphs pipelineName="Global Media Streaming Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Global Media Streaming Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Global Media Streaming Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Global Media Streaming Platform" cloudProvider="Multi-Cloud"/>
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
                <li>Video start-up time <strong>less than 2 seconds</strong> across global regions</li>
                <li>Quality switches within <strong>500ms to prevent buffering</strong></li>
                <li>DRM processing at <strong>2x real-time speed minimum</strong></li>
                <li>Recommendations generated in <strong>100ms for seamless UX</strong></li>
                <li>Quality degradation detection within <strong>3s with auto-recovery</strong></li>
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
                <li><strong>Store 100,000+ video hours</strong> with 50% annual growth capacity</li>
                <li>Handle <strong>1M concurrent streaming sessions</strong> during peak hours</li>
                <li>Support <strong>1000 parallel transcoding jobs</strong> with auto-scaling</li>
                <li>Process <strong>10B daily user events</strong> with sub-second latency</li>
                <li>CDN capacity up to <strong>40 Tbps peak traffic</strong> globally distributed</li>
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
                <li><strong>99.99% service uptime</strong> excluding planned maintenance</li>
                <li><strong>30s recovery time</strong> for failovers with zero data loss</li>
                <li><strong>50ms cross-region data sync</strong> with consistency guaranteed</li>
                <li><strong>95% ML model accuracy</strong> during updates with fallback support</li>
                <li><strong>99.999% content quality</strong> validation before distribution</li>
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
                <li><strong>Multi-provider DRM</strong> with key rotation and vault storage</li>
                <li><strong>24-hour session token expiry</strong> with MFA support</li>
                <li>Role-based access with <strong>end-to-end encryption</strong> enforced</li>
                <li><strong>GDPR-compliant</strong> data anonymization with audit trails</li>
                <li>Quarterly <strong>security audits</strong> with penetration testing</li>
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
                <li><strong>5-minute maximum deployment downtime</strong> with rollback capability</li>
                <li><strong>90-day log retention period</strong> with automated archival</li>
                <li>Feature flags for gradual <strong>rollouts with metrics tracking</strong></li>
                <li><strong>4-hour maximum data restore</strong> time from any backup</li>
                <li>Documentation updates within <strong>24 hours of system changes</strong></li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default GlobalMediaAnalyticsPlatform;
