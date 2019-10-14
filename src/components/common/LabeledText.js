import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Container} from './Container';
import { FontSize } from '../../Global';

function LabeledText(props) {
    const {label, children} = props;
    const {labelStyle, textStyle, containerStyle} = styles;
    return (
        <View style={containerStyle}>
            <Text style={[labelStyle, props.labelStyle]}>{label}</Text>
            <Text style={[textStyle, props.textStyle]}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        alignItems: 'center',
        padding: '3%'
    },
    labelStyle: {
        color: '#000',
        fontSize: FontSize.LARGE
    },
    textStyle: {
        color: '#000',
        fontSize: FontSize.SUPER_LARGE,
        color: '#000',
        fontWeight: '600'
    }
})

export {LabeledText}