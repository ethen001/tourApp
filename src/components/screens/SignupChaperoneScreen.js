import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StyleSheet, TextInput, View, Image, ScrollView, Alert } from 'react-native';
import {BackButton, Icons,  PicturePicker, DoublePicker, Form} from '../common'
import {signUpChaperone, resetSignUpForm, resetValidError, resetSignUpError} from '../../actions'



class SignupChaperoneScreenComponent extends Component {

    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        retypePassword: '',
        phoneNumber: '',
        profilePicture: '',
        tourGuide: {
            firstName: '',
            lastName: '',
            id: ''
        },
        leadChaperone: {
            firstName: '',
            lastName: '',
            id: ''
        }
    }

    componentDidUpdate() {
        const {userSignedUp, navigation, resetSignUpForm,
        validError, resetValidError, error, resetSignUpError, user} = this.props;
        if(userSignedUp) {
           Alert.alert(
               "Congratulations!",
               "You account has been created. You can now sign in to your account",
               [{
                   text: 'Ok', 
                   onPress: () => {
                        navigation.navigate('Signin')
                       resetSignUpForm();
                    }
                }]
           );
        } else if (validError) {
            Alert.alert(
                "Input Error",
                validError,
                [{text: 'OK', onPress: () => resetValidError()}]
            );
        } else if(error) {
           Alert.alert(
               "Sign Up Error",
               error,
               [{ text: 'OK', onPress: () => resetSignUpError() }]
           )
       }
   }

    setImage() {
        if (this.state.profilePicture) {
            return <Image
                source={{ uri: this.state.profilePicture }}
                style={{ marginTop: 0, width: 70, height: 70,borderRadius:35 }}
            />
        }
        return <Image source={Icons.Camera}
                      style={{ marginTop: 0, width: 50, height: 50 }}
        />
    };

    getImagePath(image) {
        this.setState({profilePicture: image.path})
    }

    handleSubmit() {
        const {resetValidError, signUpChaperone, validError,
            error, group, role, resetSignUpError} = this.props;
        if(validError) {
            Alert.alert(
                "Input Error",
                validError,
                [{text: 'OK', onPress: () => {resetSignUpError()} }]
            );
        } else if (error) {
            Alert.alert(
                "Please contact support",
                error,
                [
                    {text: 'OK', onPress: () => resetValidError() }
                ]
            );
        }else {
            //make email non-case sensitive and remove any space
            this.setState({username: this.state.username.toLowerCase().trim()})
            //sign up user with state data
            signUpChaperone({applicant: this.state, group, role});
        }
    }
    

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <BackButton goBack={() => {
                    const {navigation, resetSignUpForm} = this.props;
                    resetSignUpForm();
                    navigation.goBack();
                    }
                }
                />
                <Form
                    loading={this.props.loading}
                    buttonText="Sign Up"
                    onSubmit={this.handleSubmit.bind(this)} 
                    style={styles.subContainer}>
                    <View style={{ width: '100%', marginTop: 10, alignItems: 'center', position: 'relative' }}>
                        <TextInput
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="First Name"
                            onChangeText={(firstName) => this.setState({firstName: firstName})}
                            value={this.state.firstName}
                        />
                        <TextInput
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Last Name"
                            onChangeText={(lastName) => this.setState({lastName: lastName})}
                            value={this.state.lastName}
                        />
                        <TextInput
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Username"
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.email}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Password"
                            onChangeText={(password) => this.setState({password: password})}
                            value={this.state.password}
                            secureTextEntry={true}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            autoCompleteType={'off'}
                        />
                        <TextInput
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Retype Password"
                            onChangeText={(retypePassword) => this.setState({retypePassword: retypePassword})}
                            value={this.state.retypePassword}
                            secureTextEntry={true}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            autoCompleteType={'off'}
                        />
                        <TextInput
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Phone Number"
                            onChangeText={(phoneNumber) => this.setState({phoneNumber: phoneNumber})}
                            value={this.state.phoneNumber}
                        />
                        <PicturePicker style={styles.cameraStyle} onImageCaptured={this.getImagePath.bind(this)}>
                            {this.setImage()}
                        </PicturePicker>
                    </View>
                </Form>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#114af5',
        justifyContent: 'space-between'
    },
    subContainer: {
        flexGrow: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#114af5',
    },
    TextInputStyle: {
        width: '65%',
        minHeight: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 8,
        marginBottom: 8,
        textAlign: 'left',
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 0,
        paddingBottom: 0

    },
    TextStyle: {
        textAlign: 'center',
        marginTop: 30,
        color: 'white',
        fontSize: 16,
        fontWeight: '100',
        borderBottomWidth: 1,
        borderColor: 'white',
        borderRadius: 2
    },
    dropdownStyle: {
        width: '60%',
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        fontSize: 16,
        marginBottom: 10

    },
    dropdownTextStyle: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',


    },
    cameraStyle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 4
    },
    submitStyle: {
        marginTop: 10,
        alignSelf: 'center'
    },
    dropdown: {
        width: 80,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 5,
        margin: 10
    },
    iconstyle:{
        width: 10,
        justifyContent: 'flex-end'
    }

});

function mapStateToProps(state) {
    const { loading, userSignedUp, error, validError } = state.userSignUp;
    const {group} = state.groupAuth;
    const {role} = state.selectedRole;
    const {user} = state.userAuth;
    return { loading, userSignedUp, error, group, validError, role, user };
}

export const SignupChaperoneScreen = connect(mapStateToProps, {
    signUpChaperone,
    resetSignUpForm,
    resetValidError,
    resetSignUpError
})(SignupChaperoneScreenComponent);
