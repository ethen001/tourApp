import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import {Icons, BackButton, Input, Link, Form} from '../common';
import {STUDENT, CHAPERONE, NON_TRAVEL_GUEST, LEAD_CHAP, TOUR_GUIDE, DIRECTOR,} from '../../Global'
import { connect } from 'react-redux';
import { login, resetSignUpForm, resetError, resetRoleSelection } from '../../actions'
import { persistor } from "../../reduxConfig";

class SignInComponent extends Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount() {
        const { user } = this.props;
        if (user.id != '') {
            this.props.navigation.navigate('Home')
        } else {
            persistor.purge().then(res => console.log(res)).catch(error => console.log(error))
            this.props.navigation.navigate('Signin')
        }
    }


    componentDidUpdate() {
        const {error, resetError, user, navigation} = this.props;
        if (user.id != '') {
            navigation.navigate('Home');
        }
        if (error != '') {
            Alert.alert(
                "Sign in Error",
                error,
                [
                    {text: 'OK', onPress: () => resetError()}
                ]
            )
        }
    }

    onSignUpPress() {
        const {navigate} = this.props.navigation;
        navigate('Grouppin');
    }

    renderSignUp() {
        const notAllowed = [LEAD_CHAP, TOUR_GUIDE, DIRECTOR];
        if(!notAllowed.includes(this.props.role)) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.TextStyle, { borderColor: 'black' }]}>Not a user yet? </Text>
                    <Link onPress={this.onSignUpPress.bind(this)} style={{color: '#fff', borderColor: '#fff'}}>
                        Sign Up
                    </Link>
                </View>
            )
        }
        //don't show anything if it is not the appropiate user
        return undefined;
    }

    handleSubmit() {
        this.setState({username: this.state.username.toLowerCase().trim()});
        const {username, password} = this.state;
        const {login, error, resetError} = this.props;
        if (error != '') {
            Alert.alert(
                "Sign in Error",
                 error,
                [{text: 'OK', onPress: () => resetError()}]
            )
        } else {
            login({username, password});
            
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Form 
                        style={{ width: '60%', marginTop: 80 }}
                        loading={this.props.authenticating}
                        buttonText="Sign In"
                        onSubmit={this.handleSubmit.bind(this)}
                    >
                        <Input
                            width='100%'
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Username"
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.email}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                        <Input
                            width='100%'
                            style={styles.TextInputStyle}
                            returnKeyType="done"
                            keyboardType="default"
                            placeholder="Password"
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            secureTextEntry
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            auttoCompleteType={false}
                        />
                    </Form>
                    {this.renderSignUp()}
                    <Link>
                        <Text style={styles.TextStyle}>{"Reset password"}</Text>
                    </Link>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#114af5',
        width: '100%'
    },
    subContainer: {
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    TextInputStyle: {
        marginTop: 15,
    },
    TextStyle: {
        textAlign: 'center',
        marginTop: 30,
        color: 'white',
        fontSize: 16,
        fontWeight: '100',
        borderBottomWidth: 1,
        borderColor: 'white'
    },

    spinnerStyle: {
        marginTop: 50
    },

    errorStyle: {
        fontSize: 14,

    }
});

const mapStateToProps = state => {
    const {authenticating, user, error} = state.userAuth;
    const {role} = state.selectedRole;
    return {role: role, authenticating: authenticating, user: user, error: error}
};

export const SigninScreen = connect(mapStateToProps, {login, resetSignUpForm, resetError, resetRoleSelection})(SignInComponent);
