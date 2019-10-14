import React from 'react';
import {View, StyleSheet} from 'react-native';

function HorizontalCard(props) {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export {HorizontalCard};