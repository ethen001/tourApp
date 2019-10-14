import React, {Component} from 'react';
import {View} from 'react-native';
import {BottomTabBar} from "react-navigation";

class TabBarComponent extends Component {
    componentWillUpdate(): void {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View>
                <BottomTabBar {...props} />
            </View>
        );
    }
}
export {TabBarComponent}