import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button} from "./Button";

const TextButton = (props) => {
    return (
        <Button {...props} style={props.buttonStyle}>
            <Text style={[styles.ButtonTextStyle, props.style]}>
                {props.children}
            </Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    ButtonTextStyle: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white'
    }
});

export {TextButton};