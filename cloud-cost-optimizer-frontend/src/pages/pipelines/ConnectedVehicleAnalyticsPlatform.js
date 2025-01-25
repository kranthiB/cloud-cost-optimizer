import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const vehicleArchitecture = [
  {
    title: 'Vehicle Data Ingestion Layer',
    icon: '🚗',
    color: '#E8F0FE',
    services: [
      { name: 'Telemetry Processing', details: ['Sensor Data (1K signals/sec/car)', 'GPS Tracking (1Hz update)', 'Diagnostic Data (100Hz)'] },
      { name: 'Event Processing', details: ['Critical Alerts (<10ms)', 'System Warnings (real-time)', 'Behavior Events (50ms)'] },
      { name: 'Data Validation', details: ['Signal Validation (real-time)', 'Data Quality (99.999%)', 'Error Correction (5ms)'] },
    ],
  },
  {
    title: 'Real-time Analytics Layer',
    icon: '📊',
    color: '#EAF8E6',
    services: [
      { name: 'Vehicle Analytics', details: ['Performance Analysis (real-time)', 'Battery/Fuel Analytics (1min)', 'Emissions Monitoring (5min)'] },
      { name: 'Driver Analytics', details: ['Behavior Analysis (real-time)', 'Safety Scoring (5min update)', 'Route Optimization (real-time)'] },
      { name: 'Predictive Analytics', details: ['Maintenance Prediction (95% accuracy)', 'Component Life Analysis (hourly)', 'Risk Assessment (real-time)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Time Series Store', details: ['Telemetry Data (20PB)', 'Performance Metrics (10PB)', 'Event History (5PB)'] },
      { name: 'Analytics Store', details: ['Driver Profiles (1PB)', 'Vehicle Models (5PB)', 'ML Features (2PB)'] },
      { name: 'Operational Store', details: ['Maintenance Records (2PB)', 'Configuration Data (1PB)', 'OTA Updates (500TB)'] },
    ],
  },
  {
    title: 'Service Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Vehicle Services', details: ['OTA Updates (100K vehicles/day)', 'Remote Diagnostics (real-time)', 'Emergency Services (instant)'] },
      { name: 'API Services', details: ['REST APIs (<50ms)', 'MQTT (real-time)', 'Streaming (WebSocket)'] },
      { name: 'Integration Services', details: ['Dealer Systems (5min sync)', 'Service Centers (real-time)', 'Insurance APIs (hourly)'] },
    ],
  },
];

