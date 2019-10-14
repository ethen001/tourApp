import firebase from 'react-native-firebase';


//function to calculate time format
export function getTime(date) {
    date = getDate(date);
    //calculate Ante Meridien or Post Meridien string for 12 hour format
    const meridien = date.getHours() > 11 ? 'PM' : 'AM';
    //calculate hour in 12 hour format
    const hours = getHours(date);
    //get minutes as a string
    const minutes = getMinutes(date);
    return`${hours}:${minutes} ${meridien}`;
}

function getDate(dateObj) {
    if (dateObj == null) {
        return null;
    } else if (dateObj instanceof firebase.firestore.Timestamp) {
        return dateObj.toDate();
    } else if (dateObj.hasOwnProperty('seconds')) {
        return new Date(dateObj.seconds * 1000);
    } else if(isNaN(new Date(dateObj).getTime())) {
        return 'Invalid Object';
    } else if (typeof dateObj === 'string') {
        return new Date (dateObj);
    } else {
        return dateObj;
    }
}

function getHours(date) {
    let hour = date.getHours();
    if (hour > 12) {
        hour = hour % 12;
    }

    if (hour == 0) {
        return 12;
    }
    return hour;
}

function getMinutes(date) {
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    }
    return minutes;
}