import { Box } from '@mui/material'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'

const ListColumns = ( { columns } ) => {
  const [isOpenNewColumnForm, setIsOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setIsOpenNewColumnForm(!isOpenNewColumnForm)

  return (
    <>
      <SortableContext items = {columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
        <Box sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}>
          {columns?.map(column => (<Column key ={column._id} column={column} />))}
          {!isOpenNewColumnForm
            ? <Box sx={{
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
            }}
            onClick={toggleOpenNewColumnForm}
            >
              <Button
                disableRipple
                startIcon={<AddIcon />}
                sx={{
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                }}>
                Add another list
              </Button>
            </Box>
            : <Box sx={{
              minWidth: (theme) => theme.trelloCustom.columnWidth,
              maxWidth: (theme) => theme.trelloCustom.columnWidth,
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4',
              minHeight: '125px',
              maxHeight: '125px',
              marginX: (theme) => theme.trelloCustom.marginLeftColumn,
              borderRadius: (theme) => theme.trelloCustom.borderRadiusColumn,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              p: 1.5
            }}>
              <TextField
                id="outlined-search"
                type="search"
                size="small"
                placeholder={'Enter list name'}
                autoFocus
                inputProps={{
                  sx: {
                    '&::placeholder': {
                      color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black',
                      opacity: 0.8,
                      fontSize: '0.875rem'
                    }
                  }
                }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: '#03a9f4' },
                    '&.Mui-focused fieldset': { borderColor: '#03a9f4' }
                  },
                  '& .MuiInputBase-root': {
                    color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black',
                    fontSize: '0.875rem'
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 1
              }}>
                <Button sx={{
                  color: 'black',
                  bgcolor: '#42a5f5',
                  '&:hover': {
                    bgcolor: '#64b5f6'
                  }
                }}
                variant="contained"
                size="small">
                  Add list
                </Button>
                <CloseIcon fontSize="small" sx={{ color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black', cursor: 'pointer' }}
                  onClick={toggleOpenNewColumnForm}
                />

              </Box>
            </Box>
          }
        </Box>
      </SortableContext>
    </>
  )
}

export default ListColumns
