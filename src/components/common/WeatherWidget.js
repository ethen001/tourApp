import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Container, HorizontalCard} from './index'
import Geolocation from 'react-native-geolocation-service';
import { FontSize } from '../../Global';


class WeatherWidget extends Component {
    state = {
        forecast: null
    }

    getWeather({latitude, longitude}) {
        const apiKey = '6edbc770c78166ba2169ec5656875241'
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({forecast: data})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(position => {
            const {longitude, latitude} = position.coords;
            this.getWeather({longitude, latitude})
        }, error => {
            console.log(error);
        });
    }

    render() {
        if (this.state.forecast) {
            const {weather, main} = this.state.forecast
            const {containerStyle, horizontaCardStyle, weatherStyle, weatherDecStyle, tempStyle, textStyle} = styles
            return (
                <Container style={containerStyle} >
                <HorizontalCard style={horizontaCardStyle} >
                    <Text style={weatherStyle}>{weather[0].main}</Text>
                    <Text style={[weatherStyle, tempStyle]}>{`${Math.round(main.temp)}'`}</Text>
                </HorizontalCard>
                <HorizontalCard style={horizontaCardStyle} >
                    <Text style={weatherDecStyle}>{weather[0].description}</Text>
                    <Text style={[weatherDecStyle, tempStyle]} >
                        {`${Math.round(main.temp_max)}'/${Math.round(main.temp_min)}'`}
                    </Text>
                </HorizontalCard>
                <Text style={textStyle}>{`Humidity: ${main.humidity}%`}</Text>
            </Container>
            )
        }
        return <Container/>
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "#c3c5c5",
        width: '100%',
        paddingVertical: '1%'
    },
    horizontaCardStyle: {
        paddingHorizontal: '2%',
        marginVertical: '1%'
    },
    weatherStyle: {
        flex: 2,
        color: '#000',
        fontSize: FontSize.SUPER_LARGE,
        fontWeight: '500',
    },
    weatherDecStyle: {
        flex: 2,
        color: '#000',
        fontSize: 17,
    },
    tempStyle: {
        flex: 1,
        textAlign: 'right'
    },
    textStyle: {
        color: '#5C5959',
        fontSize: 17,
        width: '100%',
        paddingHorizontal: '2%',
        marginVertical: '1%'
    }
})

export {WeatherWidget};