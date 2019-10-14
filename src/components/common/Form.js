import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Spinner, TextButton} from './index'

function Form(props) {
    const renderButtonOrSpinner = () => {
        const {loading, onSubmit, buttonText} = props;
        if(loading) {
            return <Spinner size='large' color='#f00' style={styles.buttonStyle} />
        }
        return (
            <TextButton onPress={() => onSubmit()} buttonStyle={styles.buttonStyle} >
                {buttonText}
            </TextButton> 
            ) 
    }
    const load = () => {
        if(props.buttonText) {
            renderButtonOrSpinner();
        }
    }
    return (
        <View style={[styles.formContainer, props.style]}>
            <View style={styles.formSection}>
                {props.children}
            </View>
            <View style={[styles.submitButton, props.contentStyle]}>
                {renderButtonOrSpinner()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        width: '100%'
    },
    formSection: {
        position: 'relative',
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    submitButton: {
        marginBottom: '10%',
        flex: 1,
        alignItems: 'center'
    },
    buttonStyle: {
        marginTop: 70
    }
})

export {Form}

