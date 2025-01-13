import React from 'react';
import { Box, Typography, Button, IconButton, Link } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';

const Page3 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '1022px',
        padding: '69px 212px',
        alignItems: 'center',
        gap: '47px',
        flexShrink: 0,
        backgroundImage: 'url(/images/back_3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', color: 'white' }}>
        <Typography variant="h2" sx={{ fontFamily: 'Raleway, sans-serif', fontSize: '40px', fontWeight: 'bold', mb:2 }}>
            Theo dõi công việc theo một cách hoàn toàn mới
        </Typography>
        <Typography variant="h5" sx={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', mb : 2 }}>
            Xem các dự án của nhóm từ mọi góc độ và mang lại góc nhìn mới mẻ cho nhiệm vụ đang thực hiện.
        </Typography>
        <Button
          variant="contained"
          color='inherit'
          sx={{
            marginTop: '20px',
            borderColor: '#0065FF',
            backgroundColor: '#FFF',
            color: '#000',
            fontFamily: 'Raleway, sans-serif',
            padding: '10px 20px',
            borderRadius: '10px',
            textTransform: 'none',
            minWidth: '200px',
            height: '60px',
          }}
        >
          Khám phá mọi dạng xem của Trello
        </Button>
      </Box>

      {/* Box 1 with left image and right content */}
      <Box
        sx={{
          display: 'flex',
          width: '1016px',
          height: '330px',
          padding: '35px 35px 35px 35px',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          alignItems: 'center',
          gap: '101px',
        }}
      >
        <Box
          sx={{
            width: '457.5px',
            height: '286.341px',
            backgroundImage: 'url(/images/ill3.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Box sx={{ width: '40%' }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <img src="/images/Vector.png" alt="icon" width="24px" height="24px" />
            Luôn hoàn thành công việc đúng thời hạn
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', mt: 1 }}>
          Từ những dự án gấp hằng tuần đến việc lập kế hoạch hằng năm, Lịch trình giúp mọi nhiệm vụ luôn theo đúng lộ trình. Nhanh chóng tiên liệu những điều sẽ phát sinh và xác định mọi thiếu sót có thể cản trở tiến độ của nhóm bạn.
          </Typography>
          <Link href="#" sx={{ display: 'block', marginTop: '10px', color: '#0065FF' }}>
            Tìm hiểu thêm về trình xem Lịch trình
          </Link>
        </Box>
      </Box>

      {/* Box 2 with right image and left content */}
      <Box
        sx={{
          display: 'flex',
          width: '1016px',
          height: '330px',
          padding: '35px 35px 35px 35px',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          alignItems: 'center',
          gap: '101px',
        }}
      >
        
        <Box sx={{ width: '40%' }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <img src="/images/Vector_1.png" alt="icon" width="24px" height="24px" />
            Nắm bắt mọi nhiệm vụ
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', mt: 1 }}>
            Bắt đầu mỗi ngày thật chủ động. Cho dù là việc lên lịch biên tập hay nắm bắt những việc cần làm, chế độ xem Lịch giống như một quả cầu pha lê giúp bạn thấy rõ những công việc trước mắt.
          </Typography>
          <Link href="#" sx={{ display: 'block', marginTop: '10px', color: '#0065FF' }}>
            Tìm hiểu thêm về trình xem Lịch trình
          </Link>
        </Box>

        <Box
          sx={{
            width: '457.5px',
            height: '286.341px',
            backgroundImage: 'url(/images/ill4.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Box>
    </Box>
  );
};

export default Page3;
