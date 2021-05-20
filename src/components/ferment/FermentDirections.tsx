import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100% + ${theme.spacing(2)}px)`,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2)
    }
  }
}))

const FermentDirections = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Typography>Directions</Typography>
    </Paper>
  )
}

export default FermentDirections