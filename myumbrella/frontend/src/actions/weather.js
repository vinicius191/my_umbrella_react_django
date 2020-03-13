import axios from 'axios';
import { GET_WEATHER, WEATHER_LOADING, WEATHER_ERROR } from './types';

export const getWeather = (_city_name, _initialReq) => async dispatch => {
    console.log('_initialReq', _initialReq)
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
                    throw new Error(err.response.data.message)
                } else if(err.response.request) {
                    throw new Error(err.response.request)
                } else {
                    throw new Error('Error -1')
                }
            })
        } catch(e) {
            dispatch({
                type: WEATHER_ERROR,
                payload: e||'Error'
            })
        }
    }
}