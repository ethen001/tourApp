import React from 'react';

import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';


const MenuButton = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Icon name="menu" color="#fff" size={40} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    container: {
        marginLeft: 5
    }
})

export {MenuButton};