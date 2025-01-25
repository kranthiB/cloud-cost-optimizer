import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mermaid from 'mermaid';
import ComputeGraphs from './analyze/ComputeGraphs'

const healthcareArchitecture = [
  {
    title: 'Data Ingestion Layer',
    icon: '🔗',
    color: '#E8F0FE',
    services: [
      { name: 'EHR Integration', details: ['HL7/FHIR Support (v4.0.1)', 'DICOM Integration (50TB/day)', 'Clinical Data (1M records/day)'] },
      { name: 'Data Validation', details: ['Schema Validation (real-time)', 'Compliance Check (<100ms)', 'Data Quality (99.99% accuracy)'] },
      { name: 'Security Preprocessing', details: ['PHI Detection (100% coverage)', 'Encryption (AES-256)', 'Access Logging (real-time)'] },
    ],
  },
  {
    title: 'Processing & Analytics Layer',
    icon: '⚙️',
    color: '#EAF8E6',
    services: [
      { name: 'Medical Imaging', details: ['Image Processing (8K resolution)', 'AI Diagnostics (95% accuracy)', 'Study Management (10TB/day)'] },
      { name: 'Clinical Analytics', details: ['Population Health (100M patients)', 'Risk Analysis (real-time)', 'Treatment Optimization (hourly)'] },
      { name: 'Research Platform', details: ['Data Anonymization (100%)', 'Cohort Analysis (daily)', 'Study Collaboration (1000+ users)'] },
    ],
  },
  {
    title: 'Data Storage Layer',
    icon: '💾',
    color: '#F4EAFB',
    services: [
      { name: 'Clinical Data Store', details: ['Patient Records (5PB)', 'Treatment Data (2PB)', 'Lab Results (1PB)'] },
      { name: 'Imaging Store', details: ['PACS Integration (10PB)', 'Radiology Studies (5PB)', 'AI Models (100TB)'] },
      { name: 'Research Data Lake', details: ['Anonymized Data (3PB)', 'Study Results (1PB)', 'Analytics Data (500TB)'] },
    ],
  },
  {
    title: 'Security & Compliance Layer',
    icon: '🔐',
    color: '#FEF9E8',
    services: [
      { name: 'Access Control', details: ['Role-Based Access (10K roles)', 'Identity Management (1M users)', 'Consent Management (real-time)'] },
      { name: 'Compliance Engine', details: ['HIPAA Monitoring (100%)', 'Audit Trails (7 years)', 'Policy Enforcement (real-time)'] },
      { name: 'Security Operations', details: ['Threat Detection (<1s)', 'Encryption Management', 'Incident Response (24/7)'] },
    ],
  },
];

