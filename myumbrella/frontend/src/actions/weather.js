import axios from 'axios';
import { GET_WEATHER, WEATHER_LOADING, WEATHER_ERROR } from './types';

export const getWeather = (_city_name) => async dispatch => {
    dispatch({
        type: WEATHER_LOADING
    });
    try {
       await axios
        .get(`/api/weather/${_city_name}`)
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