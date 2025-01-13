import React from "react";
import { Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from "@mui/icons-material";

const Footer = () => {
    const [language, setLanguage] = React.useState("en");

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };
  return (
    <Box component="footer">
      {/* Phần trên */}
      <Box
        sx={{
          height: "253px",
          backgroundImage: "url('/images/back_footer.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            marginBottom: 2,
            fontSize: '42px'
          }}
        >
          Bắt đầu sử dụng Trello ngay hôm nay
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Email"
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "300px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0065FF",
              color: "#FFF",
              borderRadius: "8px",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#006FFF",
              },
            }}
          >
            Đăng ký - hoàn toàn miễn phí!
          </Button>
        </Box>
      </Box>

      {/* Phần dưới */}
      <Box
        sx={{
          height: "174px",
          backgroundColor: "#172B4D",
          color: "white",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <img
            src="/images/logo.png"
            alt="Trello Logo"
            style={{ width: "150px", height: "auto" }}
          />
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {["Tìm hiểu về Trello", "Việc làm", "Ứng dụng", "Liên hệ với chúng tôi"].map(
              (text, index) => (
                <Button
                  key={index}
                  sx={{
                    backgroundColor: "transparent",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      color: "#f0f0f0",
                    },
                  }}
                >
                  {text}
                </Button>
              )
            )}
          </Box>
        </Box>
        
        <Box
          sx={{
            borderTop: "1px solid white",
            marginTop: 2,
            paddingTop: 1,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
            <Typography variant="body2" sx={{ color: "white" }}>
              Ngôn ngữ:
            </Typography>
            <Select
              value={language}
              onChange={handleLanguageChange}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                minWidth: "100px",
                height: "35px",
                "& .MuiSelect-select": {
                  padding: "5px",
                },
              }}
            >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="vi">Vietnamese</MenuItem>
                <MenuItem value="jp">Japanese</MenuItem>
                <MenuItem value="kr">Korean</MenuItem>
            </Select>
            <Box sx = {{ display: "flex", gap: 1 }}>
                <Button
                sx={{
                    color: "white",
                    "&:hover": {
                      color: "#0065FF",
                    },
                  }}
                >
                    <Facebook />
                </Button>

                <Button
                sx={{
                    color: "white",
                    "&:hover": {
                      color: "#0065FF",
                    },
                  }}
                >
                    <Instagram />
                </Button>

                <Button
                sx={{
                    color: "white",
                    "&:hover": {
                      color: "#0065FF",
                    },
                  }}
                >
                    <LinkedIn />
                </Button>

                <Button
                sx={{
                    color: "white",
                    "&:hover": {
                      color: "#0065FF",
                    },
                  }}
                >
                    <Twitter />
                </Button>
                
                <Button
                sx={{
                    color: "white",
                    "&:hover": {
                      color: "#0065FF",
                    },
                  }}
                >
                    <YouTube />
                </Button>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
