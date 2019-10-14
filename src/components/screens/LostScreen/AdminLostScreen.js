import React, {PureComponent} from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import {Modal, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Container, Map, AbsoluteButton} from '../../common'
import {getLostUsers, toggleMapVisibility} from '../../../actions'
import {CardList} from './CardList'


class AdminLostScreenComponent extends PureComponent {

    componentDidMount() {
        const {group, getLostUsers} = this.props;
        getLostUsers(group);
    }

    
    render() {
        const {mapVisible, currentPosition, toggleMapVisibility} = this.props;
        return (
            <Container>
                <CardList/>
                <Modal animated animationType="slide" visible={mapVisible}>
                    <Map markerCoordinate={currentPosition} />
                    <AbsoluteButton onPress={() => toggleMapVisibility()} style={styles.buttonStyle}>
                        <Icon name="close" color="#000" size={20} style={styles.buttonStyle} style={{alignSelf: 'center'}}/>
                    </AbsoluteButton>
                </Modal>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
    }
})

function mapStateToProps(state) {
    const {lostUsers, currentPosition, mapVisible} = state.lostUser;
    const {group} = state.groupAuth;
    return {lostUsers, group, mapVisible, currentPosition};
}

export const AdminLostScreen = connect(mapStateToProps, {getLostUsers, toggleMapVisibility})(AdminLostScreenComponent);