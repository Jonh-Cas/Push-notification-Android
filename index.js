/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const HeadlessCheck = ({ isHeadless }) => {

    useEffect(() => {
        messaging().getToken().then( (token) => {
            console.log('el token es  => ', token)
        })
    }, [])
    

    if (isHeadless) {
        // App has been launched in the background by iOS, ignore

        return null;
      }
    
      return <App />;
  }

AppRegistry.registerComponent(appName, () => HeadlessCheck);
