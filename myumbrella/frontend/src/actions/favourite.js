import axios from 'axios';
import { 
    FAVOURITE_ADD_START,
    FAVOURITE_ADD_SUCCESS,
    FAVOURITE_ADD_FAIL,
    FAVOURITE_REMOVE_START,
    FAVOURITE_REMOVE_SUCCESS,
    FAVOURITE_REMOVE_FAIL,
    WEATHER_UPDATE_FAVOURITE,
    FAVOURITE_CHECK_START,
    FAVOURITE_CHECK_ADD_SUCCESS,
    FAVOURITE_CHECK_REMOVE_SUCCESS,
    FAVOURITE_CHECK_FAIL,
    FAVOURITE_LOGOUT,
    FAVOURITE_CHECK_SUCCESS  
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
            dispatch(favLocalStorageAdd(res.data))
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
            favLocalStorageRemove({'city_country': _city_country});
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

export const favLogout = () => {
    console.log('here')
    return {
        type: FAVOURITE_LOGOUT
    }
}

export const favLocalStorageRemove = (_data) => {
    var existing = localStorage.getItem('favs');
    localStorage.removeItem('favs');
    existing = existing ? JSON.parse(existing) : [];
    var _exception = existing.filter(function(obj) {
        return obj.city_country !== _data.city_country;
    });
    localStorage.setItem('favs', JSON.stringify(_exception));
    favCheckRemoveSuccess(_data)
    
}

export const favLocalStorageAdd = (_data) => {
    var existing = localStorage.getItem('favs');
    existing = existing ? JSON.parse(existing) : [];
    existing.push(_data);
    localStorage.setItem('favs', JSON.stringify(existing));
    favCheckAddSuccess(_data)
}

export const favCheckStart = () => {
    return {
        type: FAVOURITE_CHECK_START
    }
}

export const favCheckAddSuccess = (favs) => {
    return {
        type: FAVOURITE_CHECK_ADD_SUCCESS,
        payload: favs
    }
}

export const favCheckRemoveSuccess = (favs) => {
    return {
        type: FAVOURITE_CHECK_REMOVE_SUCCESS,
        payload: favs
    }
}

export const favCheckSuccess = (favs) => {
    console.log('TOKEN 4', favs)
    return {
        type: FAVOURITE_CHECK_SUCCESS,
        payload: favs
    }
}

export const favCheckFail = (error) => {
    return {
        type: FAVOURITE_CHECK_FAIL,
        payload: error
    }
}

export const favCheck = (_token) => {
    console.log('TOKEN 2', _token)
    return dispatch => {
        dispatch(favCheckStart());
        dispatch(favActionCheck(_token));
    };
}

export const favActionCheck = (_token) => {
    console.log('TOKEN 3', _token)
    return dispatch => {
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${_token}`,
            'X-CSRFToken' : Utils.getCsrfToken()
        };
        axios.get('api/favourite')
        .then(res => {
            dispatch(favCheckSuccess(res.data));
        })
        .catch(err => {
            if(err.resonse) {
                dispatch(favCheckFail(err.response.statusText));
            } else {
                dispatch(favCheckFail('Error to get user Favourites from database.'));
            }
        });
    }
}