import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import firebase from 'firebase/app'

import { ILoginCredentials } from '../../types/user'

import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button"

import {
  useFirebaseStore
} from '../../store'

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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values: ILoginCredentials) => {
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      firebaseStore.toggleAuth()
      history.replace('/dashboard')
    }
  })

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

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
      >Log in</Button>
    </form>
  )
}

export default LoginForm
