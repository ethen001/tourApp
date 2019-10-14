import {addMessage, addAlarm, addLostUser, canAddMessage, canDisplayMessage} from '../actions';
import {createAlarm, createNotification, createLostNotification} from '../Global'

export default async message => {
    console.log("In bgMessaging")
    console.log(message);
    const {data} = message;
    switch(data.notifType) {
        case 'alarm':
            if (canAddMessage(message)) addAlarm(data);
            if (canDisplayMessage(message)) createAlarm(data);
            break;
        case 'lostUser':
            if(canAddMessage(message)) addLostUser(message);
            if(canDisplayMessage(message)) createLostNotification(message);
            break;
        case 'message': 
        if(canDisplayMessage(message)) addMessage(message);
        if (canAddMessage(message)) createNotification(message);
            break;
        default:
            break;
    }
    return Promise.resolve();
}