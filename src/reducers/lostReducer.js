import {LOST_MESSAGE_SENT, LOST_ERROR, LOST_MESSAGE_PENDING, RESET_LOST_MESSAGE, RESET_ERROR, LOST_USER_RECEIVED, LOST_USERS_RECEIVED, CHANGE_LOST_POSITION, CHANGE_MAP_VISIBLE} from '../actions/ActionTypes'


const INITIAL_STATE = {
    loading: false,
    error: '',
    messageSent: true,
    lostUsers: [],
    currentPosition: {longitude: 0, latitude: 0},
    mapVisible: false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case LOST_USERS_RECEIVED:
            return {...state, lostUsers: action.payload}
        case LOST_USER_RECEIVED:
            return {...state, lostUsers: state.lostUsers.concat(action.payload)}; 
        case LOST_MESSAGE_SENT:
            return {...state, ...INITIAL_STATE, messageSent: true};
        case LOST_MESSAGE_PENDING:
            return {...state, ...INITIAL_STATE, loading: true};
        case LOST_ERROR:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case RESET_LOST_MESSAGE: 
            return {...state, messageSent: false}
        case RESET_ERROR:
            return {...state, error: ''}
        case CHANGE_LOST_POSITION:
            return {...state, currentPosition: action.payload};
        case CHANGE_MAP_VISIBLE:
            return {...state, mapVisible: !state.mapVisible};
        default:
            return state;
    }
}