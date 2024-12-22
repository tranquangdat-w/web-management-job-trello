import React, { useState, useEffect, useRef } from 'react';
import { IconButton, TextField, Box, Paper, Typography, Badge, Avatar } from '@mui/material';
import { Chat as ChatIcon, Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme(); // Truy cập vào theme hiện tại

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
        color='secondary'
        variant='dot'
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
              backgroundColor: theme.palette.action.hover, // Màu hover dựa trên theme
            },
            '&:active': {
              backgroundColor: theme.palette.action.selected, // Màu active dựa trên theme
            },
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
            backgroundColor: theme.palette.background.paper, // Màu nền dựa trên theme
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: `1px solid ${theme.palette.divider}`, // Màu divider dựa trên theme
              backgroundColor: theme.palette.primary.main, // Màu nền cho header dựa trên theme
              color: theme.palette.primary.contrastText, // Màu chữ dựa trên theme
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
              sx={{ 
                bgcolor: theme.palette.primary.contrastText, 
                color: theme.palette.primary.main, marginRight: '10px' 
                }} 
              src="https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg">
              </Avatar>
              <Typography variant="h6">Chat with Group</Typography>
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
                  backgroundColor: theme.palette.background.default, // Màu nền cho tin nhắn
                  borderRadius: '5px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'top' }}>
                  <Avatar 
                    sx={{ bgcolor: theme.palette.primary.contrastText, 
                    color: theme.palette.primary.main, 
                    marginRight: '10px', 
                    width: '25px', 
                    height: '25px' 
                    }} 
                  src = "https://khoinguonsangtao.vn/wp-content/uploads/2023/01/hinh-anh-ma-cute.jpg">
                  </Avatar>
                  {msg}
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
              borderTop: `1px solid ${theme.palette.divider}`, // Màu border top dựa trên theme
              backgroundColor: theme.palette.background.paper, // Màu nền input dựa trên theme
            }}
          >
            <TextField
              variant='outlined'
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type a message...'
              onKeyPress={handleKeyPress}
              sx={{
                flex: 1,
                marginRight: '1px',
                backgroundColor: theme.palette.background.default, // Màu nền input dựa trên theme
                borderRadius: '15px',
              }}
            />
            <IconButton
              onClick={handleSend}
              color='primary'
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
