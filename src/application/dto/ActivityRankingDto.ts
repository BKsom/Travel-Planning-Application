export type Activity =
  | 'SKIING'
  | 'SURFING'
  | 'INDOOR_SIGHTSEEING'
  | 'OUTDOOR_SIGHTSEEING';

export interface RecommendedActivityDto {
  activity: Activity;
  score: number;
  reason: string;
}
