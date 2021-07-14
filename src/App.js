import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Navbar from './components/layouts/Navbar'
import Login from './components/views/user/Login'
import Register from './components/views/user/Register'
import Home from './components/views/pages/Home'
import Contact from './components/views/pages/Contact'
import Service from './components/views/pages/Service'
import ErrorPage from './components/views/pages/ErrorPage'
import Dashboard from './components/views/admin/dashboard'
import DashboardTable from './components/views/admin/DashboardTable'
import DashboardLeptop from './components/views/admin/DashboardLeptop'

// import Parent from './components/views/ParentChild/Parent'
// import SeparateComponent from './components/views/ParentChild/SeparateComp'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    height: '115vh',
    overflowX: 'auto',
    overflowY: 'auto',
    backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(10)
  }
}))

function App () {
  const classes = useStyles()
  return (
    // <>
    //   <Parent />
    //   <Divider />
    //   <SeparateComponent />
    //   </>
    <BrowserRouter>
      <Container className={classes.root}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' render={(props) => localStorage.getItem('UserName') ? <Dashboard /> : <Login />} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/service' component={Service} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dashboardLeptop' component={DashboardLeptop} />
          <Route exact path='/dashboardTable' component={DashboardTable} />
          <Route component={ErrorPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
