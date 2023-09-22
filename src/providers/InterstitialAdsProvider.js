import React, {createContext, useContext} from 'react';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

const InterstitialAdsContext = createContext();

const InterstitialAdsProvider = ({children}) => {
  const showAd = ({onCloseAd}) => {
    const interstitial = InterstitialAd.createForAdRequest(
      TestIds.INTERSTITIAL,
      {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      },
    );

    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      onCloseAd?.();
    });

    interstitial.load();
  };

  const values = {
    showAd,
  };

  return (
    <InterstitialAdsContext.Provider value={values}>
      {children}
    </InterstitialAdsContext.Provider>
  );
};

export const useInterstitialAds = () => {
  return useContext(InterstitialAdsContext);
};

export default InterstitialAdsProvider;
