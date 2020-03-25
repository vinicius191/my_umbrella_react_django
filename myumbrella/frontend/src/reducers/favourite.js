import { 
    FAVOURITE_ADD_START,
    FAVOURITE_ADD_SUCCESS,
    FAVOURITE_ADD_FAIL,
    FAVOURITE_REMOVE_START,
    FAVOURITE_REMOVE_SUCCESS,
    FAVOURITE_REMOVE_FAIL,
    FAVOURITE_CHECK_START,
    FAVOURITE_CHECK_ADD_SUCCESS,
    FAVOURITE_CHECK_REMOVE_SUCCESS,
    FAVOURITE_CHECK_FAIL,
    FAVOURITE_LOGOUT,
    FAVOURITE_CHECK_SUCCESS,
    WEATHER_FAV_SUCCESS,
    WEATHER_FAV_FAIL,
    WEATHER_FAV_STARTED
} from '../actions/types';
import { updateObject } from '../actions/utils';

const initialState = {
    city_country: null,
    error: null,
    loading: false,
    favs: [],
    weather_fav: []    
}

const favouriteAddStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const favouriteAddSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        city_country: action.city_country
    });
}

const favouriteAddFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const favouriteRemoveStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const favouriteRemoveSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        city_country: action.city_country
    });
}

const favouriteRemoveFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case FAVOURITE_ADD_START:
            return favouriteAddStart(state, action);
        case FAVOURITE_ADD_SUCCESS:
            return favouriteAddSuccess(state, action);
        case FAVOURITE_ADD_FAIL:
            return favouriteAddFail(state, action);
        case FAVOURITE_REMOVE_START:
            return favouriteRemoveStart(state, action);
        case FAVOURITE_REMOVE_SUCCESS:
            return favouriteRemoveSuccess(state, action);
        case FAVOURITE_REMOVE_FAIL:
            return favouriteRemoveFail(state, action);
        case FAVOURITE_CHECK_START:
            return {
                ...state,
                loading: true
            };
        case FAVOURITE_CHECK_ADD_SUCCESS:
            return {
                ...state,
                favs: action.payload,
                loading: false
            };
        case FAVOURITE_CHECK_REMOVE_SUCCESS:
            var _data = state.favs.filter(function(city_country) {
                return city_country !== action.payload.city_country
            });
            console.log('_data', _data, 'state', satte, 'payload', action.payload)
            return {
                ...state,
                favs: _data,
                loading: false
            };
        case FAVOURITE_CHECK_SUCCESS:
            return {
                ...state,
                loading: false,
                favs: action.payload
            };
        case FAVOURITE_CHECK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FAVOURITE_LOGOUT:
            console.log('here 2', state)
            return {
                ...state,
                city_country: null,
                error: null,
                loading: false,
                favs: [],
                weather_fav: []   
            }
        case WEATHER_FAV_SUCCESS:
            console.log('WEATHER_FAV_SUCCESS', action);
            return {
                ...state,
                weather_fav: action.payload,
                loading: false,
                error: null
            };
        case WEATHER_FAV_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case WEATHER_FAV_STARTED:
            console.log('WEATHER_FAV_STARTED', action);
            return {
                ...state,
                loading: true,
                error: null
            };
        default:
            return state;
    }
}

export default reducer;