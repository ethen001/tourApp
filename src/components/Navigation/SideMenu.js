import React, {PureComponent} from 'react';
import {DrawerItems} from 'react-navigation';
import {View, StyleSheet, Image, Text, TouchableHighlight, Linking} from 'react-native';
import {Footer, FooterTab, Button} from "native-base";
import {Icons} from '../common';
import {getPicture} from '../../Global'
import {SideMenuHeader} from './SideMenuHeader';
import {connect} from 'react-redux';
import {signOut, resetGroupPinForm, resetSignInForm, getAboutInfo} from "../../actions";


class SideMenuComponent extends PureComponent {
    handleOnPress() {
        const{signOut, resetGroupPinForm, navigation, resetSignInForm, group} = this.props;
        signOut(group);
        resetSignInForm();
        resetGroupPinForm();
        navigation.navigate('Signin');
    }
    
    handleOnEditProfile() {
        this.props.navigation.navigate('Profile');
    }

    getProfileImage() {
        const {profilePicture} = this.props.user;
        if (profilePicture === '' || profilePicture === null) {
            return getPicture('user.png')
        }
        return profilePicture;
    }

    goToLink(url) {
        Linking.openURL(url).catch(error => {
           console.log(error)
       }) 
    }



    render() {
        const facebook = 'https://www.facebook.com';
        const instagram = 'https://www.instagram.com';
        const twitter = 'https://www.twitter.com';
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <SideMenuHeader userData={this.props.user}  profilePicture={this.getProfileImage()} onEditProfile={this.handleOnEditProfile.bind(this)} />
                </View>
                <View>
                    <DrawerItems {...this.props} />
                    <TouchableHighlight onPress={this.handleOnPress.bind(this)} underlayColor={"#3A3838"}>
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableHighlight>
                </View>
                <Footer style={styles.footer}>
                    <FooterTab style={styles.footer}>
                        <Button transparent onPress={() => this.goToLink(facebook)} >
                            <Image source={Icons.facebook} style={styles.socialMediaLink}/>
                        </Button>
                        <Button transparent onPress={() => this.goToLink(instagram)} >
                            <Image source={Icons.instagram} style={styles.socialMediaLink}/>
                        </Button>
                        <Button transparent onPress={() => this.goToLink(twitter)} >
                            <Image source={Icons.twitter} style={styles.socialMediaLink}/>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>

        );
    }
};

const styles = StyleSheet.create({

    socialMediaLink: {
       width: 40,
       height: 40
    },
    footer: {
        marginTop: 20,
       justifyContent: 'flex-end',
        backgroundColor: '#f6f8fe',
        elevation: 0,
        shadowColor: '#5A5757',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        marginBottom: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 0
    },
    signOutText: {
        color: '#000',
        fontWeight: "600",
        marginLeft: 12,
        marginTop: 5,
        marginBottom: 5,
        padding: 5
    },
    header: {
        height: '20%'
    }
});

function mapStateToProps(state) {
    const {user} = state.userAuth;
    const {group} = state.groupAuth;
    const {aboutInfo} = state.information;
    return {user, group, aboutInfo};
}

export const SideMenu = connect(mapStateToProps, {signOut, resetGroupPinForm, resetSignInForm, getAboutInfo})(SideMenuComponent);