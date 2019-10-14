import React, {PureComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LocalDate, Time } from '../../common';
import {FontSize} from '../../../Global'


class Alarm extends PureComponent {

    renderTitle() {
        const {title} = this.props;
        if (title) {
            return <Text>{title}</Text>
        }
    }

    render() {
        const {container, leftSideStyle, rightSideStyle, textStyle, timeStyle} = styles;
        const date = new Date(this.props.timestamp);
        return (
            <View style={container}>
                <View style={leftSideStyle}>
                    {this.renderTitle()}
                    <Time date={date} style={[textStyle,timeStyle]}/>
                </View>
                <View style={rightSideStyle}>
                    <LocalDate date={date} style={textStyle} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: '#fff',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    leftSideStyle: {
        width: '70%'
    },
    rightSideStyle: {
        width: '30%'
    },
    textStyle: {
        color: '#000'
    },
    timeStyle: {
        fontSize: FontSize.LARGE
    }

})

export {Alarm};