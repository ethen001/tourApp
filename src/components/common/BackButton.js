import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Icons} from "./index";

const BackButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.goBack} >
                <Image source={Icons.leftArrow} style={styles.backArrow}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
   container: {
       alignItems: 'flex-start',
       marginLeft: 20,
       marginTop: 15
   },
    backArrow: {
       width: 30,
        height: 30
    },
    button: {
       width: 50,
        height: 50
    }
});

export {BackButton};

