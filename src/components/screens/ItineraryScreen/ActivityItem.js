import React, {PureComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { FontSize } from '../../../Global';
import {Card} from '../../common'

class ActivityItem extends PureComponent {
    render() {
        const {time, description} = this.props;
        return (
            <Card style={styles.container}>
                <View style={styles.time}>
                    <Text style={styles.text}>
                        {time}
                    </Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.text}>
                        {description}
                    </Text>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f8fe',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minHeight: 60,
        marginVertical: '2%',
        padding: '3%'
    },
    time: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#000',
        borderRightWidth: 1,
        paddingRight: '1%'
    },
    description: {
        flex: 4,
        flexWrap: 'wrap',
        marginLeft: '2%'
    },
    text: {
        fontSize: FontSize.MEDIUM,
        color: '#000'
    }

});

export {ActivityItem};