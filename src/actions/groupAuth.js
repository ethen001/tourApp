import {GROUP_PIN_SUCCESS, GROUP_PIN_FAIL, GROUP_PIN_PENDING, GROUP_PIN_CHANGED, GROUP_PIN_DONE} from "./ActionTypes";
import {db} from '../Global'

export const groupPinChanged = (num) => {
    return {type: GROUP_PIN_CHANGED, payload: num};
};


export const authenticateGroupPin = (pin) => {
    return (dispatch, getState) => {
        dispatch({type: GROUP_PIN_PENDING});
        db.collection('groups')
            .where('pin', '==', pin)
            .get()
            .then ((snapshot) => {
                iterateQueryResult(snapshot, dispatch);
            })
            .catch((err) => {
                dispatchFailAction(dispatch, 'an error occurred');
                console.log(err);
            });
    }
};

const iterateQueryResult =  (querySnapshot, dispatch) => {
    if (querySnapshot.empty) {
        dispatchFailAction(dispatch, 'Pin does not exist')
    } else {
        querySnapshot.forEach(doc => {
            if (doc.exists) {
                dispatchSuccessAction(dispatch, doc.data());
            }
        })
    }
};

const dispatchSuccessAction = (dispatch, payload) => {
    dispatch({type: GROUP_PIN_SUCCESS, payload: payload})
};

const dispatchFailAction = (dispatch, error) => {
    console.log(error)
    dispatch({type: GROUP_PIN_FAIL, payload: error})
};

export function resetGroupPinForm() {
    return {type: GROUP_PIN_DONE}
}
