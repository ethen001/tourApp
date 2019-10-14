import {
    SIGN_UP_FAIL_P,
    SIGN_UP_PENDING_P,
    SIGN_UP_SUCCESS_P, VALID_FAIL_P, VALID_RESET_P
} from "../actions/ActionTypes";

const INITIAL_STATE = {
    loading: false,
    userSignedUp: false,
    error:'',
    validError: ''
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SIGN_UP_PENDING_P:
            return {...state, loading: true, error: ''};
        case SIGN_UP_SUCCESS_P:
            return {...state, ...INITIAL_STATE, userSignedUp: false};
        case SIGN_UP_FAIL_P:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case VALID_FAIL_P:
            return {...state, validError: action.payload};
        case VALID_RESET_P:
            return {...state, validError: ''};
        default:
            return state;
    }
}