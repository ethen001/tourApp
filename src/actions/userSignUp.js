import {
    SIGN_UP_SUCCESS,
    SIGN_UP_PENDING,
    SIGN_UP_FAIL,
    RESET_FORM, VALID_FAIL, VALID_RESET,
    SIGNUP_ERROR_RESET
} from '../actions/ActionTypes';
import {db, storage, defaultPicURL, DOMAIN, auth} from '../Global'
import firebase from 'react-native-firebase';

const usersRef = db.collection('users');

export function signUpStudent({applicant, group, role}) {
    if(!isValid(applicant)) {
        return reportValidationError(applicant);
    }
    if (!isValidEmergencyContact(applicant)) {
        return reportEmergencyContactValidError(applicant.emergencyContact);
    }
    return signUpUser({applicant, group, role});
}

export function signUpChaperone({applicant, group, role}) {
    if (!isValid(applicant)) {
        return reportValidationError(applicant);
    }
    return signUpUser({applicant, group, role});
}

export function signUpGuest({applicant, group, role}) {
    console.log(group)
    if (!isValid(applicant)) {
        return reportValidationError(applicant);
    }
    if (!isValidChildInfo(applicant)) {
        return reportChildValidError(applicant)
    }
    return signUpUser({applicant,group,role});
}

function signUpUser({applicant, group, role}) {
    const email = applicant.username + DOMAIN;
    return dispatch => {
        //signal begining of user signup
        dispatch({type: SIGN_UP_PENDING});
        //create user authentication account first
        auth.createUserWithEmailAndPassword(email, applicant.password)
            .then(res => {
                //add user to the database
                signUpHelper(dispatch,applicant, group, role, res.user)
            })
            .catch(error => {
                dispatch({type: SIGN_UP_FAIL, payload: error.message});
            })
    }
}

function signUpHelper(dispatch,applicant, group, role, user) {
    //create user in firestore database
    usersRef.doc(user.uid).set({
        id: user.uid,
        groupPin: group.pin,
        userType: role,
        profilePicture: defaultPicURL,
        dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
        ...applicant
    })
    .then(() => {
        //post the user profile picture
        if (applicant.profilePicture !== '') {
            postPicture(dispatch, user, applicant);
        } else {
            //dispatch success action to redux storage
            dispatch({type: SIGN_UP_SUCCESS});
        }
    })
    .catch(error => {
        dispatch({type: SIGN_UP_FAIL, payload: error.message});
    });
}
function postPicture(dispatch, user, applicant) {
    //upload image to firestorage
    storage.ref('userImages')
    .child(`${user.uid}.jpg`)
    .putFile(applicant.profilePicture)
    .then(() => {
        //once uploaded, get download url
        const pic = `${user.uid}.jpg`;
        storage.ref('userImages').child(pic).getDownloadURL() .then(url => {
            //upload new user's profielpicture to uploader picture download url
            usersRef.doc(user.uid).update({profilePicture: url}).then(() => {
                //dispatch success action to redux storage
                dispatch({type: SIGN_UP_SUCCESS});
            })
            .catch(error => dispatch({type: SIGN_UP_FAIL, payload: error.message}))
        })
        .catch(error => dispatch({type: SIGN_UP_FAIL, payload: error.message}))
    })
    .catch(error => dispatch({type: SIGN_UP_FAIL, payload: error.message}));
}

function reportValidationError(applicant) {
    const {username, password, retypePassword, firstName, lastName, phoneNumber} = applicant;
    if (username === '') {
        return {type: VALID_FAIL, payload: "Username is required"}
    }
    if (!isValidUsername(username)) {
        return {type: VALID_FAIL, payload: "Username is not valid"};
    }
    if (password === '') {
        return {type: VALID_FAIL, payload: "Password is required"};
    }
    if (password !== retypePassword) {
        return {type: VALID_FAIL, payload: "Passwords do not match"};
    }
    if (!isValidPassword(password, retypePassword)) {
        const error = "password is not valid.\npassword must contain:\n" +
            "Lowercase characters(a-z)\nAt least one uppercase (A-Z)\nAt least one numeric (0-9)";
        return {type: VALID_FAIL, payload: error};
    }
    if (firstName === '') {
        return {type: VALID_FAIL, payload: "First Name is required"};
    }
    if(!isValidName(firstName)) {
        return {type: VALID_FAIL, payload: "invalid first name"};
    }
    if (lastName === '') {
        return {type: VALID_FAIL, payload: "Last Name is required"};
    }
    if(!isValidName(lastName)) {
        return {type: VALID_FAIL, payload: "invalid last name"};
    }
    if (phoneNumber === '') {
        return {type: VALID_FAIL, payload: "Phone number is required"};
    }
    if (!isValidPhoneNumber(phoneNumber)) {
        return {type: VALID_FAIL, payload: "Phone number is required"};
    }
}

