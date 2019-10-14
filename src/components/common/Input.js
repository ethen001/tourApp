import React, {Component} from 'react';
import {TextInput, StyleSheet} from "react-native";


class Input extends Component {
    state = {
        height: 40,
    }

    changeHeight(event) {
        this.setState({height: event.nativeEvent.contentSize.height})
    }

    render() {
        return (
            <TextInput
                {...this.props}
                style={[styles.textInput, this.props.style, {height: Math.max(styles.textInput.height, this.state.height)}]}
                onContentSizeChange={this.changeHeight.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 18,
    }
});

export {Input}