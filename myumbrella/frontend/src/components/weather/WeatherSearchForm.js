import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWeather } from '../../actions/weather';

export class WeatherSearchForm extends Component {
    state = {
        city_name: '',
        error: ''
    };

    static proTypes = {
        getWeather: PropTypes.func.isRequired
    };

    componentDidMount() {
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { city_name } = this.state;
        const { error } = this.props;
        this.props.getWeather(city_name, false);
        this.setState({
            city_name: '',
            error: ''
        });
    }

    render() {
        const { city_name, error } = this.state;
        const style = {
            backgroundImage: 'url(' + _STATIC_ + 'images/city-bg.jpg)',
        }
        
        return (

            <div className="hero" style={style}>
                <div className="container">
                    <div className="row">
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
        );
    }
}

const mapStateToProps = (state) => {
    const w = state.weather;
    return {
        isLoading: w.isLoading,
        error: w.error,
        city_name: state.city_name
    }
}

export default connect(
    mapStateToProps,
    { getWeather }
)(WeatherSearchForm);
