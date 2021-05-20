import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}))

const FermentDetails = () => {
  const classes = useStyles()
  
  return (
    <Paper className={classes.root}>
      <Typography>Details</Typography>
    </Paper>
  )
}

export default FermentDetails
