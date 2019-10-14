import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,

} from 'react-native';
import { Container, Content, Footer } from 'native-base';
import { Icons } from '../common'


type Props = {};
class GroupPinScreen extends Component<Props> {
    state = {
        pinNumber: ''
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Content >
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, height: 46 }}>
                            <TouchableOpacity style={styles.subContainer} onPress={() => navigate('Itinerary')} >
                                <Image source={Icons.Itinerary} style={{ marginTop: 0, width: 25, height: 25 }} />
                                <Text style={styles.TextTypeStyle}>ITINERARY</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.subContainer} onPress={() => navigate('Lost')} >
                                <Image source={Icons.Lost} style={{ marginTop: 0, width: 25, height: 25 }} />
                                <Text style={styles.TextTypeStyle}>I`M LOST</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subContainer} onPress={() => navigate('Message')} >
                                <Image source={Icons.Message} style={{ marginTop: 0, width: 25, height: 25 }} />
                                <Text style={styles.TextTypeStyle}>MESSAGES</Text>
                            </TouchableOpacity> */}
                        </View>
                        <Image source={Icons.Keller} style={{ marginTop: 70 }} />
                        <View style={styles.weatherContainer}>
                            <View style={styles.WeatherSubContainer}>
                                <Text style={[styles.TextWeatherStyle, { fontWeight: '500', fontSize: 20 }]}>Weather Update</Text>
                                <Text style={[styles.TextWeatherStyle, { fontWeight: '400' }]}>Mostly Sunny</Text>
                                <Text style={[styles.TextWeatherStyle, { fontWeight: '400' }]}>Chances of Snow 20%</Text>
                            </View>
                            <View style={styles.WeatherSub2Container}>
                                <Text style={[styles.TextWeatherStyle, { fontWeight: '400' }]}>40`</Text>
                                <Text style={[styles.TextWeatherStyle, { fontWeight: '100', fontSize: 14 }]}>37`/26</Text>
                            </View>
                        </View>
                    </View>
                </Content>
                <Footer style={styles.footerStyle}>
                    <TouchableOpacity onPress={() => navigate('Grouppin')}>
                        <Image source={Icons.LeftArrow} style={{ marginTop: 0, width: 36, height: 30, tintColor: 'white' }} />
                    </TouchableOpacity>
                    <Image source={Icons.Logo} style={{ marginTop: 0, width: 90, height: 30, paddingRight: 30 }} />
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5A5757',
    },
    subContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRightWidth: 1,
        alignItems: 'center',
        paddingTop: 3
    },
    WeatherSubContainer: {
        backgroundColor: 'white',
        paddingTop: 3,
        paddingLeft: 10
    },
    WeatherSub2Container: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 3,
        paddingLeft: 10,
        paddingRight: 10,
    },
    weatherContainer: {
        backgroundColor: 'white',
        borderRightWidth: 1,
        alignItems: 'center',
        paddingTop: 3,
        width: '80%',
        height: 100,
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TextTypeStyle: {
        color: 'black',
        fontSize: 12,
        fontWeight: "100",
        textAlign: 'left',
        marginBottom: 5,
    },
    TextWeatherStyle: {
        color: 'black',
        fontSize: 18,
        fontWeight: "100",
        textAlign: 'left',
        marginBottom: 5,
    },
    footerStyle: {
        flexDirection: 'row',
        width: "100%",
        height: 45,
        paddingTop: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        borderBottomWidth: 0.2,
        borderBottomColor: '#5A5757',
        paddingRight: 20
    },
});

export const ParentScreen = GroupPinScreen;