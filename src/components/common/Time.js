import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { getTime } from '../../Global';


function Time(props) {
    const {date} = props;
    const time = getTime(date);
    return <Text style={props.style}>{time}</Text>
}

export {Time}