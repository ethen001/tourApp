import React from 'react';
import {StyleSheet} from 'react-native';
import {Container} from './Container';

function Card(props) {
    return (
        <Container style={[styles.containerStyle, props.style]}>
            {props.children}
        </Container>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'space-around',
        backgroundColor: '#f6f8fe',
        width: "90%",
        height: '80%',
        flex: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})

export {Card}