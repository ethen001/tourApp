import {
    SIGN_UP_SUCCESS,
    SIGN_UP_PENDING,
    SIGN_UP_FAIL,
    RESET_FORM, VALID_FAIL, VALID_RESET, SIGNUP_ERROR_RESET
} from '../actions/ActionTypes';


const INITIAL_STATE = {
    loading: false,
    userSignedUp: false,
    error:'',
    validError: ''
};



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SIGN_UP_PENDING:
            return {...state, loading: true};
        case SIGN_UP_SUCCESS:
            return {...state, ...INITIAL_STATE, userSignedUp: true};
        case SIGN_UP_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case RESET_FORM:
            return {...state, ...INITIAL_STATE};
        case VALID_FAIL:
            return {...state, validError: action.payload};
        case VALID_RESET:
            return {...state, validError: ''};
        case SIGNUP_ERROR_RESET:
            return {...state, error: ''};
        default:
            return state;
    }
}
