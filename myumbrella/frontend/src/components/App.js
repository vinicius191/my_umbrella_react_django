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
import Favourites from './weather/Favourites';

class App extends Component {

    componentDidMount() {
        this.props.authCheckState();
    }

    static propTypes = {
        authCheckState: PropTypes.func.isRequired
    }

    render() {
        return (
            <Fragment>
                <Header {...this.props} authLogout={actions.authLogout} />
                <Switch>
                    <Route exact path="/" 
                        render={() => <Weather {...this.props} token={this.props.token}/>}
                    />
                    <Route exact path="/favourites"
                        render={(props) => (<Favourites {...props} isAuthenticated={this.props.isAuthenticated} {...this.props}/>)}
                    />
                    <Route exact path="/login" 
                        render={(props) => (<Login {...props} isAuthenticated={this.props.isAuthenticated} {...this.props}/>)}
                    />
                    <Route exact path="/register"
                        render={(props) => (<Register {...props} isAuthenticated={this.props.isAuthenticated} {...this.props}/>)}
                    />
                    <Route exact path="/logout"
                        render={(props) => (<Logout {...props} isAuthenticated={this.props.isAuthenticated} {...this.props}/>)}
                    />
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    var _check;
    var _token;
    if(localStorage.getItem('token')!==null){
        _check = true;
        _token = localStorage.getItem('token');
    } else {
        if(!state.auth.token) {
            _check = false;       
        } else {
            _check = true;
            _token = state.auth.token
        }
    }
    return {
        isAuthenticated: _check,
        auth: state.auth,
        token: _token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState)
    }
}

export default withRouter(connect(mapStateToProps, {authCheckState})(App));
