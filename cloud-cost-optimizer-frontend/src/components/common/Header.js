import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate } from 'react-router-dom';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const Header = ({ onMenuToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    // Add theme toggling logic here (e.g., call a context function)
  };

  return (
    <AppBar position="sticky" color="primary" elevation={3} sx={{ bgcolor: darkMode ? '#212121' : 'primary.main' }}>
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuToggle}>
          <MenuIcon />
        </IconButton>

        {/* Home Button */}
        <Tooltip title="Home">
          <IconButton color="inherit" aria-label="home" onClick={() => navigate('/')}>
            <HomeIcon />
          </IconButton>
        </Tooltip>

        {/* Pipelines Button */}
        <Tooltip title="Pipelines">
          <IconButton color="inherit" aria-label="pipelines" onClick={() => navigate('/pipelines')}>
            <AccountTreeIcon />
          </IconButton>
        </Tooltip>

        {/* Centered Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
          Cloud Cost Optimizer
        </Typography>

        {/* Theme Toggle Button */}
        <Tooltip title="Toggle Dark/Light Mode">
          <IconButton edge="end" color="inherit" onClick={handleThemeToggle}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        {/* Profile Menu */}
        <Tooltip title="Account">
          <IconButton edge="end" color="inherit" aria-label="account" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: { mt: 1.5 } }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
