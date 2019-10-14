import firebase from 'react-native-firebase';

export function getDate(dateObj) {
    let date = '';
   
    if (dateObj == null) {
        return '';
    }  else if (dateObj instanceof firebase.firestore.Timestamp) {
        date = dateObj.toDate();
    } else if (dateObj.hasOwnProperty('seconds')) {
        date = new Date(dateObj.seconds * 1000);
    } else if(isNaN(new Date(dateObj).getTime())) {
        date = 'Invalid Object';
    } else if (typeof dateObj === 'string') {
        date = new Date (dateObj);
    }  else {
        date = dateObj;
    }
    if (date !== '' || date !== 'Invalid Object') {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }
    return date;
}