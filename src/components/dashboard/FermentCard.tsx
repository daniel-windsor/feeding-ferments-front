import { useHistory } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import { makeStyles } from '@material-ui/core/styles'

import { IFerment } from '../../types/ferment'
import { useFermentStore } from '../../store'

interface IProps extends IFerment { }

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minHeight: 250,
    height: "100%",
    cursor: 'pointer'
  },
  imageContainer: {
    height: 200,
    width: "100%",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
  },
  textContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}))

const FermentCard = (props: IProps) => {
  const classes = useStyles()
  const history = useHistory()
  const fermentStore = useFermentStore()

  const handleSelect = () => {
    fermentStore.setActiveFerment(props._id)
    history.push(`/ferment/${props._id}`)
  }

  return (
    <Paper className={classes.root} onClick={handleSelect}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src="http://cdn.everybodylovesitalian.com/wp-content/uploads/2018/09/italian-bread.jpg" />
      </div>
      <Container className={classes.textContainer}>
        <Typography variant='h4'>
          {props.name}
        </Typography>
        <Typography variant='h6'>
          {props.type}
        </Typography>
      </Container>
    </Paper>
  )

}

export default FermentCard
