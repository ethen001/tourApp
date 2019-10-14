import {combineReducers} from "redux";
import userAuth from './userAuth'
import groupAuth from './groupAuth';
import selectedRole from './selectRole';
import userSignUp from './userSignUp';
import parentSignUp from './parentSignUp'
import itineraryReducer from './itineraryReducer';
import notificationReducer from './notificationReducer';
import lostReducer from './lostReducer';
import infoReducer from './infoReducer'

export default combineReducers({
    userAuth: userAuth,
    groupAuth: groupAuth,
    selectedRole: selectedRole,
    userSignUp: userSignUp,
    parentSignUp: parentSignUp,
    itinerary: itineraryReducer,
    notifications: notificationReducer,
    lostUser: lostReducer,
    information: infoReducer
})