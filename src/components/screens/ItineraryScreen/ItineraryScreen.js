import React from 'react';
import {StyleSheet, View, WebView , TouchableOpacity, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import {getItinerary} from '../../../actions';
import {Itinerary} from './Itinerary';
import { Spinner } from '../../common';

class ItineraryScreenComponent extends React.Component {

    componentDidMount() {
        const {group, getItinerary} = this.props;
        getItinerary(group.pin);
    }

    renderSpinnerOrPage() {
        const {loading } = this.props;
        if (loading) {
            return <Spinner size='large' color='#fff' />
        }
        return <Itinerary/>
    }

    render() {
        return (
           <View style={styles.container}>
               {this.renderSpinnerOrPage()}
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f6f8fe'
     
    }
});

function mapStateToProps(state) {
    return {...state.itinerary, group: state.groupAuth.group};
}

export const ItineraryScreen = connect(mapStateToProps, {getItinerary})(ItineraryScreenComponent);
