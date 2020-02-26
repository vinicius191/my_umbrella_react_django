import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import WeatherDisplay from './weather/WeatherDisplay';
import { Header } from './layout/Header';

import { Provider } from 'react-redux';
import store from '../store';
import WeatherSearchForm from './weather/WeatherSearchForm';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <WeatherSearchForm />
                    <WeatherDisplay />
                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
