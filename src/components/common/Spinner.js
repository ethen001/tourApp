import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Spinner = (props) => {
    return  (
        <View style={[styles.container, props.style]}>
            <ActivityIndicator color={props.color} size={props.size} />
        </View>
    );
};

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center'
   }
});

export  {Spinner};