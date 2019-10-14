import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity {...props} style={[styles.buttonStyle, props.style]}>
            {props.children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        minHeight: 38,
        backgroundColor: '#f74d00',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 15
    },
});

export {Button}