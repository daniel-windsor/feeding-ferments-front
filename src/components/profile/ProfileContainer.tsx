import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'

import {
  useFirebaseStore
} from '../../store'
import Profile from './Profile'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}))

const ProfileContainer = () => {
  const firebaseStore = useFirebaseStore()
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('xs'))

  const handleChangeTab = (e: React.ChangeEvent<{}>, value: number) => {
    setActiveTab(value)
  }

  return (
    <Dialog
      open={firebaseStore.showProfile}
      onClose={() => firebaseStore.toggleProfile()}
      className={classes.root}
      maxWidth="md"
      fullWidth
      fullScreen={mobile}
    >
      <DialogTitle>
        <Tabs value={activeTab} onChange={handleChangeTab}>
          <Tab label="Profile" />
          <Tab label="Settings" />
        </Tabs>
      </DialogTitle>
      
      <DialogContent>
        {activeTab === 0 && <Profile />}

      </DialogContent>
    </Dialog>
  )
}

export default observer(ProfileContainer)