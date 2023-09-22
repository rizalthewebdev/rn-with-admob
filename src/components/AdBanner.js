import React from 'react';
import {View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const AdBanner = props => {
  const {style, position} = props;
  const adUnitId = __DEV__ ? TestIds.BANNER : '';
  const isAbsolute = position === 'top' || position === 'bottom';
  const topPosition = position === 'top';
  const bottomPosition = position === 'bottom';

  return (
    <View
      style={[
        isAbsolute && {position: 'absolute'},
        topPosition && {top: 0},
        bottomPosition && {bottom: 0},
        style,
      ]}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        {...props}
      />
    </View>
  );
};

export default AdBanner;
