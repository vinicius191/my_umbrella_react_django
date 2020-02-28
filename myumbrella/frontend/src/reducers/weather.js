import { GET_WEATHER, WEATHER_LOADING, WEATHER_ERROR } from '../actions/types.js';

const initialState = {
    weather: [],
    isLoading: true,
    error: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case WEATHER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_WEATHER:
            return {
                ...state,
                weather: action.payload,
                isLoading: false
            };
        case WEATHER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}