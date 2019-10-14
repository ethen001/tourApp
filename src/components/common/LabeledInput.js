import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Input} from './Input';

function LabeledInput(props) {
    return (
        <View style={[styles.container, props.contentContainerStyle]}>
            <Text style={[styles.text, props.textStyle]}>{props.label}</Text>
            <Input
                {...props}
                style={[props.inputStyle]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5
    },
        container: {
        flex: 1,
        width: '80%',
        margin: 10,
}
});

export {LabeledInput}