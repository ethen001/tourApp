import React, { Component } from 'react';
import {RegLostScreen, AdminLostScreen} from './index';
import {requestLocationPermission, DIRECTOR, TOUR_GUIDE, LEAD_CHAP, STUDENT, CHAPERONE, NON_TRAVEL_GUEST} from '../../../Global';
import { Container } from '../../common';
import {connect} from 'react-redux';

class LostScreenComponent extends Component {

    async componentDidMount() {
        await requestLocationPermission();
    }

    renderLostScreen() {
        const {user} = this.props;
        switch(user.userType) {
            case DIRECTOR:
            case TOUR_GUIDE:
            case LEAD_CHAP:
                return <AdminLostScreen/>
            case STUDENT:
            case CHAPERONE:
            case NON_TRAVEL_GUEST:
                return <RegLostScreen navigation={this.props.navigation} />
            default:
                break;

        }
    }

    render() {
        return (
            <Container>
                {this.renderLostScreen()}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.userAuth;
    return {user};
}

export const LostScreen = connect(mapStateToProps)(LostScreenComponent);
