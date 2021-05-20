import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import firebase from 'firebase/app'

import { ILoginCredentials } from '../../types/user'

import TextField from '@material-ui/core/TextField'

import AsyncButton from "../common/AsyncButton"

import {
  useFirebaseStore
} from '../../store'
import { Typography } from '@material-ui/core'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .required("Please enter your password")
})

const LoginForm = () => {
  const history = useHistory()
  const firebaseStore = useFirebaseStore()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values: ILoginCredentials) => {
      if (error) setError(undefined)
      try {
        await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        setSuccess(true)
      } catch (err) {
        setError('Incorrect email or password')
        formik.setSubmitting(false)
      }
    }
  })

  const successCallback = () => {
    history.replace('/dashboard')
    firebaseStore.toggleAuth()
  }

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <AsyncButton
        text="Log in"
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

export default LoginForm
