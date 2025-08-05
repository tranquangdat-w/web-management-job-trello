import { useState, useEffect, useRef } from 'react'
import { Box, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setIsDisableDragNDrop } from '~/redux/shareState/isDisableStateSlice'

const EditableTitle = ({ initialTitle, onSave, size, getIsEditing = null }) => {
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const inputRef = useRef(null)

  useEffect(() => {
    setTitle(initialTitle)
  }, [initialTitle])

  useEffect(() => {
    dispatch(setIsDisableDragNDrop(isEditing))
    if (isEditing && inputRef.current) {
      inputRef.current.select()
    }
  }, [isEditing, dispatch])

  const startEditTittle = () => {
    setIsEditing(true)
    if (getIsEditing != null) getIsEditing(true)
  }

  const handleSave = () => {
    dispatch(setIsDisableDragNDrop(false))
    const newTitle = title.trim()

    if (!newTitle || newTitle == '' || newTitle == initialTitle) {
      setTitle(initialTitle)
      setIsEditing(false)
      if (getIsEditing != null) getIsEditing(false)
      return
    }

    // chỉ call api nếu mà newTitle != initialTitle
    onSave(newTitle)
    setIsEditing(false)
    if (getIsEditing != null) getIsEditing(false)
  }

  if (isEditing) {
    return (
      <TextField
        inputRef={inputRef}
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSave()
          }
        }}
        variant="outlined"
        size="small"
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: 'transparent' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' }
          },
          '& .MuiInputBase-input': {
            fontSize: size,
            fontWeight: 'bold',
            padding: '8px 10px',
            cursor: 'text'
          }
        }}
      />
    )
  }

  return (
    <Box
      onClick={startEditTittle}
      sx={{
        fontSize: size,
        fontWeight: 'bold',
        padding: '8px 10px',
        width: '100%',
        cursor: 'pointer',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }}
    >
      {title}
    </Box>
  )
}

export default EditableTitle
