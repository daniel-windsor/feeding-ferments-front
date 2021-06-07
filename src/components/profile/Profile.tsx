import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ConfirmDialog from '../common/ConfirmDialog'

import { useFirebaseStore } from '../../store'

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
    <>
      <Typography variant='h6'>Danger Zone</Typography>
      <Button variant='contained' className={classes.danger} onClick={() => setShowConfirm(true)}>Delete Account</Button>


      <ConfirmDialog
        open={showConfirm}
        title='Delete your account?'
        text='All your data will be lost.  This cannot be undone!'
        onAffirmative={handleDelete}
        onNegative={() => setShowConfirm(false)}
      />
    </>
  )
}

export default Profile