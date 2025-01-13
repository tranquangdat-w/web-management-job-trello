import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Price = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = ['/images/p1.png', '/images/p2.png', '/images/p3.png'];

  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '1537px',
        padding: '0px 221px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '21px',
        flexShrink: 0,
        background: 'linear-gradient(177deg, rgba(254, 255, 255, 0.43) 6.49%, rgba(165, 249, 249, 0.22) 40.67%, rgba(255, 255, 255, 0.43) 84.44%)',
      }}
    >
      {/* Image Gallery */}
      <Box
        sx={{
            width: '990px',
            height: '400px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            mt:8
        }}
      >
        <img
          src={images[imageIndex]}
          alt="image-gallery"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '20px',
          }}
        />
        {/* Image Navigation */}
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: 'flex',
            gap: '10px',
          }}
        >
          <Button
            onClick={handlePrevImage}
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                borderRadius: '50%',
                padding: '10px',
                minWidth: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            onClick={handleNextImage}
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                borderRadius: '50%',
                padding: '10px',
                minWidth: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
          >
            <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>

      {/* Title and Description */}
      <Box sx={{ width: '100%', textAlign: 'center'}}>
        <Typography variant="h2" sx={{ fontWeight: 'bold' , fontSize:'32px', mt:8}}>
            Trello đưa ra cách định giá phù hợp với bạn
        </Typography>
        <Typography variant='h6' sx={{fontSize: '20px', mt: 2, fontFamily: 'Raleway, sans-serif',}}>
            Được hàng triệu người tin dùng, Trello đã hỗ trợ cho nhiều đội ngũ trên toàn thế giới.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#0065FF',
            color: 'white',
            marginTop: '20px',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          So sánh các gói
        </Button>
      </Box>

      {/* Price Tables */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '20px',
        }}
      >
        {/* Plan 1 */}
        <Box
          sx={{
            display: 'flex',
            width: '248px',
            height: '461px',
            padding: '22px 17px 73px 17px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            FREE
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '38px', fontWeight: 'bold' }}>
            $0 USD
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#000000B2' }}>
            Miễn phí cho tối đa 10 người cộng tác mỗi Không gian làm việc
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            Dành cho các cá nhân hoặc nhóm muốn sắp xếp mọi dự án.
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
            Bắt đầu
          </Button>
        </Box>

        {/* Plan 2 */}
        <Box
          sx={{
            display: 'flex',
            width: '248px',
            height: '461px',
            padding: '22px 17px 73px 17px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            STANDARD
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '38px', fontWeight: 'bold' }}>
            $5 USD
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#000000B2' }}>
            Mỗi người dùng/tháng nếu thanh toán hàng năm ($6 đã thanh toán hàng tháng)
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            Dành cho các nhóm nhỏ cần quản lý công việc và mở rộng quy mô cộng tác.
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
            Nâng cấp ngay
          </Button>
        </Box>

        {/* Plan 3 */}
        <Box
          sx={{
            display: 'flex',
            width: '248px',
            height: '461px',
            padding: '22px 17px 73px 17px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            PREMIUM
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '38px', fontWeight: 'bold' }}>
            $10 USD
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#000000B2' }}>
            Mỗi người dùng/tháng nếu thanh toán hàng năm ($12.50 đã thanh toán hàng tháng)
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
          Dành cho các nhóm cần theo dõi và trực quan hóa nhiều dự án theo nhiều cách, bao gồm cả bảng, lịch trình, lịch, v.v.
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
            Dùng thử miễn phí
          </Button>
        </Box>

        {/* Plan 4 */}
        <Box
          sx={{
            display: 'flex',
            width: '248px',
            height: '461px',
            padding: '22px 17px 73px 17px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ENTERPRISE
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '38px', fontWeight: 'bold' }}>
            $17.50 USD
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#000000B2' }}>
          Mỗi người dùng/tháng - thanh toán hàng năm ($210.00 giá hằng năm/người dùng)
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
          Dành cho các tổ chức cần kết nối công việc giữa các nhóm với khả năng bảo mật và kiểm soát cao hơn.
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
            Liên hệ bộ phận kinh doanh
          </Button>
        </Box>
      </Box>

      {/* Title and Description */}
      <Box sx={{ width: '100%', textAlign: 'center', mt:5}}>
        <Typography variant='h6' sx={{fontSize: '20px', mt: 2, fontFamily: 'Raleway, sans-serif',}}>
            Được hàng triệu người tin dùng, Trello đã hỗ trợ cho nhiều đội ngũ trên toàn thế giới.
        </Typography>
        <Box
            sx={{
            width: '100%',
            mt: 3,
            display: 'flex',
            justifyContent: 'center',
            }}
        >
            <Box
            component="img"
            src="/images/logo_fake.png" 
            sx={{
                maxWidth: '100%',
                height: 'auto',
                
            }}
            />
        </Box>
      </Box>

    </Box>
  );
};

export default Price;
