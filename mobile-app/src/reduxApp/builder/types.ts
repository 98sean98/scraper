import { Setups } from '@models/setup';
import { MakerConfig } from '@models/app-maker';

// types and interfaces for feature

// action payload
export type SetSetups = Setups;

export type RemoveSetup = string; // setup key

export type SetMakerConfig = Partial<MakerConfig>;

// feature state
export type BuilderState = {
  readonly setups: Setups;
  readonly makerConfig: MakerConfig;
};
