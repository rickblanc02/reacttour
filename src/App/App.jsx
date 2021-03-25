import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

//import menu
import { Navbar, Nav,NavDropdown , Form, FormControl, Button } from 'react-bootstrap';
import { TimeUtc } from '../components/time-utc/TimeUtc';
import { LoginTuten } from '../components/login-tuten/LoginTuten';

function App() {
    const alert = useSelector(state => state.alert);
    const times = useSelector(state => state.times);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron">
            <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">
      Tuten 
   {times.time &&                       
                        <span className="badge badge-pill badge-success">{times.time.time}</span>                        
                    }
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="time">Api Time</Nav.Link>
      <Nav.Link href="loginTuten">Api Rest Tuten</Nav.Link>
      {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown>*/}
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }

                   
                   
                    <Router history={history}>
                        <Switch>
                            {/*<PrivateRoute exact path="/" component={HomePage} /> */}
                            <PrivateRoute exact path="/" component={TimeUtc} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/time" component={TimeUtc} />
                            <Route path="/loginTuten" component={LoginTuten} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };