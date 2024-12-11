import { Box } from '@mui/material'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

const ListColumns = () => {
  return (
    <Box sx={{
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden'
    }}>
      <Column />
      <Column />
      <Column />

      <Box sx={{
        minWidth: (theme) => theme.trelloCustom.columnWidth,
        maxWidth: (theme) => theme.trelloCustom.columnWidth,
        bgcolor: '#3d99ce',
        '&:hover': {
          bgcolor: '#33769e'
        },
        minHeight: (theme) => theme.trelloCustom.columnHeaderHeight,
        maxHeight: (theme) => theme.trelloCustom.columnHeaderHeight,
        ml: (theme) => theme.trelloCustom.marginLeftColumn,
        borderRadius: (theme) => theme.trelloCustom.borderRadiusColumn,
        display: 'flex',
        alignItems: 'center',
        pl: '10px'
      }}>
        <Button
          disableRipple
          startIcon={<AddIcon />}
          sx={{
            color: 'white',
            '&:hover': {
              bgcolor: 'transparent'
            }
          }}>
          Add another column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
