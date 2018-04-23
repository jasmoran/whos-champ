import * as React from 'react';
import { Route, NavLink, Router } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Auth from '../auth';

import Add from '../containers/Add';
import List from '../containers/List';
import Login from '../containers/Login';
import Leaders from './Leaders';
import Loading from './Loading';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

export interface Props {
  setAuth: (t: boolean) => void;
  updateData: () => void;
  updateLocation: () => void;
}

class App extends React.Component<Props> {
  auth: Auth;
  locationInterval: number;
  dataInterval: number;

  constructor(props: Props) {
    super(props);
    this.auth = new Auth(props.setAuth, history);
  }

  componentDidMount() {
    this.props.updateLocation();
    this.locationInterval = window.setInterval(this.props.updateLocation, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.locationInterval);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar fluid={true}>
            <Navbar.Header>
              <Navbar.Brand><NavLink to="/">Who's Champ</NavLink></Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer exact={true} to="/"><NavItem>Home</NavItem></LinkContainer>
                <LinkContainer to="/add"><NavItem>Add Result</NavItem></LinkContainer>
                <LinkContainer to="/results"><NavItem>All Results</NavItem></LinkContainer>
                <NavItem onClick={this.auth.logout}>Log Out</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Login login={this.auth.login} />
          <div className="container">
            <Route exact={true} path="/" component={Leaders} />
            <Route exact={true} path="/results" component={List} />
            <Route path="/add" component={Add} />
            <Route
              path="/callback"
              render={() => {
                if (/access_token|id_token|error/.test(window.location.hash)) {
                  this.auth.handleAuthentication();
                }
                return <Loading />;
              }}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
