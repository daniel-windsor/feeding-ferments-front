
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import HelperText from '@material-ui/core/FormHelperText'

import { useFermentStore } from '../../store'
import AsyncButton from '../common/AsyncButton'
import { INewDirection } from '../../types/directions'

const DirectionSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter a title"),
  description: Yup.string()
})

const DirectionForm = () => {
  const fermentStore = useFermentStore()
  const [success, setSuccess] = useState(false)

  const formik = useFormik({
    initialValues: {
      direction: "",
      title: "",
      index: fermentStore.activeDirections?.length || 0,
      fermentId: fermentStore.activeFerment?._id || ''
    },
    validationSchema: DirectionSchema,
    onSubmit: async (values: INewDirection) => {
      if (fermentStore.activeFerment) {
        try {
          values.fermentId = fermentStore.activeFerment?._id
          values.index = fermentStore.activeDirections.length
  
          await fermentStore.createDirection(values)
          setSuccess(true)
        } catch (err) {
          formik.setSubmitting(false)
        }
      }
    }
  })

  const handleCancel = () => {
    fermentStore.setShowDirectionForm(false)
    formik.resetForm()
  }

  return (
    <Dialog
      open={fermentStore.showDirectionForm}
      onClose={handleCancel}
      fullWidth
    >
      <DialogTitle>Create directions</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name='title'
            label='Title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            name='direction'
            label='Directions'
            value={formik.values.direction}
            onChange={formik.handleChange}
            error={formik.touched.direction && Boolean(formik.errors.direction)}
            helperText={formik.touched.direction && formik.errors.direction}
            multiline
            rows={20}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <AsyncButton
          text="Submit"
          onClick={formik.handleSubmit}
          isSubmitting={formik.isSubmitting}
          isSuccess={success}
          successCallback={handleCancel}
          fullWidth={false}
        />
      </DialogActions>
    </Dialog>
  )
}

export default observer(DirectionForm)