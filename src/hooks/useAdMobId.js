import {Platform} from 'react-native';

const useAdMobId = () => {
  return Platform.select({
    android: 'ca-app-pub-6420340748065408/4529570319',
    ios: 'ca-app-pub-6420340748065408/6028971357',
  });
};

export default useAdMobId;
