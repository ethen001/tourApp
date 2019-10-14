import React, {PureComponent} from 'react';
import {View, StyleSheet, Alert, Text, Image} from 'react-native';
import {Link, TextButton, Card, CardSection, Container} from '../../common';
import {FontSize} from '../../../Global'
import {connect} from 'react-redux';
import {sendLostMessage, resetLostMessageSent, resetLostMessageError} from '../../../actions';

class RegLostScreenComponent extends PureComponent {

    componentDidUpdate() {
        const {messageSent, error, resetLostMessageError, resetLostMessageSent} = this.props;
        if (messageSent) {
            Alert.alert(
                "Success", 
                "Your find me request has been submitted. You'll be contacted shortly ." +
                    "Please remain at your current location.",
                [{text: 'OK', onPress: () => resetLostMessageSent()}]
                )
        } else if (error) {
            Alert.alert("Error", error, [{text: 'OK'}])
        }
    }

    sendFindMeRequest() {
        const {user, sendLostMessage} = this.props;
        //make sure the user is saying I'm lost
        Alert.alert("Warning!",
                "Are you sure you are lost?",
                [
                    {text: "Yes", onPress: () => sendLostMessage(user)},
                    {text: "No", onPress: null}
                ])   
    }

    renderChaperoneAndTourGuide() {
        const {leadChaperone, tourGuide} = this.props.user;
        if (tourGuide || leadChaperone) {
            return (
                <CardSection>
                    <Text style={styles.textStyle} >  
                        {`Tour Guide: ${tourGuide.firstName} ${tourGuide.lastName}`}
                    </Text>
                    <Text style={styles.textStyle} >
                        {`Lead Chaperone: ${leadChaperone.firstName} ${leadChaperone.lastName}`}
                    </Text>
                </CardSection>
                );
        }
    }
    render() {
        const {profilePicture, firstName, lastName, 
            phoneNumber, leadChaperone, tourGuide} = this.props.user;
        const {container, buttonStyle, cardStyle, textStyle, nameStyle, pictureStyle, buttonTextStyle} = styles;
        return (
            <Container style={container}>
                <Card style={cardStyle}>
                    <Image source={{uri: profilePicture}} style={pictureStyle} />
                    <Text style={[textStyle, nameStyle]}>{`${firstName} ${lastName}`}</Text>
                    <Text style={textStyle} >{`Phone: ${phoneNumber}`}</Text>
                    {this.renderChaperoneAndTourGuide()}
                </Card>
                <Link  onPress={() => this.props.navigation.navigate("Map")} >
                    Where am I?
                </Link>
                <TextButton buttonStyle={buttonStyle} style={buttonTextStyle} onPress={this.sendFindMeRequest.bind(this)}>
                    {"I'm lost!\nPlease find me"}
                </TextButton>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent:  "center"
    },
    buttonStyle: {
        marginTop: '5%',

    },
    buttonTextStyle: {
        fontSize: FontSize.MEDIUM
    },
    cardStyle: {
        width: '80%',
        height: '50%',
        margin: 0,
        padding: '5%',

    },
    pictureStyle: {
        width:  '40%',
        height: '40%',
        resizeMode: 'contain'
    },
    textStyle: {
        color: '#000',
        fontSize: FontSize.MEDIUM

    },
    nameStyle: {
        fontSize: FontSize.LARGE,
        fontWeight: "600",
    }
})

function mapStateToProps(state) {
    const {user} = state.userAuth;
    const {loading, error, messageSent} = state.lostUser;
    return {user, loading, error, messageSent};
}

export const RegLostScreen = connect(mapStateToProps, {sendLostMessage, resetLostMessageError, resetLostMessageSent})(RegLostScreenComponent)
