import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Backdrop from '@material-ui/core/Backdrop'

import { useFirebaseStore } from '../../store'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 64,
    right: 0,
    height: "calc(100% - 64px)",
    maxWidth: 500,
    width: "100%",
    zIndex: 2,
  },
}))

const AuthContainer = () => {
  const classes = useStyles()
  const firebaseStore = useFirebaseStore()

  return (
    <>
      <Backdrop
        open={Boolean(firebaseStore.showAuth)}
        onClick={() => firebaseStore.toggleAuth()}
        timeout={300}
        style={{ zIndex: 1 }}
        unmountOnExit
        mountOnEnter
      />
      <Slide
        direction='left'
        in={Boolean(firebaseStore.showAuth)}
        timeout={300}
        unmountOnExit
        mountOnEnter
      >
        <Paper elevation={4} className={classes.root}>
          <Fade
            in={Boolean(firebaseStore.showAuth)}
            timeout={300}
          >
            <Container>
              {firebaseStore.authType === "login" &&
                <LoginForm />
              }

              {firebaseStore.authType === "signup" &&
                <RegisterForm />
              }
            </Container>
          </Fade>
        </Paper>
      </Slide>
    </>
  )
}

export default observer(AuthContainer)