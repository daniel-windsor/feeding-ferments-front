import { useHistory } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import { makeStyles } from '@material-ui/core/styles'

import { IFerment } from '../../types/ferment'
import { useFermentStore } from '../../store'

interface IProps extends IFerment {}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minHeight: 250,
    height: "100%",
    cursor: 'pointer'
  },
  image: {
    minHeight: 100
  },
  text: {
    // padding: 18
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
    <Fade in={true} timeout={150}>
      <Paper className={classes.root} onClick={handleSelect}>
        <div className={classes.image}>

        </div>
        <Container className={classes.text}>
          <Typography variant='h4'>
            {props.name}
          </Typography>
          <Typography variant='h6'>
            {props.type}
          </Typography>
        </Container>
      </Paper>
    </Fade>
  )

}

export default FermentCard
