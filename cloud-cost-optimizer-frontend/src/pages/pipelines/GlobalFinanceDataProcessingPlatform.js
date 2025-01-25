import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const financeArchitecture = [
  {
    title: 'Data Ingestion Layer',
    icon: '🔄',
    color: '#E3F2FD',
    services: [
      {
        name: 'Real-time Events',
        details: [
          'Event Processing (100K events/sec)',
          'Stream Ingestion (50ms latency)',
          'Data Validation (99.99% accuracy)'
        ]
      },
      {
        name: 'Batch Transactions',
        details: [
          'Batch Processing (1TB/hour)',
          'Data Transformation (15min windows)',
          'Quality Validation (99.999% accuracy)'
        ]
      },
      {
        name: 'Streaming Data',
        details: [
          'Real-time Streaming (50K msgs/sec)',
          'Message Processing (<100ms)',
          'Stream Analytics (real-time)'
        ]
      }
    ]
  },
  {
    title: 'Stream Processing Layer',
    icon: '⚡',
    color: '#E8F5E9',
    services: [
      {
        name: 'Complex Event Processing',
        details: [
          'Event Correlation (10ms latency)',
          'Pattern Detection (real-time)',
          'Event Enrichment (50ms SLA)'
        ]
      },
      {
        name: 'Real-time Processing',
        details: [
          'Data Processing (1M events/sec)',
          'Stream Analysis (<100ms)',
          'State Management (real-time)'
        ]
      },
      {
        name: 'Analytics Engine',
        details: [
          'Real-time Analytics (200ms)',
          'Metric Calculation (real-time)',
          'Predictive Analysis (1s updates)'
        ]
      }
    ]
  },
  {
    title: 'Core Processing Layer',
    icon: '⚙️',
    color: '#FFF3E0',
    services: [
      {
        name: 'Transaction Processing',
        details: [
          'Transaction Handling (50K TPS)',
          'State Management (real-time)',
          'Data Consistency (ACID)'
        ]
      },
      {
        name: 'Risk Management',
        details: [
          'Risk Assessment (500ms SLA)',
          'Compliance Checking (real-time)',
          'Exposure Calculation (<1s)'
        ]
      },
      {
        name: 'Portfolio Management',
        details: [
          'Position Tracking (real-time)',
          'Portfolio Updates (5min cycles)',
          'Performance Calculation (15min)'
        ]
      }
    ]
  },
  {
    title: 'Data Storage Layer',
    icon: '💾',
    color: '#F3E5F5',
    services: [
      {
        name: 'Operational Data Store',
        details: [
          'Transaction Data (5PB)',
          'Customer Records (2PB)',
          'Operational Metrics (1PB)'
        ]
      },
      {
        name: 'Data Lake',
        details: [
          'Raw Data Storage (10PB)',
          'Historical Archives (20PB)',
          'Analytics Data (5PB)'
        ]
      },
      {
        name: 'Time Series Store',
        details: [
          'Market Data (1PB)',
          'Performance Series (500TB)',
          'Analytics History (2PB)'
        ]
      }
    ]
  },
  {
    title: 'Analytics Layer',
    icon: '📊',
    color: '#FCE4EC',
    services: [
      {
        name: 'Business Analytics',
        details: [
          'Performance Analytics (15min)',
          'Business Metrics (hourly)',
          'Trend Analysis (real-time)'
        ]
      },
      {
        name: 'Predictive Analytics',
        details: [
          'ML Model Serving (<100ms)',
          'Predictive Scoring (real-time)',
          'Pattern Recognition (1s)'
        ]
      },
      {
        name: 'Risk Analytics',
        details: [
          'Risk Calculations (1min)',
          'Exposure Analysis (real-time)',
          'Compliance Reports (hourly)'
        ]
      }
    ]
  }
];

