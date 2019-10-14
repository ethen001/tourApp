import React from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator,
    createSwitchNavigator} from 'react-navigation';
import * as screens from "./components/screens";
import {MenuButton, Logo, SideMenu, TabBarComponent} from './components/Navigation';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


//we need stack for each screen such that they can have a header and functional menu button
const createScreenStack = (route:string, screen, addTab) => {
    const routeConfigMap = {};
    routeConfigMap[route] = {
        screen: screen,
        navigationOptions: ({navigation}) => ({
            headerLeft: <MenuButton onPress={() => navigation.toggleDrawer()}/>, // open side menu when button is pressed
            headerStyle: {
                backgroundColor: '#114af5',
                color: '#fff',
                fontWeight: "600"
            }
        })
    };
    return createStackNavigator(routeConfigMap);
};

//Home Screen Stack
const HomeStack = createScreenStack('Home', screens.HomeScreen);

//Itinerary Screen Stack
const ItineraryStack = createScreenStack('Itinerary', screens.ItineraryScreen, true);

// I'm lost screen stack
const LostStack = createScreenStack('Lost', screens.LostScreen);

//notifications screen stack
const NotificationStack = createScreenStack('Notifications', screens.MessageScreen);

//map screen stack
const MapStack = createScreenStack('Map', screens.MapScreen);

// contact us screen stack
const ContactStack = createScreenStack('Contact', screens.ContactScreen);

// about screenstack
const AboutStack = createScreenStack('About', screens.AboutScreen);

//EditPROFILE STACK
const EditProfileStack = createScreenStack('EditProfile', screens.EditProfileScreen);

//profile Stack
const ProfileStack = createScreenStack('Profile', screens.ProfileScreen);

//menu a the bottom of the app
const Tabs = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <SimpleLineIcon name="home" color={tintColor} size={23} />
        }
    },
    Itinerary: {
        screen: ItineraryStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <SimpleLineIcon name="map" color={tintColor} size={23} />
        }
    },
    Lost: {
        screen: LostStack,
        navigationOptions: {
            title: "I'm Lost",
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcon name="account-question" color={tintColor} size={30} />
        }
    },
    Notifications: {
        screen: NotificationStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <EvilIcon name="envelope" color={tintColor} size={40} />
        }
    }
}, {
    contentComponent: props => <TabBarComponent {...props} />,
    order: ['Home', 'Itinerary', 'Lost', 'Notifications'],
    animationEnabled: true,
    initialRouteName: 'Home',
    backBehavior: 'history',
    tabBarOptions: {
        showIcon: true,
        activeTintColor: '#ff7900',
        inactiveTintColor: '#fff',
        style: {
            backgroundColor: '#114af5',
            height: 50
        }
    }
});


const DrawerNavigator = createDrawerNavigator({
    Home: {screen: Tabs},
    Itinerary: {screen: ItineraryStack},
    Map: {screen: MapStack},
    Lost: {screen: LostStack, navigationOptions: {title: "I'm Lost"}},
    Notification: {screen: NotificationStack},
    EditProfile: {screen: EditProfileStack, navigationOptions: {drawerLabel: () => null}},
    Profile: {screen: ProfileStack, navigationOptions: {drawerLabel: () => null}}
}, {
    contentComponent: props => <SideMenu{...props}/>,
        drawerBackgroundColor: '#f6f8fe',
    contentOptions: {
        labelStyle: {
            color: '#000'
        }
    }
});

const AuthStack = createSwitchNavigator({

    Signin: { screen: screens.SigninScreen },
    Grouppin: { screen: screens.GroupPinScreen },
    SelectRole: { screen: screens.SelectRoleScreen },
    SignupStudent: { screen: screens.SignupScreenStudent },
    SignupParent: { screen: screens.SignUpParentScreen },
    SignupChaperone: {screen: screens.SignupChaperoneScreen},
    ParentScreen: {screen: screens.ParentScreen},
    Home: {screen: DrawerNavigator}

}, {
    backBehavior: "history"
});

const MainNavigator = createStackNavigator({
    main: {screen: AuthStack},
    EditProfile: { screen: EditProfileStack },
    Profile: {screen: ProfileStack}
},{
    defaultNavigationOptions: {
        header: null
    }
});

export default createAppContainer(AuthStack);

