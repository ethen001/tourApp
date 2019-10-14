import React from 'react'
import {Text, StyleSheet} from 'react-native';

const ErrorMessage = (props) => {
    return <Text style={[styles.errorMessage, props.style]}>{props.children}</Text>
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 20,
        color: '#f00',
    }
});

export {ErrorMessage}

