import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { LocalDate, Time } from '../../common';
import {FontSize} from '../../../Global'
import Modal from 'react-native-modal';
import {FullMessage} from './FullMessage';



class CompressedMessage extends PureComponent {

    state = {
        modalVisible: false
    }

    toggleModal() {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    renderTimeOrDate() {
        const date = new Date(this.props.timestamp);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (diffDays >= 1 || date.getDate() != now.getDate()) {
           return <LocalDate date={date} style={styles.timeDate} />;
        } else {
            return <Time date={date} style={styles.timeDate} />
        }
    }

    render() {
        const {profilePicture, name, message} = this.props;
        const {container, image, textContainer, title, messageStyle, timeDateContainer} = styles;
        return (
            <TouchableOpacity onPress={() => this.toggleModal()} style={container} >
                <Image source={{uri: profilePicture}} style={image} />
                <View style={textContainer}>
                    <Text style={title}>{name}</Text>
                    <Text style={messageStyle}>{message}</Text>
                </View>
                <View styles={timeDateContainer}>
                    {this.renderTimeOrDate()}
                </View>
                <Modal isVisible={this.state.modalVisible}>
                    <FullMessage {...this.props} onClose={this.toggleModal.bind(this)}/>
                </Modal>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: '100%',
        flexWrap: 'nowrap',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    image: {
        width: '15%',
        height: '80%',
        resizeMode: 'contain',
        alignSelf: 'center',
        marginLeft: '2.5%',
        marginRight: '2.5%'
    },
    title: {
        fontWeight: '600',
        fontSize: FontSize.MEDIUM,
        color: '#000'
    },
    messageStyle: {
        fontSize: FontSize.SMALL,
    },
    textContainer: {
        width: '55%',
        flexWrap: 'nowrap'
    },
    timeDate: {
        fontSize: FontSize.SMALL
    },
    timeDateContainer: {
        width: '40%',
        marginLeft: '1%',
        alignItems: 'flex-end'
    }
})

export {CompressedMessage};