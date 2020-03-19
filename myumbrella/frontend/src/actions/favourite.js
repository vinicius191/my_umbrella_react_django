import axios from 'axios';
import { 
    FAVOURITE_ADD_START,
    FAVOURITE_ADD_SUCCESS,
    FAVOURITE_ADD_FAIL,
    FAVOURITE_REMOVE_START,
    FAVOURITE_REMOVE_SUCCESS,
    FAVOURITE_REMOVE_FAIL,
    WEATHER_UPDATE_FAVOURITE 
} from './types';
import * as Utils from './utils'

export const favouriteAddStart = (token, username) => {
    return {
        type: FAVOURITE_ADD_START,
    }
}

export const favouriteAddFail = error => {
    return {
        type: FAVOURITE_ADD_FAIL,
        error: error
    }
}

export const favouriteAddSuccess = (city_country) => {
    return {
        type: FAVOURITE_ADD_SUCCESS,
        city_country: city_country
    }
}

export const favouriteAdd = (_city_country, _token) => {
    return dispatch => {
        dispatch(favouriteAddStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${_token}`,
            'X-CSRFToken' : Utils.getCsrfToken()
        };
        axios.post('api/favourite', {
            city_country: _city_country
        })
        .then(res => {
            console.log('res', res);
            dispatch(favouriteAddSuccess(_city_country));
            dispatch({
                type: WEATHER_UPDATE_FAVOURITE,
                payload: {
                    favourite: {
                        star: "fa fa-star",
                        username: 'vinicius',
                        city_country: 'Sydney, AU'
                    }
                }
            })
        })
        .catch(err => {
            if(err.resonse) {
                dispatch(favouriteAddFail(err.response.statusText));
            } else {
                dispatch(favouriteAddFail(`Error to insert city_country ${_city_country} to database.`));
            }
        })
    };
}

export const favouriteRemoveStart = (token, username) => {
    return {
        type: FAVOURITE_REMOVE_START,
    }
}

export const favouriteRemoveFail = error => {
    return {
        type: FAVOURITE_REMOVE_FAIL,
        error: error
    }
}

export const favouriteRemoveSuccess = () => {
    return {
        type: FAVOURITE_REMOVE_SUCCESS,
        city_country: null
    }
}

export const favouriteRemove = (_city_country, _token) => {
    return dispatch => {
        dispatch(favouriteRemoveStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${_token}`,
            'X-CSRFToken' : Utils.getCsrfToken()
        };
        axios.delete('api/favourite', { 
            data : {
                city_country: _city_country
            }
        })
        .then(res => {
            dispatch(favouriteRemoveSuccess());
            dispatch({
                type: WEATHER_UPDATE_FAVOURITE,
                payload: {
                    favourite: {
                        star: "fa fa-star-o",
                        username: null,
                        city_country: null
                    }
                }
            })
        })
        .catch(err => {
            if(err.resonse) {
                dispatch(favouriteRemoveFail(err.response.statusText));
            } else {
                dispatch(favouriteRemoveFail(`Error to remove city_country ${_city_country} from database.`));
            }
        })
    };
}