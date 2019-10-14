import firebase from 'react-native-firebase';
import {Notifications} from './Constants'

const notifications = firebase.notifications;

export function createNotification(remoteMessage) {
    console.log("Inside notifications");
    console.log(remoteMessage);
    const {senderName, message} = remoteMessage.data;
    const notification = new notifications.Notification()
        .setTitle(senderName)
        .setBody(message)
        .android.setAutoCancel(true)
        .android.setPriority(notifications.Android.Priority.Max)
        .android.setChannelId('sbnycNotifications');
     
    Notifications.scheduleNotification(notification, {
        fireDate: new Date().getMilliseconds(),
        exact: true
    });
}
