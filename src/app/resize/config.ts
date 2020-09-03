import { InjectionToken } from '@angular/core';

export interface IConfig {
  medium: number;
  large: number;
}

export enum ConfigEnum {
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large'
}

export const RESIZE_CONFIG_TOKEN = new InjectionToken<IConfig>('RESIZE_CONFIG_TOKEN');

export const CONFIG: IConfig = {
  medium: 900,
  large: 1000
};
