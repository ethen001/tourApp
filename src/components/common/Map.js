import React, {PureComponent} from 'react';
import {StyleSheet, View, Platform, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion, Animated}  from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '../../Global'

class Map extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            initialCamera: {
                center:  {
                    latitude: 40.750987,
                    longitude: -74.985367,
                },
                pitch: 0,
                heading: 0,
                altitude: 5.0,
                //Google Maps only
                zoom: 16
            },
            myPosition: {},
            markerCoordinates: []
        };
    }

      handlePosition(position) {
        const {latitude, longitude} = position.coords;
        this.setState(state => {
            const {markerCoordinate} = this.props;
                
            let cameraCenter = {latitude, longitude};
            if (markerCoordinate) {
                cameraCenter = markerCoordinate;
            }
            return {
                myPosition: {latitude, longitude},
                initialCamera: {...this.state.initialCamera, center: cameraCenter}
            }
        })
      }
      watchPosition() {
        this.watchId = Geolocation.watchPosition(
            this.handlePosition.bind(this),
            error => {
                console.log(error);
                alert(JSON.stringify(error));
        }, 
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        })
      }

    async componentDidMount() {
        await requestLocationPermission();
        Geolocation.getCurrentPosition(position => {
            this.handlePosition(position);
            this.watchPosition();
        }, error => {
            console.log(error);
            alert(JSON.stringify(error));
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        })
        const {markerCoordinate} = this.props;
        if (markerCoordinate) {
            this.setState({markerCoordinates: this.state.markerCoordinates.concat(markerCoordinate)});
        }
    }

    modifyCoordinates(coordinate, index) {
        this.setState(state => {
            const markerCoordinates = state.markerCoordinates.map((item, i) => {
                if (i ===  index) {
                    return coordinate;
                } else {
                    return item;
                }
            });
            return {markerCoordinates}
        })
    }

    addMarker(event) {
        const coordinates = event.nativeEvent.coordinate;
        this.setState({markerCoordinates: this.state.markerCoordinates.concat(coordinates)});
    }

    render() {
        return (
            <View style={styles.container} >
                <MapView
                    initialCamera={this.state.initialCamera}
                    camera={this.state.initialCamera}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation
                    followsUserLocation
                    showsPointsOfInterest
                    moveOnMarkerPress
                    onLongPress={this.addMarker.bind(this)}
                >
                    {
                        this.state.markerCoordinates.map((coordinate,index) => {
                            return <Marker.Animated 
                                        key={`MapMarker:${index}`}
                                        coordinate={coordinate}
                                        draggable
                                        onDragEnd={e => this.modifyCoordinates(e.nativeEvent.coordinate, index)}
                                    />
                        })
                    }
                </MapView>
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
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export {Map};