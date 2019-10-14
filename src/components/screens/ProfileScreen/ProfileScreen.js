import React, {Component} from 'react';
import {StyleSheet, Modal} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Container, AbsoluteButton} from '../../common';
import {toggleEditUserVisible} from '../../../actions'
import {EditProfileScreen} from '../EditProfileScreen'
import { StudentProfileScreen, RegProfileScreen, AdminProfileScreen } from './index';
import { FontSize, STUDENT, LEAD_CHAP, DIRECTOR, TOUR_GUIDE, CHAPERONE, NON_TRAVEL_GUEST } from '../../../Global';


class ProfileScreenComponent extends Component {

    renderProfileScreen() {
        switch(this.props.user.userType) {
            case STUDENT:
                return <StudentProfileScreen/>
            case CHAPERONE:
            case NON_TRAVEL_GUEST:
                return <RegProfileScreen/>
            default:
                return <AdminProfileScreen/>
        }
    }


    render() {
        const {toggleEditUserVisible, editUserVisible} = this.props;
        return (
            <Container>
               {this.renderProfileScreen()}
                <AbsoluteButton
                    left='80%'
                    top='85%'
                    style={styles.buttonStyle}
                    onPress={() => toggleEditUserVisible()}
                >
                    <Icon name='edit' color='#fff' size={30} />
                </AbsoluteButton>
                <Modal animated animationType='slide' visible={editUserVisible}>
                    <EditProfileScreen/>
                </Modal>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#f74d00',
        elevation: 14
    }
})


function mapStateToProps(state) {
    const {user, editUserVisible} = state.userAuth;
    return {user, editUserVisible};
}


export const ProfileScreen = connect(mapStateToProps, {toggleEditUserVisible})(ProfileScreenComponent);