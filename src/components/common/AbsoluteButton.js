import React, {PureComponent}  from 'react';
import {TouchableOpacity, StyleSheet, View, Dimensions} from 'react-native';

type Props = {
    left: string,
    top: string,
    onPress: any
}

class AbsoluteButton extends PureComponent<Props> {
    state = {
        leftDist: 0,
        topDist: 0,
    }

    isPortrait() {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    }

    determinePosition() {
        if (this.isPortrait()) {
            return {leftDist: this.props.left, topDist: this.props.top}
        } else {
            const left = parseInt(this.props.left);
            const top = parseInt(this.props.top);
            return {
                leftDist: `${left + 10}%`,
                topDist: `${top - 15}%`
            }
        }
    }

    setPosition() {
        this.setState(this.determinePosition.bind(this));
    }

    componentDidMount() {
        this.setState({
            leftDist: this.props.left,
            topDist: this.props.top
        })
        Dimensions.addEventListener('change', this.setPosition.bind(this));
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.setPosition.bind(this));
    }

    render() {
        const {buttonStyle} = styles;
        const {leftDist, topDist} = this.state;
        return (
            <View style={{position: 'absolute', left: leftDist, top: topDist}}>
                <TouchableOpacity style={[buttonStyle, this.props.style]} onPress={this.props.onPress}>
                    {this.props.children}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
})

export {AbsoluteButton}