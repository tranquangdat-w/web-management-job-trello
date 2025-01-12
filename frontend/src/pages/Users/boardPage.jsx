import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box, Typography, InputBase, List, ListItem, Divider, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TemplateIcon from '@mui/icons-material/ViewModule';
import SettingsIcon from '@mui/icons-material/Settings';

const BoardPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Thanh Trên Cùng (Top Bar) */}
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            TRELLO
          </Typography>
          <Box sx={{ position: 'relative', marginRight: 2 }}>
            <InputBase
              placeholder="Tìm kiếm…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                color: 'inherit',
                padding: '0 10px',
                backgroundColor: '#F4F4F4',
                borderRadius: 1,
                width: '200px',
              }}
            />
            <SearchIcon sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }} />
          </Box>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <HelpIcon />
          </IconButton>
          <IconButton color="inherit">
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider sx={{ borderBottomWidth: 2 }} />

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Thanh Bên Trái (Left Sidebar) */}
        <Box
          sx={{
            width: 250,
            backgroundColor: '#f4f5f7',
            paddingTop: 2,
            paddingLeft: 2,
            paddingRight: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <List>
            <ListItem button>
              <HomeIcon sx={{ marginRight: 1 }} />
              Trang chủ
            </ListItem>
            <ListItem button>
              <DashboardIcon sx={{ marginRight: 1 }} />
              Bảng
            </ListItem>
            <ListItem button>
              <TemplateIcon sx={{ marginRight: 1 }} />
              Mẫu
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <Typography variant="h6">Không gian làm việc Trello</Typography>
            </ListItem>
            <ListItem button>
              <DashboardIcon sx={{ marginRight: 1 }} />
              Bảng
            </ListItem>
            <ListItem button>
              <DashboardIcon sx={{ marginRight: 1 }} />
              Thành viên
            </ListItem>
            <ListItem button>
              <SettingsIcon sx={{ marginRight: 1 }} />
              Cài đặt
            </ListItem>
          </List>
        </Box>

        {/* Phần Chính (Main Content) */}
        <Box sx={{ flex: 1, padding: 3, backgroundColor: '#fff' }}>
          <Typography variant="h6" gutterBottom>
            Đã xem gần đây
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            {/* Thẻ (Card) cho các bảng hoặc không gian làm việc đã xem gần đây */}
            <Box sx={{ width: 200, height: 100, backgroundColor: '#e3f2fd', padding: 2, borderRadius: 2 }}>
              Bảng 1
            </Box>
            <Box sx={{ width: 200, height: 100, backgroundColor: '#e3f2fd', padding: 2, borderRadius: 2 }}>
              Bảng 2
            </Box>
            <Box sx={{ width: 200, height: 100, backgroundColor: '#e3f2fd', padding: 2, borderRadius: 2 }}>
              Bảng 3
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Các không gian làm việc của bạn
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Thẻ (Card) cho các không gian làm việc */}
            <Box sx={{ width: 300, height: 150, backgroundColor: '#ffecb3', padding: 2, borderRadius: 2 }}>
              Không gian làm việc 1
            </Box>
            <Box sx={{ width: 300, height: 150, backgroundColor: '#ffecb3', padding: 2, borderRadius: 2 }}>
              Không gian làm việc 2
            </Box>
            <Box sx={{ width: 300, height: 150, backgroundColor: '#ffecb3', padding: 2, borderRadius: 2 }}>
              Không gian làm việc 3
            </Box>
          </Box>
          <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
            Tạo bảng mới
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BoardPage;