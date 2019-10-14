import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { FontSize } from '../../Global';

function CustomText(props) {
    return <Text style={[styles.textStyle, props.style]} >{props.children}</Text>
}

const styles = {
    textStyle: {
        color: '#000',
        fontSize: FontSize.LARGE,
        alignSelf: 'center'
    }
}

export {CustomText}