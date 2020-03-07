import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import WeatherDisplay from './weather/WeatherDisplay';
import { Header } from './layout/Header';

import { BrowserRouter as Router } from 'react-router-dom';
import WeatherSearchForm from './weather/WeatherSearchForm';

import * as actions from '../actions/auth';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div>
                <Fragment>
                    <Router>
                        <Header {...this.props} />
                    </Router>
                    <WeatherSearchForm />
                    <WeatherDisplay {...this.props} />
                </Fragment>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
