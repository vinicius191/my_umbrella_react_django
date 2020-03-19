import React, { Component, Fragment } from 'react'
import WeatherDisplay from './WeatherDisplay'
import WeatherSearchForm from './WeatherSearchForm'

export default class Weather extends Component {
    render() {
        return (
            <Fragment>
                <WeatherSearchForm {...this.props}/>
                <WeatherDisplay {...this.props}/>
            </Fragment>
        )
    }
}
