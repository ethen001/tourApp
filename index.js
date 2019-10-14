/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Root from './src/Root';
import bgMessaging from './src/background_handlers/bgMessaging';
import bgActions from './src/background_handlers/bgActions';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Root);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => bgActions);
