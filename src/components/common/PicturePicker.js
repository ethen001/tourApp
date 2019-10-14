import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native'; 
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
//import console = require('console');

class PicturePicker extends Component {

    showActionSheet() {
        this.ActionSheet.show();
    }

    openPicker() {
        ImagePicker.openPicker({
            //size of picture when taken and enabling editing
            width: 300,
            height: 400,
            cropping: true 
        }).then(image => {
            console.log(image)
            //execute success code and pass image object as arguments
            this.props.onImageCaptured(image);
        }).catch(error => {
            //execute error handling function
            console.log(error)
        });
    }
    
    openCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            useFrontCamera: true,
            enableRotationGesture: true
        }).then(image => {
            this.props.onImageCaptured(image);
        }).catch(error => {
            console.log(error)
        })
    }

    handleActionSheetPress(index) {
        const {openSignUpCamera, openSignUpPicker} = this.props;
        switch(index) {
            case 0:
                //open camera to get profile picture
                this.openCamera();
                break;
            case 1:
                //open picture picker to  choose profile picture
               this.openPicker();
                break;
            default:
                break;
        }
    }

    render() {
        const buttons = [
            'Open Camera',
            'Open photo library',
            'Cancel'
        ];
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableOpacity onPress={() => this.showActionSheet()}>
                    {this.props.children}
                </TouchableOpacity>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Choose Profile Picture'}
                    options={buttons}
                    cancelButtonIndex={2}
                    onPress={this.handleActionSheetPress.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    }
})

export {PicturePicker}