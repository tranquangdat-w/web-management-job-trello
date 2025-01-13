import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';

const Helps = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '1438.741px',
        padding: '19px 212px 65px 212px',
        alignItems: 'flex-start',
        gap: '59px',
        backgroundColor: 'white',
      }}
    >
      {/* Header Section */}
      <Box sx={{ width: '90%', mt:5}}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold', fontSize: '20px' }}
        >
          Những phương thức mạnh mẽ giúp bạn phát triển
        </Typography>
        <Typography variant="h2" sx={{ fontFamily: 'Raleway, sans-serif', textAlign: 'left', mb: 2, fontSize:'48px', fontWeight: 'bold'}}>
          Trello giúp bạn làm được nhiều việc hơn
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Raleway, sans-serif',
            fontSize: '20px',
          }}
        >
          Các tính năng trực quan của Trello mang đến cho mọi đội nhóm khả năng thiết lập và tùy chỉnh nhanh chóng quy trình làm việc, sẵn sàng đáp ứng mọi nhu cầu.
        </Typography>
      </Box>

      {/* Three White Boxes */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          gap: '30px',
        }}
      >
        {/* Box 1 */}
        <Box
          sx={{
            width: '30%',
            height: '320px',
            backgroundColor: 'rgba(87, 217, 163, 0.05)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <Box sx={{ width: '100px', height: '100px', backgroundImage: 'url(/images/Group44.png)', backgroundSize: 'cover' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
            Tiện ích tích hợp
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif' }}>
          Kết nối các ứng dụng nhóm bạn đã sử dụng vào quy trình làm việc của bạn trong Trello hoặc thêm Tiện ích bổ sung giúp điều chỉnh các nhu cầu cụ thể.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: 'black',
              borderColor: '#0065FF',
              width: '100%',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#E3F2FD',
              },
            }}
          >
            Xem thêm
          </Button>
        </Box>

        {/* Box 2 */}
        <Box
          sx={{
            width: '30%',
            height: '320px',
            backgroundColor: 'rgba(87, 217, 163, 0.05)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <Box sx={{ width: '100px', height: '100px', backgroundImage: 'url(/images/Group8.png)', backgroundSize: 'cover' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
            Tự động hóa với Butler
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif' }}>
            Mọi bảng Trello đều tích hợp tính năng tự động hóa không cần mã. Bạn có thể tập trung vào công việc quan trọng nhất, phần còn lại đã có robot lo.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: 'black',
              borderColor: '#0065FF',
              width: '100%',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#E3F2FD',
              },
            }}
          >
            Xem thêm
          </Button>
        </Box>

        {/* Box 3 */}
        <Box
          sx={{
            width: '30%',
            height: '320px',
            backgroundColor: 'rgba(87, 217, 163, 0.05)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <Box sx={{ width: '100px', height: '100px', backgroundImage: 'url(/images/Group9.png)', backgroundSize: 'cover' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
          Trello Enterprise
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif' , mb: 2}}>
          Công cụ năng suất mà các nhóm yêu thích, được kết hợp với các tính năng và sự an toàn cần thiết để mở rộng quy mô.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: 'black',
              borderColor: '#0065FF',
              width: '100%',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#E3F2FD',
              },
            }}
          >
            Xem thêm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Helps;