function reportChildValidError({childFirstName, childLastName}) {
    if (childFirstName === '') {
        return {type: VALID_FAIL, payload: "Child First Name is required"}
    }
    if (!isValidName(childFirstName)) {
        return {type: VALID_FAIL, payload: "Child First Name is not valid"};
    }
    if(childLastName === '') {
        return {type: VALID_FAIL, payload: "Child Last Name is required"};
    }
    if(!isValidName(childLastName)) {
        return {type: VALID_FAIL, payload: "Child Last Name is not valid"};
    }
}

function reportEmergencyContactValidError({name, number, relationship}) {
    if(name === '') {
        return {type: VALID_FAIL, payload: "Emergency contact name is required"};
    }
    if (!isValidName(name)) {
        return {type: VALID_FAIL, payload: "Emergency contact number is not valid"};
    }
    if(number === '') {
        return {type: VALID_FAIL, payload: "Emergency contact number is required"};
    }
    if(!isValidPhoneNumber(number)) {
        return {type: VALID_FAIL, payload: "Emergency contact number is not valid"};
    }
    if(relationship === '') {
        return {type: VALID_FAIL, payload: "Emergency contact relationship is required"};
    }
    if(!isValidName(relationship)) {
        return {type: VALID_FAIL, payload: "Emergency contact relationship is not valid"};
    }
}

function isValid(applicant) {
    const {username, password, retypePassword, firstName, lastName, phoneNumber} = applicant;
    return isValidUsername(username) && 
           isValidPassword(password, retypePassword) &&
           isValidName(firstName) && 
           isValidName(lastName) &&
           isValidPhoneNumber(phoneNumber);
}

function isValidEmergencyContact(applicant) {
    const {name, number, relationship} = applicant.emergencyContact;
    return isValidName(name) && isValidPhoneNumber(number) && isValidName(relationship);
}

function isValidChildInfo(applicant) {
    const {childFirstName, childLastName} = applicant;
    return isValidName(childFirstName) && isValidName(childLastName);
}

export function isValidName(name) {
    const re = /[a-zA-Z][a-zA-Z][^0-9#&<>\"~;$^%{}?]{0,30}$/
    return re.test(name);
}

export function isValidUsername(username) {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(username);
}


export function isValidPassword(password, passwordCheck) {
    const re = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;
    return re.test(password) && password === passwordCheck;
}

export function isValidPhoneNumber(phoneNumber) {
    const re = /^(\+\d{1,}\s)?\(?\d{1,}\)?[\s.-]?\d{1,}[\s.-]?\d{1,}$/;
    return re.test(phoneNumber);
}

export function resetValidError() {
    return {type: VALID_RESET}
}

export function resetSignUpForm() {
    return {type: RESET_FORM};
}

export function resetSignUpError() {
    return {type: SIGNUP_ERROR_RESET}
}


// export function signUpUser(applicant) {
//     if (!isValid(applicant)) {
//         return reportValidationError(applicant);
//     }
//     return (dispatch, getState) => {
//         const {selectedRole, groupAuth} = getState();
//         //signal begining of user signup
//         dispatch({type: SIGN_UP_PENDING});
//         //create user in firestore database
//         db.collection("users").doc(applicant.email).set({
//             id: applicant.email,
//             groupPin: groupAuth.group.pin,
//             userType: selectedRole.role,
//             firstName: applicant.firstName,
//             lastName: applicant.lastName,
//             phoneNumber: applicant.phoneNumber,
//             selectedSubGroup: applicant.selectedSubGroup,
//             profilePicture: defaultPicURL,
//             emergencyContact: {
//                 name: applicant.emergencyContact.name,
//                 phoneNumber: applicant.emergencyContact.number,
//                 relationship: applicant.emergencyContact.relationship
//             }
//         })
//             .then(() => {
//                 //upload image to firestorage
//                 storage.ref('userImages')
//                 .child(`${applicant.firstName} ${applicant.lastName}.jpg`)
//                 .putFile(applicant.profilePicture)
//                 .then(() => {
//                     //once uploaded, get download url
//                     const pic = `${applicant.email}.jpg`;
//                     storage.ref('userImages').child(pic).getDownloadURL() .then(url => {
//                         //upload new user's profielpicture to uploader picture download url
//                         db.collection('users').doc(applicant.email).update({profilePicture: url}).then(() => {
//                             //dispatch success action to redux storage
//                             dispatch({type: SIGN_UP_SUCCESS});
//                         })
//                     })
//                 });
//             })
//             .catch(error => {
//                 dispatch({type: SIGN_UP_FAIL, payload: error.message});
//             });
//     }
// }