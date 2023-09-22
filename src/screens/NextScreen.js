import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useRewardedAds} from '../providers/RewardedAdsProvider';

const NextScreen = () => {
  const {showAd} = useRewardedAds();

  const [reward, setReward] = useState({amount: 0, type: 'Coins'});

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {reward && (
        <Text style={{marginBottom: 16}}>
          Your reward: {reward?.amount} {reward?.type}
        </Text>
      )}

      <Text>NextScreen</Text>

      <TouchableOpacity
        onPress={() => {
          showAd?.({
            onEarnedReward: reward =>
              setReward(prev => ({
                ...prev,
                amount: prev.amount + reward.amount,
              })),
          });
        }}
        style={{marginTop: 16}}>
        <Text>Get Reward</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextScreen;
