import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { LocalDate, Time, Header } from '../../common';
import {FontSize} from '../../../Global'

class FullMessage extends PureComponent {

    state = {
        orientation: "portrait"
    }

    isPortrait() {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    }

    setOrientation() {
        this.setState({
            orientation: this.isPortrait() ? 'portrait' : 'landscape'
        });
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.setOrientation.bind(this));
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.setOrientation.bind(this));
    }
    render() {
        //destructure all styles
        const {landscapeContainer,portraitContainer,closeButton, profilePictureStyle, profileCardStyle,
            messageContStyle, messageStyle, headerTextStyle, cardContentStyle} = styles;
        //choose a container style based on orientation of device
        const container = this.state.orientation === 'portrait' ? portraitContainer : landscapeContainer;
        //destructure props
        const {onClose, profilePicture, name, timestamp, message, headerStyle} = this.props;
        //convert date string to date object
        const date = new Date(timestamp);
        return (
            <View style={container}>
                <Header style={headerStyle}>
                    <View style={closeButton}>
                        <TouchableOpacity onPress={() => onClose()} >
                            <Icon name="close" color="#fff" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={profileCardStyle}>
                        <Image source={{uri: profilePicture}} style={profilePictureStyle}/>
                        <View style={cardContentStyle}>
                            <Text style={[headerTextStyle, {fontWeight: '600'}]}>
                                {`From: ${name}`}
                            </Text>
                            <LocalDate date={date} style={headerTextStyle}/>
                            <Time date={date} style={headerTextStyle} />
                        </View>
                    </View>
                </Header>
                <ScrollView contentContainerStyle={messageContStyle}>
                    <Text style={messageStyle}>{message}</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    portraitContainer: {
        height: '50%'
    },
    landscapeContainer: {
        height: '100%'
    },
    headerStyle: {
        flex: 2
    },
    closeButton: {
        alignItems: 'flex-end',
        maxHeight: '5%'
    },
    profilePictureStyle: {
        width: '25%',
        height: '80%',
        resizeMode: 'contain'
    },
    profileCardStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: '2%',
        margin: 0
    },
    cardContentStyle: {
        paddingLeft: '3%'
    },
    headerTextStyle: {
        color: '#fff'
    },
    messageContStyle: {
        backgroundColor: '#fff',
        padding: '3%',
        flex: 1
    },
    messageStyle: {
        fontSize: FontSize.SUPER_LARGE,
        color: '#000'
    }
});
export {FullMessage}