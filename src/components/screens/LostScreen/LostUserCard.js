import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import { TextButton, LocalDate, Time, Card } from '../../common';
import {FontSize} from '../../../Global'
import {connect} from 'react-redux';
import {getLostUserCurrentPosition, toggleMapVisibility} from '../../../actions'

class LostUserCardComponent extends PureComponent {
    renderTimeOrDate() {
        const secs = this.props.timestamp.seconds;
        const date = new Date(secs * 1000);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (diffDays >= 1 || date.getDate() != now.getDate()) {
           return <LocalDate date={date} style={styles.timeDate} />;
        } else {
            return <Time date={date} style={styles.timeDate} />
        }
    }

    handlePress() {
        const {getLostUserCurrentPosition, toggleMapVisibility, location} = this.props;
        console.log(location);
        getLostUserCurrentPosition(location);
        toggleMapVisibility();
    }
    render() {
        const {container, subContainer, pictureStyle, buttonStyle, buttonTextStyle, textStyle, textContainerStyle, nameStyle} = styles;
        const {profilePicture, firstName, lastName, phoneNumber, tourGuide, leadChaperone} = this.props.user;
        return (
            <Card style={container}>
                {this.renderTimeOrDate()}
                <View style={subContainer}>
                    <Image source={{uri: profilePicture}} style={pictureStyle} />
                    <View style={textContainerStyle} >
                        <Text style={[textStyle, nameStyle]}>{`${firstName} ${lastName}`}</Text>
                        <Text style={textStyle} >{`Phone: ${phoneNumber}`}</Text>
                        <Text style={textStyle} >{`Tour Guide: ${tourGuide.firstName} ${tourGuide.lastName}`}</Text>
                        <Text style={textStyle} >{`Chaperone: ${leadChaperone.firstName} ${leadChaperone.lastName}`}</Text>
                        <TextButton 
                            buttonStyle={buttonStyle} 
                            style={buttonTextStyle} onPress={this.handlePress.bind(this)} 
                        >
                            View Location
                        </TextButton>
                    </View>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        flexWrap: 'nowrap',
        flex: 1,
        backgroundColor: '#fff',
        padding: 1,
        margin: '2%',
        borderRadius: 15
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeDate: {
        alignSelf: 'center',
        fontSize: FontSize.MEDIUM
    },
    pictureStyle: {
        width: '40%',
        height: '90%',
        alignSelf: 'center',
        margin: '2.5%',
        resizeMode: 'contain'
    },
    buttonStyle: {
        height: 40,
        flexWrap: 'nowrap',
        paddingLeft: 5,
        paddingRight: 5,
        alignSelf: 'center'
    },
    buttonTextStyle: {
        fontSize: FontSize.TINY,
    },
    textStyle: {
        color: '#000',
        fontSize: FontSize.SMALL,
    },
    textContainerStyle: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: '2.5%',
        alignSelf: 'center'
    },
    nameStyle: {
        alignSelf: 'center',
        fontWeight: '600'
    }
})

export const LostUserCard = connect(null, {getLostUserCurrentPosition, toggleMapVisibility})(LostUserCardComponent);