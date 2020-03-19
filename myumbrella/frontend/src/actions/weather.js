import axios from 'axios';
import { GET_WEATHER, WEATHER_LOADING, WEATHER_ERROR, WEATHER_INITIAL_REQUEST} from './types';
import * as Utils from './utils'; 

export const getWeather = (_city_name, _initialReq, _token) => async dispatch => {
    if(_initialReq === true) {
        dispatch({
            type: WEATHER_INITIAL_REQUEST 
        });
    } else {
        dispatch({
            type: WEATHER_LOADING
        });
        try {
    
            axios.interceptors.request.use((config) => {
                if (config.addTrailingSlash && config.url[config.url.length-1] !== '/') {
                    config.url += '/';
                }
                return config;
            });

            if(_token) {
                axios.defaults.headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${_token}`,
                    'X-CSRFToken' : Utils.getCsrfToken()
                };
            }
    
           await axios
            .get(`/api/weather/${_city_name}/`)
            .then(res => {
                dispatch({
                    type: GET_WEATHER,
                    payload: res.data
                })
            })
            .catch(err => {
                if (err.response) {
                    throw new Error(err.response.data.error)
                } else if(err.response.request) {
                    throw new Error(err.response.request.statusText)
                } else {
                    throw new Error('Error -1')
                }
            })
        } catch(e) {
            dispatch({
                type: WEATHER_ERROR,
                payload: e.message||'Error'
            })
        }
    }
}