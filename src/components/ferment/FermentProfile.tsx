
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { useFermentStore } from '../../store'
import FermentHeader from './FermentHeader'
import FermentDetails from './FermentDetails'
import FermentDirections from './FermentDirections'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6)
  }
}))

type FermentParams = {
  fermentId: string
}

const FermentProfile = () => {
  const fermentStore = useFermentStore()
  const classes = useStyles()
  const { fermentId } = useParams<FermentParams>()

  return (
    <Container className={classes.root}>
      <Grid container direction="row" spacing={2}>
        <Grid container item xs={12} md={6} direction="column">
          <Grid item>
            {fermentStore.activeFerment &&
              <FermentHeader {...fermentStore.activeFerment} />
            }
          </Grid>
          <Grid item>
            <FermentDetails />
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <FermentDirections />
        </Grid>
      </Grid>
    </Container>
  )
}

export default observer(FermentProfile)
