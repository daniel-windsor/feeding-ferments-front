import { observer } from 'mobx-react-lite'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { useFirebaseStore } from '../../store'

import UserMenu from './UserMenu'
import AuthMenu from './AuthMenu'

const Navbar = () => {
  const firebaseStore = useFirebaseStore()

  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ flex: 1 }} />
        {!firebaseStore.user &&
          <AuthMenu />
        }

        {firebaseStore.user &&
          <UserMenu />
        }
      </Toolbar>
    </AppBar>
  )
}

export default observer(Navbar)
