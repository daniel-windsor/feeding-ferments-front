import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

interface IProps {
  open: boolean,
  title: string,
  text: string,
  onAffirmative: () => void,
  onNegative: () => void
}

const ConfirmDialog = (props: IProps) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onNegative}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{props.text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onNegative}>No</Button>
        <Button onClick={props.onAffirmative}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog