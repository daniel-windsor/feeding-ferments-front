import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { useFirebaseStore } from '../../store'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: 6,
    marginLeft: 6,
    width: 100,
  }
}))

const AuthMenu = () => {
  const classes = useStyles()
  const firebaseStore = useFirebaseStore()

  return (
    <>
      <Button className={classes.button} variant="contained" color="secondary" name='login' onClick={() => firebaseStore.toggleAuth("login")}>
        Log In
      </Button>
      <Button className={classes.button} variant="contained" color="secondary" name='signup' onClick={() => firebaseStore.toggleAuth("signup")}>
        Sign Up
      </Button>
    </>
  )
}

export default AuthMenu
