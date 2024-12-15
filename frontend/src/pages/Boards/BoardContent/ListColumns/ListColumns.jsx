import { Box } from '@mui/material'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

const ListColumns = ( { columns } ) => {
  return (
    <Box sx={{
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden'
    }}>
      {columns?.map(column => (<Column key ={column._id} column={column} />))}


      <Box sx={{
        minWidth: (theme) => theme.trelloCustom.columnWidth,
        maxWidth: (theme) => theme.trelloCustom.columnWidth,
        bgcolor: '#3d99ce',
        '&:hover': {
          bgcolor: '#33769e'
        },
        minHeight: '56px',
        maxHeight: '56px',
        marginX: (theme) => theme.trelloCustom.marginLeftColumn,
        borderRadius: (theme) => theme.trelloCustom.borderRadiusColumn,
        display: 'flex',
        alignItems: 'center',
        pl: '10px',
        cursor: 'pointer'
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
