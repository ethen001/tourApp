import React, {Component} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {Form, Input, LabeledInput, CornerButton} from '../../common';
import {sendMessage, resetNotifError, resetMessageSent, getMessages} from '../../../actions'

class MessageBoxComponent extends Component {
    state = {
        sender: {},
        groupPin:'',
        message: '',
    }

    componentDidMount() {
        const {group, user} = this.props;
        this.setState({
            sender: user,
            groupPin: group.pin,
        });
    }

    handleNameChange(name) {
        const words = name.split(' ');
        this.setState({
            sender: {...this.state.sender, firstName: words[0], lastName: words[1]}
        })
    }

    handleSubmit() {
        const {error, resetMessageSent, resetNotifError, sendMessage, onClose, user, group} = this.props;
        if (error == null || error === '') {
            //alert the error if there  was an error
            Alert.alert(
                "An error occured",
                error
                [{text: 'OK', onPress: () => resetNotifError()}]
            );
        } else {
            //send the message. let the user know and close the form
            sendMessage(this.state);
            Alert.alert(
                '',
                'Message was sent',
                [{
                    text: 'OK',
                    onPress: () => {
                        resetMessageSent();
                        getMessages({user, group});
                        onClose();
                    }
                }]
            );
        }
    }

    render() {
        const {closeButton, textBox, headerStyle, labeledInputContentStyle,
            containerStyle, labelInputStyle} = styles;
        const {firstName, lastName} = this.state.sender;
        return (
            <Form 
                buttonText="Send" 
                onSubmit={this.handleSubmit.bind(this)}
                loading={this.props.loading}
                style={containerStyle}
            >
                <CornerButton onPress={() => this.props.onClose()}>
                    <Icon name='close' color='#fff' size={30} />
                </CornerButton>
                <View style={headerStyle}>
                    <LabeledInput
                        label='From: '
                        returnKeyType="done"
                        contentContainerStyle={labeledInputContentStyle}
                        inputStyle={labelInputStyle}
                        value={`${firstName} ${lastName}`}
                        onChangeText={this.handleNameChange.bind(this)}
                    />
                </View>
                <Input
                    style={textBox}
                    returnKeyType="done"
                    keyboardType="default"
                    placeholder="Write message"
                    multiline={true}
                    numOfLines={40}
                    onChangeText={(message) => this.setState({message})}
                    value={this.state.message}
                />
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#5A5757',
        height: '100%'
    },
    textBox: {
        flex: 1,
        width: '100%',
        maxHeight: 250,
        justifyContent: 'flex-start',
    },
    closeButton: {
        alignItems: 'flex-start',
        width: '100%',
        maxHeight: '10%',
        flex: 1
    },
    labeledInputContentStyle: {
        flexDirection: 'row',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginBottom: '1%'
    },
    labelInputStyle: {
        backgroundColor: '#5A5757',
        color: '#fff'    
    },
    headerStyle: {
        flex: 1,
        paddingLeft: '1%'
    }
});

function mapStateToProps(state) {
    const {error, messageSent, loading} = state.notifications;
    const {group} = state.groupAuth;
    const {user} = state.userAuth;
    return {error, messageSent, loading, user, group};
}

export const MessageBox = connect(mapStateToProps,{resetMessageSent,resetNotifError, sendMessage, getMessages})(MessageBoxComponent);