const ConnectedVehicleAnalyticsPlatform = () => {
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
          🚘📊 Connected Vehicles Analytics Platform
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
              The platform ingests high-frequency vehicle telemetry data, applies real-time analytics, and integrates predictive insights with service providers.
            </Typography>

            {vehicleArchitecture.map((layer, index) => (
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
                subgraph VDI[Vehicle Data Ingestion]
                    TS[Telemetry Sensors] --> EP[Event Processor]
                    GPS[GPS Data] --> EP
                    DG[Diagnostics] --> EP
                    EP --> DV[Data Validation]
                end

                subgraph RTA[Real-time Analytics]
                    VA[Vehicle Analytics]
                    DA[Driver Analytics]
                    PA[Predictive Analytics]
                    ML[ML Models]
                end

                subgraph DM[Data Management]
                    TSS[(Time Series Store)]
                    AS[(Analytics Store)]
                    OS[(Operational Store)]
                    FS[(Feature Store)]
                end

                subgraph SI[Service Integration]
                    OTA[OTA Updates]
                    API[API Services]
                    ES[Emergency Services]
                    DS[Dealer Services]
                end

                %% Data Flow Paths
                DV --> TSS
                DV --> VA
                DV --> DA

                %% Analytics Flows
                VA --> PA
                DA --> PA
                TSS --> ML
                ML --> PA
                
                %% Feature Engineering
                TSS --> FS
                AS --> FS
                FS --> ML

                %% Service Integration
                VA --> API
                PA --> OTA
                DA --> ES
                OS --> DS

                %% Feedback Loops
                PA --> OS
                ML --> AS
                API --> EP

                classDef ingestion fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef analytics fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef services fill:#E8A87C,stroke:#333
                classDef sensors fill:#95DAC1,stroke:#333

                class VDI,RTA,DM,SI ingestion
                class VA,DA,PA,ML analytics
                class TSS,AS,OS,FS storage
                class OTA,API,ES,DS services
                class TS,GPS,DG sensors
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
                        subgraph AWS["AWS Implementation"]
                            subgraph DataCollection["Vehicle Data Collection"]
                                IoT["AWS IoT Core
                                Vehicle Connectivity"]
                                GG["AWS Greengrass
                                Edge Processing"]
                                KDS["Kinesis Data Streams
                                Real-time Ingestion"]
                            end

                            subgraph Processing["Real-time Processing"]
                                KDA["Kinesis Data Analytics
                                Stream Processing"]
                                MSK["Amazon MSK
                                Event Streaming"]
                                Lambda["AWS Lambda
                                Serverless Computing"]
                            end

                            subgraph Storage["Data Storage"]
                                TS["Timestream DB
                                Time Series Data"]
                                S3["S3
                                Data Lake"]
                                RDS["Amazon RDS
                                Operational Data"]
                                DDB["DynamoDB
                                Feature Store"]
                            end

                            subgraph Analytics["Analytics & ML"]
                                EMR["EMR
                                Big Data Processing"]
                                Sage["SageMaker
                                ML Operations"]
                                Quick["QuickSight
                                Visualization"]
                            end

                            subgraph Integration["Service Layer"]
                                API["API Gateway
                                REST/WebSocket APIs"]
                                SNS["SNS
                                Notifications"]
                                SQS["SQS
                                Message Queuing"]
                            end

                            %% Connections
                            IoT --> GG
                            GG --> KDS
                            KDS --> KDA
                            KDA --> MSK
                            MSK --> Lambda
                            Lambda --> TS
                            Lambda --> S3
                            S3 --> EMR
                            EMR --> Sage
                            Sage --> Quick
                            Lambda --> API
                            API --> SNS
                            SNS --> SQS
                            
                            %% Storage Connections
                            TS --> DDB
                            RDS --> API
                            DDB --> Sage

                            classDef collection fill:#E6F3FF,stroke:#0070C1,stroke-width:2px
                            classDef processing fill:#E1F5EA,stroke:#00A36C
                            classDef storage fill:#FCE8D6,stroke:#E97000
                            classDef analytics fill:#F0E6FF,stroke:#8C4FFF
                            classDef integration fill:#FFE6E6,stroke:#D92C34

                            class DataCollection collection
                            class Processing processing
                            class Storage storage
                            class Analytics analytics
                            class Integration integration
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
                      subgraph Azure["Azure Implementation"]
                          subgraph AzureIngestion["Vehicle Data Collection"]
                              IoTHub["IoT Hub
                              Device Gateway"]
                              Edge["IoT Edge
                              Edge Computing"]
                              EventH["Event Hubs
                              Event Streaming"]
                          end

                          subgraph AzureProcessing["Real-time Processing"]
                              Stream["Stream Analytics
                              Real-time Processing"]
                              EventGrid["Event Grid
                              Event Routing"]
                              Functions["Azure Functions
                              Serverless Computing"]
                          end

                          subgraph AzureStorage["Data Storage"]
                              ADX["Azure Data Explorer
                              Time Series"]
                              Lake["Data Lake Storage
                              Raw Data"]
                              SQL["Azure SQL
                              Operational Data"]
                              Cosmos["Cosmos DB
                              Feature Store"]
                          end

                          subgraph AzureAnalytics["Analytics & ML"]
                              Synapse["Synapse Analytics
                              Data Processing"]
                              AML["Azure ML
                              ML Operations"]
                              PBI["Power BI
                              Visualization"]
                          end

                          subgraph AzureIntegration["Service Layer"]
                              APIM["API Management
                              API Gateway"]
                              ServiceBus["Service Bus
                              Message Broker"]
                              LogicApps["Logic Apps
                              Workflow Integration"]
                          end

                          %% Connections
                          IoTHub --> Edge
                          Edge --> EventH
                          EventH --> Stream
                          Stream --> EventGrid
                          EventGrid --> Functions
                          Functions --> ADX
                          Functions --> Lake
                          Lake --> Synapse
                          Synapse --> AML
                          AML --> PBI
                          Functions --> APIM
                          APIM --> ServiceBus
                          ServiceBus --> LogicApps

                          %% Storage Connections
                          ADX --> Cosmos
                          SQL --> APIM
                          Cosmos --> AML

                          classDef azureCollection fill:#E6F3FF,stroke:#0078D4,stroke-width:2px
                          classDef azureProcessing fill:#E1F5EA,stroke:#00A36C
                          classDef azureStorage fill:#FCE8D6,stroke:#E97000
                          classDef azureAnalytics fill:#F0E6FF,stroke:#8C4FFF
                          classDef azureIntegration fill:#FFE6E6,stroke:#D92C34

                          class AzureIngestion azureCollection
                          class AzureProcessing azureProcessing
                          class AzureStorage azureStorage
                          class AzureAnalytics azureAnalytics
                          class AzureIntegration azureIntegration
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
                      subgraph GCP["Google Cloud Platform Implementation"]
                          subgraph GCPIngestion["Vehicle Data Collection"]
                              MQTT["Cloud MQTT Bridge
                              Device Connectivity"]
                              APX["Apigee API Platform
                              Device Management"]
                              Edge["Edge TPU
                              Edge Processing"]
                              Pub["Cloud Pub/Sub
                              Event Streaming"]
                          end

                          subgraph GCPProcessing["Real-time Processing"]
                              Dataflow["Dataflow
                              Stream Processing"]
                              Functions["Cloud Functions
                              Event Processing"]
                              Run["Cloud Run
                              Containerized Services"]
                          end

                          subgraph GCPStorage["Data Storage"]
                              BQ["BigQuery
                              Analytics Data"]
                              GCS["Cloud Storage
                              Data Lake"]
                              SQL["Cloud SQL
                              Operational Data"]
                              Spanner["Cloud Spanner
                              Feature Store"]
                          end

                          subgraph GCPAnalytics["Analytics & ML"]
                              Dataproc["Dataproc
                              Data Processing"]
                              Vertex["Vertex AI
                              ML Platform"]
                              Looker["Looker
                              Business Intelligence"]
                          end

                          subgraph GCPIntegration["Service Layer"]
                              API["API Gateway
                              API Management"]
                              Tasks["Cloud Tasks
                              Task Queue"]
                              Workflows["Workflows
                              Service Orchestration"]
                              Monitor["Cloud Monitoring
                              Device Telemetry"]
                          end

                          %% Data Collection Flow
                          MQTT --> APX
                          APX --> Edge
                          Edge --> Pub
                          
                          %% Processing Flow
                          Pub --> Dataflow
                          Dataflow --> Functions
                          Functions --> Run
                          
                          %% Storage and Analytics Flow
                          Run --> BQ
                          Run --> GCS
                          GCS --> Dataproc
                          Dataproc --> Vertex
                          Vertex --> Looker
                          
                          %% Integration Flow
                          Run --> API
                          API --> Tasks
                          Tasks --> Workflows
                          APX --> Monitor
                          
                          %% Cross-functional Connections
                          BQ --> Spanner
                          SQL --> API
                          Spanner --> Vertex
                          Monitor --> Dataflow

                          classDef gcpCollection fill:#E6F3FF,stroke:#4285F4,stroke-width:2px
                          classDef gcpProcessing fill:#E1F5EA,stroke:#00A36C
                          classDef gcpStorage fill:#FCE8D6,stroke:#E97000
                          classDef gcpAnalytics fill:#F0E6FF,stroke:#8C4FFF
                          classDef gcpIntegration fill:#FFE6E6,stroke:#D92C34

                          class GCPIngestion gcpCollection
                          class GCPProcessing gcpProcessing
                          class GCPStorage gcpStorage
                          class GCPAnalytics gcpAnalytics
                          class GCPIntegration gcpIntegration
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
            <ComputeGraphs pipelineName="Connected Vehicle Analytics Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Connected Vehicle Analytics Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Connected Vehicle Analytics Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Connected Vehicle Analytics Platform" cloudProvider="Multi-Cloud"/>
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
                <li>Real-time data ingestion <strong>under 100ms latency</strong></li>
                <li>Analytics processing completed <strong>within 5-second threshold</strong></li>
                <li>API <strong>response times below 200ms</strong> consistently</li>
                <li>Sub-second <strong>data synchronization</strong> across storage systems</li>
                <li>Event processing <strong>throughput minimum 10,000 TPS</strong></li>
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
                <li>Auto-scaling <strong>supporting 100,000+ concurrent device</strong> connections</li>
                <li><strong>Dynamic resource allocation</strong> based on workload demands</li>
                <li><strong>Horizontal scaling</strong> across all processing components</li>
                <li>Storage capacity expandable to <strong>petabyte scale</strong></li>
                <li>Elastic computing resources with <strong>99.9% availability</strong></li>
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
                <li><strong>Zero data loss</strong> during system component failures</li>
                <li>Automated failover <strong>within 30-second recovery time</strong></li>
                <li><strong>Multi-region deployment</strong> for disaster recovery coverage</li>
                <li><strong>Data consistency</strong> maintained across distributed systems</li>
                <li>Service uptime guaranteed at <strong>99.99% minimum</strong></li>
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
                <li><strong>Multi-factor authentication</strong> for system access control</li>
                <li><strong>Role-based access control</strong> across all services</li>
                <li><strong>Regular security audits</strong> and vulnerability assessments</li>
                <li><strong>Compliance with automotive industry</strong> security standards</li>
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
                <li><strong>Automated deployment pipelines with zero-downtime updates</strong></li>
                <li>Comprehensive monitoring with <strong>real-time alerting capabilities</strong></li>
                <li><strong>Infrastructure as Code</strong> for all environments</li>
                <li><strong>Standardized logging</strong> across all system components</li>
                <li><strong>Version control</strong> for all configuration changes</li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default ConnectedVehicleAnalyticsPlatform;
