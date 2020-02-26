import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWeather } from '../../actions/weather';
import { Loading } from '../utils/Loading';
import { WeatherSearchForm } from './WeatherSearchForm';

export class WeatherDisplay extends Component {
    static propTypes = {
        getWeather: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getWeather('Sydney');
    }
    
    render() {
        
        const showTemp = (temp, temp_min) => {
            if(temp_min === null) {
                return Math.floor(temp);
            }
    
            if(temp === temp_min || Math.floor(temp) === Math.floor(temp_min)) {
                return Math.floor(temp_min) - (Math.floor(Math.random() * 7) + 1);
            }
    
        }

        if(this.props.isLoading === false) {

            const today = this.props.weather.list[0];
            const day1 = this.props.weather.list[1];
            const day2 = this.props.weather.list[2];
            const day3 = this.props.weather.list[3];
            const day4 = this.props.weather.list[4];

            console.log(this.state, this.props)

            return (
                <div className="container forecast-main-container">
                    
                    <div style={{marginBottom: '20px'}}>
                        <div className="row no-gutters">
                            <div className="col-sm-12 col-md-12 col-12">
                                <button type="button" className="btn btn-outline-primary" style={{color: '#FFF', fontSize: '18px', fontWeight: '400'}}>
                                    <i className="fa fa-star-o" style={{marginRight: '10px'}}></i>
                                    {this.props.weather.city.name}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        <div className="col-sm-12 col-md-4 forecast-container">
                            <div className="forecast-header">
                                <span className="float-left">Sunday</span>
                                <span className="float-right">24 Feb</span>
                            </div>
                            <div className="row">
                                <div className="col-1 col-sm-1 col-md-1"></div>
                                <div className="col-9 col-sm-9 col-md-9">
                                    <div className="row text-center">
                                        <div className="col-sm-6 col-md-6">
                                            <div className="wi wi-snow" id="currentIcon"></div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <h1 className="temp">
                                                <span id="currentTemperature">{showTemp(today.main.temp, null)}°</span>
                                            </h1>
                                            <h1 className="temp-lower">{showTemp(today.main.temp, today.main.temp_min)}°</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1 col-sm-1 col-md-1"></div>
                            </div>
                            <div className="row forecast-footer">
                                <div className="col-sm-12">
                                    <span id="currentSummary">{today.weather[0].main}</span><br/>
                                    <span>Wind: </span><span id="currentWind">{today.wind.speed}</span><span> mph(s)</span><br/>
                                    <span id="hourlySummary">{today.weather[0].description}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">
                            <div className="forecast-header">Monday</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <div className="wi wi-day-sunny" id="forecastIcon"></div>
                                    <h1 className="temp-forecast">
                                        <span>{Math.floor(day1.main.temp)}°</span>
                                    </h1>
                                    <h5>
                                        <span>{Math.floor(day1.main.temp_min)}°</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">
                            <div className="forecast-header">Tuesday</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <div className="wi wi-day-sprinkle" id="forecastIcon"></div>
                                    <h1 className="temp-forecast">
                                        <span>{Math.floor(day2.main.temp)}°</span>
                                    </h1>
                                    <h5>
                                        <span>{Math.floor(day2.main.temp_min)}°</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">
                            <div className="forecast-header">Wednesday</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <div className="wi wi-day-light-wind" id="forecastIcon"></div>
                                    <h1 className="temp-forecast">
                                        <span>{Math.floor(day3.main.temp)}°</span>
                                    </h1>
                                    <h5>
                                        <span>{Math.floor(day3.main.temp_min)}°</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">              
                            <div className="forecast-header">Thursday</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <div className="wi wi-day-cloudy-gusts" id="forecastIcon"></div>
                                    <h1 className="temp-forecast">
                                        <span>{Math.floor(day4.main.temp)}°</span>
                                    </h1>
                                    <h5>
                                        <span>{Math.floor(day4.main.temp_min)}°</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container forecast-main-container">
                    <div className="row no-gutters">
                        <div className="col-sm-12 col-md-4 forecast-container">
                            <div className="forecast-header">
                                <span className="float-left">Sunday</span>
                                <span className="float-right">24 Feb</span>
                            </div>
                            <div className="row">
                                <div className="col-1 col-sm-1 col-md-1"></div>
                                <div className="col-9 col-sm-9 col-md-9">
                                    <div className="row text-center">
                                        <div className="col-sm-6 col-md-6">
                                            <Loading size="lg-spinner" color="text-primary" />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <Loading size="lg-spinner" color="text-muted" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1 col-sm-1 col-md-1"></div>
                            </div>
                            <div className="row forecast-footer">
                                <div className="col-sm-12">
                                    <Loading size="width: 1rem; height: 1rem;" color="text-muted" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">
                            <div className="forecast-header">Monday</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Loading size="lg-spinner" color="text-muted" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">
                            <div className="forecast-header">Tuesday</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Loading size="lg-spinner" color="text-muted" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">
                            <div className="forecast-header">Wednesday</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Loading size="lg-spinner" color="text-muted" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">              
                            <div className="forecast-header">Thursday</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Loading size="lg-spinner" color="text-muted" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather.weather,
        isLoading: state.weather.isLoading
    }
}

export default connect(
    mapStateToProps, 
    { getWeather }
)(WeatherDisplay);
