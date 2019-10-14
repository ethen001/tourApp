import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, Dimensions} from 'react-native';
import { AbsoluteButton} from '../../common';
import {FontSize, LEAD_CHAP, TOUR_GUIDE, DIRECTOR ,} from '../../../Global'
import {MessageList, MessageBox, AlarmList} from './index';
import { connect } from 'react-redux'
import {getMessages, getAlarms} from '../../../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



class MessageScreenComponent extends PureComponent {

    state = {
        createMessageVisible: false,
        scrollWidth: Dimensions.get('window').width
    }

    renderMesseges() {
        const {group, getMessages, user} = this.props;
        getMessages({user, group});
    }
    
    componentDidMount() {
        const {alarms, messages, getAlarms, group} = this.props;
        //get all messages
        this.renderMesseges()
        if (alarms.length === 0) {
            getAlarms(group);
        }
        Dimensions.addEventListener('change', () => {
            this.setState({
                scrollWidth: Dimensions.get('window').width
            })
        });
    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change');
    }
    renderAlarmList() {
        const {alarms} = this.props;
        if(alarms.length !== 0) {
            return <AlarmList alarms={alarms} />
        }
    }

    toggleMessageVisibility() {
        this.setState({createMessageVisible: !this.state.createMessageVisible});
    }

    handleEditButtonPress(index) {
        switch(index) {
            case 0:
                this.toggleMessageVisibility();
                break;
            case 1:
                this.toggleAlarmVisibility();
                break;
            default:
                break;
        }
    }

    renderEditButton() {
        const {userType} = this.props.user;
        if (userType === LEAD_CHAP || userType === TOUR_GUIDE || userType === DIRECTOR) {
            const buttons = ['Create message', 'Create alarm', 'Cancel'];
            return (
                <AbsoluteButton 
                    style={styles.buttonStyle}
                    left='80%' 
                    top='85%'
                     onPress={() => this.toggleMessageVisibility()} >
                    <Icon name='message-text-outline' color='#fff' size={30} />
                </AbsoluteButton>
            )
        }
    }

    render() {
        const {container, header, headerText, messageIcon, section, sectionText, scrollContainer} = styles;
        return (
            <View style={container}>
                <ScrollView contentContainerStyle={{width: this.state.scrollWidth}}>
                    <View style={section}>
                        <Text style={sectionText} >Notifications</Text>
                        <MessageList/>
                    </View>
                    <View style={section}>
                        <Text style={sectionText}>Alarms</Text>
                        <AlarmList/>
                    </View>
                </ScrollView>
                {this.renderEditButton()}
                <Modal animationType="slide" visible={this.state.createMessageVisible}>
                    <MessageBox 
                        onClose={this.toggleMessageVisibility.bind(this)}
                    />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#f6f8fe',
    },
    scrollContainer: {
        margin: 0,
    },
    header: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        maxHeight: '5%'
    },
    headerText: {
        fontSize: FontSize.MEDIUM,
        color: '#000',
        fontWeight: '400'
    },
    messageIcon: {
        width: '8%',
        height: '90%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    section: {
        flex: 1,
    },
    sectionText: {
        color: '#fff',
        marginLeft: '1%'
    },
    buttonStyle: {
        backgroundColor: '#f74d00'
    }
});

function mapStateToProps(state) {
    const {messages, alarms} = state.notifications;
    const {group} = state.groupAuth;
    const {user} = state.userAuth;
    return {messages, alarms, group, user};
}

export const MessageScreen  = connect(mapStateToProps,{getMessages,getAlarms})(MessageScreenComponent);
