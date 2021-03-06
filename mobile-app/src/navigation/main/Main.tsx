import React, { FC, useLayoutEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MainScreenProps } from '@navigation/navigationTypes';
import { MainDrawerParamList } from './navigationTypes';

import { CustomDrawer } from './CustomDrawer';
import { CustomHeader } from './CustomHeader';

import {
  AppMakerScreen,
  DevControllerScreen,
  MicroAppScreen,
  SettingsScreen,
  SetupsScreen,
  SimpleControllerScreen,
} from '@containers/main';

const { Navigator, Screen } = createDrawerNavigator<MainDrawerParamList>();

export const Main: FC<MainScreenProps> = ({ navigation }) => {
  useLayoutEffect(
    () =>
      navigation.setOptions({ header: (props) => <CustomHeader {...props} /> }),
    [navigation],
  );

  return (
    <Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      backBehavior={'history'}
      initialRouteName={'SimpleController'}>
      <Screen name={'SimpleController'} component={SimpleControllerScreen} />
      <Screen name={'DevController'} component={DevControllerScreen} />
      <Screen name={'Setups'} component={SetupsScreen} />
      <Screen name={'AppMaker'} component={AppMakerScreen} />
      <Screen name={'MicroApp'} component={MicroAppScreen} />
      <Screen name={'Settings'} component={SettingsScreen} />
    </Navigator>
  );
};
