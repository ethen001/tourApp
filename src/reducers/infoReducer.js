import { CONTACTS_RECEIVED, CONTACTS_ERROR, ABOUT_RECEIVED, ABOUT_ERROR } from "../actions/ActionTypes";

const INITIAL_STATE = {
    hotelInfo: {},
    aboutInfo: {},
    contactError: '',
    aboutError: ''
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CONTACTS_RECEIVED:
            return {...state, hotelInfo: action.payload};
        case CONTACTS_ERROR:
            return {...state, contactError: action.payload};
        case ABOUT_RECEIVED:
            return {...state, aboutInfo: action.payload};
        case ABOUT_ERROR:
            return {...state, aboutError: action.payload};
        default:
            return state;
    }
}