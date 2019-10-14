import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Icons} from '../common';

const Logo = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image source={Icons.Logo} style={{width: 120, height: 40}}/>
        </TouchableOpacity>
        )
};

export {Logo};