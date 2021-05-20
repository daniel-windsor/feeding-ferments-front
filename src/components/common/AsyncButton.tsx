import { useState, useEffect } from 'react'

import { CSSTransition, SwitchTransition } from 'react-transition-group'
import PropagateLoader from 'react-spinners/PropagateLoader'

import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

// Values are component indexes in array
enum buttonStatus {
  init = 0,
  submitting = 1,
  success = 2,
  error = 3
}

interface IProps {
  text: string,
  isSubmitting: boolean
  isSuccess: boolean,
  fullWidth: boolean,
  onClick: () => void,
  successCallback: () => void
}

const AsyncButton = (props: IProps) => {
  const classes = useStyles()
  const [status, setStatus] = useState<buttonStatus>(() => buttonStatus.init)

  // Manage display and state changes
  useEffect(() => {
    if (props.isSubmitting) setStatus(buttonStatus.submitting)

    if (status === buttonStatus.submitting && !props.isSubmitting && !props.isSuccess) {
      setStatus(buttonStatus.error)
      setTimeout(() => {
        setStatus(buttonStatus.init)
      }, 1500)
    }
  }, [props.isSubmitting])

  useEffect(() => {
    if (props.isSuccess) {
      setStatus(buttonStatus.success)
      setTimeout(() => {
        props.successCallback()
        setStatus(buttonStatus.init)
        console.log('async complete')
      }, 1500)
    }
  }, [props.isSuccess])

  const components =
    [ 
      { transition: "slide", element: <div>{props.text}</div>},
      { transition: "fade", element: <PropagateLoader color="white" size={10} />},
      { transition: "slide", element: <CheckIcon />},
      { transition: "fade", element: <PriorityHighIcon />},
    ]

  return (
    <Button
      type='submit'
      color="primary"
      variant="contained"
      onClick={status === buttonStatus.init ? props.onClick : () => null}
      fullWidth={props.fullWidth}
      className={classes.button}
    >
      <SwitchTransition mode="out-in">
        <CSSTransition key={status} classNames={components[status].transition} timeout={200}>
          {components[status].element}
        </CSSTransition>
      </SwitchTransition>
    </Button>
  )
}

export default AsyncButton