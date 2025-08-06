import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import useForkRef from '@mui/utils/useForkRef'
import { useValidation, validateDateTime } from '@mui/x-date-pickers/validation'
import {
  useSplitFieldProps,
  usePickerContext
} from '@mui/x-date-pickers/hooks'
import {
  Button,
  Typography
} from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  updateActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { updateCardAPI } from '~/apis'
import {
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'
import { useState } from 'react'
import moment from 'moment'

// Custom button update due date
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

const DateTimePickerButton = ({ activeCard, activeBoard }) => {
  const dispatch = useDispatch()


  const [dueDate, setDueDate] = useState(
    activeCard?.dueDate ? moment(activeCard?.dueDate) : null
  )

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

  return (
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
  )
}

export default DateTimePickerButton
