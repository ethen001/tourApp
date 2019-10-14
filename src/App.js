import React from 'react'
import {Platform, StatusBar, PermissionsAndroid} from 'react-native'
import Router from './Router'
import { Constants, Global } from './components/common'

class App extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle('light-content', true)
    StatusBar.setBackgroundColor('black')
    this.state = {
      show: false
    };
  }
  async  requestPermissions(){
    try {
      const response = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ])
      console.log(response);
    } catch (err) {
      console.warn(err)
    }
  }


  async componentDidMount() {
    await this.requestPermissions();
  }

  onOpenPage (item) {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.OpenPage, item)
    })
  };

  onLogout() {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.onLogout)
    })
  };

  onLogin() {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.onLogin)
    })
  }

  render() {
    return (
        <Router/>
    );
  }

}

function mapStateToProps(state) {
  const {user} = state.userAuth;
  const {group} = state.groupAuth;
  return {user, group};
}

export default App;
