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
            <ComputeGraphs />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default HealthcareDataExchangePlatform;
