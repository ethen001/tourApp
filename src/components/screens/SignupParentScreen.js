import React, { Component } from 'react';
import {StyleSheet,TextInput,View,Image,ScrollView,Alert,} from 'react-native';
import {connect} from 'react-redux';
import {BackButton, Icons, PicturePicker, Form} from '../common'
import { signUpGuest, resetSignUpForm, resetValidError, resetSignUpError} from '../../actions'

class SignUpParentScreenComponent extends Component {

    state = {
        childFirstName: '',
        childLastName: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        retypePassword: '',
        phoneNumber: '',
        profilePicture: '',
        relationship: ''
    }

    componentDidUpdate() {
        const {userSignedUp, navigation, resetSignUpForm,
        validError, resetValidError, error, resetSignUpError} = this.props;
        console.log(validError)
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


    getImagePath(image) {
        this.setState({profilePicture: image.path})
    }
    setImage = () => {
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

    handleSubmit() {
        const {resetValidError, signUpGuest, validError, error, group, role } = this.props;
        if(validError) {
            Alert.alert(
                "Input Error",
                validError,
                [
                    {text: 'OK', onPress: () => resetValidError() }
                ]
            );
        } else if (error) {
            Alert.alert(
                "An Error Occurred",
                error,
                [{text: "OK", onPress: () => navigation.navigate("Signin")}]
            );
        } else {
            console.log("about to send guest")
            //make email non-case sensitive and remove any space
            this.setState({username: this.state.username.toLowerCase().trim()})
            //sign up user with state data
            signUpGuest({applicant: this.state, group, role});
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <BackButton goBack={() => {
                    this.props.resetSignUpForm();
                    this.props.navigation.goBack()
                }
                }
                />
                <Form loading={this.props.loading} onSubmit={this.handleSubmit.bind(this)} buttonText='Submit'>
                    <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                        <TextInput
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Child's First Name"
                            onChangeText={(childFirstName) => this.setState({childFirstName})}
                            value={this.state.childFirstName}
                        />
                        <TextInput
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Child's Last Name"
                            onChangeText={(childLastName) => this.setState({childLastName})}
                            value={this.state.childLastName}
                        />
                    </View>
                    <TextInput
                        style={styles.TextInputStyle}
                        returnKeyType="done"
                        keyboardType="default"
                        placeholder="First Name"
                        onChangeText={(firstName) => this.setState({firstName})}
                        value={this.state.firstName}
                    />
                    <TextInput
                        style={styles.TextInputStyle}
                        returnKeyType="done"
                        keyboardType="default"
                        placeholder="Last Name"
                        onChangeText={(lastName) => this.setState({lastName})}
                        value={this.state.lastName}
                    />
                    <TextInput
                        style={styles.TextInputStyle}
                        returnKeyType="done"
                        keyboardType="default"
                        placeholder="Username"
                        onChangeText={username => this.setState({username})}
                        value={this.state.email}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.TextInputStyle}
                        returnKeyType="done"
                        keyboardType="default"
                        placeholder="Password"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        autoCompleteType={'off'}
                    />
                    <TextInput
                        style={styles.TextInputStyle}
                        returnKeyType="done"
                        keyboardType="default"
                        placeholder="Retype Password"
                        onChangeText={retypePassword => this.setState({retypePassword})}
                        value={this.state.passwordCheck}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        autoCompleteType={'off'}
                    />
                    <TextInput
                        style={styles.TextInputStyle}
                        returnKeyType="done"
                        keyboardType="default"
                        placeholder="Phone Number"
                        onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                        value={this.props.phoneNumber}
                    />
                    <TextInput
                        style={styles.TextInputStyle}
                        returnKeyType="done"
                        keyboardType="default"
                        placeholder="Relationship"
                        onChangeText={(relationship) => this.setState({relationship})}
                        value={this.props.relationship}
                    />
                    <PicturePicker style={styles.cameraStyle} onImageCaptured={this.getImagePath.bind(this)}>
                        {this.setImage()}
                    </PicturePicker>
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
        width: '60%',
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
    const {loading, userSignedUp, error, validError} = state.userSignUp;
    const {group} = state.groupAuth;
    const {role} = state.selectedRole
    return { loading, userSignedUp, error, group, validError, role}
}

export const SignUpParentScreen = connect(mapStateToProps, {
    signUpGuest,
    resetSignUpForm,
    resetValidError,
    resetSignUpError
})(SignUpParentScreenComponent);
