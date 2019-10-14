import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
    onPress: function
}

function CornerButton(props: Props) {
    return (
        <View style={[styles.containerStyle, props.style]} >
            <TouchableOpacity onPress={props.onPress}>
                {props.children}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#f6f8fe'
    }
});

export {CornerButton}