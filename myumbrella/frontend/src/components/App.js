import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Weather from './weather/Weather';
import Header from './layout/Header';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import * as actions from '../actions/auth';
import {authCheckState} from '../actions/auth';
import Login from './auth/Login';
import Register from './auth/Register';
import PropTypes from 'prop-types';
import Logout from './auth/Logout';

class App extends Component {

    componentDidMount() {
        console.log('here mount')
        this.props.authCheckState();
    }

    static propTypes = {
        authCheckState: PropTypes.func.isRequired
    }

    render() {
        console.log('props', this.props.isAuthenticated)
        return (
            <Fragment>
                <Header {...this.props} authLogout={actions.authLogout} />
                <Switch>
                    <Route
                        exact 
                        path="/" 
                        render={() => <Weather {...this.props}/>}
                    />
                    <Route path="/login" 
                        render={(props) => (<Login {...props} isAuthenticated={this.props.isAuthenticated} {...this.props}/>)}
                    />
                    <Route
                        exact
                        path="/register"
                        render={() => <Register {...this.props}/>}
                    />
                    <Route
                        exact
                        path="/logout"
                        render={(props) => (<Logout {...props} isAuthenticated={this.props.isAuthenticated} {...this.props}/>)}
                    />
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    let _check;
    if(localStorage.getItem('token')!==null){
        _check = true;
    } else {
        if(!state.auth.token) {
            _check = false;       
        } else {
            _check = true;
        }
    }
    return {
        isAuthenticated: _check,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState)
    }
}

export default withRouter(connect(mapStateToProps, {authCheckState})(App));
