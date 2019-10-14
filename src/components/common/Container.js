import React from 'react';
import {View, StyleSheet} from 'react-native';

function Container(props) {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f6f8fe'
    }
});

export {Container};