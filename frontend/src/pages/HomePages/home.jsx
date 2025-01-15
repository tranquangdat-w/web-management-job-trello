// src/pages/HomePages/home.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, TextField, Typography } from '@mui/material';
import Header from './Header';
import Basic_information from './Basic_information';
import Practical from './Practical';
import Page3 from './Page3';
import Helps from './Helps';
import Price from './Price';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      {/* AppBar */}
      <AppBar position="sticky" color="transparent" sx={{ boxShadow: 0, fontFamily: 'Raleway, sans-serif', backgroundColor: 'white', color: 'black'}}>
        <Toolbar>
          {/* Logo */}
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ ml: 10, mr: 5 }}>
            <img 
              src="https://cdn-public.softwarereviews.com/production/logos/offerings/4962/large/trello-logo-2023-removebg-preview_%281%29.png?1687549011" 
              alt="Trello Logo" 
              height="50" 
            />
          </IconButton>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Button color="inherit" sx={{ fontFamily: 'Raleway, sans-serif' }}>Features</Button>
            <Button color="inherit" sx={{ fontFamily: 'Raleway, sans-serif' }}>Solutions</Button>
            <Button color="inherit" sx={{ fontFamily: 'Raleway, sans-serif' }}>Plans</Button>
            <Button color="inherit" sx={{ fontFamily: 'Raleway, sans-serif' }}>Pricing</Button>
            <Button color="inherit" sx={{ fontFamily: 'Raleway, sans-serif' }}>Resources</Button>
          </Box>

          {/* Login and Get Trello buttons */}
          <Button variant="outlined" color="inherit" sx={{ mr: 3, fontFamily: 'Raleway, sans-serif' }}>
            Login
          </Button>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#0065FF', color: 'white', fontFamily: 'Raleway, sans-serif', mr: 10 }}>
            Get Trello for free
          </Button>
        </Toolbar>
      </AppBar>

      <Header />
      <Basic_information />
      <Practical />
      <Page3 />
      <Helps />
      <Price />
      <Footer />

    </div>
  )
}

export default Home;
