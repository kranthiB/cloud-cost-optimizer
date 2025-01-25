import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const smartCityArchitecture = [
  {
    title: 'City Sensor Network Layer',
    icon: '🌍',
    color: '#E8F0FE',
    services: [
      { name: 'Environmental Monitoring', details: ['Air Quality (5min intervals)', 'Weather Stations (real-time)', 'Noise Levels (continuous)'] },
      { name: 'Traffic Monitoring', details: ['Traffic Flow (real-time)', 'Signal Status (100ms)', 'Parking Occupancy (1min)'] },
      { name: 'Infrastructure Sensors', details: ['Utility Networks (1min)', 'Building Systems (5min)', 'Public Transport (real-time)'] },
    ],
  },
  {
    title: 'Real-time Operations Layer',
    icon: '⚙️',
    color: '#EAF8E6',
    services: [
      { name: 'Emergency Response', details: ['Incident Detection (<1s)', 'Response Coordination (real-time)', 'Resource Dispatching (<30s)'] },
      { name: 'Traffic Management', details: ['Signal Optimization (5min)', 'Congestion Analysis (real-time)', 'Route Planning (1min update)'] },
      { name: 'Resource Optimization', details: ['Energy Management (15min)', 'Waste Collection (hourly)', 'Water Distribution (real-time)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Operational Data', details: ['Sensor Data (5PB)', 'Event Logs (2PB)', 'Service Records (1PB)'] },
      { name: 'Analytics Store', details: ['Historical Analysis (2PB)', 'Performance Metrics (500TB)', 'Prediction Models (200TB)'] },
      { name: 'City Knowledge Base', details: ['Infrastructure Maps (1PB)', 'Asset Information (500TB)', 'Service Catalogs (100TB)'] },
    ],
  },
  {
    title: 'Service Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Citizen Services', details: ['Mobile Apps (1M+ users)', 'Service Portals (real-time)', 'Information Systems (5min)'] },
      { name: 'Agency Integration', details: ['Emergency Services (real-time)', 'Municipal Departments (5min)', 'Utility Providers (15min)'] },
      { name: 'Command Center', details: ['Situation Awareness (real-time)', 'Decision Support (instant)', 'Resource Management (1min)'] },
    ],
  },
];

