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
import DirectionForm from './DirectionForm'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6),
    minHeight: `calc(100% - ${theme.spacing(6) * 2}px)`,
    boxSizing: "border-box"
  }
}))

type FermentParams = {
  fermentId: string
}

const FermentProfile = () => {
  const fermentStore = useFermentStore()
  const classes = useStyles()
  const { fermentId } = useParams<FermentParams>()

  useEffect(() => {
    fermentStore.getFermentDirections(fermentId)
  }, [])

  return (
    <Container className={classes.root}>
      <Grid container direction="row" spacing={2}>
        <Grid container item xs={12} md={6} direction="column">
          {fermentStore.activeFerment &&
            <>
              <Grid item>
                <FermentHeader {...fermentStore.activeFerment} />
              </Grid>
              <Grid item>
                <FermentDetails {...fermentStore.activeFerment} />
              </Grid>
            </>
          }
        </Grid>

        <Grid item xs={12} md={6}>
          <FermentDirections {...fermentStore.activeDirections} />
        </Grid>
      </Grid>

      <DirectionForm />
    </Container>
  )
}

export default observer(FermentProfile)
