import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWeather } from '../../actions/weather';

export class WeatherSearchForm extends Component {

    constructor(props) {
        super(props);

        console.log(props, this)
    }

    state = {
        city_name: '',
        error: ''
    };

    static proTypes = {
        getWeather: PropTypes.func.isRequired
    };

    componentDidMount() {
        console.log('Props from componentDidMount: ', this.props)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { city_name } = this.state;
        const { error } = this.props;
        console.log('Props: ', this.props);
        this.props.getWeather(city_name);
        this.setState({
            city_name: '',
            error: ''
        });
    }

    render() {
        const { city_name, error } = this.state;
        return (
            <div className="hero" style={{backgroundImage: "url(../../../static/images/city-bg.jpg)"}}>
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-sm-12 col-md-12 col-12">
                            <form className="find-location" onSubmit={this.onSubmit}>
                                <input 
                                    type="text"
                                    placeholder="Enter a City Name..." 
                                    name="city_name"
                                    onChange={this.onChange}
                                    value={city_name}
                                />
                                <input type="submit" value="Find" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.weather.isLoading,
        error: state.weather.error
    }
}

export default connect(
    mapStateToProps,
    { getWeather }
)(WeatherSearchForm);
