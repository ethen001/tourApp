import React, {Component} from 'react';
import {FlatList, Picker, View, ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {getItinerary} from '../../../actions'
import { FontSize, FONT_FAMILY, getDate } from '../../../Global';
import {ActivityList} from './ActivityList';


class ItineraryComponent extends Component {
    ALL_DATES = 'All';

    state = {
        selectedDate: this.ALL_DATES
    }

    renderActivities() {
        const {selectedDate} = this.state;
        const {dailyData} = this.props.itineraryData;

        if (selectedDate === this.ALL_DATES) {
            return dailyData.map(((item) => {
                const {date, activities, id} = item;
                return <ActivityList date={date} activities={activities} key={`gen-${id}`} />
            }));
        } else {
            const selectedDay = dailyData.filter(item => item.date === selectedDate);
            console.log(selectedDay[0].activities)
            return <ActivityList activities={selectedDay[0].activities} />
        }
    }
    render() {
        const {dailyData} = this.props.itineraryData;
        return (
            <View style={styles.container}>
                    <Picker
                        mode='dropdown'
                        style={styles.dropdownStyle}
                        itemStyle={styles.pickerItem}
                        selectedValue={this.state.selectedDate}
                        onValueChange={(value, index) => this.setState({selectedDate: value})}
                    >
                        <Picker.Item label={this.ALL_DATES} value={this.ALL_DATES} key={-1}/>
                        {
                            dailyData.map((item, index) => {
                                const dateString = getDate(item.date)
                                return <Picker.Item label={dateString} value={item.date} key={`datePicker ${index}`} />
                            })
                        }
                    </Picker>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {this.renderActivities()}   
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: "center",
    },
    PickerContainer: {
        width: '100%',
        flex: 1,
    },
    dropdownStyle: {
       backgroundColor: '#fff',
       width: '100%'
    },
    pickerItem: {
        color: 'red',
    },
    scrollContainer: {
        width: '85%',
    }
})

function mapStateToProps(state) {
    const {itineraryData} = state.itinerary;
    return {itineraryData};
}

export const Itinerary = connect(mapStateToProps)(ItineraryComponent);