import {LOST_ERROR, LOST_MESSAGE_SENT, LOST_MESSAGE_PENDING, RESET_LOST_MESSAGE, RESET_ERROR, LOST_USERS_RECEIVED, CHANGE_MAP_VISIBLE, CHANGE_LOST_POSITION, LOST_USER_RECEIVED} from './ActionTypes'
import {db} from '../Global'
import Geolocation from 'react-native-geolocation-service';
import firebase from "react-native-firebase";

//reference to used Collection;
const lostRef = db.collection("lostUsers");

export function addLostUser(remoteMessage) {
    return dispatch => {
        lostRef.doc(remoteMessage.data.docId).get().then(doc => {
            console.log(doc.data())
            const lostUser = doc.data();
            dispatch({type: LOST_USER_RECEIVED, payload: lostUser});
        });
    }
}

export function getLostUsers(group) {
    return dispatch => {
        //loading action
        dispatch({type: LOST_MESSAGE_PENDING});
        //make request to get all Lost Users
        lostRef.where("groupPin", "==", group.pin)
            .get()
            .then(QuerySnapshot => {
                const lostUsers = [];
                QuerySnapshot.forEach(doc => {
                    lostUsers.push(doc.data())
                })
                //send the list of lost Users to the state
                dispatch({type: LOST_USERS_RECEIVED, payload: lostUsers })
            }).catch(error => {
                dispatch({type: LOST_ERROR, payload: error.message})
            });
    }
}

export function sendLostMessage(user) {
    return dispatch => {
        //loading action
        dispatch({type: LOST_MESSAGE_PENDING});
        //get the location of the user
        Geolocation.getCurrentPosition(position => {
            console.log(position);
            const {longitude, latitude} = position.coords;
            sendLostMessageHelper(dispatch, user, {longitude, latitude});
        }, error => {
            dispatch({type: LOST_ERROR, payload: "We couldn't determine your location. Please try again"})
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });
    }
}

function sendLostMessageHelper(dispatch, user, location) {
    lostRef.doc().set({
        groupPin: user.groupPin,
        location,
        user,
        notifType: 'lostUser',
        timestamp: new firebase.firestore.Timestamp.fromDate(new Date())
    }).then(() => {
        dispatch({type: LOST_MESSAGE_SENT});
    }).catch(error => {
        dispatch({type: LOST_MESSAGE_ERROR, payload: error.message});
    })
}

export function resetLostMessageSent() {
    return {type: RESET_LOST_MESSAGE};
}

export function resetLostMessageError() {
    return {type: RESET_ERROR};
}

export function toggleMapVisibility() {
    return {type: CHANGE_MAP_VISIBLE};
}

export function getLostUserCurrentPosition(position) {
    return {type: CHANGE_LOST_POSITION, payload: position};
}