const SmartCityOperationsPlatform = () => {
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
          🌆📡 Smart City Operations Platform
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
              The platform enables real-time urban monitoring, predictive analytics, and smart resource management for efficient city operations.
            </Typography>

            {smartCityArchitecture.map((layer, index) => (
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
                subgraph SNL[Sensor Network Layer]
                    ES[Environmental Sensors] --> DC[Data Collection]
                    TS[Traffic Sensors] --> DC
                    IS[Infrastructure Sensors] --> DC
                    DC --> DV[Data Validation]
                end

                subgraph ROL[Real-time Operations]
                    ER[Emergency Response]
                    TM[Traffic Management]
                    RO[Resource Optimization]
                    PA[Predictive Analytics]
                end

                subgraph DML[Data Management]
                    OD[(Operational Data)]
                    AS[(Analytics Store)]
                    KB[(Knowledge Base)]
                    FS[(Feature Store)]
                end

                subgraph SIL[Service Integration]
                    CS[Citizen Services]
                    AI[Agency Integration]
                    CC[Command Center]
                    EM[Emergency Management]
                end

                %% Main Data Flows
                DV --> OD
                DV --> ER
                DV --> TM
                DV --> RO

                %% Analytics Flows
                OD --> PA
                PA --> ER
                PA --> TM
                PA --> RO

                %% Knowledge Base Flows
                OD --> KB
                AS --> KB
                KB --> CC

                %% Service Integration
                ER --> EM
                TM --> CS
                RO --> AI
                CC --> AI

                %% Historical Analysis
                OD --> AS
                PA --> AS
                AS --> FS
                FS --> PA

                %% Command & Control
                CC --> ER
                CC --> TM
                CC --> RO

                %% Public Services
                CS --> AI
                AI --> EM

                classDef sensors fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef operations fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef services fill:#E8A87C,stroke:#333
                classDef collection fill:#95DAC1,stroke:#333

                class SNL sensors
                class ROL operations
                class DML storage
                class SIL services
                class DC,DV collection
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
                      subgraph Citizens["Citizens & Community"]
                          MU[Mobile Users]
                          WU[Web Users]
                          CS[Community Services]
                      end

                      subgraph Collection["Data Collection Layer"]
                          IOT["AWS IoT Core<br/>Environmental & Traffic Sensors"]
                          GW["AWS IoT Greengrass<br/>Edge Processing"]
                          KDS["Kinesis Data Streams<br/>Real-time Data Pipeline"]
                      end

                      subgraph Processing["Processing & Analytics"]
                          EKS["Amazon EKS<br/>Microservices"]
                          EMR["EMR<br/>Big Data Processing"]
                          SAG["SageMaker<br/>ML Models"]
                      end

                      subgraph Storage["Data Storage"]
                          S3["S3<br/>Data Lake"]
                          RDS["Amazon RDS<br/>Operational Data"]
                          DDB["DynamoDB<br/>Real-time Data"]
                          OS["OpenSearch<br/>Search & Analytics"]
                      end

                      subgraph Integration["Service Integration"]
                          API["API Gateway"]
                          COG["Cognito<br/>Authentication"]
                          SNS["SNS<br/>Notifications"]
                      end

                      subgraph Emergency["Emergency Response"]
                          CW["CloudWatch<br/>Monitoring"]
                          LMB["Lambda<br/>Event Processing"]
                          SQS["SQS<br/>Message Queue"]
                      end

                      %% Citizen Interactions
                      MU & WU --> COG
                      COG --> API
                      API --> EKS

                      %% Data Collection Flow
                      IOT --> GW
                      GW --> KDS
                      KDS --> EMR
                      KDS --> LMB

                      %% Processing Flow
                      EMR --> S3
                      EMR --> SAG
                      SAG --> DDB
                      EKS --> RDS
                      EKS --> OS

                      %% Emergency Response
                      CW --> SNS
                      SNS --> SQS
                      SQS --> LMB
                      LMB --> API

                      %% Service Integration
                      API --> CS
                      SNS --> MU

                      classDef citizens fill:#e3f2fd,stroke:#2196f3
                      classDef collection fill:#e8f5e9,stroke:#4caf50
                      classDef processing fill:#fff3e0,stroke:#ff9800
                      classDef storage fill:#f3e5f5,stroke:#9c27b0
                      classDef integration fill:#fce4ec,stroke:#e91e63
                      classDef emergency fill:#ffebee,stroke:#f44336

                      class Citizens citizens
                      class Collection collection
                      class Processing processing
                      class Storage storage
                      class Integration integration
                      class Emergency emergency
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
                      subgraph Citizens["Citizens & Community"]
                          MU[Mobile Users]
                          WU[Web Users]
                          CS[Community Services]
                      end

                      subgraph Collection["Data Collection Layer"]
                          IOT["IoT Hub<br/>Sensor Management"]
                          EDGE["IoT Edge<br/>Edge Computing"]
                          EH["Event Hubs<br/>Real-time Ingestion"]
                      end

                      subgraph Processing["Processing & Analytics"]
                          AKS["AKS<br/>Container Services"]
                          STREAM["Stream Analytics<br/>Real-time Processing"]
                          ML["Azure ML<br/>Predictive Analytics"]
                      end

                      subgraph Storage["Data Storage"]
                          ADLS["Data Lake Storage<br/>Raw Data"]
                          COSMOS["Cosmos DB<br/>Operational Data"]
                          SQL["Azure SQL<br/>Structured Data"]
                      end

                      subgraph Integration["Service Integration"]
                          APIM["API Management"]
                          B2C["Azure AD B2C<br/>Identity"]
                          SB["Service Bus<br/>Messaging"]
                      end

                      subgraph Emergency["Emergency Response"]
                          FUNC["Azure Functions<br/>Event Processing"]
                          MON["Monitor<br/>Alerting"]
                          LOGIC["Logic Apps<br/>Workflow"]
                      end

                      %% Citizen Interactions
                      MU & WU --> B2C
                      B2C --> APIM
                      APIM --> AKS

                      %% Data Collection Flow
                      IOT --> EDGE
                      EDGE --> EH
                      EH --> STREAM
                      STREAM --> FUNC

                      %% Processing Flow
                      STREAM --> ADLS
                      ADLS --> ML
                      ML --> COSMOS
                      AKS --> SQL

                      %% Emergency Response
                      MON --> SB
                      SB --> FUNC
                      FUNC --> LOGIC
                      LOGIC --> APIM

                      %% Service Integration
                      APIM --> CS
                      SB --> MU

                      classDef citizens fill:#e8eaf6,stroke:#3f51b5
                      classDef collection fill:#e0f2f1,stroke:#009688
                      classDef processing fill:#fff8e1,stroke:#ffc107
                      classDef storage fill:#f3e5f5,stroke:#9c27b0
                      classDef integration fill:#fbe9e7,stroke:#ff5722
                      classDef emergency fill:#ffebee,stroke:#f44336

                      class Citizens citizens
                      class Collection collection
                      class Processing processing
                      class Storage storage
                      class Integration integration
                      class Emergency emergency
                    
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
                      subgraph Citizens["Citizens & Community"]
                          MU[Mobile Users]
                          WU[Web Users]
                          CS[Community Services]
                      end

                      subgraph Collection["Data Collection Layer"]
                          IOT["Cloud IoT Core<br/>Device Management"]
                          PUB["Pub/Sub<br/>Message Broker"]
                          DF["Dataflow<br/>Stream Processing"]
                      end

                      subgraph Processing["Processing & Analytics"]
                          GKE["GKE<br/>Container Platform"]
                          BQ["BigQuery<br/>Analytics"]
                          AI["Vertex AI<br/>ML Platform"]
                      end

                      subgraph Storage["Data Storage"]
                          GCS["Cloud Storage<br/>Data Lake"]
                          FIRE["Firestore<br/>NoSQL Data"]
                          SQL["Cloud SQL<br/>Relational Data"]
                      end

                      subgraph Integration["Service Integration"]
                          APIG["API Gateway"]
                          IAM["Identity Platform<br/>Authentication"]
                          PUB2["Pub/Sub<br/>Integration"]
                      end

                      subgraph Emergency["Emergency Response"]
                          CF["Cloud Functions<br/>Serverless"]
                          MON["Cloud Monitoring<br/>Alerting"]
                          WF["Workflows<br/>Orchestration"]
                      end

                      %% Citizen Interactions
                      MU & WU --> IAM
                      IAM --> APIG
                      APIG --> GKE

                      %% Data Collection Flow
                      IOT --> PUB
                      PUB --> DF
                      DF --> CF

                      %% Processing Flow
                      DF --> GCS
                      GCS --> BQ
                      BQ --> AI
                      AI --> FIRE
                      GKE --> SQL

                      %% Emergency Response
                      MON --> PUB2
                      PUB2 --> CF
                      CF --> WF
                      WF --> APIG

                      %% Service Integration
                      APIG --> CS
                      PUB2 --> MU

                      classDef citizens fill:#e1f5fe,stroke:#03a9f4
                      classDef collection fill:#f1f8e9,stroke:#8bc34a
                      classDef processing fill:#fffde7,stroke:#ffeb3b
                      classDef storage fill:#f3e5f5,stroke:#9c27b0
                      classDef integration fill:#fce4ec,stroke:#e91e63
                      classDef emergency fill:#ffebee,stroke:#f44336

                      class Citizens citizens
                      class Collection collection
                      class Processing processing
                      class Storage storage
                      class Integration integration
                      class Emergency emergency
                    
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
            <ComputeGraphs pipelineName="Smart City Operations Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart City Operations Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart City Operations Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Smart City Operations Platform" cloudProvider="Multi-Cloud"/>
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
                <li>Sensor data ingestion <strong>latency under 100 milliseconds</strong></li>
                <li>Real-time analytics processing <strong>within 2 seconds</strong></li>
                <li>Emergency response notification <strong>delivery under 500ms</strong></li>
                <li>API response time <strong>below 300 milliseconds</strong></li>
                <li>Mobile application <strong>load time under 3 seconds</strong></li>
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
                <li>Support minimum <strong>100,000 concurrent citizen users</strong>1</li>
                <li>Handle <strong>50,000 IoT device connections</strong>5 simultaneously</li>
                <li>Process <strong>1 million events</strong> per second</li>
                <li>Auto-scale during <strong>200% traffic surge peaks</strong></li>
                <li>Support <strong>500TB annual data</strong> growth capacity</li>
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
                <li><strong>Zero data loss</strong> during component failures</li>
                <li><strong>Recovery time objective</strong> under 30 minutes</li>
                <li>Automated failover across <strong>multiple availability zones</strong></li>
                <li><strong>Real-time data replication</strong> across geographic regions</li>
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
                <li><strong>Multi-factor authentication</strong> for administrative access</li>
                <li><strong>Automated threat detection</strong> and prevention system</li>
                <li>Regular <strong>security audits</strong> every three months</li>
                <li><strong>Compliance with GDPR</strong> and local regulations</li>
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
                <li><strong>Automated deployment</strong> with zero-downtime updates</li>
                <li>Comprehensive monitoring with <strong>95% system coverage</strong></li>
                <li><strong>Standardized API documentation</strong> with version control</li>
                <li>Microservices architecture with <strong>clear service boundaries</strong></li>
                <li>Automated testing <strong>coverage above 85% codebase</strong></li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default SmartCityOperationsPlatform;
