import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { IRegisterCredentials } from '../../types/user'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import AsyncButton from '../common/AsyncButton'

import { useFirebaseStore } from '../../store'

const RegisterSchema = Yup.object().shape({
  displayName: Yup.string()
    .required('Please enter your name'),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter a password"),
  passwordConf: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Please re-enter your password")
})

const RegisterForm = () => {
  const history = useHistory()
  const firebaseStore = useFirebaseStore()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConf: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values: IRegisterCredentials) => {
      if (error) setError(undefined)
      firebaseStore.signUp(values)
        .then(() => setSuccess(true))
        .catch(err => {
          setError(err.response.data.message)
          formik.setSubmitting(false)
        })
    }
  })

  const successCallback = () => {
    history.replace('/dashboard')
    firebaseStore.toggleAuth()
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name='displayName'
        label='Name'
        value={formik.values.displayName}
        onChange={formik.handleChange}
        error={formik.touched.displayName && Boolean(formik.errors.displayName)}
        helperText={formik.touched.displayName && formik.errors.displayName}
        fullWidth
      />

      <TextField
        name='email'
        label='Email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
      />

      <TextField
        name='password'
        label='Password'
        type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
      />

      <TextField
        name='passwordConf'
        label='Confirm Password'
        type='password'
        value={formik.values.passwordConf}
        onChange={formik.handleChange}
        error={formik.touched.passwordConf && Boolean(formik.errors.passwordConf)}
        helperText={formik.touched.passwordConf && formik.errors.passwordConf}
        fullWidth
      />

      <AsyncButton
        text="Sign Up"
        onClick={formik.handleSubmit}
        isSubmitting={formik.isSubmitting}
        isSuccess={success}
        successCallback={successCallback}
        fullWidth
      />

      {Boolean(error) &&
        <Typography variant='subtitle2'>{error}</Typography>
      }
    </form>
  )
}

export default RegisterForm
