import { lazy } from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation, useHistory } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useFirebaseStore, useFermentStore } from '../../store'

import UserMenu from './UserMenu'
import AuthMenu from './AuthMenu'

const FermentForm = lazy(() => import('../dashboard/FermentForm'))

const Navbar = () => {
  const firebaseStore = useFirebaseStore()
  const fermentStore = useFermentStore()
  const { pathname } = useLocation()
  const history = useHistory()

  return (
    <AppBar position="static">
      <Toolbar>
        <Fade timeout={150} in={pathname.includes('ferment')}>
          <IconButton color="inherit" onClick={() => history.push('/dashboard')}>
            <ArrowBackIcon />
          </IconButton>
        </Fade>

        <div style={{ flex: 1 }} />

        <Fade timeout={150} in={pathname.includes('ferment')}>
          <IconButton color="inherit" onClick={() => fermentStore.setShowFermentForm(true)}>
            <CreateIcon />
          </IconButton>
        </Fade>

        {!firebaseStore.user &&
          <AuthMenu />
        }

        {firebaseStore.user &&
          <UserMenu />
        }

        <FermentForm key={fermentStore.activeFerment?._id} />
      </Toolbar>
    </AppBar>
  )
}

export default observer(Navbar)
