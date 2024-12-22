import React, { useState, useEffect, useRef } from 'react';
import { IconButton, TextField, Box, Paper, Typography, Badge, Avatar } from '@mui/material';
import { Chat as ChatIcon, Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);

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
              backgroundColor: 'rgba(236, 241, 241, 0.1)'
            },
            '&:active': {
              backgroundColor: 'rgba(15, 4, 4, 0.2)'
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
            zIndex: 1300 
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: '1px solid #ccc',
              backgroundColor: '#3f51b5',
              color: '#fff'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#fff', color: '#3f51b5', marginRight: '10px' }}>T</Avatar>
              <Typography variant="h6">Chat with Group</Typography>
            </Box>
            <IconButton onClick={toggleChatBox} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box 
            sx={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto'
            }}>
            {messages.map((msg, index) => (
              <Typography 
                key={index} 
                sx={{
                  margin: '5px 0',
                  padding: '10px',
                  backgroundColor: '#f1f1f1',
                  borderRadius: '5px'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'top' }}>
                  <Avatar sx={{ bgcolor: '#fff', color: '#3f51b5', marginRight: '10px', width: '25px', height: '25px' }}>Y</Avatar>
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
              borderTop: '1px solid #ccc',
              backgroundColor: '#f9f9f9'
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
                backgroundColor: '#fff',
                borderRadius: '15px'
              }}
            />
            <IconButton
              onClick={handleSend}
              color='primary'
              sx={{
                flexShrink: 0
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
