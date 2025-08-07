import { CircularProgress, InputAdornment, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { getBoardsAPI } from '~/apis'
import { useDebounceFn } from '~/customHooks/useDebounceFn'

const AutoCompleteSearchBoard = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const color = (theme) => theme.palette.mode === 'dark' ? '#9da8b7' : 'white'
  const [boards, setBoards] = useState(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      setBoards(null)
    }
  }, [open])

  const handleInputSearchChange = (event, value) => {
    const searchValue = value

    if (!searchValue) {
      return
    }

    const searchPath = `?${createSearchParams(({ 'q[title]': searchValue }))}`

    setLoading(true)

    getBoardsAPI(null, searchPath)
      .then(res => {
        setBoards(res.boardData)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSelectedBoard = (event, selectedBoard) => {
    if (!selectedBoard) {
      return
    }

    navigate(`/boards/${selectedBoard._id}`)
  }

  const debounceSearchBoard = useDebounceFn(handleInputSearchChange)

  return (
    <Autocomplete
      noOptionsText={!boards ? 'Type to search' : 'No found board'}

      open={open}

      onOpen={() => setOpen(true)}

      onClose={() => setOpen(false)}

      getOptionLabel={(board) => board.title}

      loadingText={'Loading board...'}

      loading={loading}

      options={boards || []}

      onInputChange={debounceSearchBoard}

      onChange={handleSelectedBoard}

      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search board"
          size="small"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: color }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{
            minWidth: '350px',
            maxWidth: '170px',
            '& label': { color: color },
            '& input': { color: color },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8590a2'
              },
              '&:hover fieldset': {
                borderColor: '#8590a2'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused': {
                minWidth: '170px'
              }
            }
          }}
        />
      )}
    />
  )
}

export default AutoCompleteSearchBoard
