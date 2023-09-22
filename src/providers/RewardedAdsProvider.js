import React, {createContext, useContext} from 'react';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const RewardedAdsContext = createContext();

const RewardedAdsProvider = ({children}) => {
  const showAd = ({onEarnedReward}) => {
    const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });

    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });
    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      console.log('You have rewarded ' + reward.amount + ' ' + reward.type);
      onEarnedReward(reward);
    });

    rewarded.load();
  };

  const values = {
    showAd,
  };

  return (
    <RewardedAdsContext.Provider value={values}>
      {children}
    </RewardedAdsContext.Provider>
  );
};

export const useRewardedAds = () => {
  return useContext(RewardedAdsContext);
};

export default RewardedAdsProvider;
