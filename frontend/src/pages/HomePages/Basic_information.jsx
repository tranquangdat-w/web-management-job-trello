import React from 'react';
import { Box, Typography } from '@mui/material';

const Basic_information = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '774px',
        backgroundImage: 'url(https://img.freepik.com/free-vector/winter-blue-pink-gradient-background-vector_53876-117275.jpg?semt=ais_hybrid)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 221px',
        color: 'black', // Màu chữ mặc định
      }}
    >
      {/* Three lines of text */}
      <Box sx={{ mb: 2, textAlign: 'center', maxWidth: '70%'  }}>
        <Typography variant="h6" sx={{ fontFamily: 'Raleway, sans-serif', textAlign: 'left', mb: 2, fontSize: '20px', fontWeight: 'bold'}}>
          Thông tin cơ bản về Trello
        </Typography>
        <Typography variant="h2" sx={{ fontFamily: 'Raleway, sans-serif', textAlign: 'left', mb: 2, fontSize:'48px', fontWeight: 'bold'}}>
          Đỉnh cao về năng suất
        </Typography>
        <Typography variant="h3" sx={{ fontFamily: 'Raleway, sans-serif', textAlign: 'left', mb: 2, fontSize:'20px' }}>
          Đơn giản, linh hoạt và mạnh mẽ. Chỉ với bảng, danh sách và thẻ, bạn sẽ biết rõ ai đang làm gì và những việc cần làm. Tìm hiểu thêm trong hướng dẫn bắt đầu của chúng tôi.
        </Typography>
      </Box>

      {/* Split layout */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left Section */}
        <Box sx={{ flex: 1, mr: 3 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              mb:2,
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'Raleway, sans-serif', color: '#090909', fontSize:'14px' }}>
            CÁC BẢNG: Bảng Trello giúp bạn sắp xếp hợp lý các nhiệm vụ và thúc đẩy công việc. Bạn có thể xem mọi thông tin, từ việc cần làm đến việc đã hoàn thành, chỉ trong nháy mắt.
            </Typography>
          </Box>
          
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              mb:2,
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'Raleway, sans-serif', color: '#090909', fontSize:'14px' }}>
            DANH SÁCH: Các giai đoạn khác nhau của một nhiệm vụ. Hãy bắt đầu thật đơn giản với Việc cần làm, Việc đang làm hoặc Việc đã xong—hoặc xây dựng một quy trình làm việc tùy chỉnh theo đúng nhu cầu của nhóm bạn. Với Trello, cách nào cũng phát huy hiệu quả.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              mb:2,
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'Raleway, sans-serif', color: '#090909', fontSize:'14px' }}>
            THẺ: Thẻ trình bày các nhiệm vụ và ý tưởng, đồng thời lưu giữ mọi thông tin giúp hoàn thành công việc. Trong quá trình thực hiện nhiệm vụ, bạn có thể di chuyển thẻ qua các danh sách để thể hiện trạng thái của thẻ.
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ flex: 1, ml: 3}}>
          <img
            src="/images/il2.png" // Đường dẫn đến ảnh minh họa của bạn
            alt="Illustration"
            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Basic_information;
