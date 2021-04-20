import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { Button, ButtonProps } from '@ui-kitten/components';

import { tailwind } from '@styles/tailwind';

import { BLDCMotor, Direction, Enable } from '@models/control-entity';

import { renderBleErrorAlert } from '@components/shared/bluetooth';

import { mapControlEntityToString } from '@utilities/functions/map';
import { useBleRpiDeviceCharacteristic } from '@utilities/hooks';

interface BLDCMotorContinuousControlProps extends ViewProps {
  controlEntity: BLDCMotor;
}

const StyledButton = (props: ButtonProps) => (
  <Button appearance={'ghost'} status={'info'} size={'large'} {...props} />
);

export const BLDCMotorContinuousControl: FC<BLDCMotorContinuousControlProps> = ({
  controlEntity,
  ...props
}) => {
  const { write: writeBldcMotor } = useBleRpiDeviceCharacteristic(
    'bldcMotors',
    'string',
  );
  const { write: writeRunIdle } = useBleRpiDeviceCharacteristic(
    'runIdle',
    'boolean',
  );

  const [isControlDisabled, setIsControlDisabled] = useState<boolean>(false);

  const triggerContinuousRunning = useCallback(
    async (isRunning: boolean, direction: Direction) => {
      try {
        if (isRunning) {
          const stringValue = mapControlEntityToString({
            ...controlEntity,
            direction,
            enable: Enable.High,
            duration: 200, // arbitrarily large duration number
          });
          await writeBldcMotor(stringValue);
          await writeRunIdle(true);
        } else {
          // disable the controls for a short while
          setIsControlDisabled(true);
          const stringValue = mapControlEntityToString({
            ...controlEntity,
            enable: Enable.Low,
          });
          await writeRunIdle(false);
          await writeBldcMotor(stringValue);
        }
      } catch (error) {
        console.log(error);
        renderBleErrorAlert({
          title: 'Continuous Running Trigger Error',
          message:
            'There was an error with sending data to instantaneous start and stop.',
        });
      }
    },
    [controlEntity, writeBldcMotor, writeRunIdle],
  );

  useEffect(() => {
    if (isControlDisabled) {
      const timeout = setTimeout(() => setIsControlDisabled(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [isControlDisabled]);

  return (
    <View
      {...props}
      style={[
        tailwind('flex-row justify-between items-center'),
        props?.style ?? {},
      ]}>
      <StyledButton
        style={tailwind('w-1/3')}
        disabled={isControlDisabled}
        onPressIn={() => triggerContinuousRunning(true, Direction.CCW)}
        onPressOut={() => triggerContinuousRunning(false, Direction.CCW)}>
        CCW
      </StyledButton>
      <StyledButton
        style={tailwind('w-1/3')}
        disabled={isControlDisabled}
        onPressIn={() => triggerContinuousRunning(true, Direction.CW)}
        onPressOut={() => triggerContinuousRunning(false, Direction.CW)}>
        CW
      </StyledButton>
    </View>
  );
};