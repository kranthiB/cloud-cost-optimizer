import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Home from './pages/Home';
import Pipelines from './pages/Pipelines';
import GlobalMediaStreamingPlatform from './pages/pipelines/GlobalMediaStreamingPlatform';
import GlobalFinanceDataProcessingPlatform from './pages/pipelines/GlobalFinanceDataProcessingPlatform';
import IoTBasedManufacturingAnalyticsPlatform  from './pages/pipelines/IoTBasedManufacturingAnalyticsPlatform'; './pages/pipelines/IoTBasedManufacturingAnalyticsPlatform';
import HealthcareDataExchangePlatform from './pages/pipelines/HealthcareDataExchangePlatform';
import EcommercePersonalizationPlatform from './pages/pipelines/EcommercePersonalizationPlatform';
import ConnectedVehicleAnalyticsPlatform from './pages/pipelines/ConnectedVehicleAnalyticsPlatform';
import SmartGridAnalyticsPlatform from './pages/pipelines/SmartGridAnalyticsPlatform';
import SmartCityOperationsPlatform from './pages/pipelines/SmartCityOperationsPlatform';
import SmartTourismPlatform from './pages/pipelines/SmartTourismPlatform';
import Settings from './pages/Settings';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (path) => {
    setSidebarOpen(false);
    console.log('path - ')
    console.log(path)
    window.location.pathname = path;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header onMenuToggle={toggleSidebar} />
        <Sidebar open={isSidebarOpen} onClose={toggleSidebar} onNavigate={handleNavigate} />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/pipelines" element={<Pipelines />} />
          <Route path="/settings" element={<Settings />} />
          <Route path='/pipelines/global-media-streaming-platform' element={<GlobalMediaStreamingPlatform />} />
          <Route path='/pipelines/global-finance-data-processing-platform' element={<GlobalFinanceDataProcessingPlatform />} />
          <Route path='/pipelines/iot-manufacturing-analytics-platform' element={<IoTBasedManufacturingAnalyticsPlatform />} />
          <Route path='/pipelines/healthcare-data-exchange-platform' element={<HealthcareDataExchangePlatform />} />
          <Route path='/pipelines/ecommerce-personalization-platform' element={<EcommercePersonalizationPlatform />} />
          <Route path='/pipelines/connected-vehicle-analytics-platform' element={<ConnectedVehicleAnalyticsPlatform />} />
          <Route path='/pipelines/smart-grid-analytics-platform' element={<SmartGridAnalyticsPlatform />} />
          <Route path='/pipelines/smart-city-operations-platform' element={<SmartCityOperationsPlatform />} />
          <Route path='/pipelines/smart-tourism-platform' element={<SmartTourismPlatform />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
