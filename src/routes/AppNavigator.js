import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import NextScreen from '../screens/NextScreen';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  const {} = useInterstitialAd(TestIds.Interstitial, {
    requestNonPersonalizedAdsOnly: true,
  });

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen component={NextScreen} name="NextScreen" />
    </Stack.Navigator>
  );
};

export default AppNavigator;
