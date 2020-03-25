import { GET_WEATHER, WEATHER_LOADING, WEATHER_ERROR, WEATHER_INITIAL_REQUEST, WEATHER_UPDATE_FAVOURITE, WEATHER_FAV_SUCCESS, WEATHER_FAV_FAIL } from '../actions/types.js';

const initialState = {
    weather: [],
    isLoading: true,
    error: null,
    initialReq: true
}

export default function(state = initialState, action) {
    switch (action.type) {
        case WEATHER_INITIAL_REQUEST:
            return {
                ...state,
                initialReq: true,
                error: null
            };
        case WEATHER_LOADING:
            return {
                ...state,
                isLoading: true,
                initialReq: false,
                error: null
            };
        case GET_WEATHER:
            return {
                ...state,
                weather: action.payload,
                isLoading: false,
                initialReq: true,
                error: null
            };
        case WEATHER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                initialReq: false
            };
        case WEATHER_UPDATE_FAVOURITE:
            let w = {...state.weather, favourite: action.payload.favourite}
            return {
                ...state,
                isLoading: false,
                error: null,
                initialReq: false,
                weather: w
            }
        default:
            return state;
    }
}