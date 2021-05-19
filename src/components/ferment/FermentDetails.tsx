
import { format } from 'date-fns'

import { IFerment } from '../../types/ferment'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  imageContainer: {
    height: 200
  },
  headerText: {
    paddingLeft: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: "100%"
  }
}))

interface IProps extends IFerment { }

const FermentDetails = (props: IProps) => {
  const classes = useStyles()

  return (
    <Paper>
      <Grid container>
        <Grid item xs={5} className={classes.imageContainer}>

        </Grid>
        <Grid item xs={7} className={classes.headerText}>
          <Typography variant='h2'>{props.name}</Typography>
          <Typography variant='h6'>{props.type}</Typography>
          <Typography variant='h6'>Date of Birth: </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default FermentDetails