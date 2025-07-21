import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

const BoardCreateModal = ({ open, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    defaultValues: {
      type: 'public' // Default value for the radio group
    }
  })

  const handleFormSubmit = (data) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form' }} onSubmit={handleSubmit(handleFormSubmit)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold' }}>Create New Board</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          To create a new board, please enter a title and choose its visibility.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Board Title"
          type="text"
          fullWidth
          variant="outlined"
          {...register('title', {
            required: 'Board title is required.',
            minLength: { value: 3, message: 'Min length is 3 characters' },
            maxLength: { value: 50, message: 'Max length is 50 characters' }
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ mb: 2 }}
        />
        <FormControl component="fieldset" sx={{ marginLeft: '10px' }}>
          <FormLabel component="legend">Visibility</FormLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row aria-label="board-type">
                <FormControlLabel value="public" control={<Radio />} label="Public" />
                <FormControlLabel value="private" control={<Radio />} label="Private" />
              </RadioGroup>
            )}
          />
        </FormControl>
        <TextField
          margin="dense"
          id="description"
          label="Description (Optional)"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          {...register('description')}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 16px 24px' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default BoardCreateModal
