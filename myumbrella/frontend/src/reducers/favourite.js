import { 
    FAVOURITE_ADD_START,
    FAVOURITE_ADD_SUCCESS,
    FAVOURITE_ADD_FAIL,
    FAVOURITE_REMOVE_START,
    FAVOURITE_REMOVE_SUCCESS,
    FAVOURITE_REMOVE_FAIL 
} from '../actions/types';
import { updateObject } from '../actions/utils';

const initialState = {
    city_country: null,
    error: null,
    loading: false    
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
        default:
            return state;
    }
}

export default reducer;