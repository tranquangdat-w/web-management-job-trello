import Modal from '@mui/material/Modal'
import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useColorScheme
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SendIcon from '@mui/icons-material/Send'
import EditableTitle from '../EditableTitle/EditableTitle'
import ImageIcon from '@mui/icons-material/Image'
import MessageIcon from '@mui/icons-material/Message'
import CloseIcon from '@mui/icons-material/Close'
import { GroupAvatar } from '~/pages/Boards/BoardBar/GroupAvatar'
import { useEffect, useState } from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import MDEditor from '@uiw/react-md-editor'
import { styled } from '@mui/material/styles'
import { singleFileValidator } from '~/utils/validators'
import { toast, Bounce } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearActiveCard,
  selectCurrentCard,
  selectIsDisPlayActiveCard,
  updateActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { updateCardAPI } from '~/apis'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'
import { selectCurrentUser } from '~/redux/user/userSlice'
import moment from 'moment'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import useForkRef from '@mui/utils/useForkRef'
import { useValidation, validateDateTime } from '@mui/x-date-pickers/validation'
import {
  useSplitFieldProps,
  usePickerContext
} from '@mui/x-date-pickers/hooks'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

const ButtonDateTimeField = (props) => {
  const { internalProps, forwardedProps } = useSplitFieldProps(props, 'date-time')
  const pickerContext = usePickerContext()
  const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef)

  const { hasValidationError } = useValidation({
    validator: validateDateTime,
    value: pickerContext.value,
    timezone: pickerContext.timezone,
    props: internalProps
  })

  return (
    <Button
      {...forwardedProps}
      variant="outlined"
      color={hasValidationError ? 'error' : 'primary'}
      ref={handleRef}
      className={pickerContext.rootClassName}
      sx={{
        display: 'flex',
        gap: 1,
        paddingX: 1
      }}
      onClick={() => pickerContext.setOpen((prev) => !prev)}
    >
      {pickerContext.value ?
        pickerContext.value.format(pickerContext.fieldFormat)
        :
        <>
          <AccessTimeIcon />
          <Typography>
            Dates
          </Typography>
        </>
      }
    </Button >
  )
}

const ButtonFieldDateTimePicker = (props) => (
  <DateTimePicker
    {...props}
    slots={{ ...props.slots, field: ButtonDateTimeField }}
  />
)

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


