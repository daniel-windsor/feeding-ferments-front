import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useFermentStore } from '../../store'
import { IDirections } from '../../types/directions'

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100% + ${theme.spacing(2)}px)`,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  tabs: {
    margin: -theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    height: "100%"
  },
  textContainer: {
    flex: 1
  },
  buttonBar: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: 16,
    margin: -theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    textAlign: 'right'
  }
}))

interface IProps extends Array<IDirections> { }

const FermentDirections = (props: IProps) => {
  const classes = useStyles()
  const fermentStore = useFermentStore()
  const { directionIndex } = fermentStore

  const handleChangeTab = (e: React.ChangeEvent<{}>, value: number) => {
    fermentStore.setDirectionIndex(value)
  }

  console.log(directionIndex)

  return (
    <Paper className={classes.root}>
      <Tabs value={directionIndex} onChange={handleChangeTab} className={classes.tabs} variant="scrollable" scrollButtons="auto">
        {fermentStore.activeDirections.map(direction => (
          <Tab label={direction.title} key={direction.index} />
        ))}
      </Tabs>

      <div className={classes.tabContent}>
        <div className={classes.textContainer}>
          {props[directionIndex] &&
            <Typography variant="body1">{props[directionIndex].direction}</Typography>
          }
        </div>

        <div className={classes.buttonBar}>
          <Button variant="outlined" color="inherit" onClick={() => fermentStore.setShowDirectionForm(true)}>Add Directions</Button>
        </div>
      </div>

    </Paper>
  )
}

export default observer(FermentDirections)