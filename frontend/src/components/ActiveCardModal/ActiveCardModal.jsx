import Modal from '@mui/material/Modal'
import { Avatar, Box, Button, Divider, TextField, Typography, useColorScheme } from '@mui/material'
import EditableTitle from '../EditableTitle/EditableTitle'
import ImageIcon from '@mui/icons-material/Image'
import MessageIcon from '@mui/icons-material/Message'
import CloseIcon from '@mui/icons-material/Close'
import { GroupAvatar } from '~/pages/Boards/BoardBar/GroupAvatar'
import { useState } from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import MDEditor from '@uiw/react-md-editor'
import { styled } from '@mui/material/styles'
import { singleFileValidator } from '~/utils/validators'
import { toast, Bounce } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentCard,
  updateActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { updateCardAPI } from '~/apis'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
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

const ActiveCardModal = () => {
  const mode = useColorScheme().mode

  const dispatch = useDispatch()

  const activeCard = useSelector(selectCurrentCard)

  const activeBoard = useSelector(selectCurrentActiveBoard)

  const [markDownValue, setMarkdownValue] = useState(activeCard?.description)

  const [isEditingMarkDown, setIsEditingMarkDown] = useState(false)

  const [isEdittingCardTitle, setIsEditingCardTitle] = useState(false)

  const [showComments, setShowComments] = useState(false)

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const openEditingMarkDown = () => {
    setIsEditingMarkDown(true)
  }

  const hanldeCloseEditingMarkDown = () => {
    const newDescription = markDownValue.trim()
    if (newDescription !== activeCard.description) {
      updateCardAPI(
        activeCard._id,
        {
          description: newDescription
        }
      ).then(() => {
        const newActiveCard = cloneDeep(activeCard)
        newActiveCard.description = markDownValue

        dispatch(updateActiveCard(newActiveCard))
      })
    }

    setIsEditingMarkDown(false)
  }

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
      { pending: 'Uploading' })
      .then(res => {
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

  return (
    <Modal
      open={true} // always openBecause we will check in board._id
      onClose={handleCloseCardModal} >
      <Box
        sx={{
          position: 'absolute',
          top: '7%',
          left: '50%',
          width: 680,
          maxWidth: '90vw',
          maxHeight: '85vh',
          transform: 'translate(-50%)',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#282E33' : '#F4F5F7'),
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 24,
          paddingBottom: 4
        }}>

        {/*Icon section*/}
        {
          (activeCard.cover || !isEditingMarkDown) &&
          <Box
            sx={{
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
        }

        {/*First section*/}
        {/*Card cover*/}
        {
          activeCard.cover &&
          <Box
            sx={{
              borderTopRightRadius: 'inherit',
              borderTopLeftRadius: 'inherit',
              bgcolor: 'grey.500',
              height: '150px',
              maxHeight: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} >
            <img
              src={activeCard.cover}
              loading="lazy" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
          </Box>
        }

        {/*Card title*/}
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

        <Divider sx={{ borderWidth: '0.5px' }} />

        {/*Body card section*/}
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflow: 'auto'
          }}>

          {/*Avatar group*/}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" fontWeight={'bold'} >
              Members
            </Typography>
            <GroupAvatar />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }} >
            <Typography variant="h6" marginBottom={1}>
              Description
            </Typography>
            <Button
              onClick={openEditingMarkDown}
              size="small"
              sx={{
                maxWidth: '80px',
                display: isEditingMarkDown ? 'none' : 'block',
                bgcolor: 'primary.light',
                color: 'white',
                borderRadius: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'grey.400'
                }
              }} >
              Edit
            </Button>
          </Box>
          {
            isEditingMarkDown &&
            <Box data-color-mode={mode}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
              <MDEditor
                value={markDownValue}
                preview="edit"
                height={'100%'}
                minHeight={'100px'}
                visibleDragbar={false}
                autoFocusEnd={true}
                onChange={setMarkdownValue}
                textareaProps={{
                  placeholder: 'Enter description here'
                }}
                commandsFilter={(command) => {
                  if (command.name === 'preview') {
                    return false
                  }
                  return command
                }} />
              <Button
                onClick={hanldeCloseEditingMarkDown}
                sx={{
                  maxWidth: '80px',
                  bgcolor: 'primary.light',
                  color: 'white',
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'grey.200',
                    boxShadow: 3
                  }
                }} >
                Save
              </Button>
            </Box>
          }
          {
            !isEditingMarkDown &&
            (markDownValue ?
              <Box
                onClick={openEditingMarkDown}
                data-color-mode={mode}
                sx={{
                  padding: !markDownValue ? '12px' : '0'
                }} >
                <MDEditor.Markdown
                  source={markDownValue}
                  style={{
                    height: '100%',
                    // whiteSpace: 'pre-wrap',
                    minHeight: '100px',
                    padding: '12px'
                  }} />
              </Box>
              :
              <Box
                onClick={openEditingMarkDown}
                sx={{
                  minHeight: '100px',
                  border: 'solid 1px gray',
                  padding: '12px'
                }} >
                <Typography>
                  Enter card description here!
                </Typography>
              </Box>)
          }
          {
            showComments &&
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" fontWeight={'bold'} >
                Comments
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {
                  Array.from({ length: 50 }, (_, i) => ({
                    id: i + 1,
                    author: ['John Doe', 'Jane Smith', 'Peter Jones', 'Mary Williams', 'David Brown'][i % 5],
                    avatar: ['/static/images/avatar/1.jpg', '/static/images/avatar/2.jpg', '/static/images/avatar/3.jpg', '/static/images/avatar/4.jpg', '/static/images/avatar/5.jpg'][i % 5],
                    text: `This is a sample comment text, just to fill up space. Comment number #${i + 1}`,
                    timestamp: `${i + 1} minutes ago`
                  })).map(comment => (
                    <Box key={comment.id} sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'flex-start' }}>
                      <Avatar alt={comment.author} src={comment.avatar} sx={{ width: 32, height: 32 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2" fontWeight="bold">{comment.author}</Typography>
                          <Typography variant="caption" color="text.secondary">{comment.timestamp}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{
                          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#3A3A3A' : '#EAEBEF',
                          p: 1,
                          borderRadius: 1,
                          mt: 0.5
                        }}>
                          {comment.text}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                }
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mt: 2 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"
                  sx={{ width: '32px', height: '32px' }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder='Add a comment'
                />
              </Box>
            </Box>
          }
        </Box>
        <Box sx={{
          left: '50%',
          transform: 'translateX(-50%)',
          position: 'absolute',
          bottom: -60,
          zIndex: 10
        }}>
          <Button
            onClick={toggleComments}
            sx={{
              bgcolor: showComments ? 'grey.700' : 'none',
              borderRadius: 2,
              minWidth: 40,
              height: 40,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
                boxShadow: 2
              }
            }}
          >
            <MessageIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    </Modal>

  )
}

export default ActiveCardModal
