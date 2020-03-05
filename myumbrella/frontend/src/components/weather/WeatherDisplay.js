import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWeather } from '../../actions/weather';
import { Loading } from '../utils/Loading';
import { Icon } from '../utils/Icon';
import { UmbrellaMessage } from '../utils/UmbrellaMessage';
import * as wFunc from '../utils/weatherFunction';

export class WeatherDisplay extends Component {
    state = {
        fav_star: "fa fa-star-o"
    }

    static propTypes = {
        getWeather: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getWeather('Sydney');
    }

    activeFav = (e) => {
        e.preventDefault();
        if(this.state.fav_star == "fa fa-star-o") {
            this.setState({
                fav_star: "fa fa-star"
            });
        } else {
            this.setState({
                fav_star: "fa fa-star-o"
            });
        }
        
    }
    
    render() {
        
        if(this.props.isLoading === false) {

            const today = this.props.weather.list[0];
            const day1 = this.props.weather.list[1];
            const day2 = this.props.weather.list[2];
            const day3 = this.props.weather.list[3];
            const day4 = this.props.weather.list[4];

            const desc = new wFunc.Capitalize(today.weather[0].description);

            return (
                <div className="container forecast-main-container">
                    
                    <div style={{marginBottom: '20px'}}>
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-12">
                                <button type="button" className="btn btn-primary-outline" style={{color: '#FFF', fontSize: '18px', fontWeight: '400'}} onClick={this.activeFav}>
                                    <i className={this.state.fav_star} style={{marginRight: '10px'}}></i>
                                    {this.props.weather.city.name}, {this.props.weather.city.country}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 forecast-container">
                            <div className="forecast-header">
                                <span className="float-left">{wFunc.getWeekDay(today.dt)}</span>
                                <span className="float-right">{wFunc.getFullDate(today.dt)}</span>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="row text-center">
                                        <div className="col-sm-6 col-md-6">
                                            <Icon cod={today.weather[0].id} dt={today.dt} id="currentIcon" />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <h1 className="temp">
                                                <span id="currentTemperature">{wFunc.showTemp(today.temp.day, null)}°</span>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row forecast-footer">
                                <div className="col-sm-12">
                                    <UmbrellaMessage rain={wFunc.showRain(today.rain)} is_main={true} />
                                    <span id="currentSummary">{today.weather[0].main}</span><br/>
                                    <span id="hourlySummary">{desc.capitalize()}</span><br/>
                                    <span>Precipitation: </span><span id="currentRain">{wFunc.showRain(today.rain)}</span><span> mm</span><br/>
                                    <span>Wind: </span><span id="currentWind">{wFunc.showWind(today.speed)}</span><span> mph(s)</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-2 forecast-container">
                            <div className="forecast-header">{wFunc.getWeekDay(day1.dt)}</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Icon cod={day1.weather[0].id} dt={day1.dt} id="forecastIcon" />
                                    <h1 className="temp-forecast">
                                        <span>{Math.floor(day1.temp.day)}°</span>
                                    </h1>
                                </div>
                            </div>
                            <div className="row forecast-footer forecast-footer-m">
                                <div className="col-sm-12 footer-desc">
                                    <UmbrellaMessage rain={wFunc.showRain(day1.rain)} is_main={false} />
                                    <div style={{marginTop: '57px'}}>
                                        <span id="currentSummary">{day1.weather[0].main}</span><br/>
                                        <span>Precipitation: </span><span id="currentRain">{wFunc.showRain(day1.rain)}</span><span> mm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-2 forecast-container">
                            <div className="forecast-header">{wFunc.getWeekDay(day2.dt)}</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Icon cod={day2.weather[0].id} dt={day2.dt} id="forecastIcon" />
                                    <h1 className="temp-forecast">
                                        <span>{Math.floor(day2.temp.day)}°</span>
                                    </h1>
                                </div>
                            </div>
                            <div className="row forecast-footer forecast-footer-m">
                                <div className="col-sm-12 footer-desc">
                                    <UmbrellaMessage rain={wFunc.showRain(day2.rain)} is_main={false} />
                                    <div style={{marginTop: '57px'}}>
                                        <span id="currentSummary">{day2.weather[0].main}</span><br/>
                                        <span>Precipitation: </span><span id="currentRain">{wFunc.showRain(day2.rain)}</span><span> mm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-2 forecast-container">
                            <div className="forecast-header">{wFunc.getWeekDay(day3.dt)}</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Icon cod={day3.weather[0].id} dt={day3.dt} id="forecastIcon" />
                                    <h1 className="temp-forecast">
                                        <span>{Math.floor(day3.temp.day)}°</span>
                                    </h1>
                                </div>
                            </div>
                            <div className="row forecast-footer forecast-footer-m">
                                <div className="col-sm-12 footer-desc">
                                    <UmbrellaMessage rain={wFunc.showRain(day3.rain)} is_main={false} />
                                    <div style={{marginTop: '57px'}}>
                                        <span id="currentSummary">{day3.weather[0].main}</span><br/>
                                        <span>Precipitation: </span><span id="currentRain">{wFunc.showRain(day3.rain)}</span><span> mm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-2 forecast-container">              
                            <div className="forecast-header">{wFunc.getWeekDay(day4.dt)}</div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Icon cod={day4.weather[0].id} dt={day4.dt} id="forecastIcon" />
                                    <h1 className="temp-forecast">
                                        <span>{Math.floor(day4.temp.day)}°</span>
                                    </h1>
                                </div>
                            </div>
                            <div className="row forecast-footer forecast-footer-m">
                                <div className="col-sm-12 footer-desc">
                                    <UmbrellaMessage rain={wFunc.showRain(day4.rain)} is_main={false} />
                                    <div style={{marginTop: '57px'}}>
                                        <span id="currentSummary">{day4.weather[0].main}</span><br/>
                                        <span>Precipitation: </span><span id="currentRain">{wFunc.showRain(day4.rain)}</span><span> mm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container forecast-main-container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 forecast-container">
                            <div className="forecast-header">
                                <span className="float-left"></span>
                                <span className="float-right"></span>
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
                            <div className="forecast-header"></div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Loading size="lg-spinner" color="text-muted" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">
                            <div className="forecast-header"></div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Loading size="lg-spinner" color="text-muted" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">
                            <div className="forecast-header"></div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Loading size="lg-spinner" color="text-muted" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-2 forecast-container">              
                            <div className="forecast-header"></div>
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
        isLoading: state.weather.isLoading,
        error: state.weather.error,
        fav_star: state.fav_star
    }
}

export default connect(
    mapStateToProps, 
    { getWeather }
)(WeatherDisplay);
