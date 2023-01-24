import { combineReducers } from "redux";
import { SET_FILTER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER: 
        return action.value; 
        default: return state; 
    }
}

const moviesApp = combineReducers({
    visibilityFilter
});

export default moviesApp; 