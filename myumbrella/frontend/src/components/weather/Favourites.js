import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { favouriteAdd, favouriteRemove, favCheck, getWeatherFav } from '../../actions/favourite';
import PropTypes from 'prop-types';
import Favourite from './Favourite';
import { Loading } from '../utils/Loading';

export class Favourites extends Component {

    static propTypes = {
        favouriteAdd: PropTypes.func.isRequired,
        favouriteRemove: PropTypes.func.isRequired,
        favCheck: PropTypes.func.isRequired,
        getWeatherFav: PropTypes.func.isRequired
    };

    componentDidMount() {
        if(this.props.isAuthenticated){
            this.props.getWeatherFav(this.props.token);
        }
    }

    renderFavourite = (_weather) => {
        if(_weather.length > 0) {
            return _weather.map((weather, index) => (
                <Favourite key={index} weather_fav_item={weather} />
            ));
        }
    }

    sendToHome = (e) => {
        e.preventDefault();

        if(this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }
    
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        console.log('props', this.props)
        const style = {
            backgroundImage: 'url(' + _STATIC_ + 'images/city-bg.jpg)',
        }
        const _weather_fav = this.renderFavourite(this.props.weather_fav);

        if(this.props.isLoading === false) {

            return (
                <div>
                    <div className="hero" style={style}>
                    </div>
                    
                    <div className="container forecast-fav-main">

                        <div style={{marginBottom: '20px'}}>
                            <div className="row">
                                <div className="col-1 col-sm-1 col-md-1 col-lg-1"></div>
                                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-8">
                                    <button type="button" className="btn btn-primary fav-cnt-btn pull-right" onClick={this.sendToHome}>
                                        Search and Add more places
                                    </button>
                                </div>
                                <div className="col-1 col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                        </div>

                        <>
                            {_weather_fav}
                        </>
                        
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="hero" style={style}></div>
                    


                    <div className="container forecast-fav-main">

                        <div style={{marginBottom: '20px'}}>
                            <div className="row">
                                <div className="col-1 col-sm-1 col-md-1 col-lg-1"></div>
                                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-8">
                                    <div className="pull-right">
                                        Loading...
                                    </div>
                                </div>
                                <div className="col-1 col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                        </div>

                        <div className="row row-zero">
                            <div className="col-1 col-sm-1 col-md-1 col-lg-1"></div>
                            <div className="col-9 col-sm-9 col-md-9 col-lg-9 forecast-container">
                                <div className="forecast-header">Loading...</div>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Loading size="lg-spinner" color="text-primary" />
                                    </div>
                                </div>
                                <div className="row forecast-footer forecast-footer-m">
                                    <div className="col-sm-12">
                                        <Loading size="width: 1rem; height: 1rem;" color="text-muted" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 col-sm-1 col-md-1 col-lg-1"></div>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    var favs = []
    if(typeof(state.favourite.favs)==='string'){
        favs = JSON.parse(state.favourite.favs);
    } else {
        favs = state.favourite.favs
    }
    return {
        favError: state.favourite.error,
        favCityCountry: state.favourite.city_country,
        favs: favs.favs,
        weather_fav: state.favourite.weather_fav,
        isLoading: state.favourite.loading
    }
};

export default connect(mapStateToProps, {favouriteAdd, favouriteRemove, favCheck, getWeatherFav})(Favourites);