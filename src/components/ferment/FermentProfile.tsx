import { observer } from 'mobx-react-lite'

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

const FermentProfile = () => {
  const fermentStore = useFermentStore()
  const classes = useStyles()

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
          <FermentDirections />
        </Grid>
      </Grid>

      <DirectionForm />
    </Container>
  )
}

export default observer(FermentProfile)
