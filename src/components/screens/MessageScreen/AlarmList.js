import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Alarm} from './Alarm';
import {removeAlarm} from '../../../actions'


class AlarmListComponent extends PureComponent {
    
    render() {
        const {alarms, removeAlarm} = this.props;
        const now = new Date();
        console.log(alarms);
        if (alarms.length > 1) {
            alarms.sort((alarm1, alarm2) => {
                const date1 = alarm1.timestamp;
                const date2 = alarm2.timestamp;
                return date1 - date2;
            });
        }
        return (
            <View style={styles.container}>
                {
                    alarms.map((item, index) => {
                        const {title, timestamp} = item;
                        const date = new Date(timestamp);
                        if (date >= now) {
                        return <Alarm 
                            title={title}
                            timestamp={timestamp}
                            key={`alarm ${index}`}
                        />
                        } else {
                            removeAlarm(item);
                        }
                    })
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
})

function mapStateToProps(state) {
    const {alarms} =  state.notifications;
    return {alarms}
}

export const AlarmList = connect(mapStateToProps, {removeAlarm})(AlarmListComponent);