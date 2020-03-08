import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Weather from './weather/Weather';
import { Header } from './layout/Header';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import * as actions from '../actions/auth';
import Login from './auth/Login';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        console.log('props', this.props)
        return (
            <Fragment>
                <Header {...this.props} />
                <Switch>
                    <Route
                        exact 
                        path="/" 
                        render={() => <Weather {...this.props}/>}
                    />
                    <Route 
                        exact
                        path="/login" 
                        render={() => <Login {...this.props}/>}
                    />
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    let _check;
    if(!state.token) {
        _check = false;
    } else {
        _check = true;
    }
    return {
        isAuthenticated: _check
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
