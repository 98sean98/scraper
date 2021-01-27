import { buffers, eventChannel } from 'redux-saga';
import { cancelled, take, put } from 'redux-saga/effects';
import { BleError, BleManager, Device } from 'react-native-ble-plx';

import { RpiDevice } from '@config/RpiDevice';

import { setIsScanningConnecting } from '@reduxApp/bluetooth/actions';

export function* bleScan(
  bleManager: BleManager,
): Generator<any, string | undefined> {
  const rpiDevice = new RpiDevice();

  console.log('started scanning for device...');
  yield put(setIsScanningConnecting(true));

  const scanningChannel: any = yield eventChannel((emit) => {
    bleManager.startDeviceScan(
      null,
      { allowDuplicates: true },
      (error, scannedDevice) => {
        if (error) {
          emit([error, scannedDevice]);
          return;
        }
        if (scannedDevice && scannedDevice.localName === rpiDevice.localName) {
          emit([error, scannedDevice]);
        }
      },
    );
    return () => {
      console.log('stopped scanning for device!');
      bleManager.stopDeviceScan();
    };
  }, buffers.expanding(1));

  try {
    for (;;) {
      const scanResults = yield take(scanningChannel);
      const [error, scannedDevice] = scanResults as [BleError, Device];
      if (error) {
        console.log('error scanning for device: ', error);
        throw new Error('');
      }
      if (scannedDevice) {
        console.log(
          'found device: ',
          scannedDevice.name,
          scannedDevice.localName,
        );
        scanningChannel.close();
        return scannedDevice.id;
      }
    }
  } catch (error) {
    return '';
  } finally {
    if (yield cancelled()) {
      scanningChannel.close();
    }
  }
}
