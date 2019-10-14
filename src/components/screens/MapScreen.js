import React, {Component} from 'react';
import {Map, AbsoluteButton} from '../common'
import {View, Text, StyleSheet, Modal} from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';



class MapScreen extends Component {
    render() {
        const {container, buttonContainerStyle, buttonStyle} = styles;
        return (
            <View style={container}>
                <Map/>
                {/* <AbsoluteButton
                    contentContainerStyle={buttonContainerStyle}
                    style={buttonStyle}
                >
                    <Icon name="md-train" color="#222" size={35} />
                </AbsoluteButton> */}
                
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonContainerStyle: {
        left: '80%',
        top: '85%'
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 1,
        width: 60,
        height: 60
    }
})

export {MapScreen}