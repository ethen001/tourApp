import {
    GROUP_PIN_SUCCESS,
    GROUP_PIN_FAIL,
    GROUP_PIN_PENDING,
    GROUP_PIN_CHANGED,
    GROUP_PIN_DONE,
    RESET_FORM
} from '../actions/ActionTypes'

const INITIAL_STATE = {
    userInput: '',// entered by the user
    loading: false,
    group: null, //this should be null
    error: ''
};

export default (state = INITIAL_STATE, action)  => {
    switch(action.type) {
        case GROUP_PIN_CHANGED:
            return {...state, userInput: action.payload};
        case GROUP_PIN_SUCCESS:
            return {...state, ...INITIAL_STATE, group: action.payload};
        case GROUP_PIN_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case  GROUP_PIN_PENDING:
            return {...state, loading: true, error: ''};
        case GROUP_PIN_DONE: {
            return {...state, group: null}
        }
        default:
            return state;
    }
}
