import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ActivityItem} from './ActivityItem';
import { FontSize, getDate, getTime } from '../../../Global';

function ActivityList(props) {
    const {activities, date} = props;
    const dateString = date == null ? '' : getDate(date); 
    return (
      <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{dateString}</Text>
          </View>
          {
            activities.map((item, index) => {
                const timeString = getTime(item.time);
                return <ActivityItem time={timeString} description={item.description} key={`${index}: ${date}`}/>
            })
          }
      </View>  
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: '2%',
        marginBottom: '1%'
    },
    titleContainer: {
        // backgroundColor: '#000',
        // borderRadius: 10,
        flex: 1,
        paddingLeft: '3%',
        paddingTop: '1%',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        marginBottom: '1%'
    },
    title: {
        fontSize: FontSize.LARGE,
        fontWeight: "700",
        color: '#000'
    }
})

export {ActivityList}