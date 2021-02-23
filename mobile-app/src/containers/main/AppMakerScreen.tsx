import React, { FC } from 'react';
import { Dimensions, View } from 'react-native';
import { ViewPager } from '@ui-kitten/components';
import { useSelector } from 'react-redux';

import { AppMakerScreenProps } from '@navigation/main';

import { tailwind } from '@styles/tailwind';

import { RootState } from '@reduxApp';

import {
  AnimatedFlingContainer,
  LayoutDivider,
  MakerConfiguration,
} from '@components/app-maker';
import { PressableBox } from '@components/shared/actionable';

import { useAppMakerContext } from '@utilities/hooks';

export type ConfigurationViewHeight = {
  collapsed: number;
  expanded: number;
  fling: number;
};

const configurationViewHeight: ConfigurationViewHeight = {
  collapsed: 80,
  expanded: Dimensions.get('window').height * 0.75,
  fling: 28,
};

export const AppMakerScreen: FC<AppMakerScreenProps> = () => {
  const { makerConfig } = useSelector((state: RootState) => state.builder);

  const { focusedPageIndex, setFocusedPageIndex } = useAppMakerContext();

  const renderItem = (boxIndex: number) => (
    <PressableBox
      text={boxIndex.toString()}
      style={[{ flex: 1 }, tailwind('m-1')]}
    />
  );

  return (
    <View style={[{ flex: 1 }, tailwind('relative')]}>
      {Object.entries(makerConfig.pages).length !== 0 ? (
        <ViewPager
          style={{ flex: 1 }}
          selectedIndex={focusedPageIndex}
          onSelect={setFocusedPageIndex}>
          {Object.entries(makerConfig.pages).map(
            ([key, { layout, scrollEnabled }]) => (
              <LayoutDivider
                key={key}
                layout={layout}
                renderItem={renderItem}
                scrollEnabled={scrollEnabled}
              />
            ),
          )}
        </ViewPager>
      ) : null}

      <View style={{ height: configurationViewHeight.collapsed }} />
      <AnimatedFlingContainer
        configurationViewHeight={configurationViewHeight}
        style={[
          tailwind('absolute z-10 w-full'),
          {
            bottom:
              configurationViewHeight.collapsed -
              configurationViewHeight.expanded,
          },
        ]}>
        <MakerConfiguration style={{ flex: 1 }} />
      </AnimatedFlingContainer>
    </View>
  );
};
