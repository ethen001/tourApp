import {ITINERARY_NOT_FOUND, ITINERARY_PENDING, ITINERARY_FOUND} from './ActionTypes';
import {db} from '../Global';


export function getItinerary(groupPin) {
    return dispatch => {
        db.collection('itineraries')
        .doc(groupPin)
        .get()
        .then(snapshot => {
            if(snapshot.exists) {
                dispatch({type: ITINERARY_FOUND, payload: snapshot.data()})
            } else {
                dispatch({type: ITINERARY_NOT_FOUND, payload: 'Itinerary is not available.\nPlease try again later.'})
            }  
        })
        .catch(error => {
            dispatch({type: ITINERARY_NOT_FOUND, payload: error})
        })
    }
}