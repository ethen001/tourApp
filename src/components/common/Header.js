import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

function HeaderComponent(props) {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5A5757',
        elevation: 1,
        color: '#fff'
    }
})

export const Header = memo(HeaderComponent);