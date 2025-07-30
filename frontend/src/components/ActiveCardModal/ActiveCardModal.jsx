import Modal from '@mui/material/Modal'
import { Box, Button, Divider, Typography } from '@mui/material'
import EditableTitle from '../EditableTitle/EditableTitle'
import ImageIcon from '@mui/icons-material/Image'
import CloseIcon from '@mui/icons-material/Close'
import { GroupAvatar } from '~/pages/Boards/BoardBar/GroupAvatar'
import { useState } from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import MDEditor from '@uiw/react-md-editor'
import { styled } from '@mui/material/styles'
import { singleFileValidator } from '~/utils/validators'
import { toast, Bounce } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentCard, updateActiveCard } from '~/redux/activeCard/activeCardSlice'
import { updateCardAPI } from '~/apis'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const ActiveCardModal = () => {
  const dispatch = useDispatch()

  const activeCard = useSelector(selectCurrentCard)

  const activeBoard = useSelector(selectCurrentActiveBoard)

  const handleCloseCardModal = () => {
    dispatch(updateActiveCard(null))
  }

  const handleUploadCardCover = (event) => {
    const file = event.target.files[0]

    const error = singleFileValidator(file)

    if (error) {
      toast.error(error, {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseonhover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce
      })
      return
    }

    let reqData = new FormData()
    reqData.append('avatar', file)

    // Log dữ liệu qua form data
    // reqData.forEach(value => {
    //   console.log(value)
    // })

    toast.promise(
      //call api
      updateCardAPI(activeCard._id, reqData),
      { pending: 'Uploading' }).then(res => {

      dispatch(updateActiveCard(res))

      const newBoard = cloneDeep(activeBoard)
      const columns = newBoard.columns

      for (let i = 0; i < columns.length; i++) {
        if (columns[i]._id != res.columnId) {
          continue
        }

        const cards = columns[i].cards
        for (let j = 0; j < cards.length; j++) {
          if (cards[j]._id == res._id) {
            cards[j].cover = res.cover

            break
          }
        }

        break
      }

      dispatch(updateCurrentActiveBoard(newBoard))

      if (!res.error) {
        toast.success('User updated successfully')
      }

      // Xóa input sau mỗi lần upload
      event.target.value = ''
    })
  }

  const handleUpdateCardTitle = (newTitle) => {
    updateCardAPI(activeCard._id, { title: newTitle }).then(res => {
      dispatch(updateActiveCard(res))

      const newBoard = cloneDeep(activeBoard)
      const columns = newBoard.columns

      for (let i = 0; i < columns.length; i++) {
        if (columns[i]._id != res.columnId) {
          continue
        }

        const cards = columns[i].cards
        for (let j = 0; j < cards.length; j++) {
          if (cards[j]._id == res._id) {
            cards[j].title = res.title

            break
          }
        }

        break
      }
      dispatch(updateCurrentActiveBoard(newBoard))
    })
  }

  const [markDownvalue, setMarkdownValue] = useState('**Hello world!!!**')

  const buttonStyle = {
    width: 30,
    height: 30,
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: 'text.primary',
    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#3A3A3A' : '#EAEBEF',
    '&:hover': {
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#4D4D4D' : '#DFE1E6'
    }
  }

  return (
    <Modal
      open={true} // always openBecause we will check in board._id
      onClose={handleCloseCardModal}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 800,
          maxWidth: '90vw',
          maxHeight: '90vh',
          transform: 'translate(-50%, -50%)',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#282E33' : '#F4F5F7'),
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 24,
          overflowY: 'auto'
        }}>
        <Box sx={{
          position: 'absolute',
          top: 10,
          right: 8,
          zIndex: 1,
          display: 'flex',
          gap: 1
        }} >
          <Button component="label" sx={buttonStyle}>
            <ImageIcon fontSize="small" />
            <VisuallyHiddenInput
              type="file"
              onChange={handleUploadCardCover}
              multiple
            />
          </Button>
          <Button sx={buttonStyle} onClick={handleCloseCardModal}>
            <CloseIcon fontSize="small" />
          </Button>
        </Box>
        <Box
          sx={{
            borderTopRightRadius: 'inherit',
            borderTopLeftRadius: 'inherit',
            bgcolor: 'grey.500',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} >
          <img
            src={activeCard.cover}
            loading="lazy" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            alignItems: 'center',
            width: '100%',
            padding: 2,
            height: 70
          }} >
          <CreditCardIcon />
          <EditableTitle
            initialTitle={activeCard.title}
            onSave={handleUpdateCardTitle}
            size={30}
          />
        </Box>

        <Divider sx={{ mx: 2, borderWidth: '0.5px' }} />

        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" fontWeight={'bold'} >
            Members
          </Typography>
          <GroupAvatar />
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={'bold'} sx={{ mb: 1 }}>
            Description
          </Typography>
          <MDEditor
            value={markDownvalue}
            onChange={setMarkdownValue}
            previewOptions={{
              style: { whiteSpace: 'pre-wrap' }
            }}
            preview='edit'
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default ActiveCardModal
