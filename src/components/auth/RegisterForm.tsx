import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { RegisterCredentials } from '../../types/user'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConf: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values: RegisterCredentials) => {
      await firebaseStore.register(values)
      history.replace(`/${firebaseStore.user?.displayName}`)
    }
  })

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

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
      >Sign Up</Button>
    </form>
  )
}

export default RegisterForm
