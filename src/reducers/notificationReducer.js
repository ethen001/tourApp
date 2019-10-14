import {NOTIF_ERROR, MESSAGE_PENDING, MESSAGE_RECEIVED, MESSAGES_RECEIVED,
    RESET_NOTIF_ERROR, MESSAGE_SENT, RESET_MESSAGE_SENT, UPDATE_MESSAGE,
     RESET_UPDATE_VAR, ALARMS_RECEIVED, ALARM_RECEIVED, REMOVE_ALARM} from '../actions/ActionTypes';


const INITIAL_STATE = {
    messages: [],
    alarms: [],
    loading: false,
    error: true,
    messageSent: false,
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case MESSAGE_PENDING:
            return {...state, loading: true};
        case MESSAGES_RECEIVED:
            return {...state, loading: false, messages:action.payload};
        case MESSAGE_RECEIVED:
            return {...state, messages: state.messages.concat(action.payload)};
        case NOTIF_ERROR:
            return {...state, loading: false, error: action.payload};
        case RESET_NOTIF_ERROR:
            return {...state, error: ''}
        case MESSAGE_SENT:
            return {...state, messageSent: true, loading: false};
        case RESET_MESSAGE_SENT:
            return {...state, messageSent: false};
        case ALARMS_RECEIVED: 
            return {...state, alarms: action.payload};
        case ALARM_RECEIVED:
            return {...state, alarms: state.alarms.concat(action.payload)};
        case REMOVE_ALARM:
            return {
                ...state, 
                alarms: state.alarms.filter(value =>  value != action.payload)}
        default:
            return state;
    }
}