import firebase from 'react-native-firebase';
import {Notifications} from './Constants'

const notifications = firebase.notifications;

export function createLostNotification(remoteMessage) {
    const {title, body} = remoteMessage.data;
    const notification = new notifications.Notification()
        .setTitle(title)
        .setBody(body)
        .android.setAutoCancel(true)
        .android.setChannelId('sbnycLostNotif')
        .android.setPriority(notifications.Android.Priority.High);
    //throw the notification
    Notifications.scheduleNotification(notification, {
        fireDate: new Date().getMilliseconds(),
        exact: true
    });
}