import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {CardSection, LabeledText, ScrollContainer, CustomText, Card, Container,} from '../../common';
import { FontSize, formatPhoneNumberString} from '../../../Global';

class StudentProfileScreenComponent extends Component {

    render() {
        const { imageStyle, containerStyle, nameStyle, emergencyContactStyle} = styles;
        const {firstName, lastName, profilePicture, phoneNumber, tourGuide, leadChaperone, emergencyContact} = this.props.user;
        const {name, number, relationship} = emergencyContact;
        console.log(profilePicture)
        return (
            <ScrollContainer contentContainerStyle={containerStyle}>
                
                    <Image source={{uri: profilePicture}} style={imageStyle} />
                <CustomText style={nameStyle}>
                    {`${firstName} ${lastName}`}
                </CustomText>
                <LabeledText label={'Phone Number'}>
                    {formatPhoneNumberString(phoneNumber)}
                </LabeledText>
                <LabeledText label={'TourGuide'} >
                    {`${tourGuide.firstName} ${tourGuide.lastName}`}
                </LabeledText>
                <LabeledText label={'Lead Chaperone'} >
                    {`${leadChaperone.firstName} ${leadChaperone.lastName}`}
                </LabeledText>
                <CustomText style={emergencyContactStyle}>
                    Emergency Contact
                </CustomText>
                <LabeledText label={'Full Name'}>
                    {name}
                </LabeledText>
                <LabeledText label={'Phone Number'} >
                    {formatPhoneNumberString(number)}
                </LabeledText>
                <LabeledText label={'Relationship'} >
                    {relationship}
                </LabeledText>
            </ScrollContainer>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center'
    },
    imageStyle: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: '3%'
    },
    emergencyContactStyle: {
        fontSize: FontSize.SUPER_LARGE + 5,
        fontWeight: '600',
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },
    nameStyle: {
        fontSize: FontSize.SUPER_LARGE + FontSize.SUPER_TINY,
        fontWeight: '600',
    }
});

function mapStateToProps(state) {
    const {user} = state.userAuth;
    return {user}
}

export const StudentProfileScreen = connect(mapStateToProps)(StudentProfileScreenComponent);