const GlobalFinanceDataProcessingPlatform = () => {
  const [expanded, setExpanded] = useState('approach'); // Default expanded to "Approach"
  const [subExpanded, setSubExpanded] = useState(null);
  const [mermaidRendered, setMermaidRendered] = useState(true);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true, // Prevent auto-loading
      theme: 'default',
      securityLevel: 'loose',
    });

    setTimeout(() => {
      mermaid.contentLoaded(); // Ensures Mermaid renders correctly
      setMermaidRendered(true); // Trigger a re-render after Mermaid initializes
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
          🌍💰 Global Finance Data Processing Platform
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
              This platform provides a unified banking ecosystem that seamlessly integrates financial data processing, analytics, and regulatory compliance.
            </Typography>

            {financeArchitecture.map((layer, index) => (
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
              flowchart LR
                subgraph IL[Data Ingestion Layer]
                    RT["Real-time Events"]
                    BT["Batch Transactions"]
                    ST["Streaming Data"]
                    TF["Third-party Feeds"]
                end

                subgraph SPL[Stream Processing Layer]
                    CEP["Complex Event Processing"]
                    RP["Real-time Processing"]
                    FDE["Fraud Detection Engine"]
                    RTE["Real-time Analytics"]
                end

                subgraph CPL[Core Processing Layer]
                    TXP["Transaction Processing"]
                    RMP["Risk Management"]
                    CIP["Customer Intelligence"]
                    PMP["Portfolio Management"]
                end

                subgraph DSL[Data Storage Layer]
                    ODS["Operational Data Store"]
                    DL["Data Lake"]
                    DW["Data Warehouse"]
                    TS["Time Series Store"]
                end

                subgraph AL[Analytics Layer]
                    BA["Business Analytics"]
                    PA["Predictive Analytics"]
                    CA["Customer Analytics"]
                    RA["Risk Analytics"]
                end

                IL --> SPL
                SPL --> CPL
                CPL --> DSL
                DSL --> AL

                %% Detailed connections within layers
                RT & BT & ST & TF --> CEP & RP
                CEP & RP --> FDE & RTE
                FDE & RTE --> TXP & RMP & CIP & PMP
                TXP & RMP & CIP & PMP --> ODS & DL & DW & TS
                ODS & DL & DW & TS --> BA & PA & CA & RA

                %% Layer Styles
                classDef ingestLayer fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
                classDef streamLayer fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
                classDef coreLayer fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
                classDef storageLayer fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
                classDef analyticsLayer fill:#fce4ec,stroke:#c2185b,stroke-width:2px

                %% Component Styles
                classDef componentStyle fill:#ffffff,stroke:#333,stroke-width:1px

                %% Apply Layer Styles
                class IL ingestLayer
                class SPL streamLayer
                class CPL coreLayer
                class DSL storageLayer
                class AL analyticsLayer

                %% Apply Component Styles
                class RT,BT,ST,TF,CEP,RP,FDE,RTE,TXP,RMP,CIP,PMP,ODS,DL,DW,TS,BA,PA,CA,RA componentStyle
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
                      subgraph DI[Data Ingestion]
                          direction TB
                          API[API Gateway]
                          KDS[Kinesis Data Streams]
                          MSK[Amazon MSK]
                          SQS[Amazon SQS]
                      end

                      subgraph SP[Stream Processing]
                          direction TB
                          KDA[Kinesis Data Analytics]
                          LMD[Lambda]
                          EMR[EMR Streaming]
                          KDF[Kinesis Data Firehose]
                      end

                      subgraph CP[Core Processing]
                          direction TB
                          ECS[ECS Fargate]
                          SG[Step Functions]
                          EC2[EC2 Auto Scaling]
                          EKS[EKS]
                      end

                      subgraph DS[Data Storage]
                          direction TB
                          S3[S3 Data Lake]
                          DDB[DynamoDB]
                          RDS[Aurora]
                          TS[Timestream]
                      end

                      subgraph AN[Analytics]
                          direction TB
                          RED[Redshift]
                          EMR2[EMR]
                          QS[QuickSight]
                          SAGE[SageMaker]
                      end

                      %% Connections
                      DI --> SP
                      SP --> CP
                      CP --> DS
                      DS --> AN

                      %% Detailed Connections
                      API & KDS & MSK & SQS --> KDA & LMD
                      KDA & LMD --> EMR & KDF
                      EMR & KDF --> ECS & SG
                      ECS & SG --> EC2 & EKS
                      EC2 & EKS --> S3 & DDB & RDS & TS
                      S3 & DDB & RDS & TS --> RED & EMR2 & QS & SAGE

                      %% Styling
                      classDef ingestionStyle fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
                      classDef streamStyle fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
                      classDef coreStyle fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
                      classDef storageStyle fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
                      classDef analyticsStyle fill:#fce4ec,stroke:#c2185b,stroke-width:2px

                      class DI ingestionStyle
                      class SP streamStyle
                      class CP coreStyle
                      class DS storageStyle
                      class AN analyticsStyle

                      %% Service styling
                      classDef awsService fill:#ffffff,stroke:#232f3e,stroke-width:1px
                      class API,KDS,MSK,SQS,KDA,LMD,EMR,KDF,ECS,SG,EC2,EKS,S3,DDB,RDS,TS,RED,EMR2,QS,SAGE awsService
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
                      subgraph DI[Data Ingestion]
                          direction TB
                          APIM[API Management]
                          EH[Event Hubs]
                          EHNS[Event Hubs Namespace]
                          SB[Service Bus]
                      end

                      subgraph SP[Stream Processing]
                          direction TB
                          ASA[Stream Analytics]
                          FUNC[Azure Functions]
                          DBR[Databricks Streaming]
                          ADF[Data Factory]
                      end

                      subgraph CP[Core Processing]
                          direction TB
                          AKS[AKS]
                          Logic[Logic Apps]
                          VMSS[VM Scale Sets]
                          ACR[Container Registry]
                      end

                      subgraph DS[Data Storage]
                          direction TB
                          ADLS[Data Lake Storage]
                          COSDB[Cosmos DB]
                          SQL[Azure SQL]
                          ATS[Time Series Insights]
                      end

                      subgraph AN[Analytics]
                          direction TB
                          SYN[Synapse Analytics]
                          DBR2[Databricks]
                          PBI[Power BI]
                          AML[Machine Learning]
                      end

                      %% Layer Connections
                      DI --> SP
                      SP --> CP
                      CP --> DS
                      DS --> AN

                      %% Detailed Service Connections
                      APIM & EH & EHNS & SB --> ASA & FUNC
                      ASA & FUNC --> DBR & ADF
                      DBR & ADF --> AKS & Logic
                      AKS & Logic --> VMSS & ACR
                      VMSS & ACR --> ADLS & COSDB & SQL & ATS
                      ADLS & COSDB & SQL & ATS --> SYN & DBR2 & PBI & AML

                      %% Layer Styling
                      classDef ingestionStyle fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
                      classDef streamStyle fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
                      classDef coreStyle fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
                      classDef storageStyle fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
                      classDef analyticsStyle fill:#fce4ec,stroke:#c2185b,stroke-width:2px

                      class DI ingestionStyle
                      class SP streamStyle
                      class CP coreStyle
                      class DS storageStyle
                      class AN analyticsStyle

                      %% Service Styling
                      classDef azureService fill:#ffffff,stroke:#0078d4,stroke-width:1px
                      class APIM,EH,EHNS,SB,ASA,FUNC,DBR,ADF,AKS,Logic,VMSS,ACR,ADLS,COSDB,SQL,ATS,SYN,DBR2,PBI,AML azureService
                    
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
                      subgraph DI[Data Ingestion]
                          direction TB
                          APIGW[Cloud Endpoints]
                          PUBSUB[Cloud Pub/Sub]
                          KAFKA[Cloud Dataflow]
                          IOT[Cloud IoT Core]
                      end

                      subgraph SP[Stream Processing]
                          direction TB
                          DF[Dataflow]
                          CF[Cloud Functions]
                          BEAM[Apache Beam]
                          PROC[Cloud DataProc]
                      end

                      subgraph CP[Core Processing]
                          direction TB
                          GKE[Google Kubernetes Engine]
                          WF[Cloud Workflows]
                          MIG[Managed Instance Groups]
                          CR[Container Registry]
                      end

                      subgraph DS[Data Storage]
                          direction TB
                          GCS[Cloud Storage]
                          FIRE[Firestore]
                          CSQL[Cloud SQL]
                          BT[BigTable]
                      end

                      subgraph AN[Analytics]
                          direction TB
                          BQ[BigQuery]
                          PROC2[DataProc]
                          LOOK[Looker]
                          AI[Vertex AI]
                      end

                      %% Layer Connections
                      DI --> SP
                      SP --> CP
                      CP --> DS
                      DS --> AN

                      %% Detailed Service Connections
                      APIGW & PUBSUB & KAFKA & IOT --> DF & CF
                      DF & CF --> BEAM & PROC
                      BEAM & PROC --> GKE & WF
                      GKE & WF --> MIG & CR
                      MIG & CR --> GCS & FIRE & CSQL & BT
                      GCS & FIRE & CSQL & BT --> BQ & PROC2 & LOOK & AI

                      %% Layer Styling
                      classDef ingestionStyle fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
                      classDef streamStyle fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
                      classDef coreStyle fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
                      classDef storageStyle fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
                      classDef analyticsStyle fill:#fce4ec,stroke:#c2185b,stroke-width:2px

                      class DI ingestionStyle
                      class SP streamStyle
                      class CP coreStyle
                      class DS storageStyle
                      class AN analyticsStyle

                      %% Service Styling
                      classDef gcpService fill:#ffffff,stroke:#4285f4,stroke-width:1px
                      class APIGW,PUBSUB,KAFKA,IOT,DF,CF,BEAM,PROC,GKE,WF,MIG,CR,GCS,FIRE,CSQL,BT,BQ,PROC2,LOOK,AI gcpService
                    
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
            <ComputeGraphs pipelineName="Global Finance Analytics Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Global Finance Analytics Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Global Finance Analytics Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Global Finance Analytics Platform" cloudProvider="Multi-Cloud"/>
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
                <li>Process <strong>50,000 financial transactions per second</strong> with latency under 50ms</li>
                <li>Maintain response time under 100ms for <strong>99th percentile of API requests</strong></li>
                <li>Complete batch processing operations within a <strong>2-hour window</strong></li>
                <li>Support real-time analytics processing with <strong>less than 200ms latency</strong></li>
                <li>Achieve database read operations <strong>under 10ms for cached queries</strong></li>
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
                <li>Support linear scaling to <strong>handle 200% annual growth</strong> in transaction volume</li>
                <li>Automatically scale to manage <strong>10,000 concurrent users</strong> per region</li>
                <li><strong>Enable seamless expansion</strong> to new geographical regions within 24 hours</li>
                <li>Handle <strong>peak loads of 3x</strong> normal transaction volume during market events</li>
                <li>Support data growth of <strong>1PB per year</strong> with consistent query performance</li>
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
                <li>Maintain <strong>99.999% system availability</strong> for critical financial operations</li>
                <li>Implement Recovery Time Objective - <strong>RTO of 15 minutes</strong> for critical services</li>
                <li>Achieve Recovery Point Objective - <strong>RPO of 30 seconds</strong> for transaction data</li>
                <li>Ensure <strong>zero data loss</strong> for committed financial transactions</li>
                <li><strong>Support active-active deployment</strong> across three availability zones</li>
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
                <li>Implement <strong>end-to-end encryption</strong> for all data in transit and at rest</li>
                <li>Enforce <strong>multi-factor authentication</strong> for all administrative access</li>
                <li>Maintain comprehensive audit logs with <strong>7-year retention period</strong></li>
                <li>Comply with <strong>PCI DSS, SOX, and GDPR</strong> requirements</li>
                <li>Perform <strong>real-time threat detection</strong> and automated response within 30 seconds</li>
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
                <li>Enable <strong>zero-downtime deployments</strong> for system updates</li>
                <li>Maintain <strong>automated deployment pipelines</strong> with rollback capabilities</li>
                <li>Implement comprehensive monitoring with <strong>90-day metric retention</strong></li>
                <li>Support <strong>automated disaster recovery</strong> testing every 30 days</li>
                <li>Provide <strong>self-healing capabilities</strong> for common system issues</li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default GlobalFinanceDataProcessingPlatform;
