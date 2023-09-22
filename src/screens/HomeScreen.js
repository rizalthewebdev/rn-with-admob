import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import AdBanner from '../components/AdBanner';
import {useInterstitialAds} from '../providers/InterstitialAdsProvider';

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const {showAd} = useInterstitialAds();
  const [bannerPosition, setBannerPosition] = useState('top');

  const handleTogglePosition = () => {
    setBannerPosition(position =>
      position === 'top' ? 'bottom' : position === 'bottom' ? 'static' : 'top',
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={handleTogglePosition}
        style={{marginBottom: 16}}>
        <Text>Toggle Banner Ad</Text>
      </TouchableOpacity>
      <Text>HomeScreen</Text>

      <TouchableOpacity
        onPress={() => {
          showAd?.({onCloseAd: () => navigate('NextScreen')});
        }}
        style={{marginTop: 16}}>
        <Text>Go To NextScreen</Text>
      </TouchableOpacity>

      <AdBanner position={bannerPosition} />
    </View>
  );
};

export default HomeScreen;
