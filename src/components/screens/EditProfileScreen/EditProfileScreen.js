import React, {Component} from 'react';
import { StyleSheet,} from 'react-native';
import {connect} from "react-redux";
import { STUDENT, NON_TRAVEL_GUEST } from '../../../Global';
import { StudentEditProfileScreen, GuestEditProfileScreen, RegEditProfileScreen } from './index';
import { CornerButton, Container } from '../../common';
import Icon from 'react-native-vector-icons/AntDesign';
import {toggleEditUserVisible} from '../../../actions';

class EditProfileScreenComponent extends Component {
    renderProfile() {
        const {userType} = this.props.user;
        switch(userType) {
            case STUDENT:
                return <StudentEditProfileScreen/>
            case NON_TRAVEL_GUEST:
                return <GuestEditProfileScreen/>
            default:
                return <RegEditProfileScreen/>
        }
    }
    render() {
        return (
            <Container style={styles.containerStyle} >
                <CornerButton onPress={() => this.props.toggleEditUserVisible()}>
                    <Icon name='close' color='#000' size={30} />
                </CornerButton>
                {this.renderProfile()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        alignItems: 'stretch'
    },
})

function mapStateToProps(state) {
    const {user} = state.userAuth;
    return {user}
}

export const EditProfileScreen = connect(mapStateToProps, {toggleEditUserVisible})(EditProfileScreenComponent);
