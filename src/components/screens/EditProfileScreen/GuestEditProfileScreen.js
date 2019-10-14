import React, {Component} from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Alert} from 'react-native';
import {connect} from "react-redux";
import {LabeledInput, PicturePicker, Form} from "../../common";
import {changeUserData, resetError} from "../../../actions";

class GuestEditProfileScreenComponent extends Component {
    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profilePicture: 'user.png',
        childFirstName: '',
        childLastName: ''
    };
    componentDidMount() {
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            phoneNumber: this.props.user.phoneNumber,
            profilePicture: this.props.user.profilePicture,
            childFirstName: this.props.user.childFirstName,
            childlastName: this.props.user.childlastName
        })
    }

    handleSaveChanges() {
        //save data to firebase and redux state or display an error
        const {changeUserData, error, resetError, user, loading} = this.props;
        console.log(error)
        if(error) {
            Alert.alert(
                "Input Error",
                error,
                [
                    {text: 'OK', onPress: () => resetError() }
                ]
            );
        } else {
            changeUserData(user.id , this.state)
            if (!loading) Alert.alert('success', 'All Changes have been made',[{text: 'OK', onPress: null}] )
        }
    }


    getImagePath(image) {
        this.setState({profilePicture: image.path})
    }

    render() {
        const {firstName, lastName, profilePicture, phoneNumber, childFirstName, childLastName} = this.state;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.section, styles.imageSection]}>
                    <Image style={styles.profilePicture} source={{uri: profilePicture}}/>
                    <PicturePicker onImageCaptured={this.getImagePath.bind(this)}>
                        <Text style={styles.pickerText}>Edit your profile picture</Text>
                    </PicturePicker>
                </View>
                <Form 
                    style={styles.form}
                    loading={this.props.loading}
                    buttonText='Save Changes'
                    onSubmit={this.handleSaveChanges.bind(this)} 
                >
                    <LabeledInput
                        label={'First Name'}
                        value={firstName}
                        onChangeText={(text) => this.setState({firstName: text})}
                    />
                    <LabeledInput
                        label={'Last Name'}
                        value={lastName}
                        onChangeText={(text) => this.setState({lastName: text})}
                    />
                    <LabeledInput
                        label={'Phone Number'}
                        value={phoneNumber}
                        onChangeText={(text) => this.setState({phoneNumber: text})}
                    />
                    <LabeledInput
                        label={'Child First Name'}
                        value={childFirstName}
                        onChangeText={(text) => this.setState({childFirstName: text})}
                    />
                    <LabeledInput
                        label={'Child Last Name'}
                        value={childFirstName}
                        onChangeText={(text) => this.setState({childLastName: text})}
                    />
                </Form>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f8fe',
        marginBottom: '1%',
    },
    profilePicture: {
      height: '200%',
      width: '50%',
      marginTop: '3%',
      resizeMode: 'contain'
    },
    imageSection: {
        padding: 0
    },
    section: {
        position: 'relative',
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    emergencyContactText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },

    text: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5
    },
    form: {
        flex: 1,
        width: '100%',
        marginTop: '50%'
    },
    pickerText: {
        textAlign: 'center',
        marginTop: 30,
        color: 'white',
        fontSize: 16,
        fontWeight: '100',
        borderBottomWidth: 1,
        borderColor: 'white',
    }
});

function mapStateToProps(state) {
    const {user, error, authenticating, editUserVisible} = state.userAuth;
    const {group} = state.groupAuth;
    return {user: user, group: group, error: error, loading: authenticating}
}

export const GuestEditProfileScreen = connect(mapStateToProps, {changeUserData, resetError})(GuestEditProfileScreenComponent);
