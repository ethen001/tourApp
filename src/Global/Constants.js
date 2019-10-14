import { Dimensions } from 'react-native'
import firebase from 'react-native-firebase';


export const  ScreenSize = Dimensions.get('window');
export const  EventEmitterName = {
    OpenDrawer: 'OpenDrawer',
    OpenPage: 'OpenPage',
    onSearch: 'onSearch',
    onAdd: 'onAdd',
    onFilter: 'onFilter',
    onLogout: 'onLogout', 
    onLogin: 'onLogin'
  };
 
export const  FONT_FAMILY= 'AvertaStd-Regular'; //Bookerly-Regular
 
export const FontSize =  {
    SUPER_TINY: 9,
    TINY: 11,
    SMALL: 13,
    MEDIUM: 15,
    LARGE: 18,
    SUPER_LARGE: 20,
  };


export const NON_TRAVEL_GUEST = 'parent or non traveling guest';
export const STUDENT = 'Student';
export const CHAPERONE = 'Chaperone';
export const LEAD_CHAP = 'Lead Chaperone';
export const TOUR_GUIDE = 'Tour Guide'
export const DIRECTOR = 'Director'
export const USER = 'regular User';

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const  FCM = firebase.messaging();
export const Notifications = firebase.notifications();
export const defaultPicURL = "https://firebasestorage.googleapis.com/v0/b/sbnyc-76467.appspot.com/o/user.png?alt=media&token=e977f5be-e92c-4dbf-8f29-4a6fdbd53750";
export const DOMAIN = '@sbnyc.com'

//android notification channels
export const alarmChannel = new firebase.notifications.Android.Channel('sbnycAlarm',
'Alarms', firebase.notifications.Android.Importance.Max)
.setDescription('Students on Broadway Android App Alarms Channel')
.setSound('notif.mp3')
.setBypassDnd(true)
.setLockScreenVisibility(firebase.notifications.Android.Visibility.Public)
.enableVibration(true);

export const notificationChannel = new firebase.notifications.Android.Channel('sbnycNotifications',
"Notifications", firebase.notifications.Android.Importance.Max)
.setDescription('Students on Broadway Android App Notification Channel')
.enableVibration(true);

export const lostNotificationChannel = new firebase.notifications.Android.Channel('sbnycLostNotif',
"Lost User Notifications", firebase.notifications.Android.Importance.Max)
.setDescription('Students on Broadway Android App notification Channel for lost users')
.setBypassDnd(true)
.enableVibration(true)
.setLockScreenVisibility(firebase.notifications.Android.Visibility.Public);