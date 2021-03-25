import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { Alert, GestureResponderEvent } from 'react-native';
import { Button, ButtonProps } from '@ui-kitten/components';
import { useMutation, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import {
  GET_ALL_MICRO_APP_DATA,
  GET_LATEST_MICRO_APP_DATA_VERSION,
  GET_MICRO_APP_HEADERS,
  UPDATE_MICRO_APP_DATA,
} from '@api/graphql/microApp';

import { RootState } from '@reduxApp';
import {
  setApplicationError,
  setIsLoading,
} from '@reduxApp/application/actions';

import { ConfirmationModal } from '@components/shared/actionable';
import { renderIcon } from '@components/shared/interface';

interface MicroAppBackupProps extends ButtonProps {}

export const MicroAppBackup: FC<MicroAppBackupProps> = ({ ...props }) => {
  const dispatch = useDispatch();

  const {
    application: { focusedMicroAppHeaders },
    auth: { user },
    builder: { setups, makerConfig },
    control: { controlEntities },
  } = useSelector((state: RootState) => state);

  const microAppQueryVariables = useMemo(
    () => ({ name: focusedMicroAppHeaders?.name }),
    [focusedMicroAppHeaders],
  );

  const {
    data: versionData,
    error: versionError,
    startPolling,
    stopPolling,
  } = useQuery(GET_LATEST_MICRO_APP_DATA_VERSION, {
    variables: microAppQueryVariables,
    fetchPolicy: 'network-only',
  });
  const [
    updateMicroApp,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_MICRO_APP_DATA, {
    refetchQueries: [
      {
        query: GET_LATEST_MICRO_APP_DATA_VERSION,
        variables: microAppQueryVariables,
      },
      {
        query: GET_MICRO_APP_HEADERS,
        variables: microAppQueryVariables,
      },
      {
        query: GET_ALL_MICRO_APP_DATA,
        variables: microAppQueryVariables,
      },
    ],
    awaitRefetchQueries: true,
  });

  // use a focus effect to start / stop polling for the latest micro app data version
  useFocusEffect(
    useCallback(() => {
      startPolling(5000); // ms
      return () => stopPolling();
    }, [startPolling, stopPolling]),
  );

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(
    false,
  );

  const microAppName = useMemo(
    () => focusedMicroAppHeaders?.name ?? 'Micro App',
    [focusedMicroAppHeaders],
  );

  const dispatchError = useCallback(
    () =>
      dispatch(
        setApplicationError({
          title: `${microAppName} Backup Error`,
          message:
            'There was an error backing this micro app up to the server.',
        }),
      ),
    [dispatch, microAppName],
  );

  const [dataName, setDataName] = useState<string>();

  const onButtonPress = (e: GestureResponderEvent) => {
    Alert.prompt(
      'Data Name',
      'Optionally give a name to this version of data for easier identification later.',
      (name) => {
        if (name !== '') setDataName(name);
        setShowConfirmationModal(true);
      },
    );
    if (typeof props.onPress !== 'undefined') props.onPress(e);
  };

  const onConfirmUpdateMicroApp = async () => {
    try {
      if (
        typeof user !== 'undefined' &&
        typeof focusedMicroAppHeaders !== 'undefined'
      ) {
        const name = focusedMicroAppHeaders.name;
        const updaterUsername = user?.username;

        if (typeof updaterUsername === 'undefined') {
          // no-op as the user should be logged in, and their information is stored in redux
          dispatchError();
          return;
        }

        const newVersion = versionData?.aggregateMicroAppData
          ? versionData.aggregateMicroAppData.max.version + 1
          : 1;
        const data = { controlEntities, setups, makerConfig };
        const jsonData = JSON.stringify(data);

        const variables = {
          name,
          dataName: dataName ?? null,
          version: newVersion,
          data: jsonData,
          updaterUsername,
        };

        const response = await updateMicroApp({
          variables,
        });
        if (response.data?.updateMicroApp !== null)
          Alert.alert(
            `${microAppName} Backup Success`,
            `This micro app's data has been backed up successfully!`,
          );

        setDataName(undefined);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  // loading effect
  useEffect(() => {
    dispatch(setIsLoading(updateLoading));
  }, [dispatch, updateLoading]);

  // error effect
  useEffect(() => {
    if (
      typeof versionError !== 'undefined' ||
      typeof updateError !== 'undefined'
    )
      dispatchError();
  }, [dispatchError, versionError, updateError]);

  return (
    <>
      <Button
        accessoryLeft={renderIcon('cloud-upload-outline')}
        {...props}
        onPress={onButtonPress}>
        {`Backup ${microAppName} data`}
      </Button>

      {/* confirmation modal */}
      <ConfirmationModal
        visible={showConfirmationModal}
        onBackdropPress={() => setShowConfirmationModal(false)}
        action={'backup'}
        itemName={dataName ?? microAppName}
        onYesPress={onConfirmUpdateMicroApp}
      />
    </>
  );
};
