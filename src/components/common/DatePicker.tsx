import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { FormikErrors } from 'formik'

interface IProps {
  name: string,
  label: string,
  value: Date,
  onChange: (e: any) => void,
  error: boolean | undefined,
  helperText: FormikErrors<Date> | undefined
}

const DatePicker = (props: IProps) => {
  const handleDateChange = (date: Date | null) => {
    props.onChange({ target: { name: props.name, value: date } })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name={props.name}
        label={props.label}
        value={props.value}
        variant="dialog"
        inputVariant="filled"
        format="dd/MM/yyyy"
        margin="normal"
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        fullWidth
      />

    </MuiPickersUtilsProvider>
  )
}

export default DatePicker