import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {LabeledText, ScrollContainer, CustomText} from '../../common';
import {FontSize, formatPhoneNumberString} from '../../../Global'


class RegProfileScreenComponent extends Component {

    render() {
        const { imageStyle, containerStyle, nameStyle} = styles;
        const {firstName, lastName, profilePicture, phoneNumber, tourGuide, leadChaperone} = this.props.user;
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
        height: 600
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


export const RegProfileScreen = connect(mapStateToProps)(RegProfileScreenComponent);