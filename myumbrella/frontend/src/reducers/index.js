import { combineReducers } from 'redux';
import weather from './weather';
import auth from './auth';
import favourite from './favourite';

export default combineReducers({
    weather,
    auth,
    favourite
});