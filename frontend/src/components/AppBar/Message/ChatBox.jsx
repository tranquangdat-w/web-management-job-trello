import React, { useState, useEffect, useRef } from 'react';
import { IconButton, TextField, Box, Paper, Typography, Badge, Avatar } from '@mui/material';
import { Chat as ChatIcon, Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isOnline, setIsOnline] = useState(true);  // Thêm trạng thái trực tuyến
  const messagesEndRef = useRef(null);
  const theme = useTheme();  // Truy cập vào theme hiện tại

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
      if (!isOpen) {
        setHasNewMessage(true);
      }  
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setHasNewMessage(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box>
      <Badge
        color="secondary"
        variant="dot"
        invisible={false}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <IconButton 
          onClick={toggleChatBox} 
          sx={{
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.palette.action.hover 
            },
            '&:active': {
              backgroundColor: theme.palette.action.selected
            }
          }}
        >
          <ChatIcon />
        </IconButton>
      </Badge>
      {isOpen && (
        <Paper 
          elevation={3} 
          sx={{
            width: '350px',
            height: '470px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            zIndex: 1300,
            backgroundColor: theme.palette.background.paper
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '70%',
                      backgroundColor: isOnline ? '#31A24C' : 'gray'
                    }}
                  />
                }
              >
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.contrastText, 
                    color: theme.palette.primary.main  
                  }} 
                  src="https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg"
                />
              </Badge>
              <Typography variant="h6" sx={{marginLeft: '10px'}}>Chat with Group</Typography>
            </Box>
            <IconButton onClick={toggleChatBox} sx={{ color: theme.palette.primary.contrastText }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box 
            sx={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto',
            }}
          >
            {messages.map((msg, index) => (
              <Typography 
                key={index} 
                sx={{
                  margin: '5px 0',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    badgeContent={
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: '70%',
                          backgroundColor: isOnline ? '#31A24C' : 'gray' // Trạng thái online/offline
                        }}
                      />
                    }
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: theme.palette.primary.contrastText, 
                        color: theme.palette.primary.main,  
                        width: '25px', 
                        height: '25px' 
                      }} 
                      src="https://khoinguonsangtao.vn/wp-content/uploads/2023/01/hinh-anh-ma-cute.jpg"
                    />
                  </Badge>
                  <Box 
                    sx={{
                      marginLeft: '10px',
                      backgroundColor: theme.palette.mode === 'light' ? '#E1F5FE': theme.palette.background.paper, 
                      color: theme.palette.text.primary, 
                      borderRadius: '20px', 
                      padding: '8px 12px'
                    }}>
                    {msg}
                  </Box>
                </Box>
              </Typography>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={handleKeyPress}
              sx={{
                flex: 1,
                marginRight: '1px',
                backgroundColor: theme.palette.background.default,
                borderRadius: '15px',
              }}
            />
            <IconButton
              onClick={handleSend}
              color="primary"
              sx={{
                flexShrink: 0,
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatBox;
