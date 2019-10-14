import {
    SIGN_IN_SUCCESS,
    SIGN_IN_PENDING,
    SIGN_IN_FAIL,
    RESET_FORM,
    USER_CHANGED,
    USER_CHANGE_FAILED,
    RESET_ERROR,
    USER_CHANGE_PENDING,
    EDIT_USER,
    
} from '../actions/ActionTypes';


const INITIAL_STATE = {
    authenticating: false,
    error: '',
    user: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        groupPin: '',
        id: '', //email address
        profilePicture: '',
        userType: '',
        selectecSubGroup: '',
        emergencyContact: {
            name: '',
            phoneNumber: '',
            relationship: ''
        },
        pushToken: ''
    },
    editUserVisible: false
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
        case SIGN_IN_PENDING:
            return {...state, authenticating: true, error: ''};
        case SIGN_IN_FAIL:
            return  {...state, ...INITIAL_STATE, error: action.payload};
        case RESET_FORM:
            return {...state, user: INITIAL_STATE.user};
        case USER_CHANGED:
            return {...state, ...INITIAL_STATE, user: {...state.user, ...action.payload}};
        case USER_CHANGE_FAILED:
            return {...state, error: action.payload, authenticating: false};
        case USER_CHANGE_PENDING:
            return {...state, authenticating: true}
        case RESET_ERROR: 
            return {...state, error: ''};
        case EDIT_USER:
            return {...state, editUserVisible: !state.editUserVisible};
        default:
            return state
    }
};

export default authReducer;