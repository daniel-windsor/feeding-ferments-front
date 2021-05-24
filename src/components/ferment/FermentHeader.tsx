import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { IFerment } from '../../types/ferment'

const useStyles = makeStyles(theme => ({
  imageContainer: {
    height: 200,
    width: 200,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
  },
  headerText: {
    paddingLeft: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: "100%"
  },
  danger: {
    backgroundColor: theme.palette.warning.main,
    color: 'white'
  }
}))

interface IProps extends IFerment { }

const FermentDetails = (props: IProps) => {
  const classes = useStyles()

  return (
    <Paper>
      <Grid container>
        <Grid item xs={5} className={classes.imageContainer}>
          <img className={classes.image} src="http://cdn.everybodylovesitalian.com/wp-content/uploads/2018/09/italian-bread.jpg" />
        </Grid>
        <Grid item xs={7} className={classes.headerText}>
          <Typography variant='h2'>{props.name}</Typography>
          <Typography variant='h6'>{props.type}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default FermentDetails