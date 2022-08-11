import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {RecoilRoot} from 'recoil';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
  const Stack = createNativeStackNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
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
