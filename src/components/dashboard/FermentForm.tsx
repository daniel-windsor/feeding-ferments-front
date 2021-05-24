import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import HelperText from '@material-ui/core/FormHelperText'

import { EFrequency, INewFerment } from '../../types/ferment'

import { useFermentStore } from '../../store'

import DatePicker from '../common/DatePicker'

const FermentSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a name for your ferment"),
  type: Yup.string()
    .required("Please enter a ferment type"),
  dob: Yup.date()
    .required("Please enter a date of birth"),
  frequency: Yup.string()
    .required("Please enter a frequency"),
  lastFed: Yup.string()
    .required("Please enter a date")
})

const FermentForm = () => {
  const fermentStore = useFermentStore()
  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      dob: new Date(),
      frequency: EFrequency.daily,
      lastFed: new Date()
    },
    validationSchema: FermentSchema,
    onSubmit: async (values: INewFerment) => {
      fermentStore.createFerment(values)
      formik.resetForm()
    }
  })

  const handleCancel = () => {
    fermentStore.toggleFermentForm()
    formik.resetForm()
  }

  return (
    <Dialog
      open={fermentStore.showFermentForm}
      onClose={handleCancel}
    >
      <DialogTitle>Add New Ferment</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name='name'
            label='Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />

          <TextField
            name='type'
            label='Type'
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
            fullWidth
          />

          <DatePicker
            name='dob'
            label='Date of Birth'
            value={formik.values.dob}
            onChange={formik.handleChange}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />

          <FormControl fullWidth variant="filled">
            <InputLabel id="frequency-select">How often does this ferment need to be fed?</InputLabel>
            <Select
              name="frequency"
              labelId="frequency-select"
              value={formik.values.frequency}
              onChange={formik.handleChange}
              fullWidth
            >
              <MenuItem value={EFrequency.daily}>{EFrequency.daily}</MenuItem>
              <MenuItem value={EFrequency.twoDays}>{EFrequency.twoDays}</MenuItem>
              <MenuItem value={EFrequency.threeDays}>{EFrequency.threeDays}</MenuItem>
              <MenuItem value={EFrequency.weekly}>{EFrequency.weekly}</MenuItem>
              <MenuItem value={EFrequency.fortnightly}>{EFrequency.fortnightly}</MenuItem>
              <MenuItem value={EFrequency.monthly}>{EFrequency.monthly}</MenuItem>
            </Select>
            <HelperText error={formik.touched.frequency && Boolean(formik.errors.frequency)}>
              {formik.touched.frequency && formik.errors.frequency}
            </HelperText>
          </FormControl>

          <DatePicker
            name='lastFed'
            label='When was this ferment last fed?'
            value={formik.values.lastFed}
            onChange={formik.handleChange}
            error={formik.touched.lastFed && Boolean(formik.errors.lastFed)}
            helperText={formik.touched.lastFed && formik.errors.lastFed}
          />

        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={() => formik.handleSubmit()}>Save</Button>
      </DialogActions>
    </Dialog>
  )

}

export default observer(FermentForm)
