import React from 'react';
import {View, StyleSheet} from 'react-native';

function CardSection(props) {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    }
})

export {CardSection}