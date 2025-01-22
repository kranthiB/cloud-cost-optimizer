import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, TextareaAutosize, Button, Alert } from '@mui/material';
import cloudCredentialsService from '../services/cloudCredentialsService';

const Settings = () => {
  const [credentials, setCredentials] = useState({
    id: 0,
    applicationName: 'Cloud Cost Optimizer',
    currency: 'USD',
    awsAccessKey: '',
    awsSecretKey: '',
    awsRegion: '',
    azureClientId: '',
    azureClientSecret: '',
    azureTenantId: '',
    gcpCredentialsJson: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch credentials on component mount
  useEffect(() => {
    cloudCredentialsService.getCredentials()
      .then(response => {
        if (response.data.length > 0) {
          setCredentials(response.data[0]); // Set the first record to state
        }
      })
      .catch(error => console.error('Error fetching credentials:', error));
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    let validationErrors = {};
    Object.keys(credentials).forEach(key => {
      if (key === "id") return; // Skip the "id" key
      if (!String(credentials[key] || "").trim()) { 
        console.log(key)
        validationErrors[key] = `${key.replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const getCredentials = (id) => {
    cloudCredentialsService.getCredentialsById(id)
      .then(response => setCredentials(response.data))
      .catch(error => console.error('Error fetching credentials:', error));
  }

  const saveCredentials = () => {
    cloudCredentialsService.saveCredentials(credentials)
      .then((response) => {
        setCredentials(response.data)
        setSuccessMessage('Settings saved successfully!');
        getCredentials(response.data.id)
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => console.error('Error saving settings:', error));
    
  }

  const updateCredentials = () => {
    cloudCredentialsService.updateCredentials(credentials)
      .then(() => {
        setSuccessMessage('Settings updated successfully!');
        getCredentials(credentials.id)
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => console.error('Error updating settings:', error));
  }

  const handleSave = () => {
    if (!validateFields()) return;
    if (credentials.id === 0) {
      saveCredentials()
    } else {
      updateCredentials()
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.keys(credentials).filter((key) => key !== "id" && key !== "gcpCredentialsJson").map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, ' $1').trim()}
              variant="outlined"
              name={key}
              type={/aws|azure|gcp/i.test(key) ? 'password' : 'text'} // Check for AWS, Azure, or GCP
              value={credentials[key]}
              onChange={handleChange}
              error={Boolean(errors[key])}
              helperText={errors[key] || ''}
            />
          ))}

          {/* GCP Credentials Text Area */}
          <Typography variant="subtitle1">GCP Credentials JSON</Typography>
          <TextareaAutosize
            minRows={5}
            placeholder="Paste your GCP credentials JSON here"
            name="gcpCredentialsJson"
            value={credentials.gcpCredentialsJson}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}
          />
          {errors.gcpCredentialsJson && (
            <Typography color="error">{errors.gcpCredentialsJson}</Typography>
          )}
          
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
