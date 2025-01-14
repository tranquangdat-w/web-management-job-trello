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
            LOGO
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

      <Box sx={{ display: 'flex', flex: 1}}>
        {/* Thanh Bên Trái (Left Sidebar) */}
        <Box
          sx={{
            width: 250,
            backgroundColor: '#FFF',
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
              <Avatar
                src="https://s3-alpha-sig.figma.com/img/91ef/4b11/db9847f63a20cd71d5e43261e7e6b7c6?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z7E-~k8KP1GxiH8EhU4Cb6hEkLbbjvsXnXor3XTtoAvCYZzk~oi~waJ7dTujl-pazSzqDM7n~hL~U5n3NlF4mvdVedBS755kULsw6B0tkk5PxBJdyFK0emNag9fFDFlvTZMl5mzE7eZdJDJGEpwP0v9kl1xeo07CFnK~xck0PflXHIoBUz0BgWMmdEGGOZ95gJuMfqYImKbEUKVAbIo4UD9OxLt7B2MCliJM25GC5vTSbBhJ29uETZ-D21pv3H3upGIGytxVCbbv3W3gbHhFdkfAOA1Y7ZAnECZWYglyL5~P5YmzDhmZQvIryWQrZdhd4v1eZjMIIGCbFqUy5pO~Nw__"
                alt="Your Image"
                sx={{ marginRight: 1, width: 30, height: 30 }}
              />
              Trang chủ
            </ListItem>
            <ListItem button>
              <Avatar
                src="https://s3-alpha-sig.figma.com/img/91ef/4b11/db9847f63a20cd71d5e43261e7e6b7c6?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z7E-~k8KP1GxiH8EhU4Cb6hEkLbbjvsXnXor3XTtoAvCYZzk~oi~waJ7dTujl-pazSzqDM7n~hL~U5n3NlF4mvdVedBS755kULsw6B0tkk5PxBJdyFK0emNag9fFDFlvTZMl5mzE7eZdJDJGEpwP0v9kl1xeo07CFnK~xck0PflXHIoBUz0BgWMmdEGGOZ95gJuMfqYImKbEUKVAbIo4UD9OxLt7B2MCliJM25GC5vTSbBhJ29uETZ-D21pv3H3upGIGytxVCbbv3W3gbHhFdkfAOA1Y7ZAnECZWYglyL5~P5YmzDhmZQvIryWQrZdhd4v1eZjMIIGCbFqUy5pO~Nw__"
                alt="Your Image"
                sx={{ marginRight: 1, width: 30, height: 30 }}
              />
              Bảng
            </ListItem>
            <ListItem button>
              <Avatar
                src="https://s3-alpha-sig.figma.com/img/3e1f/6618/ba3897216e8e9470ca91b7aa64c2ad1d?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X4b9PRlbw1RT4~2skcQt8yfDN~MY6nobtFJKNXc1wNW6mC1TyWgK6Tb23AOVP2Sr1zUTkapup~JduMgunBFOZuo6-XBEQd80IN9876xKuOCP8H3yUqmV8CM8U-fOIeATDsRpHDB-RXHdvElnUk~Ibe640b31z8fG1pJzLhVVIuv89CSlg11KW~dYKkOFB1JCOQRIcHPLGY0uufU3e3EsoBJaeijCcPfB3zlheBPde1psZgl2ugPK0PcmOnYe1O2ILfoJWIHnUlmxghnhgw~v~lVPCP~UGWGT4ZnCSzHtj2KvENX6zfdhTbY9oWEixq-aKgVeI5NNNhdRM0Q562m17g__"
                alt="Your Image"
                sx={{ marginRight: 1, width: 30, height: 30 }}
              />
              Mẫu
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <Typography variant="h6">Không gian làm việc Trello</Typography>
            </ListItem>
            <ListItem button>
              <Avatar
                src="https://s3-alpha-sig.figma.com/img/91ef/4b11/db9847f63a20cd71d5e43261e7e6b7c6?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z7E-~k8KP1GxiH8EhU4Cb6hEkLbbjvsXnXor3XTtoAvCYZzk~oi~waJ7dTujl-pazSzqDM7n~hL~U5n3NlF4mvdVedBS755kULsw6B0tkk5PxBJdyFK0emNag9fFDFlvTZMl5mzE7eZdJDJGEpwP0v9kl1xeo07CFnK~xck0PflXHIoBUz0BgWMmdEGGOZ95gJuMfqYImKbEUKVAbIo4UD9OxLt7B2MCliJM25GC5vTSbBhJ29uETZ-D21pv3H3upGIGytxVCbbv3W3gbHhFdkfAOA1Y7ZAnECZWYglyL5~P5YmzDhmZQvIryWQrZdhd4v1eZjMIIGCbFqUy5pO~Nw__"
                alt="Your Image"
                sx={{ marginRight: 1, width: 30, height: 30 }}
              />
              Bảng
            </ListItem>
            <ListItem button>
              <Avatar
                src="https://s3-alpha-sig.figma.com/img/bde7/485c/442a460645f41696e5286dae6e1a241a?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h9HKV8c4sxp-C6zQpebhnUmJYykJ1XWVYKQEG-k~23hiZIpZ~oAXUqj7c49ASt1GhbE5Uyis~0jWZ7riYSiFXm8L7ofMeewstpZPgPGH2JXLmLaRpjXnCyCMJ-eGdW6C9WBU~sLJOCcZFsr7JijaXXCz27oyaRpR6ux2eCWM7lelEAuHscxYmJt-8On9PpbTif3UdVce~8QF2SgEcI-liHfzVkZ6ZM~Uc8pfAztm0f8nuJ8qu-rlEACZ-V6Ro7d5eynwh~R44lIWM8U38n6gXryj0FDAxWrJT4GB0UfUPc9lHWZD7DTT1TESDWef39-iHaoKTvjBUOQvOFhoUPzXLg__"
                alt="Your Image"
                sx={{ marginRight: 1, width: 30, height: 30 }}
              />
              Thành viên
            </ListItem>
            <ListItem button>
              <Avatar
                src="https://s3-alpha-sig.figma.com/img/e927/bbb0/a057c5623f82bf7248f7d3b8ea3dee9c?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a3F9cmZTfgKo8JZorTt2E676J-7nD~BWoEsjWNo7byg0eEjmuYAXMgYyTgTReWwcg8GVLQ16dYk-ZfuMPZ2~LhUeBjMOqltj~cJiZ~xD6UTYZBHVT-iT22jyALulFQU-uXES3uK7Yd6RefZAZkQ7Hs7n7XUPtTU5-vi7bzY-1NtRoBVpg3VwmXNnWUDRN0N6pXFLyqbD78Z3k90IoeFROMarepu82Eago2PWUbrzd3I3D9z~04PGXgzUMZWblj0IzXO0UDILEf6pI3FIpliOEA40l~k~zA~bdZ31xyCR2XWFRyqGtR3aQLR-66PxITMTuVzjI15VIGafLPY6LTwmvA__"
                alt="Your Image"
                sx={{ marginRight: 1, width: 30, height: 30 }}
              />
              Cài đặt
            </ListItem>
          </List>
        </Box>

        {/* Phần Chính (Main Content) */}
        <Box sx={{ flex: 1, padding: 3, backgroundColor: '#fff' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="https://banner2.cleanpng.com/20190516/yyq/kisspng-computer-icons-vector-graphics-stock-photography-c-laslab-ru-5cddc97b256825.8739609815580389071532.jpg"
            alt="Your Image"
            sx={{ marginRight: 1, width: 22, height: 22 }}
          />
          Đã xem gần đây
        </Typography>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            {/* Thẻ (Card) cho các bảng hoặc không gian làm việc đã xem gần đây */}
            <Button
              sx={{
                width: 263,
                height: 108,
                backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/af15/0f13/02249f62ff16a590a2a311ad1c70b4ba?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OniBV-gbrTugizbsqNf0mJxc3PCCONs9ORirKUtwZ5kQj6Q6~oLtahGbM7jHMUu1~1JnuYZUf3EtRyJ1hAmYQIw2WF1gEdk8o7y1G5RKVX8zj5t5zAZUXVUQ6YEVJJCLoeKHD46C0LwTxew67eXKdHqmloldoF5a4sYZtFLpwQRg8x8oTMgGDf1bfIuDYYXCM7iKvX9r6IAD3txHSxCzwg9CCHGInnrhnFZTuya8nJndk073nYVOWPRLagqGxg6JPMItVZ4tYyvpATaREiO3mxqRexdPGnvBO-zIk61chFycnJLkX5MyXA7Qe-0i3jPPi5SvqYyI8WN2M5RGyCNmmg__)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                borderRadius: 2,
                color: 'white', // Đảm bảo văn bản hiển thị rõ ràng trên nền ảnh
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 'bold',
                }}
              >
                Project 1
              </Typography>
            </Button>
            <Button
              sx={{
                width: 263,
                height: 108,
                backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/af15/0f13/02249f62ff16a590a2a311ad1c70b4ba?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OniBV-gbrTugizbsqNf0mJxc3PCCONs9ORirKUtwZ5kQj6Q6~oLtahGbM7jHMUu1~1JnuYZUf3EtRyJ1hAmYQIw2WF1gEdk8o7y1G5RKVX8zj5t5zAZUXVUQ6YEVJJCLoeKHD46C0LwTxew67eXKdHqmloldoF5a4sYZtFLpwQRg8x8oTMgGDf1bfIuDYYXCM7iKvX9r6IAD3txHSxCzwg9CCHGInnrhnFZTuya8nJndk073nYVOWPRLagqGxg6JPMItVZ4tYyvpATaREiO3mxqRexdPGnvBO-zIk61chFycnJLkX5MyXA7Qe-0i3jPPi5SvqYyI8WN2M5RGyCNmmg__)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                borderRadius: 2,
                color: 'white', // Đảm bảo văn bản hiển thị rõ ràng trên nền ảnh
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 'bold',
                }}
              >
                Project 2
              </Typography>
            </Button>
            <Button
              sx={{
                width: 263,
                height: 108,
                backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/af15/0f13/02249f62ff16a590a2a311ad1c70b4ba?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OniBV-gbrTugizbsqNf0mJxc3PCCONs9ORirKUtwZ5kQj6Q6~oLtahGbM7jHMUu1~1JnuYZUf3EtRyJ1hAmYQIw2WF1gEdk8o7y1G5RKVX8zj5t5zAZUXVUQ6YEVJJCLoeKHD46C0LwTxew67eXKdHqmloldoF5a4sYZtFLpwQRg8x8oTMgGDf1bfIuDYYXCM7iKvX9r6IAD3txHSxCzwg9CCHGInnrhnFZTuya8nJndk073nYVOWPRLagqGxg6JPMItVZ4tYyvpATaREiO3mxqRexdPGnvBO-zIk61chFycnJLkX5MyXA7Qe-0i3jPPi5SvqYyI8WN2M5RGyCNmmg__)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                borderRadius: 2,
                color: 'white', // Đảm bảo văn bản hiển thị rõ ràng trên nền ảnh
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 'bold',
                }}
              >
                Project 3
              </Typography>
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 , marginRight:80, marginTop: 10}}>
            <Typography variant="h6" gutterBottom>
              Các không gian làm việc của bạn
            </Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={
                  <Avatar
                    src="https://s3-alpha-sig.figma.com/img/bde7/485c/442a460645f41696e5286dae6e1a241a?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h9HKV8c4sxp-C6zQpebhnUmJYykJ1XWVYKQEG-k~23hiZIpZ~oAXUqj7c49ASt1GhbE5Uyis~0jWZ7riYSiFXm8L7ofMeewstpZPgPGH2JXLmLaRpjXnCyCMJ-eGdW6C9WBU~sLJOCcZFsr7JijaXXCz27oyaRpR6ux2eCWM7lelEAuHscxYmJt-8On9PpbTif3UdVce~8QF2SgEcI-liHfzVkZ6ZM~Uc8pfAztm0f8nuJ8qu-rlEACZ-V6Ro7d5eynwh~R44lIWM8U38n6gXryj0FDAxWrJT4GB0UfUPc9lHWZD7DTT1TESDWef39-iHaoKTvjBUOQvOFhoUPzXLg__"
                    alt="Your Image"
                    sx={{ width: 24, height: 24 }}
                  />
                }
                sx={{ color: '#000', borderColor: '#D9D9D9', backgroundColor: "#D9D9D9", marginRight: 2 , '&:hover': {
                backgroundColor: '#F0EFFF', 
              },}}
              >
                Thành viên
              </Button>
              <Button
                variant="outlined"
                startIcon={
                  <Avatar
                    src="https://s3-alpha-sig.figma.com/img/e927/bbb0/a057c5623f82bf7248f7d3b8ea3dee9c?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a3F9cmZTfgKo8JZorTt2E676J-7nD~BWoEsjWNo7byg0eEjmuYAXMgYyTgTReWwcg8GVLQ16dYk-ZfuMPZ2~LhUeBjMOqltj~cJiZ~xD6UTYZBHVT-iT22jyALulFQU-uXES3uK7Yd6RefZAZkQ7Hs7n7XUPtTU5-vi7bzY-1NtRoBVpg3VwmXNnWUDRN0N6pXFLyqbD78Z3k90IoeFROMarepu82Eago2PWUbrzd3I3D9z~04PGXgzUMZWblj0IzXO0UDILEf6pI3FIpliOEA40l~k~zA~bdZ31xyCR2XWFRyqGtR3aQLR-66PxITMTuVzjI15VIGafLPY6LTwmvA__"
                    alt="Your Image"
                    sx={{ width: 24, height: 24 }}
                  />
                }
                sx={{ color: '#000', borderColor: '#D9D9D9', backgroundColor: "#D9D9D9" , '&:hover': {
                backgroundColor: '#F0EFFF',
              },}}  
              >
                Cài đặt
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Thẻ (Card) cho các không gian làm việc */}
            <Button
              sx={{
                width: 300,
                height: 150,
                backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/af15/0f13/02249f62ff16a590a2a311ad1c70b4ba?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OniBV-gbrTugizbsqNf0mJxc3PCCONs9ORirKUtwZ5kQj6Q6~oLtahGbM7jHMUu1~1JnuYZUf3EtRyJ1hAmYQIw2WF1gEdk8o7y1G5RKVX8zj5t5zAZUXVUQ6YEVJJCLoeKHD46C0LwTxew67eXKdHqmloldoF5a4sYZtFLpwQRg8x8oTMgGDf1bfIuDYYXCM7iKvX9r6IAD3txHSxCzwg9CCHGInnrhnFZTuya8nJndk073nYVOWPRLagqGxg6JPMItVZ4tYyvpATaREiO3mxqRexdPGnvBO-zIk61chFycnJLkX5MyXA7Qe-0i3jPPi5SvqYyI8WN2M5RGyCNmmg__)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                borderRadius: 2,
                color: 'white', // Đảm bảo văn bản hiển thị rõ ràng trên nền ảnh
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 'bold',
                }}
              >
                Không gian làm việc 1
              </Typography>
            </Button>
            <Button
              sx={{
                width: 300,
                height: 150,
                backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/af15/0f13/02249f62ff16a590a2a311ad1c70b4ba?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OniBV-gbrTugizbsqNf0mJxc3PCCONs9ORirKUtwZ5kQj6Q6~oLtahGbM7jHMUu1~1JnuYZUf3EtRyJ1hAmYQIw2WF1gEdk8o7y1G5RKVX8zj5t5zAZUXVUQ6YEVJJCLoeKHD46C0LwTxew67eXKdHqmloldoF5a4sYZtFLpwQRg8x8oTMgGDf1bfIuDYYXCM7iKvX9r6IAD3txHSxCzwg9CCHGInnrhnFZTuya8nJndk073nYVOWPRLagqGxg6JPMItVZ4tYyvpATaREiO3mxqRexdPGnvBO-zIk61chFycnJLkX5MyXA7Qe-0i3jPPi5SvqYyI8WN2M5RGyCNmmg__)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                borderRadius: 2,
                color: 'white', // Đảm bảo văn bản hiển thị rõ ràng trên nền ảnh
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 'bold',
                }}
              >
                Không gian làm việc 2
              </Typography>
            </Button>
            <Button
              sx={{
                width: 300,
                height: 150,
                backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/af15/0f13/02249f62ff16a590a2a311ad1c70b4ba?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OniBV-gbrTugizbsqNf0mJxc3PCCONs9ORirKUtwZ5kQj6Q6~oLtahGbM7jHMUu1~1JnuYZUf3EtRyJ1hAmYQIw2WF1gEdk8o7y1G5RKVX8zj5t5zAZUXVUQ6YEVJJCLoeKHD46C0LwTxew67eXKdHqmloldoF5a4sYZtFLpwQRg8x8oTMgGDf1bfIuDYYXCM7iKvX9r6IAD3txHSxCzwg9CCHGInnrhnFZTuya8nJndk073nYVOWPRLagqGxg6JPMItVZ4tYyvpATaREiO3mxqRexdPGnvBO-zIk61chFycnJLkX5MyXA7Qe-0i3jPPi5SvqYyI8WN2M5RGyCNmmg__)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                borderRadius: 2,
                color: 'white', // Đảm bảo văn bản hiển thị rõ ràng trên nền ảnh
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 'bold',
                }}
              >
                Không gian làm việc 3
              </Typography>
            </Button>
          </Box>
          <Button
            variant="contained"
            sx={{
              marginTop: 3,
              width: 300,
              height: 150,
              backgroundColor: '#D9D9D9', // Màu nền
              color: '#000',             // Màu chữ
              '&:hover': {
                backgroundColor: '#F0EFFF', // Màu nền khi hover
              },
            }}
          >
            Tạo bảng mới
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BoardPage;