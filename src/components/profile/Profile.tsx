import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import {
  useFirebaseStore
} from '../../store'
import ConfirmDialog from '../common/ConfirmDialog'

const useStyles = makeStyles(theme => ({
  danger: {
    backgroundColor: theme.palette.warning.main,
    color: 'white'
  }
}))

const Profile = () => {
  const firebaseStore = useFirebaseStore()
  const classes = useStyles()
  const history = useHistory()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    history.replace('/')
    firebaseStore.deleteAccount()
  }

  return (
    <Dialog
      open={firebaseStore.showProfile}
      onClose={() => firebaseStore.toggleProfile()}
    >
      <DialogTitle>{firebaseStore.user?.displayName}</DialogTitle>
      <DialogContent>
        <Typography variant='h6'>Danger Zone</Typography>
        <Button variant='contained' className={classes.danger} onClick={() => setShowConfirm(true)}>Delete Account</Button>
      </DialogContent>

      <ConfirmDialog
        open={showConfirm}
        title='Delete your account?'
        text='All your data will be lost.  This cannot be undone!'
        onAffirmative={handleDelete}
        onNegative={() => setShowConfirm(false)}
      />
    </Dialog>
  )
}

export default observer(Profile)