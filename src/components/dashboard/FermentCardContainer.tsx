import { observer } from 'mobx-react-lite'

import Grid from '@material-ui/core/Grid'

import { useFermentStore } from '../../store'
import FermentCard from './FermentCard'

const FermentCardContainer = () => {
  const fermentStore = useFermentStore()

  return (
    <Grid container spacing={2}>
      {fermentStore.ferments.map(ferment => (
        <Grid item key={ferment._id} xs={12} sm={6} md={4} lg={3}>
          <FermentCard {...ferment} />
        </Grid>
      ))}
    </Grid>
  )
}

export default observer(FermentCardContainer)