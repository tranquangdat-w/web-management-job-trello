import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, TextField, Typography } from '@mui/material';

const Header = () => {
    return (
        <Box
        sx={{
          display: 'flex',
          width: '100%', 
          height: '614px',
          padding: '0px 141px 0px 221px',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          backgroundImage: 'url(https://img.freepik.com/free-vector/pink-blue-swirl-gradient_78370-261.jpg?semt=ais_hybrid)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Left part - Text and Sign Up Form */}
        <Box sx={{ textAlign: 'center', maxWidth: '50%' }}>
          <Typography variant="h2" sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold', textAlign: 'left', fontSize: '48px', color: 'white'}}>
          Trello tập hợp tất cả nhiệm vụ, thành viên nhóm và công cụ của bạn lại với nhau
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif', mt: 2, fontSize: '20px', textAlign: 'left', color: 'white'}}>
          Duy trì mọi thứ ở cùng một nơi - dù cho nhóm của bạn không ở cùng nhau.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 4, }}>
            {/* Email input and button */}
            <TextField 
                label="Enter your email"
                variant="outlined"
                sx={{
                    mr: 2,
                    width: '300px',
                    borderRadius: '10px', // Bo tròn các cạnh
                    backgroundColor: 'white', // Nền trắng
                    '& .MuiInputLabel-root': {
                    color: '#090909', // Màu chữ của label
                    },
                }}
                />
            <Button 
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#0065FF', color: 'white', borderRadius: '30px', textTransform: 'none' }}
            >
              Đăng ký hoàn toàn miễn phí!
            </Button>
          </Box>
        </Box>

        {/* Right part - Image */}
        <Box sx={{ maxWidth: '50%' }}>
          <img 
            src='/images/il.png' 
            alt="Illustration"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>
    );
};

export default Header