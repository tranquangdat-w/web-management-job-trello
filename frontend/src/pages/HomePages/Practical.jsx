import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';

const contents = [
    'Quản lý dự án: Sắp xếp nhiệm vụ, bám sát thời hạn và giúp các thành viên nhóm theo sát Trello.',
    'Cuộc họp: Giúp các cuộc họp nhóm trở nên hiệu quả, mạnh mẽ và luôn thú vị.',
    'Đào tạo nhập môn: Dễ dàng làm quen với công ty mới hoặc tiếp nhận dự án mới nhờ bố cục trực quan của Trello về việc cần làm, tài nguyên và theo dõi tiến độ.',
    'Quản lý nhiệm vụ: Sử dụng Trello để theo dõi, quản lý, hoàn thành và tập hợp các nhiệm vụ giống như các mảnh ghép trong một bức tranh và giúp dự án của nhóm luôn gặt hái thành công mang tính gắn kết.',
    'Động não: Giải phóng sức sáng tạo cũng như giúp ý tưởng trở nên trực quan, mang tính cộng tác và khả thi.',
    'Trung tâm tài nguyên: Tiết kiệm thời gian nhờ trung tâm được thiết kế hợp lý để giúp các nhóm tìm thông tin nhanh chóng và dễ dàng.'
];

const Practical = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '610px',
        backgroundColor:'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 221px',
        color: 'black',
      }}
    >
      {/* Two Lines of Text */}
      <Typography variant="h6" sx={{ fontFamily: 'Raleway, sans-serif', textAlign: 'left', mb: 2, fontSize: '20px', fontWeight: 'bold'}}>
        Thông tin cơ bản về Trello
      </Typography>
      <Typography variant="h2" sx={{ fontFamily: 'Raleway, sans-serif', textAlign: 'left', mb: 5, fontSize:'48px', fontWeight: 'bold'}}>
        Quy trình làm việc cho mọi dự án, bất kể nhỏ to
      </Typography>

      {/* Six White Boxes with Horizontal Scroll */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          width: '100%',
          gap: '20px',
          '&::-webkit-scrollbar': {
            height: '10px',
            backgroundColor: '#F0EFFF',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4D47C3',
            borderRadius: '10px',
          },
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              minWidth: '350px',
              height: '200px',
              backgroundColor: '#FFF',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '10px',
              padding: '10px',
              boxShadow: '2px 10px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Box
              sx={{
                width: '30px',
                height: '100%',
                backgroundColor: ['#FF7452', '#2684FF', '#57D9A3', '#FFC400', '#00C7E5', '#8A88FF'][index],
                borderRadius: '5px 0 0 5px',
              }}
            />
            <IconButton>
              <ArrowForwardIos sx={{ fontSize: '18px' }} />
            </IconButton>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {/* Tiêu đề tô đậm */}
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',  
                  fontSize: '16px'
                }}
              >
                {contents[index].split(':')[0]}
              </Typography>
              {/* Nội dung */}
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '14px'
                }}
              >
                {contents[index].split(':')[1]}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Text and Button Below */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginTop: 'auto',
          maxWidth: '80%',
          mb: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Raleway, sans-serif',
            fontSize: '18px',
            color: 'black',
            mr: 2
          }}
        >
          Không cần bắt đầu từ đầu. Bạn có thể nhanh chóng bắt đầu quy trình làm việc với sổ chiến lược đã được chứng minh hiệu quả dành cho các đội nhóm khác nhau. Hãy tùy chỉnh thành sổ chiến lược của riêng bạn.
        </Typography>
        <Button
          variant="contained"
          color='inherit'
          sx={{
            backgroundColor: '#FFF',
            color: 'black',
            fontFamily: 'Raleway, sans-serif',
            mr: -10,
            minWidth: '200px',
            padding: '10px',
            fontSize: '16px',
            height: '80px',
            borderRadius: '10px',
          }}
        >
          Khám phá tất cả các trường hợp sử dụng
        </Button>
      </Box>
    </Box>
  );
};

export default Practical;
