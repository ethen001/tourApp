import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {LabeledText, ScrollContainer, CustomText} from '../../common';
import {FontSize, formatPhoneNumberString} from '../../../Global'


class AdminProfileScreenComponent extends Component {

    render() {
        const { imageStyle, containerStyle, nameStyle} = styles;
        const {firstName, lastName, profilePicture, phoneNumber} = this.props.user;
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
            </ScrollContainer>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center'
    },
    imageStyle: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginTop: '3%'
    },

    nameStyle: {
        fontSize: FontSize.SUPER_LARGE + 5,
        fontWeight: '600',
        marginVertical: '5%'
    }
});

function mapStateToProps(state) {
    const {user} = state.userAuth;
    return {user}
}

export const AdminProfileScreen = connect(mapStateToProps)(AdminProfileScreenComponent);