
import { observer } from 'mobx-react-lite'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { useFermentStore } from '../../store'
import FermentDetails from './FermentDetails'
import FermentDirections from './FermentDirections'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6)
  }
}))

const FermentProfile = () => {
  const { activeFerment } = useFermentStore()
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {activeFerment &&
            <FermentDetails {...activeFerment} />
          }
        </Grid>
        <Grid item>
          <FermentDirections />
        </Grid>
      </Grid>
    </Container>
  )
}

export default observer(FermentProfile)
