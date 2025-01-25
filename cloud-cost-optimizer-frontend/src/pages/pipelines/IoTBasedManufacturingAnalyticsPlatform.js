import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const iotArchitecture = [
  {
    title: 'Edge Processing Layer',
    icon: '🔗',
    color: '#E8F0FE',
    services: [
      { name: 'Sensor Integration', details: ['Device Management (1M devices)', 'Data Collection (10K readings/sec)', 'Edge Filtering (<10ms latency)'] },
      { name: 'Edge Analytics', details: ['Real-time Processing (1ms SLA)', 'Local ML Inference (100ms)', 'Anomaly Detection (real-time)'] },
      { name: 'Edge Storage', details: ['Local Cache (1TB/device)', 'Data Buffering (24h retention)', 'Sync Management (5min cycles)'] },
    ],
  },
  {
    title: 'Core Processing Layer',
    icon: '⚙️',
    color: '#EAF8E6',
    services: [
      { name: 'Stream Processing', details: ['Data Ingestion (1GB/s)', 'Real-time Analytics (100ms)', 'Pattern Detection (5s window)'] },
      { name: 'Predictive Analytics', details: ['ML Model Training (hourly)', 'Failure Prediction (95% accuracy)', 'Performance Optimization (real-time)'] },
      { name: 'Process Optimization', details: ['Quality Control (real-time)', 'Resource Planning (15min updates)', 'Workflow Optimization (hourly)'] },
    ],
  },
  {
    title: 'Data Management Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Time Series Store', details: ['Sensor Data (2PB)', 'Performance Metrics (1PB)', 'Event History (500TB)'] },
      { name: 'Analytics Store', details: ['ML Models (100TB)', 'Analytics Results (500TB)', 'Historical Patterns (200TB)'] },
      { name: 'Operational Store', details: ['Process Parameters (100TB)', 'Quality Metrics (200TB)', 'Maintenance Records (100TB)'] },
    ],
  },
  {
    title: 'Integration Layer',
    icon: '🔗',
    color: '#FEF9E8',
    services: [
      { name: 'Enterprise Integration', details: ['ERP Integration (real-time)', 'MES Integration (5min sync)', 'SCM Integration (hourly)'] },
      { name: 'API Services', details: ['REST APIs (<100ms)', 'Real-time Events (WebSocket)', 'Batch Processing (15min)'] },
      { name: 'Visualization Services', details: ['Real-time Dashboards (1s refresh)', 'Analytics Reports (5min updates)', 'Alert Management (<1s)'] },
    ],
  },
];

