import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'

import { useFermentStore } from '../../store'
import FermentForm from './FermentForm'
import FermentCardContainer from './FermentCardContainer'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(6),
    right: theme.spacing(6)
  },
  root: {
    marginTop: theme.spacing(6)
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  const fermentStore = useFermentStore()

  return (
    <Container className={classes.root}>
      <FermentCardContainer />

      <Fab color='primary' className={classes.fab} onClick={() => fermentStore.toggleFermentForm()}>
        <AddIcon />
      </Fab>

      <FermentForm />
    </Container>
  )
}

export default Dashboard