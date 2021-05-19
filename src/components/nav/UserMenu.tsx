import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

import { useFirebaseStore } from '../../store'

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | undefined>()
  const firebaseStore = useFirebaseStore()
  const history = useHistory()

  const handleMenu = (e: any) => {
    setAnchorEl(e.currentTarget)
  }

  const handleLogOut = () => {
    setAnchorEl(undefined)
    history.replace('/')
    firebaseStore.logout()
  }

  return (
    <>
      <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenu}>
        <MenuIcon />
      </IconButton>
      < Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(undefined)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
      >
        <MenuItem onClick={() => firebaseStore.setShowProfile(true)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </MenuItem>
      </Menu >
    </>
  )
}

export default UserMenu