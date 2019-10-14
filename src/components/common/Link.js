import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function Link(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
            <Text style={[styles.TextStyle, props.style]}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create( {
    TextStyle: {
        flexWrap: 'nowrap',
        textAlign: 'center',
        marginTop: 30,
        color: '#000',
        fontSize: 16,
        fontWeight: '100',
        padding: 0,
        margin: 0
    },
    buttonStyle: {
        padding: 0,
        margin: 0,
        flexWrap: 'nowrap',
        borderBottomWidth: 1,
        borderColor: '#000',
    }
});

export {Link};