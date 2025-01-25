import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const smartGridArchitecture = [
  {
    title: 'Grid Data Collection Layer',
    icon: '⚡',
    color: '#E8F0FE',
    services: [
      { name: 'Smart Meter Integration', details: ['Consumption Data (15min intervals)', 'Power Quality (1min samples)', 'Load Profiles (real-time)'] },
      { name: 'Grid Sensors', details: ['Voltage Monitoring (1sec)', 'Current Measurements (1sec)', 'Frequency Data (100ms)'] },
      { name: 'Renewable Integration', details: ['Solar Production (5min)', 'Wind Generation (real-time)', 'Storage Status (1min)'] },
    ],
  },
  {
    title: 'Real-time Analytics Layer',
    icon: '📊',
    color: '#EAF8E6',
    services: [
      { name: 'Grid Analytics', details: ['Load Balancing (real-time)', 'Power Quality Analysis (1min)', 'Fault Detection (<100ms)'] },
      { name: 'Demand Analytics', details: ['Load Forecasting (15min ahead)', 'Peak Prediction (hourly)', 'Consumption Patterns (daily)'] },
      { name: 'Optimization Engine', details: ['Resource Allocation (5min)', 'Grid Stability (real-time)', 'Cost Optimization (hourly)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Time Series Store', details: ['Meter Data (10PB)', 'Grid Metrics (5PB)', 'Event History (2PB)'] },
      { name: 'Analytics Store', details: ['Consumption Patterns (2PB)', 'Prediction Models (500TB)', 'Performance Data (1PB)'] },
      { name: 'Operational Store', details: ['Grid Configuration (100TB)', 'Asset Information (200TB)', 'Maintenance Records (100TB)'] },
    ],
  },
  {
    title: 'Integration & Control Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Grid Control', details: ['Load Distribution (real-time)', 'Storage Management (1min)', 'Emergency Response (<10ms)'] },
      { name: 'External Integration', details: ['Weather Services (5min)', 'Market Data (real-time)', 'Regulatory Reporting (daily)'] },
      { name: 'Customer Services', details: ['Usage Portals (5min refresh)', 'Billing Integration (hourly)', 'Demand Response (real-time)'] },
    ],
  },
];

