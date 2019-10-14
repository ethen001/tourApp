import React, { Component } from 'react';
import {StyleSheet,Text,Image, StatusBar, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Container, HorizontalCard, LocalDate, WeatherWidget, LabeledText } from "../common";
import {FontSize, Notifications, FCM, alarmChannel, notificationChannel, lostNotificationChannel, createAlarm} from '../../Global';
import {requestPermissions, updateMessagesList, addAlarm, addLostUser, canAddMessage, canDisplayMessage,addMessage} from '../../actions';

class HomeScreenComponent extends Component {
    constructor(props) {
        super(props);
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor('black');
        this.state = {
          channel: null
        }
    }
    showAlert(title, body) {
        this.props.updateMessagesList();
        Alert.alert(
          title,
          body,
          [{text:'OK', onPress: () => console.log('Notif: ok pressed')}],
          {cancelable: false}
        )
      }
      handleNotification(notification) {
          const {notificationId, title, body, data} = notification;
          if (title == null && body == null){
              this.showAlert(data.senderName, data.message);
          } else {
            this.showAlert(title, body)
          }
          Notifications.removeDeliveredNotification(notificationId);
      }

      handleNotificationOpen(notificationOpen) {
        if (notificationOpen !== null) {
          const {notification} = notificationOpen;
          if (notification.notificationId !== 'alarm') {
            this.handleNotification(notification);
          }
          if (notificationOpen.action === 'close') {
            const {notificationId} = notificationOpen.notification;
            Notifications.cancelNotification(notificationId);
            Notifications.removeDeliveredNotification(notificationId);
          }
        }
      }
    
      createNotificationEventListeners() {

        Notifications.android.createChannels([alarmChannel, notificationChannel, lostNotificationChannel]);
        this.setState({alarmChannel});

        //check if app was first  opened by a notification
        Notifications.getInitialNotification(). then(notificationOpened => {
            this.handleNotificationOpen(notificationOpened)
        }). catch(error => console.log(error));

        //triguered when notifications is opened by a notification
        this.notificationOpenedListener = Notifications.onNotificationOpened(notificationOpen => {
            this.handleNotificationOpen(notificationOpen);
        });

        // Triguered whe a notification is received in foreground
        this.notificationListener = Notifications.onNotification(notification => {
          if (notification.notificationId !== 'alarm') {
            this.handleNotification(notification);
          }
        });
    
        //Listen when a notification is clicked on the background
        this.notificationDisplayedListener = Notifications.onNotificationDisplayed(notification => {
          if (notification.notificationId !== 'alarm') {
            this.handleNotification(notification);
          }
        });
      }

    
      componentDidMount() {
        const {user, group, requestPermissions, addAlarm,
          addLostUser, canAddMessage, canDisplayMessage, addMessage} = this.props;
        //get permission for user notifications
          requestPermissions(user, group);
        //add notification listeners
        this.createNotificationEventListeners();
        ////data-only foreground notification listener
        this.messageListener = FCM.onMessage(message => {
            console.log("In Home");
            const {data} = message;
            if (data.alarmNotification) {
              return;
            }
            switch(data.notifType) {
              case 'alarm':
                  addAlarm(data);
                  createAlarm(data);
                break;
              case 'message':
                if (canDisplayMessage(message)) this.showAlert(data.senderName, data.message);
                if (canAddMessage(message)) addMessage(message);
                break;
              case 'lostUser':
                if (canAddMessage(message)) addLostUser(message);
                if (canDisplayMessage(message)) this.showAlert(data.title, data.body);
                break;
              default:
                break;
            }
        });
      }
    
      componentWillUnmount() {
        //remove listeners when application closes
        this.notificationListener();
        this.notificationDisplayedListener();
      }

    render() {
      const {startDate, endDate, name, groupLogo, destination} = this.props.group;
        const start = new Date(startDate.seconds * 1000);
        const end = new Date(endDate.seconds * 1000);
        const {horizontalCardStyle, textStyle, dateStyle, logoStyle, containerStyle } = styles;
        return (
            <Container style={containerStyle}>
                <Image source={{uri: groupLogo}} style={logoStyle} />
                <LabeledText label="Group Name:">{name}</LabeledText>
                <LabeledText label="Destination:">{destination}</LabeledText>
                <Text style={textStyle}>Dates:</Text>
                <HorizontalCard style={horizontalCardStyle} >
                  <LocalDate date={start} style={dateStyle}/>
                  <Text style={dateStyle}> - </Text>
                  <LocalDate date={end} style={dateStyle} />
                </HorizontalCard>
                <WeatherWidget/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: '2%',
    justifyContent: 'space-between'
  },
  horizontalCardStyle: {
    padding: '3%',
    paddingTop: 0,
    justifyContent: 'center',

  },
  textStyle: {
    fontSize: FontSize.LARGE,
    color: '#000',
  },
  dateStyle: {
    color: '#000',
    fontSize: FontSize.SUPER_LARGE,
    fontWeight: '600',
  },
  logoStyle: {
    width: '60%',
    height: '30%',
    resizeMode: 'contain'
  }
});

function mapStateToProps(state) {
    return {user: state.userAuth.user, group: state.groupAuth.group, alarms: state.notifications.alarms, lostUsers: state.lostUser.lostUsers};
}

export const HomeScreen = connect(mapStateToProps, {updateMessagesList, requestPermissions,
  addAlarm, addMessage, addLostUser,canAddMessage, canDisplayMessage})(HomeScreenComponent);
