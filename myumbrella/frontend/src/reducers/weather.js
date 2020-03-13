import { GET_WEATHER, WEATHER_LOADING, WEATHER_ERROR, WEATHER_INITIAL_REQUEST } from '../actions/types.js';

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
        default:
            return state;
    }
}