import { Alert, AppState, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { check, PERMISSIONS, PermissionStatus, openSettings, request } from 'react-native-permissions'
import messaging from '@react-native-firebase/messaging';

const App = () => {

  const permissionPushNotificationIOS = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('El permiso es =>', authStatus);
    }
  }

  const permissionPushNotificationAndroid = async () => {

      let requestNotifications: PermissionStatus;
      requestNotifications = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
      console.log('El permiso es =>', requestNotifications)
      if (requestNotifications === 'blocked') {
        openSettings()
      }
    
  }

  useEffect(() => {

    if (Platform.OS === 'ios') {
      permissionPushNotificationIOS()
    } else {
      permissionPushNotificationAndroid()

    }

  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Text>App</Text>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({})