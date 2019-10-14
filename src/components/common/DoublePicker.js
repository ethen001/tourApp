import React, {Component} from 'react';
import {View, Picker, StyleSheet, Text} from 'react-native'; 

class DoublePicker extends Component {

    state = {
        selectedTourGuide: null,
        selectedLeadChap: null

    }

    componentDidMount() {
        const {subGroups} = this.props.group
        const {defaultOptions} = this.props;
        this.setState(() => {
            if (defaultOptions) {
                return {
                    selectedTourGuide: defaultOptions[0],
                    selectedLeadChap: defaultOptions[1]
                }
            }
            return { selectedLeadChap: subGroups[0].leadChaperone, selectedTourGuide: subGroups[0].tourGuide }
        })
    }
    handleSelectionChange (itemValue, current, partner) {
        //array of subgroups
        const {subGroups} = this.props.group;
        //find the object where we can find the value in itemValue
        const obj = subGroups.filter(obj => obj[current].firstName === itemValue.firstName);
        //select that object from the returned array. Always first value in this case
        const selectionIndex = subGroups.indexOf(obj[0]);
        //get the name of the other leader in this subgroup
        const otherGroupLeader = subGroups[selectionIndex][partner];
        //if names are not in in same sub group replace them for the names in same subgroup
        if (current === 'tourGuide' && this.state.selectedLeadChap.firstName !== otherGroupLeader.firstName) {
            this.setState({selectedLeadChap: otherGroupLeader, selectedTourGuide: itemValue})
        } else if (current === 'leadChaperone' && this.state.selectedTourGuide.firstName !== otherGroupLeader.firstName) {
            this.setState({selectedTourGuide: otherGroupLeader, selectedLeadChap: itemValue})
        }
        //add selected subgroup to parent state
        this.props.onGroupSelected(this.state);
    }

    renderDefaultOption(index) {
        const {defaultOptions} = this.props;
        if (defaultOptions != null) {
            return <Picker.Item key={`default-${index}`} label={defaultOptions[index]} value={defaultOptions[index]} />
        }
    }

    render() {
        const {group} = this.props
        console.log(this.props.group);
        return (
            <View style={styles.container}>
                <View style={styles.dropdownContainer}>
                    <Picker
                        mode={'dropdown'}
                        style={styles.dropdownStyle}
                        selectedValue={this.state.selectedTourGuide}
                        onValueChange={(value, index) => this.handleSelectionChange(value, 'tourGuide', 'leadChaperone')}
                    >
                        {this.renderDefaultOption(0)}
                        {
                            group.subGroups.map((item, index) => {
                                return <Picker.Item label={`${item.tourGuide.firstName} ${item.tourGuide.lastName}`} value={item.tourGuide} key={index} />
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.dropdownContainer}>
                    <Picker
                        mode={'dropdown'}
                        style={styles.dropdownStyle}
                        selectedValue={this.state.selectedLeadChap}
                        onValueChange={(value, index) => this.handleSelectionChange(value, 'leadChaperone', 'tourGuide')}
                    >
                        {this.renderDefaultOption(1)}
                        {
                            group.subGroups.map((item, index) => {
                                return <Picker.Item label={`${item.leadChaperone.firstName} ${item.leadChaperone.lastName}`} value={item.leadChaperone} key={index} />
                            })
                        }
                    </Picker>
                </View>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        height: '20%',
        alignItems: 'center',
    },
    dropdownStyle: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 5

    },
    dropdownContainer: {
        flex: 1,
        width: '80%'

    },
})

export {DoublePicker}