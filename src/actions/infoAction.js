import {db} from '../Global'
import { CONTACTS_ERROR, CONTACTS_RECEIVED, ABOUT_RECEIVED, ABOUT_ERROR } from './ActionTypes';

const contactRef = db.collection('contactInfo');
const aboutRef = db.collection('aboutInfo');

export function getHotelInfo(group) {
    return dispatch => {
        contactRef
            .where('groupPin', '==', group.pin)
            .get()
            .then(querySnapshot => {
                let hotelInfo = {};
                querySnapshot.forEach(doc => {
                    if (doc.exists) {
                        hotelInfo = doc.data();
                    } else {
                        dispatch({type: CONTACTS_ERROR, payload: "Hotel Information Not Available"});
                    }
                })
                dispatch({type: CONTACTS_RECEIVED, payload: hotelInfo});
            })
            .catch(error => {
                dispatch({type: CONTACTS_ERROR, payload: "Hotel Information Not Available"});
                console.log(error.message);
            })
    }
}

export function getAboutInfo() {
    return dispatch => {
        aboutRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (doc.exists) {
                    const aboutInfo = doc.data();
                    dispatch({type: ABOUT_RECEIVED, payload: aboutInfo});
                } else {
                    dispatch({type: ABOUT_ERROR, payload: "about information could not be loaded. Try gain later."})
                }
            });
        }).catch(error => {
            console.log(error);
            dispatch({type: ABOUT_ERROR, payload: "about information could not be loaded. Try gain later."})
        })
    }
}