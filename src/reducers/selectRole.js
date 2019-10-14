import {ROLE_SELECTED, RESET_SELECTION} from "../actions/ActionTypes";
import { STUDENT } from "../components/common";

const INITIAL_STATE = {
    role: STUDENT
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ROLE_SELECTED:
            return {...state, role: action.payload};
        case RESET_SELECTION:
            return {...state, ...INITIAL_STATE};
        default:
            return state;
    }
};

