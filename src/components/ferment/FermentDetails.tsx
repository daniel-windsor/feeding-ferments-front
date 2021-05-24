import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import { IFerment } from '../../types/ferment'
import { useFermentStore } from '../../store'

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  }
}))

interface IProps extends IFerment { }

const FermentDetails = (props: IProps) => {
  const classes = useStyles()
  const fermentStore = useFermentStore()

  return (
    <Paper className={classes.root}>
      <Typography>Details</Typography>
      <table>
        <tr>
          <td>Last Fed:</td>
          <td>{fermentStore.lastFed}</td>
        </tr>
        <tr>
          <td>Next Feed:</td>
          <td>{fermentStore.nextFeed}</td>
        </tr>
      </table>
    </Paper>
  )
}

export default FermentDetails
