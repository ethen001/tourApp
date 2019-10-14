import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';

type Props = {
    contentContainerStyle: any
}

class ScrollContainer extends PureComponent<Props> {

    state = {
        width: Dimensions.get('window').width
    }

    changeWidth() {
        this.setState({
            width: Dimensions.get('window').width
        })
    }

    componentDidMount() {
        if (this.props.resizable) {
            Dimensions.addEventListener('change', this.changeWidth.bind(this));
        }
    }

    componentWillUnmount() {
        if (this.props.resizable) {
            Dimensions.removeEventListener('change', this.changeWidth.bind(this));
        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container, this.props.contentContainerStyle, {width: this.state.width}]}>
                {this.props.children}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#f6f8fe',
        alignItems: 'center'
    }
})

export {ScrollContainer};