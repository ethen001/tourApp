import firebase from 'react-native-firebase';
import {Platform} from 'react-native';
import {getTime} from './getTime';
import {Notifications} from './Constants'
//function to create an alarm
export function createAlarm(alarm) {
    //display a title if platform is android
    console.log(alarm);
    const title = Platform.OS === "android" && alarm.title != '' ? alarm.title : 'Alarm';
    //display time in proper time format. 
    let time = getTimeObject(alarm.timestamp)
    //create the notification
    const action = new firebase.notifications.Android.Action('close','ic_launcher','Dismiss');
    action.setShowUserInterface(false);
    const notification = new firebase.notifications.Notification()
    .setNotificationId("alarm")
    .setTitle(title)
    .setBody(getTime(time))
    .setData({
        alarmNotification: true
    })
    .android.setOngoing(true)
    .android.setChannelId('sbnycAlarm')
    .android.setPriority(firebase.notifications.Android.Priority.Max)
    .android.addAction(action);
    console.log("I am here")
    Notifications.scheduleNotification(notification, {
        fireDate: time.getMilliseconds(),
        exact: true,
        repeatInterval: 'minute'
    });
}

function getTimeObject(timestamp) {
    let time = "";
    if (timestamp instanceof firebase.firestore.Timestamp) {
        time = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === 'string') {
        time = new Date(timestamp);
    } else {
        time = timestamp
    }
    return time;
}