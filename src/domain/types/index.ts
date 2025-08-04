import { ActivityType } from '../entities/Activity';

export type Temperature = number;
export type WindSpeed = number;
export type WeatherDescription =
  | 'clear'
  | 'snow'
  | 'rain'
  | 'storm'
  | 'cloudy'
  | string;

export interface RankedActivity {
  activity: ActivityType;
  score: number;
  reason: string;
}