const SmartGridAnalyticsPlatform = () => {
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
          ⚡📊 Smart Grid Analytics Platform
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
              The platform enables real-time monitoring, demand analytics, and smart grid optimization to enhance energy distribution and grid stability.
            </Typography>

            {smartGridArchitecture.map((layer, index) => (
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
                subgraph DCL[Data Collection Layer]
                    SM[Smart Meters] --> DC[Data Collector]
                    GS[Grid Sensors] --> DC
                    RE[Renewable Sources] --> DC
                    DC --> DV[Data Validation]
                end

                subgraph RAL[Real-time Analytics]
                    GA[Grid Analytics]
                    DA[Demand Analytics]
                    OE[Optimization Engine]
                    ML[ML Models]
                end

                subgraph DML[Data Management]
                    TS[(Time Series Store)]
                    AS[(Analytics Store)]
                    OS[(Operational Store)]
                    FS[(Feature Store)]
                end

                subgraph ICL[Integration & Control]
                    GC[Grid Control]
                    EI[External Integration]
                    CS[Customer Services]
                    EM[Emergency Management]
                end

                %% Data Flow Paths
                DV --> TS
                DV --> GA
                DV --> DA

                %% Analytics Flows
                GA --> OE
                DA --> OE
                TS --> ML
                ML --> OE
                
                %% Feature Engineering
                TS --> FS
                AS --> FS
                FS --> ML

                %% Control & Integration
                OE --> GC
                GA --> EM
                DA --> CS
                EI --> DA

                %% Historical Analysis
                TS --> AS
                GA --> AS
                DA --> AS

                %% External Integrations
                EI --> OE
                CS --> DA
                GC --> EM

                classDef collection fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef analytics fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef integration fill:#E8A87C,stroke:#333
                classDef sensors fill:#95DAC1,stroke:#333

                class DCL,RAL,DML,ICL collection
                class GA,DA,OE,ML analytics
                class TS,AS,OS,FS storage
                class GC,EI,CS,EM integration
                class SM,GS,RE,DC sensors
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
                      subgraph AWS["AWS Smart Grid Implementation"]
                          subgraph Users["User Interaction Layer"]
                              CP["Customer Portal<br/>(Cognito + Amplify)"]
                              MA["Mobile App<br/>(Amplify)"]
                              DA["Desktop App<br/>(Electron + AWS SDK)"]
                          end

                          subgraph Collection["Data Collection"]
                              IGW["IoT Gateway<br/>(AWS IoT Core)"]
                              KDS["Kinesis Data Streams"]
                              KF["Kinesis Firehose"]
                          end

                          subgraph Processing["Real-time Processing"]
                              KA["Kinesis Analytics"]
                              EMR["EMR Cluster"]
                              SM["SageMaker"]
                          end

                          subgraph Storage["Data Storage"]
                              TS["Timestream DB"]
                              S3["S3 Data Lake"]
                              RDS["Aurora PostgreSQL"]
                              FM["Feature Store<br/>(SageMaker)"]
                          end

                          subgraph Integration["Integration Layer"]
                              API["API Gateway"]
                              SNS["SNS"]
                              SQS["SQS"]
                              ECS["ECS Services"]
                          end

                          %% Connections
                          CP --> API
                          MA --> API
                          DA --> API
                          
                          IGW --> KDS
                          KDS --> KF
                          KF --> TS
                          KF --> S3
                          
                          KA --> EMR
                          EMR --> SM
                          S3 --> FM
                          FM --> SM
                          
                          API --> ECS
                          ECS --> SNS
                          SNS --> SQS
                          SQS --> ECS

                          style Users fill:#E8F4F8,stroke:#333
                          style Collection fill:#D1F2EB,stroke:#333
                          style Processing fill:#D4E6F1,stroke:#333
                          style Storage fill:#FCF3CF,stroke:#333
                          style Integration fill:#F5EEF8,stroke:#333
                      end
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
                      subgraph Azure["Azure Smart Grid Implementation"]
                          subgraph AUsers["User Interaction Layer"]
                              ACP["Customer Portal<br/>(Azure AD B2C)"]
                              AMA["Mobile App<br/>(App Center)"]
                              ADA["Desktop App<br/>(Azure SDK)"]
                          end

                          subgraph ACollection["Data Collection"]
                              AIOT["IoT Hub"]
                              AEH["Event Hubs"]
                              ASA["Stream Analytics"]
                          end

                          subgraph AProcessing["Real-time Processing"]
                              ADF["Data Factory"]
                              ADB["Databricks"]
                              AML["Azure ML"]
                          end

                          subgraph AStorage["Data Storage"]
                          ADLS["Data Lake Storage"]
                              ACDB["Cosmos DB"]
                              APS["PostgreSQL"]
                              AFS["Feature Store<br/>(Azure ML)"]
                          end

                          subgraph AIntegration["Integration Layer"]
                              AAPI["API Management"]
                              ASB["Service Bus"]
                              AKS["AKS Services"]
                              AFN["Functions"]
                          end

                          %% Connections
                          ACP --> AAPI
                          AMA --> AAPI
                          ADA --> AAPI
                          
                          AIOT --> AEH
                          AEH --> ASA
                          ASA --> ADLS
                          
                          ADF --> ADB
                          ADB --> AML
                          ADLS --> AFS
                          AFS --> AML
                          
                          AAPI --> AKS
                          AKS --> ASB
                          ASB --> AFN

                          style AUsers fill:#E8F4F8,stroke:#333
                          style ACollection fill:#D1F2EB,stroke:#333
                          style AProcessing fill:#D4E6F1,stroke:#333
                          style AStorage fill:#FCF3CF,stroke:#333
                          style AIntegration fill:#F5EEF8,stroke:#333
                      end
                    
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
                      subgraph GCPCloud["GCP Smart Grid Implementation"]
                          subgraph GUsers["User Interaction Layer"]
                              Portal["Customer Portal<br/>(Firebase Auth)"]
                              GMA["Mobile App<br/>(Firebase)"]
                              GDA["Desktop App<br/>(Cloud SDK)"]
                          end

                          subgraph GCollection["Data Collection"]
                              GIOT["Cloud IoT Core"]
                              GPB["Pub/Sub"]
                              GDF["Dataflow"]
                          end

                          subgraph GProcessing["Real-time Processing"]
                              GBQ["BigQuery"]
                              GDC["Dataproc"]
                              GAI["Vertex AI"]
                          end

                          subgraph GStorage["Data Storage"]
                              GCS["Cloud Storage"]
                              GBT["Bigtable"]
                              GPS["Cloud SQL"]
                              GFS["Feature Store<br/>(Vertex AI)"]
                          end

                          subgraph GIntegration["Integration Layer"]
                              GAPI["API Gateway"]
                              GCR["Cloud Run"]
                              GKE["GKE Services"]
                              GCF["Cloud Functions"]
                          end

                          %% Connections
                          Portal --> GAPI
                          GMA --> GAPI
                          GDA --> GAPI
                          
                          GIOT --> GPB
                          GPB --> GDF
                          GDF --> GCS
                          
                          GBQ --> GDC
                          GDC --> GAI
                          GCS --> GFS
                          GFS --> GAI
                          
                          GAPI --> GKE
                          GKE --> GCR
                          GCR --> GCF

                          %% Styles
                          style GUsers fill:#E8F4F8,stroke:#333
                          style GCollection fill:#D1F2EB,stroke:#333
                          style GProcessing fill:#D4E6F1,stroke:#333
                          style GStorage fill:#FCF3CF,stroke:#333
                          style GIntegration fill:#F5EEF8,stroke:#333
                      end
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
            <ComputeGraphs pipelineName="Smart Grid Analytics Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart Grid Analytics Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart Grid Analytics Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart Grid Analytics Platform" cloudProvider="Multi-Cloud"/>
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
                <li>Data ingestion <strong>latency under 100 milliseconds</strong></li>
                <li>Real-time analytics <strong>processing within 2 seconds</strong></li>
                <li>API response time <strong>below 300 milliseconds</strong></li>
                <li>Machine learning <strong>predictions under 1 second</strong></li>
                <li>Database query execution <strong>within 500 milliseconds</strong></li>
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
                <li>Support <strong>10 million concurrent device</strong>1 connections</li>
                <li><strong>Auto-scale processing</strong> during peak demand periods</li>
                <li>Handle <strong>100,000 transactions per second</strong> throughput</li>
                <li><strong>Dynamic resource allocation</strong> across cloud services</li>
                <li><strong>Linear scaling</strong> for data storage systems</li>
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
                <li>System availability of <strong>99.999% uptime annually</strong></li>
                <li><strong>Zero data loss</strong> during service transitions</li>
                <li><strong>Automated failover</strong> within 30 seconds maximum</li>
                <li><strong>Cross-region disaster recovery</strong> capabilities enabled</li>
                <li><strong>Self-healing</strong> infrastructure with automated recovery</li>
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
                <li><strong>End-to-end encryption</strong> for all data flows</li>
                <li><strong>Multi-factor authentication</strong> for all user access</li>
                <li>Comprehensive <strong>audit logging</strong> of system activities</li>
                <li><strong>Zero-trust security</strong> model implementation required</li>
                <li>Real-time <strong>threat detection</strong> and prevention enabled</li>
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
                <li>Automated deployment with <strong>zero-downtime updates</strong></li>
                <li><strong>Comprehensive monitoring and alerting system</strong> implementation</li>
                <li><strong>Infrastructure as Code</strong> for all components</li>
                <li><strong>Standardized API versioning</strong> and documentation maintained</li>
                <li>Automated testing <strong>coverage above 90 percent</strong></li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default SmartGridAnalyticsPlatform;