const HealthcareDataExchangePlatform = () => {
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
          🏥🔄 Healthcare Data Exchange Platform
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
              The platform ensures secure data exchange, AI-driven analytics, and compliance with healthcare regulations.
            </Typography>

            {healthcareArchitecture.map((layer, index) => (
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
                subgraph IL[Ingestion Layer]
                    EHR[EHR Systems] --> DV[Data Validation]
                    PACS[PACS Systems] --> DV
                    LAB[Lab Systems] --> DV
                    DV --> PHI[PHI Detection]
                    PHI --> SEC[Security Preprocessing]
                end

                subgraph PL[Processing Layer]
                    IMG[Image Processing]
                    CLA[Clinical Analytics]
                    RES[Research Platform]
                    ANO[Anonymization Engine]
                end

                subgraph SL[Storage Layer]
                    CDS[(Clinical Data Store)]
                    IMS[(Imaging Store)]
                    RDL[(Research Data Lake)]
                end

                subgraph SCL[Security & Compliance]
                    IAM[Identity & Access]
                    AUD[Audit Logging]
                    ENC[Encryption Service]
                    COM[Compliance Monitor]
                end

                %% Ingestion Flow with Security Checks
                SEC --> |Encrypted|IAM
                IAM --> |Authorized|IMG
                IAM --> |Authorized|CLA
                IAM --> |Authorized|CDS
                
                %% Processing Flows
                IMG --> |Processed Images|IMS
                CLA --> |Analytics Results|CDS
                
                %% Research Flow
                CDS --> ANO
                IMS --> ANO
                ANO --> RDL
                RDL --> RES
                
                %% Security & Compliance Flows
                IAM --> |Access Logs|AUD
                ENC -.-> |Encryption Keys|SEC
                COM -.-> |Compliance Check|DV
                COM -.-> |Compliance Check|ANO
                AUD --> |Audit Trail|COM

                classDef ingestion fill:#f0f0f0,stroke:#333,stroke-width:2px
                classDef processing fill:#d4f1f4,stroke:#333
                classDef storage fill:#ffed99,stroke:#333
                classDef security fill:#E8A87C,stroke:#333
                classDef systems fill:#95DAC1,stroke:#333

                class IL,PL,SL,SCL ingestion
                class IMG,CLA,RES,ANO processing
                class CDS,IMS,RDL storage
                class IAM,AUD,ENC,COM security
                class EHR,PACS,LAB systems
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
                      subgraph UI[User Interface Layer]
                          HP[Healthcare Portal]
                          MA[Mobile App]
                          WA[Web Application]
                      end

                      subgraph IL[Ingestion Layer]
                          ALB[Application Load Balancer]
                          API[API Gateway]
                          ECS[ECS Fargate Containers]
                          KIN[Kinesis Data Streams]
                      end

                      subgraph PL[Processing Layer]
                          LAM[Lambda Functions]
                          EMR[EMR for Analytics]
                          SG[SageMaker for ML]
                          COMP[Comprehend Medical]
                      end

                      subgraph SL[Storage Layer]
                          S3[(S3 Data Lake)]
                          DDB[(DynamoDB)]
                          RDS[(Aurora PostgreSQL)]
                      end

                      subgraph SEC[Security Layer]
                          COG[Cognito]
                          WAF[AWS WAF]
                          KMS[KMS]
                          SM[Secrets Manager]
                      end

                      %% User Flow
                      HP --> ALB
                      MA --> API
                      WA --> ALB

                      %% Ingestion Flow
                      ALB --> ECS
                      API --> KIN
                      ECS --> KIN
                      
                      %% Processing Flow
                      KIN --> LAM
                      LAM --> EMR
                      LAM --> SG
                      LAM --> COMP
                      
                      %% Storage Flow
                      LAM --> S3
                      LAM --> DDB
                      EMR --> RDS
                      
                      %% Security Flow
                      COG --> HP
                      COG --> MA
                      COG --> WA
                      WAF --> ALB
                      WAF --> API
                      KMS --> S3
                      KMS --> DDB
                      SM -.-> ECS

                      classDef ui fill:#B8E6F1,stroke:#333
                      classDef ingestion fill:#D4F1F4,stroke:#333
                      classDef processing fill:#95DAC1,stroke:#333
                      classDef storage fill:#FFED99,stroke:#333
                      classDef security fill:#E8A87C,stroke:#333

                      class UI,HP,MA,WA ui
                      class IL,ALB,API,ECS,KIN ingestion
                      class PL,LAM,EMR,SG,COMP processing
                      class SL,S3,DDB,RDS storage
                      class SEC,COG,WAF,KMS,SM security
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
                      subgraph UI[User Interface Layer]
                          HP[Healthcare Portal]
                          MA[Mobile App]
                          WA[Web App]
                      end

                      subgraph IL[Ingestion Layer]
                          AFD[Front Door]
                          APIM[API Management]
                          ACI[Container Instances]
                          EH[Event Hubs]
                      end

                      subgraph PL[Processing Layer]
                          AF[Azure Functions]
                          ADB[Databricks]
                          AML[Machine Learning]
                          TEXT[Text Analytics for Health]
                      end

                      subgraph SL[Storage Layer]
                          ADLS[(Data Lake Storage)]
                          COSMOS[(Cosmos DB)]
                          APS[(Azure PostgreSQL)]
                      end

                      subgraph SEC[Security Layer]
                          AAD[Azure AD B2C]
                          FW[Azure Firewall]
                          AKV[Key Vault]
                          ASM[App Configuration]
                      end

                      %% User Flow
                      HP --> AFD
                      MA --> APIM
                      WA --> AFD

                      %% Ingestion Flow
                      AFD --> ACI
                      APIM --> EH
                      ACI --> EH
                      
                      %% Processing Flow
                      EH --> AF
                      AF --> ADB
                      AF --> AML
                      AF --> TEXT
                      
                      %% Storage Flow
                      AF --> ADLS
                      AF --> COSMOS
                      ADB --> APS
                      
                      %% Security Flow
                      AAD --> HP
                      AAD --> MA
                      AAD --> WA
                      FW --> AFD
                      FW --> APIM
                      AKV --> ADLS
                      AKV --> COSMOS
                      ASM -.-> ACI

                      classDef ui fill:#CCE5FF,stroke:#333
                      classDef ingestion fill:#E6F3FF,stroke:#333
                      classDef processing fill:#99D6FF,stroke:#333
                      classDef storage fill:#FFE6CC,stroke:#333
                      classDef security fill:#FFB366,stroke:#333

                      class UI,HP,MA,WA ui
                      class IL,AFD,APIM,ACI,EH ingestion
                      class PL,AF,ADB,AML,TEXT processing
                      class SL,ADLS,COSMOS,APS storage
                      class SEC,AAD,FW,AKV,ASM security
                    
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
                      subgraph UI[User Interface Layer]
                          HP[Healthcare Portal]
                          MA[Mobile App]
                          WA[Web App]
                      end

                      subgraph IL[Ingestion Layer]
                          GCLB[Cloud Load Balancing]
                          APIGW[API Gateway]
                          GKE[GKE Containers]
                          PUB[Pub/Sub]
                      end

                      subgraph PL[Processing Layer]
                          CF[Cloud Functions]
                          BQ[BigQuery]
                          AIPL[Vertex AI]
                          HCA[Healthcare API]
                      end

                      subgraph SL[Storage Layer]
                          GCS[(Cloud Storage)]
                          FDB[(Firestore)]
                          SQL[(Cloud SQL)]
                      end

                      subgraph SEC[Security Layer]
                          IAP[Identity-Aware Proxy]
                          ARMOR[Cloud Armor]
                          KMS[Cloud KMS]
                          SM[Secret Manager]
                      end

                      %% User Flow
                      HP --> GCLB
                      MA --> APIGW
                      WA --> GCLB

                      %% Ingestion Flow
                      GCLB --> GKE
                      APIGW --> PUB
                      GKE --> PUB
                      
                      %% Processing Flow
                      PUB --> CF
                      CF --> BQ
                      CF --> AIPL
                      CF --> HCA
                      
                      %% Storage Flow
                      CF --> GCS
                      CF --> FDB
                      BQ --> SQL
                      
                      %% Security Flow
                      IAP --> HP
                      IAP --> MA
                      IAP --> WA
                      ARMOR --> GCLB
                      ARMOR --> APIGW
                      KMS --> GCS
                      KMS --> FDB
                      SM -.-> GKE

                      classDef ui fill:#E6F3FF,stroke:#333
                      classDef ingestion fill:#B3E6CC,stroke:#333
                      classDef processing fill:#99C2FF,stroke:#333
                      classDef storage fill:#FFE6B3,stroke:#333
                      classDef security fill:#FFB380,stroke:#333

                      class UI,HP,MA,WA ui
                      class IL,GCLB,APIGW,GKE,PUB ingestion
                      class PL,CF,BQ,AIPL,HCA processing
                      class SL,GCS,FDB,SQL storage
                      class SEC,IAP,ARMOR,KMS,SM security
                    
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
            <ComputeGraphs pipelineName="Healthcare Data Exchange Platform" cloudProvider="AWS"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Healthcare Data Exchange Platform" cloudProvider="Azure"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Healthcare Data Exchange Platform" cloudProvider="GCP"/>
          </Paper>
          <Paper sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <ComputeGraphs pipelineName="Healthcare Data Exchange Platform" cloudProvider="Multi-Cloud"/>
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
                <li>Data ingestion <strong>latency under 500 milliseconds</strong></li>
                <li>API response time <strong>within 2 seconds</strong></li>
                <li>Image processing completion <strong>under 30 seconds</strong></li>
                <li><strong>Analytics queries</strong> response under 5 seconds</li>
                <li><strong>Real-time streaming processing</strong> within 3 seconds</li>
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
                <li>Support <strong>10,000 concurrent user connections</strong></li>
                <li><strong>Handle 1TB</strong> daily data ingestion</li>
                <li><strong>Auto-scale during peak</strong> usage periods</li>
                <li>Process <strong>million daily healthcare transactions</strong>m</li>
                <li>Support <strong>50% annual data growth</strong> rate</li>
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
                <li>System availability of <strong>99.99% uptime</strong></li>
                <li><strong>ero data loss</strong>Z during failover</li>
                <li><strong>Cross-region disaster recovery</strong> within minutes</li>
                <li>Automated <strong>backup every four hours</strong>b</li>
                <li><strong>Self-healing capability</strong> for component failures</li>
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
                <li><strong>End-to-end encryption</strong> for all data</li>
                <li><strong>Multi-factor authentication</strong> for all access</li>
                <li>Automated <strong>compliance monitoring and reporting</strong></li>
                <li><strong>Real-time threat detection</strong> and response</li>
                <li>Complete <strong>audit trail</strong> for all actions</li>
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
                <li><strong>Automated deployment</strong> with zero downtime</li>
                <li><strong>Microservices architecture</strong> for independent scaling</li>
                <li>Comprehensive monitoring with <strong>automated alerts</strong></li>
                <li><strong>Infrastructure as Code</strong> for all components</li>
                <li><strong>Standardized logging</strong> across all services</li>
              </ul>
            </Box>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default HealthcareDataExchangePlatform;
