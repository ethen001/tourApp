import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_IN_PENDING,
     RESET_FORM, USER_CHANGED, USER_CHANGE_FAILED, RESET_ERROR, USER_CHANGE_PENDING, EDIT_USER, GROUP_PIN_SUCCESS
} from '../actions/ActionTypes'
import { isValidName, isValidPhoneNumber, isValidUsername, isValidPassword } from './userSignUp';
import {db, storage, FCM, auth, DOMAIN} from '../Global'
import { persistor } from '../reduxConfig';

const usersRef = db.collection('users');

export function resetSignInForm() {
    return {type: RESET_FORM};
}
export function resetError() {
    return {type: RESET_ERROR};
}

export function login ({username, password}) {
    const email = username + DOMAIN;
    if (!isValid(username,password)) {
        return reportViolation(username, password)
    }
    return dispatch => {
        dispatch({type: SIGN_IN_PENDING});
        loginHelper(email, password).then(records => {
            if (records !== null) {
                dispatch({type: GROUP_PIN_SUCCESS, payload: records.group});
                dispatchLoginSuccessAction(dispatch, records.user);
            } else {
                dispatchLoginFailAction(dispatch, NONEXISTTENT);
            }
        });
    }
}
async function loginHelper(email, password) {
    try {
        //get user data
        const userRecord = await auth.signInWithEmailAndPassword(email, password);
        const doc = await usersRef.doc(userRecord.user.uid).get();
        if (doc.exists) {
            const user = doc.data();
            // get group data
            const querySnapshot = await db.collection('groups').where('pin', '==', user.groupPin).get();
            const group = querySnapshot.docs[0].data();
            return { group, user }
        } else {
            return null;
        }
    } catch(error) {
        throw error;
    }
}

function reportViolation (username, password) {
    const error = "password is not valid."
    if (username === '' && password === '') {
        return {type: SIGN_IN_FAIL, payload: 'Username and password cannot be empty'}
    }

    if (username === '') {
        return {type: SIGN_IN_FAIL, payload: "Username cannot be empty"}
    }

    if(!isValidUsername(username)) {
        return {type: SIGN_IN_FAIL, payload: "The username is badly formatted"}
    }

    if (password === '') {
        return {type: SIGN_IN_FAIL, payload: 'Password cannot be empty'}
    }
    if (!isValidPassword(password, password)) {
        return {type: SIGN_IN_FAIL, payload: error}
    }
}

function isValid(username, password) {
    return isValidUsername(username) && isValidPassword(password, password);
}

function dispatchLoginSuccessAction (dispatch, user) {
    dispatch({type: SIGN_IN_SUCCESS, payload: user});
}

const INVALID = "The password is invalid or the user does not have a password";
const NONEXISTTENT= "There is no user record corresponding to this identifier. The user may have been deleted";

function dispatchLoginFailAction (dispatch, error) {
    switch(error) {
        case INVALID:
            error = "The password is invalid";
            break;
        case NONEXISTTENT:
            error = "Account does not exists. Please create an account"
            break;
        default:
            break;
    }
    dispatch({type: SIGN_IN_FAIL, payload: error})
}

export function changeUserData(id, newData) {
    changeValidationErrorReport(newData);
    return dispatch => { 
        //action used to show the spinner
        dispatch({type: USER_CHANGE_PENDING})
        //delete current picture from storange
        storage.ref('userImages')
                .child(`${id}.jpg`)
                .delete()
                .then(() => {
                    //once deleted upload the new picture
                    uploadPicture(dispatch, id, newData);
                })
                .catch(error => {
                    uploadPicture(dispatch, id, newData);
                });
            }
}


function uploadPicture(dispatch, id, newData) {
    storage.ref('userImages') // reference to folder
        .child(`${id}.jpg`) //name of file  or reference to file
        .putFile(newData.profilePicture) //upload file
        .then(() => {
            //get the new download url
            storage.ref(`userImages/${id}.jpg`).getDownloadURL()
            .then(url => {
                //update user in database with new url
                updateUserData(dispatch, id, newData, url);
            })
            .catch(error => dispatch(dispatchValidationError(error.message)))
        })
        .catch(error => {
            dispatch(dispatchValidationError(error.message))
        })
}

function updateUserData(dispatch, id, newData, picURL) {
    usersRef.doc(id)
        .update({...newData, profilePicture: picURL})
        .then(() => {
            usersRef.doc(id).get().then(doc => {
                dispatch({type: USER_CHANGED, payload: doc.data()})
            })
        }).catch(error => {
            dispatch(dispatchValidationError(error.message))
        })
}

function changeValidationErrorReport(newData) {
    const {firstName, lastName, phoneNumber, emergencyContact} = newData;
    //return a error message to display. The error is specific to the field with invalid data
    if (isEmpty(newData)) {
        return dispatchValidationError('None of the fields can be empty');
    }
    if(!isValidName(firstName)) {
        return dispatchValidationError('First name is not valid');
    }
    if(!isValidName(lastName)) {
        return dispatchValidationError('Last name is not valid');
    }
    if(!isValidPhoneNumber(phoneNumber)) {
        return dispatchValidationError('PhoneNumber is not valid');
    }
    if(emergencyContact) {
        if(!isValidName(emergencyContact.name)) {
            return dispatchValidationError('Emergency contact name is not valid');
        }
        if(!isValidPhoneNumber(emergencyContact.phoneNumber)) {
            return dispatchValidationError('Emergency contact phone Number is not valid');
        }
        if(!isValidName(emergencyContact.relationship)) {
            return dispatchValidationError('Emergency contact relationship is not valid');
        }
    }
}

function isEmpty(data) {
    const {firstName, lastName, phoneNumber, emergencyContact} = data;
    return firstName === '' ||
            lastName === '' ||
            phoneNumber === '' ||
            emergencyContact && emergencyContact.name === '' ||
            emergencyContact && emergencyContact.phoneNumber === '' ||
            emergencyContact && emergencyContact.relationship === '';
}


function updateUser(id, newData, imagePath, dispatch) {
    db.collection('users')
    .doc(id)
    .update({...newData, profilePicture: imagePath})
    .then(() => {
        //update state if update was successful
        dispatch({type: USER_CHANGED, payload: newData})
    })
    .catch(() => {
        //display an error
        dispatch(dispatchValidationError(error))
    })
}

function dispatchValidationError(error) {
    return {type: USER_CHANGE_FAILED, payload: error}
}

export function requestPermissions(userData, group) {
    return dispatch => {
        //check if user has permission
        FCM.hasPermission().then(enabled => {
            if(enabled) {
                //request permisssion fro the user
                FCM.requestPermission().then(() => {
                    setToken(dispatch, userData, group);
                }).catch(error => {
                    console.log(error);
                })
            }
        }). catch(error => {
            console.log(error);
        })
    }
}
function setToken(dispatch, userData, group) {
            //get the device's push token
            FCM.getToken().then(token => {
                //store tocken in redux state
                const newUser = {...userData, pushToken: token};
                dispatch({type: USER_CHANGED, payload: newUser});
            }).catch(error => {
                console.log(error);
            });
            FCM.subscribeToTopic(group.pin); 
}

export function toggleEditUserVisible() {
    return {type: EDIT_USER};
}

export function signOut(group) {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch({type: RESET_FORM, payload: null});
            FCM.unsubscribeFromTopic(group.pin)
            persistor.purge();
        }).then(purgeItem => {
            console.log(purgeItem)
        }).catch(error => {
            console.log(error);
        });
    }
}