// Loading.js
import React from 'react'
import { 
    View,
    Text, 
    ActivityIndicator, 
    StyleSheet 
} from 'react-native'
import { connect } from 'react-redux';
import firebase from 'react-native-firebase'
import SplashScreen from 'react-native-splash-screen'

const mapStateToProps = (state) => ({
    authorized: state.user.authorized
});

class Loading extends React.Component {
  componentDidMount() {
      const {authorized} = this.props;
    SplashScreen.hide();
     firebase.auth().onAuthStateChanged(user => {
       this.props.navigation.navigate(user ? 'Home' : 'Grouppin')
     })
   

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export const LoadingScreen =  connect(mapStateToProps)(Loading);