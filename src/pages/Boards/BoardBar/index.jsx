import { Box } from '@mui/material'

const BoardBar = () => {
  return (
    <Box sx={{
      bgcolor: 'primary.dark',
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      BoardBard
    </Box>
  )
}

export default BoardBar