const IoTBasedManufacturingAnalyticsPlatform = () => {
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
          🏭🔗 IoT-Based Manufacturing Platform
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
              The platform enables real-time data processing, predictive analytics, and seamless enterprise integration to optimize manufacturing operations.
            </Typography>

            {iotArchitecture.map((layer, index) => (
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
                subgraph EL[Edge Layer]
                    Sensors[IoT Sensors] --> EF[Edge Filtering]
                    EF --> EA[Edge Analytics]
                    EA --> ES[Edge Storage]
                    EA --> AD[Anomaly Detection]
                end

                subgraph PL[Processing Layer]
                    SP[Stream Processing]
                    PA[Predictive Analytics]
                    PO[Process Optimization]
                    ML[ML Training]
                end

                subgraph DM[Data Management]
                    TS[(Time Series Store)]
                    AS[(Analytics Store)]
                    OS[(Operational Store)]
                end

                subgraph IL[Integration Layer]
                    EI[Enterprise Integration]
                    API[API Services]
                    VS[Visualization Services]
                end

                %% Edge to Processing Flow
                ES --> SP
                AD --> SP
                SP --> PA
                SP --> PO
                
                %% Processing to Storage Flow
                PA --> AS
                PO --> OS
                SP --> TS
                ML --> AS
                
                %% ML Training Flow
                TS --> ML
                AS --> ML
                OS --> ML
                
                %% Integration Flow
                TS --> API
                AS --> API
                OS --> API
                
                API --> EI
                API --> VS
                
                %% Real-time Alerts
                AD --> VS
                PA --> VS
                PO --> VS

                classDef edge fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef process fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef integration fill:#E8A87C,stroke:#333
                classDef sensors fill:#95DAC1,stroke:#333

                class EL,PL,DM,IL edge
                class SP,PA,PO,ML,EA,AD process
                class TS,AS,OS storage
                class EI,API,VS integration
                class Sensors,EF,ES sensors
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
                    flowchart LR
                      subgraph External[External Systems]
                          Sensors[fa:fa-sensor IoT Sensors]
                          ExtApps[fa:fa-cloud External Applications]
                      end

                      subgraph AWS Cloud
                          subgraph Ingestion[Data Ingestion Layer]
                              direction TB
                              IotCore[AWS IoT Core]
                              KDS[Kinesis Data Streams]
                              MSK[Amazon MSK]
                          end
                          
                          subgraph Processing[Real-time Processing Layer]
                              direction TB
                              subgraph Stream["Stream Processing"]
                                  Lambda[AWS Lambda]
                                  KDA[Kinesis Data Analytics]
                                  EMRStream[EMR - Spark Streaming]
                              end
                              
                              subgraph Analytics["Predictive Analytics"]
                                  SAGE[SageMaker]
                                  FCST[Amazon Forecast]
                              end
                          end

                          subgraph Storage[Data Storage Layer]
                              S3Lake[(S3 Data Lake)]
                              DDB[(DynamoDB)]
                              RS[(Redshift)]
                          end

                          subgraph Optimization[Process Optimization Layer]
                              direction TB
                              IoTA[IoT Analytics]
                              StepF[Step Functions]
                              Glue[AWS Glue]
                          end

                          subgraph ML[Machine Learning Layer]
                              direction TB
                              SAGET[SageMaker Training]
                              DataBrew[Glue DataBrew]
                              EMRML[EMR ML]
                              EC2GPU[EC2 with GPUs]
                          end

                          subgraph Visualization[Visualization Layer]
                              QS[QuickSight]
                              Grafana[Managed Grafana]
                          end
                      end

                      %% External Connections
                      Sensors --> IotCore
                      ExtApps --> KDS
                      
                      %% Ingestion Layer Connections
                      IotCore --> KDS
                      IotCore --> MSK
                      
                      %% Processing Layer Connections
                      KDS --> Lambda
                      KDS --> KDA
                      MSK --> EMRStream
                      
                      %% Storage Connections
                      Lambda --> S3Lake
                      KDA --> S3Lake
                      EMRStream --> S3Lake
                      Lambda --> DDB
                      
                      %% Analytics & Optimization
                      S3Lake --> IoTA
                      IoTA --> SAGE
                      SAGE --> FCST
                      
                      %% ML Training Flow
                      S3Lake --> DataBrew
                      DataBrew --> SAGET
                      DataBrew --> EMRML
                      DataBrew --> EC2GPU
                      
                      %% Process Optimization
                      IoTA --> StepF
                      StepF --> Glue
                      
                      %% Visualization Layer
                      S3Lake --> QS
                      DDB --> QS
                      RS --> QS
                      IoTA --> Grafana

                      classDef external fill:#e6e6e6,stroke:#666,stroke-width:2px
                      classDef aws fill:#FF9900,stroke:#232F3E,color:white
                      classDef storage fill:#3F8624,stroke:#232F3E,color:white
                      classDef compute fill:#D86613,stroke:#232F3E,color:white
                      classDef analytics fill:#CC2264,stroke:#232F3E,color:white
                      classDef ml fill:#01A88D,stroke:#232F3E,color:white
                      
                      class External,Sensors,ExtApps external
                      class IotCore,KDS,MSK,Lambda,KDA,EMRStream aws
                      class S3Lake,DDB,RS storage
                      class SAGE,FCST,IoTA,StepF,Glue analytics
                      class SAGET,DataBrew,EMRML,EC2GPU ml
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
                    flowchart LR
                      subgraph External[External Systems]
                          Sensors[fa:fa-sensor IoT Sensors]
                          ExtApps[fa:fa-cloud External Applications]
                      end

                      subgraph Azure[Azure Cloud]
                          subgraph Ingestion[Data Ingestion Layer]
                              direction TB
                              IoTHub[Azure IoT Hub]
                              EventHub[Event Hubs]
                              EventHNS[Event Hubs Namespace]
                          end
                          
                          subgraph Processing[Real-time Processing Layer]
                              direction TB
                              subgraph Stream["Stream Processing"]
                                  Functions[Azure Functions]
                                  ASA[Azure Stream Analytics]
                                  Databricks[Azure Databricks Streaming]
                              end
                              
                              subgraph Analytics["Predictive Analytics"]
                                  AML[Azure Machine Learning]
                                  Synapse[Azure Synapse Analytics]
                              end
                          end

                          subgraph Storage[Data Storage Layer]
                              DataLake[(Data Lake Storage Gen2)]
                              Cosmos[(Cosmos DB)]
                              SQLDW[(Synapse SQL Pool)]
                          end

                          subgraph Optimization[Process Optimization Layer]
                              direction TB
                              StreamA[Stream Analytics Jobs]
                              LogicApp[Logic Apps]
                              ADF[Data Factory]
                          end

                          subgraph ML[Machine Learning Layer]
                              direction TB
                              AMLT[AML Training Compute]
                              DataPrep[Data Factory Data Flows]
                              DatabricksML[Databricks ML]
                              VMGPU[VM with GPUs]
                          end

                          subgraph Visualization[Visualization Layer]
                              PowerBI[Power BI]
                              Grafana[Azure Managed Grafana]
                          end
                      end

                      %% External Connections
                      Sensors --> IoTHub
                      ExtApps --> EventHub
                      
                      %% Ingestion Layer Connections
                      IoTHub --> EventHub
                      IoTHub --> EventHNS
                      
                      %% Processing Layer Connections
                      EventHub --> Functions
                      EventHub --> ASA
                      EventHNS --> Databricks
                      
                      %% Storage Connections
                      Functions --> DataLake
                      ASA --> DataLake
                      Databricks --> DataLake
                      Functions --> Cosmos
                      
                      %% Analytics & Optimization
                      DataLake --> StreamA
                      StreamA --> AML
                      AML --> Synapse
                      
                      %% ML Training Flow
                      DataLake --> DataPrep
                      DataPrep --> AMLT
                      DataPrep --> DatabricksML
                      DataPrep --> VMGPU
                      
                      %% Process Optimization
                      StreamA --> LogicApp
                      LogicApp --> ADF
                      
                      %% Visualization Layer
                      DataLake --> PowerBI
                      Cosmos --> PowerBI
                      SQLDW --> PowerBI
                      StreamA --> Grafana

                      classDef external fill:#e6e6e6,stroke:#666,stroke-width:2px
                      classDef azure fill:#0078D4,stroke:#004380,color:white
                      classDef storage fill:#3F8624,stroke:#232F3E,color:white
                      classDef compute fill:#D86613,stroke:#232F3E,color:white
                      classDef analytics fill:#CC2264,stroke:#232F3E,color:white
                      classDef ml fill:#01A88D,stroke:#232F3E,color:white
                      
                      class External,Sensors,ExtApps external
                      class IoTHub,EventHub,EventHNS,Functions,ASA,Databricks azure
                      class DataLake,Cosmos,SQLDW storage
                      class AML,Synapse,StreamA,LogicApp,ADF analytics
                      class AMLT,DataPrep,DatabricksML,VMGPU ml
                    
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
                    flowchart LR
                      subgraph External[External Systems]
                          Sensors[fa:fa-sensor IoT Sensors]
                          ExtApps[fa:fa-cloud External Applications]
                      end

                      subgraph GCP[Google Cloud Platform]
                          subgraph Ingestion[Data Ingestion Layer]
                              direction TB
                              PubsubIngest[Cloud Pub/Sub MQTT Bridge]
                              Pubsub[Cloud Pub/Sub]
                              KStreams[Kafka on GKE]
                              ApiGW[Cloud API Gateway]
                          end
                          
                          subgraph Processing[Real-time Processing Layer]
                              direction TB
                              subgraph Stream["Stream Processing"]
                                  Functions[Cloud Functions]
                                  Dataflow[Cloud Dataflow]
                                  BeamStream[Apache Beam Streaming]
                              end
                              
                              subgraph Analytics["Predictive Analytics"]
                                  VertexAI[Vertex AI]
                                  BigQuery[BigQuery ML]
                              end
                          end

                          subgraph Security[Security & Device Management]
                              direction TB
                              IAM[Cloud IAM]
                              CloudDM[Cloud Device Manager]
                              SecretMgr[Secret Manager]
                          end

                          subgraph Storage[Data Storage Layer]
                              CloudStorage[(Cloud Storage)]
                              Firestore[(Firestore)]
                              BQStorage[(BigQuery Storage)]
                          end

                          subgraph Optimization[Process Optimization Layer]
                              direction TB
                              DataflowJobs[Dataflow Jobs]
                              Workflows[Cloud Workflows]
                              Dataprep[Cloud Dataprep]
                          end

                          subgraph ML[Machine Learning Layer]
                              direction TB
                              VertexTrain[Vertex AI Training]
                              Dataproc[Cloud Dataproc]
                              MLGPU[Compute Engine GPUs]
                          end

                          subgraph Visualization[Visualization Layer]
                              Looker[Looker]
                              ManagedGrafana[Managed Grafana]
                          end
                      end

                      %% External Connections
                      Sensors --> PubsubIngest
                      Sensors --> ApiGW
                      ExtApps --> Pubsub
                      
                      %% Security Layer Connections
                      ApiGW --> IAM
                      PubsubIngest --> IAM
                      IAM --> CloudDM
                      CloudDM --> SecretMgr
                      
                      %% Ingestion Layer Connections
                      PubsubIngest --> Pubsub
                      ApiGW --> Pubsub
                      Pubsub --> KStreams
                      
                      %% Processing Layer Connections
                      Pubsub --> Functions
                      Pubsub --> Dataflow
                      KStreams --> BeamStream
                      
                      %% Storage Connections
                      Functions --> CloudStorage
                      Dataflow --> CloudStorage
                      BeamStream --> CloudStorage
                      Functions --> Firestore
                      
                      %% Analytics & Optimization
                      CloudStorage --> DataflowJobs
                      DataflowJobs --> VertexAI
                      VertexAI --> BigQuery
                      
                      %% ML Training Flow
                      CloudStorage --> Dataprep
                      Dataprep --> VertexTrain
                      Dataprep --> Dataproc
                      Dataprep --> MLGPU
                      
                      %% Process Optimization
                      DataflowJobs --> Workflows
                      Workflows --> Dataprep
                      
                      %% Visualization Layer
                      CloudStorage --> Looker
                      Firestore --> Looker
                      BQStorage --> Looker
                      DataflowJobs --> ManagedGrafana

                      classDef external fill:#e6e6e6,stroke:#666,stroke-width:2px
                      classDef gcp fill:#4285F4,stroke:#1A73E8,color:white
                      classDef storage fill:#3F8624,stroke:#232F3E,color:white
                      classDef compute fill:#D86613,stroke:#232F3E,color:white
                      classDef analytics fill:#CC2264,stroke:#232F3E,color:white
                      classDef ml fill:#01A88D,stroke:#232F3E,color:white
                      classDef security fill:#F4B400,stroke:#F4B400,color:black
                      
                      class External,Sensors,ExtApps external
                      class PubsubIngest,Pubsub,KStreams,Functions,Dataflow,BeamStream gcp
                      class CloudStorage,Firestore,BQStorage storage
                      class VertexAI,BigQuery,DataflowJobs,Workflows,Dataprep analytics
                      class VertexTrain,Dataproc,MLGPU ml
                      class IAM,CloudDM,SecretMgr,ApiGW security
                    
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
            <ComputeGraphs pipelineName="IoT-Based Manufacturing Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="IoT-Based Manufacturing Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="IoT-Based Manufacturing Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="IoT-Based Manufacturing Platform" cloudProvider="Multi-Cloud"/>
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
                <li>Process <strong>100,000 IoT messages/sec</strong> with <strong>&lt;2s latency</strong>.</li>
                <li><strong>Kinesis Data Streams</strong> scale to 2x peak loads.</li>
                <li><strong>MSK clusters</strong> support <strong>1TB/hour</strong> of incoming data.</li>
                <li><strong>Lambda</strong> functions complete processing within <strong>500ms (p95)</strong>.</li>
                <li><strong>EMR streaming</strong> ensures a max <strong>5-minute delay</strong>.</li>
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
                <li>Auto-scale to handle <strong>2x annual growth</strong> in device count.</li>
                <li><strong>EMR clusters</strong> scale dynamically from <strong>3 to 50 nodes</strong>.</li>
                <li><strong>S3 Data Lake</strong> supports <strong>5PB+ storage</strong> with efficient querying.</li>
                <li>Support <strong>50% YoY data growth</strong> with 5-year retention.</li>
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
                <li>Maintain <strong>99.95% uptime</strong> with Multi-AZ deployments.</li>
                <li><strong>RPO: 5 minutes</strong>, <strong>RTO: 30 minutes</strong> for failovers.</li>
                <li>No single point of failure, automatic failover mechanisms.</li>
                <li>Data replicated across <strong>3 Availability Zones</strong> for redundancy.</li>
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
                <li>Encrypt data at rest with <strong>AWS KMS</strong>, annual key rotation.</li>
                <li>Secure data in transit with <strong>TLS 1.3</strong>.</li>
                <li>Strict IAM policies enforce <strong>least privilege access</strong>.</li>
                <li><strong>MFA required</strong> for human access, key rotation every 90 days.</li>
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
                <li>Infrastructure as code via <strong>AWS CDK/CloudFormation</strong>.</li>
                <li>Automated deployment pipelines with <strong>rollback</strong> capabilities.</li>
                <li>Real-time monitoring via <strong>AWS X-Ray</strong> and <strong>CloudWatch Dashboards</strong>.</li>
                <li>Logs retained for <strong>90 days</strong> with real-time alerting.</li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}
export default IoTBasedManufacturingAnalyticsPlatform;

