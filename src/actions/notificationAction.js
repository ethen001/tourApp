import {NOTIF_ERROR, MESSAGE_PENDING, MESSAGES_RECEIVED, RESET_NOTIF_ERROR, MESSAGE_SENT, RESET_MESSAGE_SENT, UPDATE_MESSAGE, RESET_UPDATE_VAR, ALARM_RECEIVED, ALARMS_RECEIVED, UPDATE_ALARMS, MESSAGE_RECEIVED, REMOVE_ALARM} from './ActionTypes';
import { db, STUDENT, DIRECTOR, LEAD_CHAP, TOUR_GUIDE, NON_TRAVEL_GUEST } from '../Global/Constants';
import firebase from 'react-native-firebase'

notifRef = db.collection("notifications");

export function addMessage(remoteMessage) {
    const {docId} = remoteMessage.data;
    return dispatch => {
        notifRef.doc(docId).get().then(doc => {
            const message = doc.data();
            dispatch({type: MESSAGE_RECEIVED, payload: message});
        })
    }
    // return {type: MESSAGE_RECEIVED, payload: message};
}

export function getMessages({user, group}) {
    return dispatch => {
        //dispatch action signifying op is pending
        dispatch({type: MESSAGE_PENDING});
        //make request to get messages
        notifRef
            .where("groupPin", "==", group.pin)
            .get()
            .then(querySnapshot => {
                //get data from each document and place it in messages array
                let messages = [];
                querySnapshot.forEach(doc => {
                    const message = doc.data();
                    message.timestamp = message.timestamp.toDate();
                    messages.push(message);
                });
                //filter data for the user
                //messages = filterData(user, group, messages);
                //store this array in the redux store
                dispatch({type: MESSAGES_RECEIVED, payload: messages})
            })
            .catch(error => {
                dispatch({type: NOTIF_ERROR, payload: error});
            })
    }
}


export function resetNotifError() {
    return {type: RESET_NOTIF_ERROR}
}

export function sendMessage({sender, message, groupPin}) {
    return dispatch => {
        //dispatch action signifying op is pending
        dispatch({type: MESSAGE_PENDING});
        //crease document and set data to new message
        const date = new Date();
        notifRef.doc().set({
            sender,
            message,
            groupPin,
            notifType: 'message',
            timestamp: firebase.firestore.Timestamp.fromDate(date)
        }).then(() => {
            dispatch({type: MESSAGE_SENT});
        }).catch(error => {
            dispatch({type: NOTIF_ERROR, payload: error.toString()})
        });
    }
}

export function resetMessageSent() {
    return {type: RESET_MESSAGE_SENT
    };
}

export function updateMessagesList() {
    return {type: UPDATE_MESSAGE};
}
export function resetUpdateNeeded() {
    return {type: RESET_UPDATE_VAR};
}

export function getAlarms(group) {
    return dispatch => {
        db.collection('alarms')
        .where('groupPin', "==", group.pin)
        .get()
        .then(querySnapshot => {
            const alarms = [];
            const NOW = new Date();
            querySnapshot.forEach(doc => {
                if (doc.exists && doc.data().timestamp.toDate() >= NOW) {
                    const alarm = doc.data();
                    alarm.timestamp = alarm.timestamp.toDate();
                   alarms.push(alarm);
                }
            });
            dispatch({type: ALARMS_RECEIVED, payload: alarms})
        }).catch(error => {
            dispatch({type: NOTIF_ERROR, payload: error.message});
        })
    }
}

export function addAlarm(alarm) {
    return {type: ALARM_RECEIVED, payload: alarm};
}
export function removeAlarm(value) {
    return {type: REMOVE_ALARM, payload: value};

}

export function canDisplayMessage(remoteMessage) {
    return (dispatch, getState) => {
        const state = getState();
        const {user} = state.userAuth;
        const {senderId, senderUserType, senderTourGuideId, senderLeadChaperoneId} = remoteMessage.data;

        if (senderId === user.id) {
            return false;
        }
        if(senderUserType === TOUR_GUIDE && senderTourGuideId !== user.tourGuide.id) {
            return false;
        }
        if (senderUserType === LEAD_CHAP && senderLeadChaperoneId !== user.leadChaperone.id) {
            return false;
        }

        return true;
    }
}

export function canAddMessage(remoteMessage) {
    console.log(remoteMessage);
    return (dispatch, getState) => {
        const state = getState();
        const {user} = state.userAuth;
        const { senderUserType, senderTourGuideId, senderLeadChaperoneId} = remoteMessage.data;

        if(senderUserType === TOUR_GUIDE && senderTourGuideId !== user.tourGuide.id) {
            return false;
        }
        if (senderUserType === LEAD_CHAP && senderLeadChaperoneId !== user.leadChaperone.id) {
            return false;
        }
        
        return true;
    }
}
