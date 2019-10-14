import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Alert} from 'react-native';
import {ErrorMessage, Icons, Input, Spinner, Container, CardSection, BackButton} from '../common';
import {connect} from "react-redux";
import {groupPinChanged, authenticateGroupPin, resetGroupPinForm, resetSignInForm} from '../../actions';
import {persistor} from "../../reduxConfig";

class GroupPinScreenComponent extends Component {

    state = {
        groupPin: ''
    }

    componentDidMount() {
        const {user} = this.props;
        if (user.id != '') {
            this.props.navigation.navigate('Home')
        } else {
            persistor.purge().then(res => console.log(res)).catch(error => console.log(error))
            this.props.resetGroupPinForm();
            this.props.navigation.navigate('Grouppin')
        }   
    }

    componentDidUpdate() {
        if (this.props.group) {
            this.props.navigation.navigate("SelectRole");
        }
    }

    onGroupPinChange(pin) {
        this.setState({groupPin: pin});
    }

    onGroupPinEndEditing() {
        const {groupPin} = this.state
        if (groupPin !== '') {
            this.props.authenticateGroupPin(groupPin);
        }
    }

    renderSpinner() {
        if (this.props.loading) {
            return <Spinner color='#f74d00' size='large'/>
        }
        return undefined;
    }

    renderError() {
        return <ErrorMessage>{this.props.error}</ErrorMessage>
    }

    handleGoBack() {
        const { navigation, resetSignInForm, resetGroupPinForm} = this.props;
        resetSignInForm();
        resetGroupPinForm();
        navigation.goBack();
    }

    render() {
        return (
            <Container style = {styles.container}>
                <CardSection style={{alignItems: 'flex-start', flex: 0}}>
                    <BackButton goBack={this.handleGoBack.bind(this)} />
                </CardSection>
                <Text style={styles.TextTypeStyle}>Enter Group Pin</Text>
                <Input
                    style={styles.TextInputStyle}
                    secureTextEntry
                    returnKeyType="done"
                    keyboardType="number-pad"
                    maxLength={4}
                    value={this.state.groupPin}
                    onChangeText={this.onGroupPinChange.bind(this)}
                    onEndEditing={this.onGroupPinEndEditing.bind(this)}
                />
                {this.renderError()}
                {this.renderSpinner()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#114af5',
    },
    TextTypeStyle: {
        textAlign: 'center',
        marginTop: Dimensions.get('window').height / 2 - 200,
        color: 'white',
        fontSize: 18,
        width: '60%'
    },
    TextInputStyle: {
        width: '60%',
        marginTop: 10,
        textAlign: 'center',
    }

});

const mapStateToProps = state => {
    const {userInput, group, loading, error} = state.groupAuth;
    const {user} = state.userAuth;
    return {userInput, group, loading, error, user}
};

//export const GroupPinScreen = GroupPinScreenComponent;
export const GroupPinScreen = connect(mapStateToProps,{groupPinChanged, authenticateGroupPin, resetGroupPinForm, resetSignInForm})(GroupPinScreenComponent);