const buttonCardIconStyle = {
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

  const isDisplayActiveCard = useSelector(selectIsDisPlayActiveCard)

  const activeBoard = useSelector(selectCurrentActiveBoard)

  const currentActiveUser = useSelector(selectCurrentUser)

  const [isDone, setIsDone] = useState(activeCard?.isDone || false)

  const [markDownValue, setMarkdownValue] = useState(activeCard?.description || '')

  const [isEditingMarkDown, setIsEditingMarkDown] = useState(false)

  const [isEdittingCardTitle, setIsEditingCardTitle] = useState(false)

  const [showComments, setShowComments] = useState(false)

  const [displayedCommentsCount, setDisplayedCommentsCount] = useState(5)

  const [contentOfComment, setContentOfCommnet] = useState('')

  const [dueDate, setDueDate] = useState(
    activeCard?.dueDate ? moment(activeCard?.dueDate) : null
  )

  useEffect(() => {
    setMarkdownValue(activeCard?.description)
    setDueDate(activeCard?.dueDate ? moment(activeCard?.dueDate) : null)
    setIsDone(activeCard?.isDone || false)
  }, [activeCard])

  const handleAddNewCommnet = () => {
    if (!contentOfComment || contentOfComment === '') {
      return
    }

    updateCardAPI(
      activeCard._id,
      {
        userAvatar: currentActiveUser.avatar,
        userName: currentActiveUser.username,
        commentedAt: Date.now(),
        content: contentOfComment
      }
    ).then(() => {
      const newActiveCard = cloneDeep(activeCard)
      const comments = newActiveCard.comments

      comments.unshift({
        userId: currentActiveUser._id,
        userEmail: currentActiveUser.email,
        userAvatar: currentActiveUser.avatar,
        userName: currentActiveUser.username,
        commentedAt: Date.now(),
        content: contentOfComment
      })


      dispatch(updateActiveCard(newActiveCard))

      const newBoard = cloneDeep(activeBoard)
      const columns = newBoard.columns

      for (let i = 0; i < columns.length; i++) {
        if (columns[i]._id != activeCard?.columnId) {
          continue
        }

        const cards = columns[i].cards
        for (let j = 0; j < cards.length; j++) {
          if (cards[j]._id == activeCard?._id) {
            cards[j].comments = comments
            break
          }
        }

        break
      }

      dispatch(updateCurrentActiveBoard(newBoard))
    })

    setContentOfCommnet('')
  }

  const toggleDisplayComments = () => {
    setShowComments(!showComments)
  }

  const openEditingMarkDown = () => {
    setIsEditingMarkDown(true)
  }

  const hanldeCloseEditingMarkDown = () => {
    const newDescription = markDownValue ? markDownValue.trim() : ''
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
    setDisplayedCommentsCount(5)
    setIsEditingMarkDown(false)
    setContentOfCommnet('')
    dispatch(clearActiveCard())
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

  const handleUpdateDueDate = (newDate) => {
    const newDueDate = newDate ? moment(newDate).valueOf() : newDate

    if (newDueDate === activeCard?.dueDate) return

    updateCardAPI(activeCard?._id, { dueDate: newDueDate }).then(
      () => {
        const newActiveCard = cloneDeep(activeCard)
        newActiveCard.dueDate = newDueDate

        dispatch(updateActiveCard(newActiveCard))

        const newBoard = cloneDeep(activeBoard)
        const columns = newBoard.columns

        for (let i = 0; i < columns.length; i++) {
          if (columns[i]._id != activeCard?.columnId) {
            continue
          }

          const cards = columns[i].cards
          for (let j = 0; j < cards.length; j++) {
            if (cards[j]._id == activeCard?._id) {
              cards[j].dueDate = newDueDate
              break
            }
          }

          break
        }

        dispatch(updateCurrentActiveBoard(newBoard))
      }
    )
  }

  const handleUpdateIsComplete = () => {
    const newStatus = !isDone
    updateCardAPI(activeCard._id, {
      isDone: newStatus
    }).then(() => {
      const newActiveCard = cloneDeep(activeCard)
      newActiveCard.isDone = newStatus

      dispatch(updateActiveCard(newActiveCard))

      const newBoard = cloneDeep(activeBoard)
      const columns = newBoard.columns

      for (let i = 0; i < columns.length; i++) {
        if (columns[i]._id != activeCard?.columnId) {
          continue
        }

        const cards = columns[i].cards
        for (let j = 0; j < cards.length; j++) {
          if (cards[j]._id == activeCard?._id) {
            cards[j].isDone = newStatus
            break
          }
        }

        break
      }

      dispatch(updateCurrentActiveBoard(newBoard))
      setIsDone(newStatus)
    })
  }

  return (
    <Modal
      open={isDisplayActiveCard}
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
          (activeCard?.cover || !isEdittingCardTitle) &&
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 8,
              zIndex: 1,
              display: 'flex',
              gap: 1
            }} >
            <Button component="label" sx={buttonCardIconStyle}>
              <ImageIcon fontSize="small" />
              <VisuallyHiddenInput
                type="file"
                onChange={handleUploadCardCover}
                multiple
              />
            </Button>
            <Button sx={buttonCardIconStyle} onClick={handleCloseCardModal}>
              <CloseIcon fontSize="small" />
            </Button>
          </Box>
        }

        {/*First section*/}
        {/*Card cover*/}
        {
          activeCard?.cover &&
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
              src={activeCard?.cover}
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
            initialTitle={activeCard?.title}
            onSave={handleUpdateCardTitle}
            size={30}
            getIsEditing={setIsEditingCardTitle}
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

          {/*Utils*/}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 1
            }} >
            <Button
              onClick={handleUpdateIsComplete}
              variant="outlined"
              sx={{
                padding: 0.6,
                gap: 1
              }}>
              {isDone ?
                <>
                  <CheckBoxIcon fontSize={'medium'} />
                  <Typography>
                    Done
                  </Typography>
                </>
                :
                <>
                  <CheckBoxOutlineBlankIcon fontSize={'medium'} />
                  <Typography>
                    Not Done
                  </Typography>
                </>
              }
            </Button>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <ButtonFieldDateTimePicker
                value={dueDate}
                onChange={(newDueDate) => {
                  if (!newDueDate) {
                    handleUpdateDueDate(null)
                  }

                  setDueDate(newDueDate)
                }
                }
                onAccept={handleUpdateDueDate}
                slotProps={{
                  actionBar: {
                    actions: ['clear', 'accept']
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
          {/*Avatar group*/}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" fontWeight={'bold'} >
              Members
            </Typography>
            <GroupAvatar boardUsers={activeBoard.boardUsers} limit={3} />
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
          {isEditingMarkDown &&

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
            </Box>}
          {!isEditingMarkDown &&
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
              </Box>)}
          {showComments &&
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" fontWeight={'bold'} >
                Comments
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {
                  activeCard?.comments.slice(0, displayedCommentsCount).map((comment, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                      }}>
                      <Avatar
                        alt={comment.userName}
                        src={comment.userAvatar}
                        sx={{ width: 32, height: 32, marginTop: 1 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{
                          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#3A3A3A' : '#EAEBEF',
                          p: 1,
                          borderRadius: 1,
                          mt: 0.5
                        }}>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 0.5
                            }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {comment.userName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary">
                              {comment.userEmail}
                            </Typography>
                          </Box>
                          <Typography>
                            {comment.content}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary">
                            {moment(comment.commentedAt).fromNow()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))
                }
                {
                  activeCard?.comments.length > displayedCommentsCount &&
                  <Button
                    onClick={() => setDisplayedCommentsCount(displayedCommentsCount + 5)}
                    variant="outlined"
                    sx={{
                      px: 3,
                      py: 1,
                      alignSelf: 'center',
                      color: '#050505', // màu chữ kiểu Facebook
                      borderColor: '#ccc',
                      borderRadius: '999px', // bo tròn cực đại
                      textTransform: 'none', // không viết hoa
                      fontWeight: 500,
                      fontSize: 12,
                      backgroundColor: '#f0f2f5',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: '#e4e6eb',
                        borderColor: '#bbb',
                        boxShadow: 'none'
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    Load more
                  </Button>
                }
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mt: 2 }}>
                <Avatar alt={currentActiveUser.username} src={currentActiveUser.avatar}
                  sx={{ width: '32px', height: '32px' }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder='Add a comment'
                  value={contentOfComment}
                  onChange={(e) => { setContentOfCommnet(e.target.value) }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleAddNewCommnet()
                    }
                  }}
                />
                <Button onClick={handleAddNewCommnet}>
                  <SendIcon />
                </Button>
              </Box>
            </Box>}
        </Box>
        <Box sx={{
          left: '50%',
          transform: 'translateX(-50%)',
          position: 'absolute',
          bottom: -60,
          zIndex: 10
        }}>
          <Button
            onClick={toggleDisplayComments}
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
