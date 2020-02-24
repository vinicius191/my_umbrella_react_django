import { GET_WEATHER, WEATHER_LOADING } from '../actions/types.js';

const initialState = {
    weather: [],
    isLoading: true
}

export default function(state = initialState, action) {
    console.log('Here...')
    switch (action.type) {
        case WEATHER_LOADING:
            console.log('Reducer, loading...', action)
            return {
                ...state,
                isLoading: true
            };
        case GET_WEATHER:
            console.log('Reducer - Payload: ', action.payload)
            return {
                ...state,
                weather: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
}