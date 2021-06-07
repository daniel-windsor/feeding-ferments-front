import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { IFerment } from '../../types/ferment'
import { useFermentStore } from '../../store'

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.light,
    position: 'relative'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 'small'
  },
  buttonBar: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: 16,
    marginBottom: -theme.spacing(4),
    marginLeft: -theme.spacing(2),
    marginRight: -theme.spacing(2),
    padding: theme.spacing(2)
  }
}))

interface IProps extends IFerment { }

const FermentDetails = (props: IProps) => {
  const classes = useStyles()
  const fermentStore = useFermentStore()

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography className={classes.header}>Date of birth:</Typography>
          <Typography>{fermentStore.dob}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography className={classes.header}>Age</Typography>
          <Typography>{fermentStore.age}</Typography>

        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.header}>Last fed:</Typography>
          <Typography>{fermentStore.lastFed}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography className={classes.header}>Feed frequency:</Typography>
          <Typography>{props.frequency}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography className={classes.header}>Next feed due:</Typography>
          <Typography>{fermentStore.nextFeed}</Typography>
        </Grid>
      </Grid>

      <div className={classes.buttonBar}>
        <Button variant="outlined" color="inherit" onClick={() => fermentStore.feedFerment()}>Feed Now</Button>
      </div>
    </Paper>
  )
}

export default FermentDetails
