import { Suspense } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'
import './App.css';

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  FirebaseStoreProvider
} from './store'

import LoadingRoute from './components/common/LoadingRoute'

import NavBar from './components/Nav/Navbar'
import AuthContainer from './components/auth/AuthContainer'
import Dashboard from './components/dashboard/Dashboard'

const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: "filled"
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        marginTop: 12,
        marginBottom: 12,
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
    background: {
      default: "#D6D4C4"
    }
  }
})

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

              <Route path='/' component={NavBar} />

              <Route exact path='/' component={AuthContainer} />

              <Suspense fallback={<LoadingRoute />}>
                <Switch location={location}>
                  <Route path='/:displayName' component={Dashboard} />
                </Switch>
              </Suspense>
          </FirebaseStoreProvider>
        </CssBaseline>
      </ThemeProvider>
    </div >
  )
}

export default AppWrapper;
