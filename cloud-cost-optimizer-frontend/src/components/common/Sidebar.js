import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider, Typography, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';

/* Custom Colored Icons */
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // 🚗 Connected Vehicles
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // 🛒 E-Commerce
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // 💰 Finance
import MovieFilterIcon from '@mui/icons-material/MovieFilter'; // 🎬 Media Streaming
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // 🏥 Healthcare
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; // 🏭 IoT Manufacturing
import ApartmentIcon from '@mui/icons-material/Apartment'; // 🏙️ Smart City
import BoltIcon from '@mui/icons-material/Bolt'; // ⚡ Smart Grid
import ExploreIcon from '@mui/icons-material/Explore'; // 🌍 Smart Tourism

const Sidebar = ({ open, onClose, onNavigate }) => {
  const [openPipelines, setOpenPipelines] = useState(true); // Default expanded

  const handleTogglePipelines = (e) => {
    e.stopPropagation(); // Prevent triggering navigation when clicking arrow
    setOpenPipelines(!openPipelines);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon sx={{ color: '#1E88E5' }} />, route: '/', textColor: '#1565C0' }, // Blue
  ];

  const pipelineItems = [
    { text: 'Connected Vehicles', route: '/pipelines/connected-vehicle-analytics-platform', icon: <DirectionsCarIcon sx={{ color: '#FF5722' }} /> }, // Orange
    { text: 'E-Commerce Personalization', route: '/pipelines/ecommerce-personalization-platform', icon: <ShoppingCartIcon sx={{ color: '#4CAF50' }} /> }, // Green
    { text: 'Global Finance Processing', route: '/pipelines/global-finance-data-processing-platform', icon: <MonetizationOnIcon sx={{ color: '#FFD700' }} /> }, // Gold
    { text: 'Global Media Streaming', route: '/pipelines/global-media-streaming-platform', icon: <MovieFilterIcon sx={{ color: '#9C27B0' }} /> }, // Purple
    { text: 'Healthcare Data Exchange', route: '/pipelines/healthcare-data-exchange-platform', icon: <LocalHospitalIcon sx={{ color: '#E91E63' }} /> }, // Pink
    { text: 'IoT Manufacturing Analytics', route: '/pipelines/iot-manufacturing-analytics-platform', icon: <PrecisionManufacturingIcon sx={{ color: '#795548' }} /> }, // Brown
    { text: 'Smart City Operations', route: '/pipelines/smart-city-operations-platform', icon: <ApartmentIcon sx={{ color: '#3F51B5' }} /> }, // Indigo
    { text: 'Smart Grid Analytics', route: '/pipelines/smart-grid-analytics-platform', icon: <BoltIcon sx={{ color: '#FFEB3B' }} /> }, // Yellow
    { text: 'Smart Tourism Insights', route: '/pipelines/smart-tourism-platform', icon: <ExploreIcon sx={{ color: '#009688' }} /> }, // Teal
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: 280, p: 2 }}>
        
        {/* Navigation Menu */}
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => onNavigate(item.route)} sx={{ '&:hover': { bgcolor: '#E3F2FD' } }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ sx: { color: item.textColor, fontWeight: 'bold' } }} primary={item.text} />
            </ListItem>
          ))}

          {/* Pipelines Section (Expandable & Clickable) */}
          <Divider sx={{ my: 2 }} />
          <ListItem button onClick={() => onNavigate('/pipelines')}>
            <ListItemIcon><AccountTreeIcon sx={{ color: '#1976D2' }} /></ListItemIcon> {/* Deep Blue */}
            <ListItemText primaryTypographyProps={{ sx: { color: '#0D47A1', fontWeight: 'bold' } }} primary="Pipelines" />
            <IconButton onClick={handleTogglePipelines} sx={{ ml: 2 }}>
              {openPipelines ? <ExpandLess sx={{ color: '#1976D2' }} /> : <ExpandMore sx={{ color: '#1976D2' }} />}
            </IconButton>
          </ListItem>

          <Collapse in={openPipelines} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {pipelineItems.map((item, index) => (
                <ListItem 
                  button 
                  key={index} 
                  sx={{ pl: 4, '&:hover': { bgcolor: '#EDE7F6' } }} 
                  onClick={() => onNavigate(item.route)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primaryTypographyProps={{ sx: { color: '#000000', fontWeight: 'medium' } }} 
                    primary={item.text} 
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>

        {/* Push Settings to Bottom */}
        <Box sx={{ mt: 'auto' }}>
          <Divider />
          <List>
            <ListItem button onClick={() => onNavigate('/settings')} sx={{ '&:hover': { bgcolor: '#F5F5F5' } }}>
              <ListItemIcon><SettingsIcon sx={{ color: '#616161' }} /></ListItemIcon> {/* Gray */}
              <ListItemText primaryTypographyProps={{ sx: { color: '#424242', fontWeight: 'bold' } }} primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
