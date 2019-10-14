import {Notifications} from '../Global'


export default async (notificationOpen) => {
    console.log(notificationOpen);
    if (notificationOpen.action === 'close') {
        const {notificationId} = notificationOpen.notification;
        Notifications.cancelNotification(notificationId);
        Notifications.removeDeliveredNotification(notificationId);
    }
    return Promise.resolve();
}
