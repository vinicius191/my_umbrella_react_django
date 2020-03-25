import React, { Component } from 'react';
import { Icon } from '../utils/Icon';
import { UmbrellaMessage } from '../utils/UmbrellaMessage';
import * as wFunc from '../utils/weatherFunction';

export default class Favourite extends Component {
    render() {

        const _weather = this.props.weather_fav_item
        let city_country = _weather.name + ', ' + _weather.sys.country

        return (
            <div className="row row-zero row-fav">
                <div className="col-1 col-sm-1 col-md-1 col-lg-1"></div>
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 forecast-container">
                    <div className="forecast-header">{city_country}</div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <div className="col-sm-6 col-md-6">
                                <Icon cod={_weather.weather[0].id} dt={_weather.dt} id="currentIcon" />
                            </div>
                            <div className="col-sm-6 col-md-6">
                                <h1 className="temp">
                                    <span id="currentTemperature">{wFunc.showTemp(_weather.main.temp, null)}°</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="row forecast-footer forecast-footer-m">
                        <div className="col-sm-12 footer-desc">
                            <UmbrellaMessage rain={wFunc.showRain(_weather.rain)} is_main={false} />
                            <div style={{marginTop: '37px'}}>
                                <span id="currentSummary">{_weather.weather[0].main}</span><br/>
                                <span>Precipitation: </span><span id="currentRain">{wFunc.showRain(_weather.rain)}</span><span> mm</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1 col-sm-1 col-md-1 col-lg-1"></div>
            </div>
        )
    }
}
