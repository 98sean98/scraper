import { BuilderConstants } from './constants';

import { RemoveSetup, SetMakerConfig, SetSetups } from './types';

export const setSetups = (
  payload: SetSetups, // required action arg
) =>
  ({
    type: BuilderConstants.SET_SETUPS,
    payload,
  } as const);

export const removeSetup = (
  payload: RemoveSetup, // required action arg
) =>
  ({
    type: BuilderConstants.REMOVE_SETUP,
    payload,
  } as const);

export const setMakerConfig = (
  payload: SetMakerConfig, // required action arg
) =>
  ({
    type: BuilderConstants.SET_MAKER_CONFIG,
    payload,
  } as const);

export const clearAllSetups = () =>
  ({
    type: BuilderConstants.CLEAR_ALL_SETUPS,
  } as const);

export const clearMakerConfig = () =>
  ({
    type: BuilderConstants.CLEAR_MAKER_CONFIG,
  } as const);

/**
 * @description union of all the actions by using ReturnType to get the return type of each function
 * @guide https://www.carlrippon.com/managing-app-state-with-redux-and-typescript-p1/
 */
export type SetSetupsBuilderAction = ReturnType<typeof setSetups>;
export type RemoveSetupBuilderAction = ReturnType<typeof removeSetup>;
export type SetMakerConfigBuilderAction = ReturnType<typeof setMakerConfig>;
export type ClearAllSetupsBuilderAction = ReturnType<typeof clearAllSetups>;
export type ClearMakerConfigBuilderAction = ReturnType<typeof clearMakerConfig>;

export type BuilderActionTypes =
  | SetSetupsBuilderAction
  | RemoveSetupBuilderAction
  | SetMakerConfigBuilderAction
  | ClearAllSetupsBuilderAction
  | ClearMakerConfigBuilderAction;
