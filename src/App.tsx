import React, { Suspense } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'
import './App.css';

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  FirebaseStoreProvider,
  FermentStoreProvider
} from './store'

import LoadingRoute from './components/common/LoadingRoute'

import NavBar from './components/nav/Navbar'
import AuthContainer from './components/auth/AuthContainer'
import Dashboard from './components/dashboard/Dashboard'
import FermentProfile from './components/ferment/FermentProfile';

let theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: "filled",
      fullWidth: true
    },
  },
  overrides: {
    MuiFormControl: {
      root: {
        position: 'relative',
        margin: 0,
        marginBottom: 24,
      },
      marginNormal: {
        marginTop: 0,
        marginBottom: 24
      }
    },
    MuiFormHelperText: {
      root: {
        position: "absolute",
        bottom: -20,
        left: 0
      }
    },
    MuiButton: {
      root: {
        minHeight: 36
      }
    },
    MuiPaper: {
      root: {
        overflow: 'hidden'
      }
    },
    MuiDialog: {
      root: {
        maxWidth: 'sm',
      },
    },
    MuiTypography: {
      root: {
        whiteSpace: "pre"
      }
    }
  },
  palette: {
    primary: {
      main: "#21381E"
    },
    secondary: {
      main: "#6E8D80"
    },
    warning: {
      main: "#381e21"
    },
    background: {
      default: "#D6D4C4"
    }
  },
  typography: {
    subtitle2: {
      color: "red",
      marginTop: 12
    }
  }
})

theme = responsiveFontSizes(theme)

const AppWrapper = () => {
  return (
    <Router>
      <Route path="*">
        <App />
      </Route>
    </Router>
  )
}

const App = () => {
  const location = useLocation()

  return (
    <div style={{ height: "100vh" }} className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <FirebaseStoreProvider>
            <Switch location={location}>
              <Suspense fallback={<LoadingRoute />}>
                <FermentStoreProvider>
                  <Route path='/' component={NavBar} />
                  <Route exact path='/' component={AuthContainer} />
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/ferment/:fermentId' component={FermentProfile} />
                </FermentStoreProvider>
              </Suspense>
            </Switch>
          </FirebaseStoreProvider>
        </CssBaseline>
      </ThemeProvider>
    </div >
  )
}

export default AppWrapper;
