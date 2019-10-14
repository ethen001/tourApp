import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {Link, Container, CardSection} from "../common";
import { FontSize } from '../../Global';

function SideMenuHeader (props) {
    const { firstName, lastName} = props.userData;
    return (
        <Container style={styles.container}>
            <Image style={styles.image} source={{uri: props.profilePicture}} />
            <CardSection style={styles.nameContainer}>
                <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
                <Link onPress={props.onEditProfile} style={styles.link}>View Profile</Link>
            </CardSection>
        </Container>
    )
}

const styles = StyleSheet.create ({
   container: {
       flex: 1,
       flexDirection: 'row',
       margin: '5%',
       marginBottom: 0,
   },
    nameContainer: {
        flex: 1,
        // margin: '5%',
        // marginBottom: 0
    },
    name: {
        color: '#000',
        fontWeight: '700',
        alignSelf: 'center',
        fontSize: FontSize.LARGE,
    },
    link: {
        fontSize: FontSize.MEDIUM,
        width: '80%'
    },
    image: {
       width: '50%',
       height: '100%',
       resizeMode: 'contain'
    }
});

export { SideMenuHeader };

