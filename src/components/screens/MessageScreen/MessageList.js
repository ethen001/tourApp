import React, {memo} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {CompressedMessage} from './CompressedMessage';

function MessageListComponent(props) {
    const {messages} = props;
    if (messages.length !== 0) {
        messages.sort((message1,message2) => {
            const date1 = new Date(message1.timestamp);
            const date2 = new Date(message2.timestamp);
            return date2 - date1;
        });
        return (
            <View style={styles.container}>
                {
                    messages.map((item, index) => {
                        const {sender, message, timestamp} = item;
                        return <CompressedMessage
                            name={`${sender.firstName} ${sender.lastName}`}
                            profilePicture={sender.profilePicture}
                            message={message}
                            timestamp={timestamp}
                            key={`Message ${index}`}
                        />
                    })
                }
            </View>
        );
    }
    return <View></View>
}

const styles = {
    container: {
        flex: 1,
        width: '100%'
    }
}

function mapStateToProps(state) {
    const {messages} = state.notifications;
    return {messages};
}

export const MessageList = connect(mapStateToProps)(memo(MessageListComponent));