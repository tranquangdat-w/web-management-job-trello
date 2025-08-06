import { Box, TextField, Typography } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FIELDS_REQUIRED_MESSAGE } from '~/utils/validators'
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert'
import { inviteUserToBoardAPI } from '~/apis'
import { intercepterLoadingElements } from '~/utils/formatters'

const InviteForm = ({ boardId }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenInvite = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseInvitePopUp = () => {
    setAnchorEl(null)
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const handleInviteUserToBoard = (data) => {
    intercepterLoadingElements(true)

    const { inviteeUserName } = data

    inviteUserToBoardAPI({
      inviteeUserName,
      boardId
    })
      .then(() => {
        // Clear input
        setValue('inviteeUserName', null)
        // Close popover
        handleCloseInvitePopUp()
        intercepterLoadingElements(false)
      })
  }

  const open = Boolean(anchorEl)
  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PersonAddAltIcon />}
        onClick={handleOpenInvite}
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#dcdfe4',
          color: 'black',
          border: 'none',
          '&:hover': {
            border: 'none',
            bgcolor: 'white'
          }
        }} >
        Invite
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseInvitePopUp}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            gap: 1
          }}>
          <Typography variant='body1' fontWeight='bold'>
            Enter username to invite to this board
          </Typography>
          <Box component="form"
            onSubmit={handleSubmit(handleInviteUserToBoard)} sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              justifyContent: 'right'
            }}>
            <TextField
              fullWidth
              placeholder='Enter username to invite'
              autoFocus={true}
              error={!!errors['inviteeUserName']}
              inputProps={{
                autoComplete: 'off'
              }}
              size='small'
              {...register('inviteeUserName', {
                required: FIELDS_REQUIRED_MESSAGE
              })} />
            <FieldErrorAlert errors={errors} fieldName={'inviteeUserName'} />

            <Box>
              <Button
                className="interceptor-loading"
                variant="contained"
                type="submit" >
                Invite
              </Button>
            </Box>
          </Box>

        </Box>
      </Popover>
    </Box>
  )
}

export default InviteForm
