import { Box } from '@mui/material'

const BoardContent = () => {
  return (
    <Box sx={{
      bgcolor: 'primary.main',
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.trelloCustom.boardBarHeight} - ${theme.trelloCustom.appBarHeight})`,
      display: 'flex',
      alignItems: 'center',
    }}>
          Board content
    </Box>

  )
}

export default BoardContent

