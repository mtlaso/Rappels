import {GestureHandlerRootView} from 'react-native-gesture-handler'; // Doit être au top

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';

import App from './App';
import TestScreen from './Lib/Screens/Test';
import ListInfoScreen from './Lib/Screens/ListInfoScreen';

const GestureHandlerRootViewAppWrapper = () => {
  return (
    <GestureHandlerRootView>
      <App />
    </GestureHandlerRootView>
  );
};

const AppWrapper = () => {
  // const Stack = createNativeStackNavigator();
  const Stack = createStackNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            presentation: 'transparentModal',
            animationTypeForReplace: 'push',
            gestureEnabled: true,
          }}>
          <Stack.Screen
            name="HomeScreen"
            component={GestureHandlerRootViewAppWrapper}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TestScreen"
            component={TestScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ListInfoScreen"
            component={ListInfoScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default AppWrapper;
