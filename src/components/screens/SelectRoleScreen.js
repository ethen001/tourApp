import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import { Icons, BackButton, TextButton, HorizontalCard, LocalDate } from '../common'
import RadioForm from 'react-native-simple-radio-button';
import {connect} from "react-redux";
import {resetGroupPinForm, resetSignInForm, selectRole} from "../../actions";
import {NON_TRAVEL_GUEST, STUDENT, DIRECTOR, LEAD_CHAP, TOUR_GUIDE, CHAPERONE} from "../../Global"


const radio_props = [
    { label: "I'm a Student", value: STUDENT },
    { label: "I'm a Chaperone", value: CHAPERONE },
    { label: "I'm a Lead Chaperone", value: LEAD_CHAP },
    { label: "I'm a Tour Guide", value: TOUR_GUIDE },
    { label: "I'm a Director", value: DIRECTOR },
    { label: "I'm a Non-Travelling Guest", value: NON_TRAVEL_GUEST }
];

class SelectRoleScreenComponent extends Component {

    state = {
        role: STUDENT
    }

    onRadioButtonPress(option) {
        if (option !== undefined) {
            this.setState({role: option});
        }
    }

    onGoBackPress() {
        const {navigation, resetGroupPinForm} = this.props;
        resetGroupPinForm();
        navigation.goBack();
    }

    handleGoNextPress() {
        const { resetSignInForm, selectRole } = this.props;
        selectRole(this.state.role);
        resetSignInForm();
        this.navigateSignUp();
    }
    navigateSignUp() {
        const { navigate } = this.props.navigation;
        switch (this.state.role) {
            case STUDENT:
                navigate('SignupStudent');
                break;
            case CHAPERONE:
                navigate('SignupChaperone');
                break;
            case NON_TRAVEL_GUEST:
                navigate('SignupParent');
                break;
            default:
                Alert.alert('Error',
                 "You are not authorized to create an account. Please contact administration",
                 [{text: 'OK', onPress: navigate('Signin')}]);
                break;
        }
    }

    render() {
        const {name, startDate, endDate, destination} = this.props.group;
        const start = new Date(startDate.seconds * 1000); //concerted seconds to milliseconds
        const end = new Date(endDate.seconds * 1000); //converted seconds to milliseconds
        return (
            <View style={styles.container}>
                <View >
                    <BackButton goBack={this.onGoBackPress.bind(this)}/>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.TextStyle}>{name}</Text>
                    <HorizontalCard style={styles.horizontalCardStyle} >
                        <LocalDate date={start} style={styles.dateStyle}/>
                        <Text style={styles.dateStyle}> - </Text>
                        <LocalDate date={end} style={styles.dateStyle}/>
                    </HorizontalCard>
                    <Text style={styles.SubTextStyle}>{destination}</Text>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#fff'}
                        animation={true}
                        onPress={this.onRadioButtonPress.bind(this)}
                        labelStyle={{ fontSize: 18, color: '#fff' }}
                        labelWrapStyle={{ marginBottom: 10 }}
                    />
                    <TextButton onPress={this.handleGoNextPress.bind(this)}>
                        Next
                    </TextButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: '#114af5'
    },
    subContainer: {
      alignItems: 'center'
    },
    TextStyle: {
        textAlign: 'center',
        marginTop: 30,
        color: 'white',
        fontSize: 22,
        fontWeight: '200'
    },
    SubTextStyle: {
        textAlign: 'center',
        marginTop: 8,
        color: 'white',
        fontSize: 18,
        marginBottom: 35,
    },
    dateStyle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff'    
    },
    horizontalCardStyle: {
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    const {role} = state.selectedRole;
    const {group} = state.groupAuth;
    return {selectedRole: role, group};
};

export const SelectRoleScreen = connect(mapStateToProps, {selectRole, resetGroupPinForm, resetSignInForm})(SelectRoleScreenComponent);