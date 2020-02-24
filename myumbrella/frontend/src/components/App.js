import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WeatherDisplay from './weather/WeatherDisplay';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <WeatherDisplay />
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
