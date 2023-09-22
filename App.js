import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {MaxAdContentRating, MobileAds} from 'react-native-google-mobile-ads';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppNavigator from './src/routes/AppNavigator';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {Platform} from 'react-native';
import InterstitialAdsProvider from './src/providers/InterstitialAdsProvider';
import RewardedAdsProvider from './src/providers/RewardedAdsProvider';

const App = () => {
  MobileAds()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,

      // An array of test device IDs to allow.
      testDeviceIdentifiers: ['EMULATOR'],
    })
    .then(() => {
      // Request config successfully set!
      MobileAds()
        .initialize()
        .then(adapterStatuses => {
          // Initialization complete!

          console.log(adapterStatuses);
        });
    });

  const checkTrackingPermissions = async () => {
    if (Platform.OS === 'ios') {
      const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      if (result === RESULTS.DENIED) {
        // The permission has not been requested, so request it.
        await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      }

      await MobileAds().initialize();
    }
  };

  useEffect(() => {
    checkTrackingPermissions();
  }, []);

  return (
    <InterstitialAdsProvider>
      <RewardedAdsProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </RewardedAdsProvider>
    </InterstitialAdsProvider>
  );
};

export default App;
