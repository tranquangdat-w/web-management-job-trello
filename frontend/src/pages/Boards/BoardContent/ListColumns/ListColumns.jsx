import { Box } from '@mui/material'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast, Bounce } from 'react-toastify'
import { createNewColumnAPI } from '~/apis'
import { cloneDeep } from 'lodash'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import { useDispatch, useSelector } from 'react-redux'

const ListColumns = ( { columns } ) => {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [isOpenNewColumnForm, setIsOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setIsOpenNewColumnForm(!isOpenNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      return
    }

    const newColumnData = {
      title: newColumnTitle,
      boardId : board._id
    }

    const createdColumn = await createNewColumnAPI(newColumnData)

    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds = newBoard.columns.map(col => col._id)

    dispatch(updateCurrentActiveBoard(newBoard))

    toast.success('Created new column!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce
    })
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

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
          {columns?.map(column => (<Column key={column._id} column={column} />))}
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
              marginX: (theme) => theme.trelloCustom.marginLeftColumn,
              borderRadius: (theme) => theme.trelloCustom.borderRadiusColumn,
              display: 'flex',
              alignSelf: 'flex-start',
              height: 'auto',
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
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
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
                className='interceptor-loading'
                variant="contained"
                size="small"
                disableElevation={true}
                onClick={addNewColumn}
                >
                  Add list
                </Button>
                <Box sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300'
                  },
                  display: 'flex',
                  justifyContent: 'center',
                  p: '6px',
                  borderRadius: '4px'
                }}>
                  <CloseIcon fontSize="small"
                    sx={{
                      color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black'
                    }}
                    onClick={toggleOpenNewColumnForm}
                  />
                </Box>
              </Box>
            </Box>
          }
        </Box>
      </SortableContext>
    </>
  )
}

export default ListColumns
