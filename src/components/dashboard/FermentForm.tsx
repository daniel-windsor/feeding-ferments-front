import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'


import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { INewFerment } from '../../types/ferment'

import { useFermentStore } from '../../store'

import DatePicker from '../common/DatePicker'

const FermentSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a name for your ferment"),
  type: Yup.string()
    .required("Please enter a ferment type"),
  dob: Yup.date()
    .required("Please enter a date of birth")
})

const FermentForm = () => {
  const fermentStore = useFermentStore()
  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      dob: new Date()
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
