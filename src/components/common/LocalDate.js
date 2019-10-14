import React from 'react';
import {Text} from 'react-native';
import { getDate } from '../../Global';



function LocalDate(props) {
    const {date} = props;
    const localDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    return <Text style={props.style}>{localDate}</Text>
}

export {LocalDate}